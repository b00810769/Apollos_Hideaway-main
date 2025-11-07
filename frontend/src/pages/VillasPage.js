import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VillasPage = () => {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const response = await axios.get(`${API}/villas`);
      setVillas(response.data);
    } catch (error) {
      console.error("Error fetching villas:", error);
    }
  };

  return (
    <div className="villas-page pt-20" data-testid="villas-page">
      {/* Hero */}
      <section className="bg-gradient-to-br from-garden/10 to-terracotta/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-garden mb-4">
            Our Villas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            10 uniquely designed neoclassical villas, each offering privacy, luxury,
            and distinct character. Every villa is a sanctuary hidden by lush gardens,
            connected to our Roman Bath Complex by winding pathways around the pond.
          </p>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <div
                key={villa.id}
                className="villa-card bg-white rounded-lg overflow-hidden shadow-lg"
                data-testid={`villa-${villa.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={villa.image_url}
                    alt={villa.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-garden mb-2">
                    {villa.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {villa.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-terracotta font-semibold text-xl">
                      ${villa.price_per_night}/night
                    </p>
                    <p className="text-sm text-gray-500">
                      Max {villa.max_guests} guests
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {villa.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="amenity-badge text-xs bg-garden/10 text-garden px-3 py-1 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/booking"
                    className="block w-full text-center bg-terracotta text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Book This Villa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-garden to-garden/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Find Your Perfect Sanctuary
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Each villa offers a unique experience. Book your escape today.
          </p>
          <Link
            to="/booking"
            className="inline-block bg-terracotta text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
          >
            Start Booking
          </Link>
        </div>
      </section>
    </div>
  );
};

export default VillasPage;