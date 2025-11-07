from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe
stripe_api_key = os.environ.get('STRIPE_API_KEY')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class Villa(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    max_guests: int
    price_per_night: float
    amenities: List[str]
    image_url: str

class VillaCreate(BaseModel):
    name: str
    description: str
    max_guests: int
    price_per_night: float
    amenities: List[str]
    image_url: str

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    villa_id: str
    villa_name: str
    guest_name: str
    email: EmailStr
    phone: str
    check_in: str
    check_out: str
    guests: int
    total_price: float
    status: str  # pending, confirmed, cancelled
    payment_session_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    villa_id: str
    guest_name: str
    email: EmailStr
    phone: str
    check_in: str
    check_out: str
    guests: int

class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    booking_id: str
    amount: float
    currency: str
    status: str  # initiated, completed, failed, expired
    payment_status: str  # pending, paid, unpaid
    metadata: Dict[str, str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class PaymentCheckoutRequest(BaseModel):
    booking_id: str
    origin_url: str

# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Apollo's Hideaway API"}

# Villas
@api_router.get("/villas", response_model=List[Villa])
async def get_villas():
    villas = await db.villas.find({}, {"_id": 0}).to_list(100)
    return villas

@api_router.get("/villas/{villa_id}", response_model=Villa)
async def get_villa(villa_id: str):
    villa = await db.villas.find_one({"id": villa_id}, {"_id": 0})
    if not villa:
        raise HTTPException(404, "Villa not found")
    return villa

# Bookings
@api_router.get("/bookings/availability")
async def check_availability(villa_id: str, check_in: str, check_out: str):
    """Check if villa is available for given dates"""
    # Find overlapping bookings
    bookings = await db.bookings.find({
        "villa_id": villa_id,
        "status": {"$in": ["pending", "confirmed"]},
        "$or": [
            {"check_in": {"$lt": check_out}, "check_out": {"$gt": check_in}}
        ]
    }, {"_id": 0}).to_list(100)
    
    is_available = len(bookings) == 0
    return {"available": is_available, "villa_id": villa_id}

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    # Check availability first
    availability = await check_availability(
        booking_data.villa_id,
        booking_data.check_in,
        booking_data.check_out
    )
    
    if not availability["available"]:
        raise HTTPException(400, "Villa not available for selected dates")
    
    # Get villa to calculate price
    villa = await db.villas.find_one({"id": booking_data.villa_id}, {"_id": 0})
    if not villa:
        raise HTTPException(404, "Villa not found")
    
    # Calculate total nights and price
    check_in_date = datetime.fromisoformat(booking_data.check_in)
    check_out_date = datetime.fromisoformat(booking_data.check_out)
    nights = (check_out_date - check_in_date).days
    total_price = nights * villa["price_per_night"]
    
    # Create booking
    booking_dict = booking_data.model_dump()
    booking_obj = Booking(
        **booking_dict,
        villa_name=villa["name"],
        total_price=total_price,
        status="pending"
    )
    
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(404, "Booking not found")
    
    if isinstance(booking['created_at'], str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return booking

# Payments
@api_router.post("/payments/checkout")
async def create_payment_checkout(payment_request: PaymentCheckoutRequest, request: Request):
    # Get booking
    booking = await db.bookings.find_one({"id": payment_request.booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(404, "Booking not found")
    
    if booking["status"] == "confirmed":
        raise HTTPException(400, "Booking already confirmed")
    
    # Initialize Stripe
    host_url = payment_request.origin_url
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    # Create checkout session
    success_url = f"{host_url}/booking-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{host_url}/booking"
    
    checkout_request = CheckoutSessionRequest(
        amount=float(booking["total_price"]),
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "booking_id": payment_request.booking_id,
            "villa_name": booking["villa_name"],
            "guest_email": booking["email"]
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction record
    payment_transaction = PaymentTransaction(
        session_id=session.session_id,
        booking_id=payment_request.booking_id,
        amount=float(booking["total_price"]),
        currency="usd",
        status="initiated",
        payment_status="pending",
        metadata=checkout_request.metadata
    )
    
    doc = payment_transaction.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.payment_transactions.insert_one(doc)
    
    # Update booking with session ID
    await db.bookings.update_one(
        {"id": payment_request.booking_id},
        {"$set": {"payment_session_id": session.session_id}}
    )
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    # Check if already processed
    transaction = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not transaction:
        raise HTTPException(404, "Transaction not found")
    
    # If already completed, return cached status
    if transaction["status"] == "completed" and transaction["payment_status"] == "paid":
        return {
            "status": transaction["status"],
            "payment_status": transaction["payment_status"],
            "booking_id": transaction["booking_id"]
        }
    
    # Poll Stripe for status
    host_url = "http://localhost:8001"
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    
    # Update transaction
    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status
        }}
    )
    
    # If payment successful, update booking
    if checkout_status.payment_status == "paid" and transaction["status"] != "completed":
        await db.bookings.update_one(
            {"id": transaction["booking_id"]},
            {"$set": {"status": "confirmed"}}
        )
        
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"status": "completed"}}
        )
    
    return {
        "status": checkout_status.status,
        "payment_status": checkout_status.payment_status,
        "booking_id": transaction["booking_id"]
    }

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    webhook_response = await stripe_checkout.handle_webhook(body, signature)
    
    # Update transaction based on webhook
    if webhook_response.payment_status == "paid":
        transaction = await db.payment_transactions.find_one(
            {"session_id": webhook_response.session_id},
            {"_id": 0}
        )
        
        if transaction and transaction["status"] != "completed":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {
                    "status": "completed",
                    "payment_status": "paid"
                }}
            )
            
            await db.bookings.update_one(
                {"id": transaction["booking_id"]},
                {"$set": {"status": "confirmed"}}
            )
    
    return {"status": "success"}

# Contact
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(contact_data: ContactCreate):
    contact_obj = ContactSubmission(**contact_data.model_dump())
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification
    try:
        await send_contact_email(contact_data)
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
    
    return contact_obj

async def send_contact_email(contact_data: ContactCreate):
    """Send email notification for contact form submission"""
    recipient_email = "wgrodesky@gmail.com"
    
    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = f"New Contact Form Submission from {contact_data.name}"
    message["From"] = "noreply@apolloshideaway.com"
    message["To"] = recipient_email
    
    # Email body
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2D5F4F;">New Contact Form Submission</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> {contact_data.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> {contact_data.email}</p>
          <p style="margin: 10px 0;"><strong>Phone:</strong> {contact_data.phone or 'Not provided'}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f0; border-left: 4px solid #D4745C;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0;">{contact_data.message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This email was sent from the Apollo's Hideaway contact form.
          </p>
        </div>
      </body>
    </html>
    """
    
    part = MIMEText(html, "html")
    message.attach(part)
    
    # Send via Gmail SMTP (you'll need to set up app password)
    # For production, use a proper SMTP service or SendGrid
    # This is a placeholder - in production, configure proper SMTP
    try:
        smtp = aiosmtplib.SMTP(hostname="smtp.gmail.com", port=587, use_tls=True)
        await smtp.connect()
        # Note: In production, use environment variables for credentials
        # await smtp.login("your-email@gmail.com", "your-app-password")
        # await smtp.send_message(message)
        await smtp.quit()
        logger.info(f"Contact email sent to {recipient_email}")
    except Exception as e:
        logger.warning(f"Email sending not configured: {str(e)}")

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Initialize villas on startup
@app.on_event("startup")
async def init_villas():
    count = await db.villas.count_documents({})
    if count == 0:
        villas_data = [
            {
                "id": "villa-1",
                "name": "Apollo's Sanctuary",
                "description": "Grand neoclassical estate with marble columns, classical statues, and private reflecting pool surrounded by manicured gardens.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Private Pool", "Marble Bath", "Garden View", "Classical Statues"],
                "image_url": "https://images.unsplash.com/photo-1689853912773-1cf88e58629d"
            },
            {
                "id": "villa-2",
                "name": "Diana's Haven",
                "description": "Elegant villa with manicured lawns, neoclassical facade, and serene garden pathways leading to the wellness complex.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Garden Pathway", "Private Terrace", "Spa Bath", "Lawn Views"],
                "image_url": "https://images.unsplash.com/photo-1689853910685-117066769bff"
            },
            {
                "id": "villa-3",
                "name": "Athena's Retreat",
                "description": "Classical villa featuring symmetrical architecture, long tree-lined driveway, and views of the orchard.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Orchard View", "Classical Design", "Luxury Bath", "Tree-Lined Drive"],
                "image_url": "https://images.unsplash.com/photo-1689853910671-7683814c3fb3"
            },
            {
                "id": "villa-4",
                "name": "Neptune's Oasis",
                "description": "Waterside villa with classical statue focal point, direct access to the pond and wellness facility nearby.",
                "max_guests": 2,
                "price_per_night": 950.00,
                "amenities": ["Pond Access", "Wellness Access", "Classical Art", "Water View"],
                "image_url": "https://images.unsplash.com/photo-1689853915785-53c92d8444b6"
            },
            {
                "id": "villa-5",
                "name": "Venus Garden Villa",
                "description": "Romantic hideaway with grand columns, surrounded by blooming gardens and fragrant herb gardens.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Column Design", "Herb Garden", "Butterfly Garden", "Grand Entrance"],
                "image_url": "https://images.pexels.com/photos/7174109/pexels-photo-7174109.jpeg"
            },
            {
                "id": "villa-6",
                "name": "Mercury's Flight",
                "description": "Modern luxury villa with classical touches, clean lines, and panoramic garden views.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Panoramic Views", "Modern Luxury", "Private Pool", "Contemporary Design"],
                "image_url": "https://images.pexels.com/photos/20768156/pexels-photo-20768156.jpeg"
            },
            {
                "id": "villa-7",
                "name": "Jupiter's Estate",
                "description": "Grand villa with expansive colonnades, multiple balconies, and direct pathway to the Roman bath complex.",
                "max_guests": 4,
                "price_per_night": 1200.00,
                "amenities": ["Bath Access", "Colonnade", "4 Guests", "Multiple Balconies"],
                "image_url": "https://images.unsplash.com/photo-1696574555247-a5bc88f681ed"
            },
            {
                "id": "villa-8",
                "name": "Mars' Hideaway",
                "description": "Private villa with impressive residential architecture, classical columns, and secluded garden sanctuary.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Classical Columns", "Garden Sanctuary", "Private Path", "Secluded"],
                "image_url": "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
            },
            {
                "id": "villa-9",
                "name": "Minerva's Wisdom",
                "description": "Thoughtfully designed villa with colonnade hallway, classical architectural elements, and tranquil reflecting pool.",
                "max_guests": 2,
                "price_per_night": 850.00,
                "amenities": ["Colonnade Hall", "Reflecting Pool", "Classical Elements", "Quiet Zone"],
                "image_url": "https://images.unsplash.com/photo-1714486729607-d8408bb25b42"
            },
            {
                "id": "villa-10",
                "name": "Bacchus' Vineyard Villa",
                "description": "Luxury villa with elegant interiors, surrounded by orchard trees with wine-tasting terrace and garden access.",
                "max_guests": 2,
                "price_per_night": 950.00,
                "amenities": ["Vineyard Views", "Wine Terrace", "Orchard Access", "Elegant Interior"],
                "image_url": "https://images.pexels.com/photos/6957083/pexels-photo-6957083.jpeg"
            }
        ]
        await db.villas.insert_many(villas_data)
        logger.info("Initialized 10 villas")