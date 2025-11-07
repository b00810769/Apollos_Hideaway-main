import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, differenceInDays } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Users, Mail, Phone, User } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingPage = () => {
  const [villas, setVillas] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [guestCount, setGuestCount] = useState(2);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Villa, 2: Select Dates, 3: Guest Info, 4: Payment

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const response = await axios.get(`${API}/villas`);
      setVillas(response.data);
    } catch (error) {
      console.error("Error fetching villas:", error);
      toast.error("Failed to load villas");
    }
  };

  const handleVillaSelect = (villa) => {
    setSelectedVilla(villa);
    setStep(2);
  };

  const handleDateSelect = (range) => {
    setDateRange(range);
  };

  const handleContinueToGuestInfo = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    // Check availability
    try {
      const response = await axios.get(`${API}/bookings/availability`, {
        params: {
          villa_id: selectedVilla.id,
          check_in: dateRange.from.toISOString(),
          check_out: dateRange.to.toISOString(),
        },
      });

      if (!response.data.available) {
        toast.error("Villa not available for selected dates");
        return;
      }

      setStep(3);
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error("Failed to check availability");
    }
  };

  const handleCreateBooking = async () => {
    if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
      toast.error("Please fill in all guest details");
      return;
    }

    setLoading(true);
    try {
      // Create booking
      const bookingResponse = await axios.post(`${API}/bookings`, {
        villa_id: selectedVilla.id,
        guest_name: guestDetails.name,
        email: guestDetails.email,
        phone: guestDetails.phone,
        check_in: dateRange.from.toISOString(),
        check_out: dateRange.to.toISOString(),
        guests: guestCount,
      });

      const booking = bookingResponse.data;

      // Create payment checkout
      const paymentResponse = await axios.post(`${API}/payments/checkout`, {
        booking_id: booking.id,
        origin_url: window.location.origin,
      });

      // Redirect to Stripe
      window.location.href = paymentResponse.data.url;
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error(error.response?.data?.detail || "Failed to create booking");
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    return differenceInDays(dateRange.to, dateRange.from);
  };

  const calculateTotal = () => {
    if (!selectedVilla || !dateRange?.from || !dateRange?.to) return 0;
    return calculateNights() * selectedVilla.price_per_night;
  };

  return (
    <div className="booking-page pt-20 min-h-screen bg-gradient-to-br from-garden/5 to-terracotta/5" data-testid="booking-page">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-display text-5xl font-bold text-garden mb-8 text-center">
          Book Your Escape
        </h1>

        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s <= step
                      ? "bg-terracotta text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  data-testid={`step-indicator-${s}`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? "bg-terracotta" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Villa</span>
            <span>Dates</span>
            <span>Details</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Step 1: Select Villa */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto" data-testid="step-select-villa">
            <h2 className="font-display text-3xl font-semibold text-garden mb-8 text-center">
              Choose Your Villa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {villas.map((villa) => (
                <div
                  key={villa.id}
                  className="villa-card bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => handleVillaSelect(villa)}
                  data-testid={`villa-select-${villa.id}`}
                >
                  <img
                    src={villa.image_url}
                    alt={villa.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-garden mb-2">
                      {villa.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{villa.description}</p>
                    <p className="text-terracotta font-semibold text-lg mb-4">
                      ${villa.price_per_night}/night
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Max {villa.max_guests} guests
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {villa.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="amenity-badge text-xs bg-garden/10 text-garden px-3 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Dates */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8" data-testid="step-select-dates">
            <h2 className="font-display text-3xl font-semibold text-garden mb-6">
              Select Your Dates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-garden mb-4">
                  {selectedVilla?.name}
                </h3>
                <img
                  src={selectedVilla?.image_url}
                  alt={selectedVilla?.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">{selectedVilla?.description}</p>
                <p className="text-terracotta font-semibold text-xl">
                  ${selectedVilla?.price_per_night}/night
                </p>
              </div>
              <div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date() }}
                  numberOfMonths={1}
                  className="rounded-md border"
                  data-testid="date-calendar"
                />
                {dateRange?.from && dateRange?.to && (
                  <div className="mt-6 p-4 bg-garden/5 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Check-in:</strong> {format(dateRange.from, "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Check-out:</strong> {format(dateRange.to, "MMM dd, yyyy")}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Nights:</strong> {calculateNights()}
                    </p>
                    <p className="text-lg font-semibold text-terracotta mt-4">
                      Total: ${calculateTotal()}
                    </p>
                  </div>
                )}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    data-testid="back-to-villas-button"
                    className="flex-1 py-3 border-2 border-garden text-garden rounded-lg font-semibold hover:bg-garden/5"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinueToGuestInfo}
                    disabled={!dateRange?.from || !dateRange?.to}
                    data-testid="continue-to-guest-info-button"
                    className="flex-1 py-3 bg-terracotta text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Guest Details */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8" data-testid="step-guest-details">
            <h2 className="font-display text-3xl font-semibold text-garden mb-6">
              Guest Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={guestDetails.name}
                  onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                  data-testid="guest-name-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={guestDetails.email}
                  onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                  data-testid="guest-email-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={guestDetails.phone}
                  onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                  data-testid="guest-phone-input"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline mr-2" size={16} />
                  Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  data-testid="guest-count-select"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {[...Array(selectedVilla?.max_guests || 4)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="mt-8 p-6 bg-gradient-to-br from-garden/5 to-terracotta/5 rounded-lg">
              <h3 className="font-display text-xl font-semibold text-garden mb-4">
                Booking Summary
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Villa:</strong> {selectedVilla?.name}
                </p>
                <p>
                  <strong>Check-in:</strong> {format(dateRange.from, "MMM dd, yyyy")}
                </p>
                <p>
                  <strong>Check-out:</strong> {format(dateRange.to, "MMM dd, yyyy")}
                </p>
                <p>
                  <strong>Nights:</strong> {calculateNights()}
                </p>
                <p>
                  <strong>Guests:</strong> {guestCount}
                </p>
                <div className="border-t border-gray-300 my-4 pt-4">
                  <p className="text-xl font-semibold text-terracotta">
                    Total: ${calculateTotal()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                data-testid="back-to-dates-button"
                className="flex-1 py-3 border-2 border-garden text-garden rounded-lg font-semibold hover:bg-garden/5"
              >
                Back
              </button>
              <button
                onClick={handleCreateBooking}
                disabled={loading}
                data-testid="proceed-to-payment-button"
                className="flex-1 py-3 bg-terracotta text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;