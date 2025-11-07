const RestaurantPage = () => {
  return (
    <div className="restaurant-page pt-20" data-testid="restaurant-page">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1623800330578-2cd67efaec75')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
            The Pantheon Restaurant
          </h1>
          <p className="text-xl">Farm-to-Table Dining with Panoramic Views</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-8 text-center">
            Elevated Dining Experience
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Perched on the third floor of our Roman Bath Complex, The Pantheon Restaurant offers
            an unparalleled dining experience that marries neoclassical elegance with contemporary
            culinary artistry. Floor-to-ceiling windows provide sweeping views of our gardens,
            the pond, and the surrounding landscape.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our chef crafts seasonal menus using ingredients sourced from our on-site herb gardens,
            orchards, and local Michigan farms. Each dish celebrates the bounty of the region
            while honoring classical culinary techniques.
          </p>
        </div>
      </section>

      {/* Dining Experience */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                alt="Fine Dining Presentation"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Gourmet Cuisine
                </h3>
                <p className="text-gray-700">
                  Our seasonal tasting menus showcase Michigan's finest ingredients: Lake Michigan
                  fish, locally raised meats, heirloom vegetables, and herbs from our gardens.
                  Each course is paired with carefully selected wines.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1623800330578-2cd67efaec75"
                alt="Restaurant Interior"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Elegant Ambiance
                </h3>
                <p className="text-gray-700">
                  Dine beneath soaring ceilings adorned with classical details. Marble accents,
                  soft lighting, and neoclassical artwork create an atmosphere of refined elegance.
                  Perfect for romantic dinners and special celebrations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/32399759/pexels-photo-32399759.jpeg"
                alt="Upscale Dining"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Wine & Spirits
                </h3>
                <p className="text-gray-700">
                  Our sommelier has curated an extensive wine list featuring selections from
                  Michigan wineries, classic European vineyards, and New World favorites.
                  Craft cocktails inspired by classical Roman libations.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                alt="Chef's Special"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Private Dining
                </h3>
                <p className="text-gray-700">
                  Host intimate gatherings in our private dining room accommodating up to 12 guests.
                  Customized menus, dedicated service, and an exclusive wine selection make your
                  event unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-12 text-center">
            Sample Menu
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">Starters</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Garden Heirloom Tomato Salad</h4>
                    <span className="text-terracotta font-semibold">$18</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Fresh mozzarella, basil from our garden, aged balsamic, extra virgin olive oil
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Pan-Seared Lake Michigan Whitefish</h4>
                    <span className="text-terracotta font-semibold">$22</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Lemon herb butter, microgreens, crispy capers
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">Main Courses</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Herb-Crusted Michigan Lamb Chops</h4>
                    <span className="text-terracotta font-semibold">$48</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Rosemary-mint jus, roasted root vegetables, garlic mashed potatoes
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Wild Mushroom Risotto</h4>
                    <span className="text-terracotta font-semibold">$36</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Arborio rice, truffle oil, parmesan, fresh herbs from our garden
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Grilled Lake Michigan Salmon</h4>
                    <span className="text-terracotta font-semibold">$42</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Dill cream sauce, asparagus, lemon quinoa
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">Desserts</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Honey Lavender Crème Brûlée</h4>
                    <span className="text-terracotta font-semibold">$14</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Local honey, lavender from our gardens, fresh berries
                  </p>
                </div>
                <div className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-garden">Chocolate Terracotta Torte</h4>
                    <span className="text-terracotta font-semibold">$16</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Dark chocolate, raspberry coulis, vanilla bean gelato
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservations */}
      <section className="py-16 bg-gradient-to-br from-garden to-garden/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Reserve Your Table
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Open for dinner Wednesday through Sunday, 5:30 PM - 10:00 PM.
            Reservations recommended for all guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/booking"
              className="inline-block bg-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
            >
              Book Your Stay
            </a>
            <a
              href="/contact"
              className="inline-block bg-white text-garden px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
            >
              Contact for Reservations
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantPage;