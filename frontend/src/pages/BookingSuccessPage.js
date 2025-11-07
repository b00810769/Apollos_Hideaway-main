import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("checking"); // checking, success, failed
  const [bookingId, setBookingId] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (sessionId) {
      pollPaymentStatus();
    }
  }, [sessionId]);

  const pollPaymentStatus = async () => {
    const maxAttempts = 5;
    const pollInterval = 2000;

    if (attempts >= maxAttempts) {
      setStatus("failed");
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/status/${sessionId}`);
      const data = response.data;

      if (data.payment_status === "paid") {
        setStatus("success");
        setBookingId(data.booking_id);
        return;
      } else if (data.status === "expired") {
        setStatus("failed");
        return;
      }

      // Continue polling
      setAttempts(attempts + 1);
      setTimeout(() => {
        pollPaymentStatus();
      }, pollInterval);
    } catch (error) {
      console.error("Error checking payment status:", error);
      setStatus("failed");
    }
  };

  return (
    <div className="booking-success-page pt-20 min-h-screen bg-gradient-to-br from-garden/5 to-terracotta/5" data-testid="booking-success-page">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          {status === "checking" && (
            <div data-testid="status-checking">
              <Loader2 className="animate-spin mx-auto mb-6 text-terracotta" size={64} />
              <h1 className="font-display text-3xl font-bold text-garden mb-4">
                Processing Your Payment
              </h1>
              <p className="text-gray-600">Please wait while we confirm your booking...</p>
            </div>
          )}

          {status === "success" && (
            <div data-testid="status-success">
              <CheckCircle className="mx-auto mb-6 text-green-600" size={64} />
              <h1 className="font-display text-4xl font-bold text-garden mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Thank you for choosing Apollo's Hideaway. Your reservation has been confirmed.
              </p>
              <div className="bg-gradient-to-br from-garden/5 to-terracotta/5 rounded-lg p-6 mb-8">
                <p className="text-gray-700 mb-2">
                  A confirmation email has been sent to your email address with all the details
                  of your stay.
                </p>
                {bookingId && (
                  <p className="text-sm text-gray-500 mt-4">
                    Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
                  </p>
                )}
              </div>
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-semibold text-garden mb-4">
                  What's Next?
                </h2>
                <ul className="text-left space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">•</span>
                    <span>Check your email for detailed reservation information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">•</span>
                    <span>Arrive at 3pm on your check-in date</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terracotta mr-2">•</span>
                    <span>Prepare for an unforgettable experience at Apollo's Hideaway</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to="/"
                  data-testid="return-home-button"
                  className="inline-block bg-garden text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div data-testid="status-failed">
              <div className="mx-auto mb-6 text-red-600 text-6xl">❌</div>
              <h1 className="font-display text-3xl font-bold text-garden mb-4">
                Payment Issue
              </h1>
              <p className="text-gray-700 mb-8">
                We encountered an issue processing your payment. Please try booking again or
                contact us for assistance.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/booking"
                  data-testid="try-again-button"
                  className="inline-block bg-terracotta text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90"
                >
                  Try Again
                </Link>
                <Link
                  to="/contact"
                  data-testid="contact-support-button"
                  className="inline-block border-2 border-garden text-garden px-6 py-3 rounded-full font-semibold hover:bg-garden/5"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;