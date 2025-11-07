import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, User, MessageSquare, Send } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="bg-gradient-to-br from-garden/10 to-terracotta/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-garden mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold text-garden mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2" size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="contact-name-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="contact-email-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="contact-phone-input"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="inline mr-2" size={16} />
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="contact-message-input"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="Tell us about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-button"
                  className="w-full py-4 bg-terracotta text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-garden to-garden/80 text-white rounded-lg p-8">
              <h2 className="font-display text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-8 text-gray-100">
                Have questions about Apollo's Hideaway? Our team is here to help you plan
                your perfect escape.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Property Manager</h3>
                  <p className="text-gray-100">William Grodesky</p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-100">
                    New Buffalo, Michigan
                    <br />
                    Just 2 hours from Chicago & Milwaukee
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-100">(614) 595-2218</p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-100">wgrodesky@gmail.com</p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Mailing Address</h3>
                  <p className="text-gray-100">
                    7619 N Bosworth Ave, Unit 1
                    <br />
                    Chicago, IL 60626
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">Hours</h3>
                  <p className="text-gray-100">
                    Reservations: 9am - 8pm EST
                    <br />
                    Check-in: 3pm | Check-out: 11am
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="font-display text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;