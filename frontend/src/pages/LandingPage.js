import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Waves, Trees, Heart } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = () => {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const response = await axios.get(`${API}/villas`);
      setVillas(response.data.slice(0, 3)); // Show first 3
    } catch (error) {
      console.error("Error fetching villas:", error);
    }
  };

  return (
    <div className="landing-page" data-testid="landing-page">
      {/* Hero Section */}
      <section
        className="hero-section relative flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1676517243531-69e3b27276e9')",
        }}
        data-testid="hero-section"
      >
        <div className="hero-overlay"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Apollo's Hideaway
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            An intimate luxury wellness retreat where neoclassical elegance meets ancient Roman-inspired wellness.
            Discover tranquility in New Buffalo, Michigan.
          </p>
          <Link
            to="/booking"
            data-testid="hero-book-now-button"
            className="btn-primary inline-block bg-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
          >
            Book Your Escape
          </Link>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white" data-testid="value-prop-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-garden mb-4">
              A Sanctuary for the Senses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reconnect with your partner in an adults-only retreat that blends luxury,
              wellness, and the timeless beauty of neoclassical architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="feature-intimate">
              <div className="bg-gradient-to-br from-terracotta/10 to-garden/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-terracotta" size={36} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-garden">Intimate</h3>
              <p className="text-gray-600 text-sm">
                Only 10 secluded villas for ultimate privacy and tranquility
              </p>
            </div>

            <div className="text-center" data-testid="feature-wellness">
              <div className="bg-gradient-to-br from-terracotta/10 to-garden/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="text-terracotta" size={36} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-garden">Wellness</h3>
              <p className="text-gray-600 text-sm">
                Roman-inspired baths with saunas, steam rooms, and cold plunges
              </p>
            </div>

            <div className="text-center" data-testid="feature-nature">
              <div className="bg-gradient-to-br from-terracotta/10 to-garden/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trees className="text-terracotta" size={36} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-garden">Nature</h3>
              <p className="text-gray-600 text-sm">
                Lush gardens, reflecting pools, and serene pathways
              </p>
            </div>

            <div className="text-center" data-testid="feature-luxury">
              <div className="bg-gradient-to-br from-terracotta/10 to-garden/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-terracotta" size={36} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 text-garden">Luxury</h3>
              <p className="text-gray-600 text-sm">
                Marble columns, terracotta tiles, and elegant neoclassical design
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Preview */}
      <section className="py-20 gradient-hero" data-testid="amenities-section">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-center text-garden mb-12">
            Unparalleled Amenities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1554424518-336ec861b705"
                alt="Roman Bath Wellness Facility"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-2">
                  Roman Bath Complex
                </h3>
                <p className="text-gray-600">
                  Experience ancient wellness traditions with modern luxury. Our facilities include
                  steam rooms, saunas, various temperature hot tubs, cold plunges, and massage rooms.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1689582915840-8046c641064c"
                alt="Garden Pathways"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-2">
                  Lush Gardens & Pathways
                </h3>
                <p className="text-gray-600">
                  Wander through meticulously designed gardens with reflecting pools, herb gardens,
                  orchards, and winding pathways connecting each villa to the wellness center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-20 bg-white" data-testid="featured-villas-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-garden mb-4">
              Secluded Villas
            </h2>
            <p className="text-lg text-gray-600">
              Each villa is a private sanctuary, hidden by greenery and designed for intimate escapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <div
                key={villa.id}
                className="villa-card bg-white rounded-lg overflow-hidden shadow-lg"
                data-testid={`villa-card-${villa.id}`}
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {villa.amenities.slice(0, 3).map((amenity, idx) => (
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

          <div className="text-center mt-12">
            <Link
              to="/booking"
              data-testid="view-all-villas-button"
              className="btn-primary inline-block bg-garden text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90"
            >
              View All Villas
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551918120-9739cb430c6d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-testid="cta-section"
      >
        <div className="absolute inset-0 bg-garden/70"></div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            Begin Your Journey to Tranquility
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Just 2 hours from Chicago and Milwaukee. Your escape awaits.
          </p>
          <Link
            to="/booking"
            data-testid="cta-book-button"
            className="btn-primary inline-block bg-terracotta text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;