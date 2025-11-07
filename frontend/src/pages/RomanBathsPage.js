const RomanBathsPage = () => {
  return (
    <div className="roman-baths-page pt-20" data-testid="roman-baths-page">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1691419676846-0573a5a7fde3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
            Roman Bath Complex
          </h1>
          <p className="text-xl">Ancient Wellness Traditions Meet Modern Luxury</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-8 text-center">
            Experience the Thermae
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At the heart of Apollo's Hideaway lies our magnificent Roman Bath Complex—a faithful
            recreation of ancient thermae enhanced with modern amenities. This three-story structure
            serves as the wellness and social center of the resort, featuring our spa facilities
            on the ground floor, additional treatment rooms on the second floor, and our fine
            dining restaurant on the third floor with panoramic views.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Follow the ancient ritual: begin with the tepidarium (warm room), move to the caldarium
            (hot bath), invigorate in the frigidarium (cold plunge), and conclude with rest and
            massage. Each space is adorned with classical columns, marble surfaces, tile mosaics,
            and period-appropriate sculptures.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-bold text-garden mb-12 text-center">
            Wellness Amenities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Ancient Roman Baths */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1691419676846-0573a5a7fde3"
                alt="Roman Thermal Bath"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Thermal Baths
                </h3>
                <p className="text-gray-700 mb-4">
                  Our centerpiece: an authentic Roman-style thermal pool with columns and arches,
                  heated to the perfect temperature. The green thermal waters are rich in minerals,
                  promoting relaxation and healing.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Heated mineral pool (98-102°F)</li>
                  <li>• Classical marble columns</li>
                  <li>• Authentic period architecture</li>
                  <li>• Natural thermal properties</li>
                </ul>
              </div>
            </div>

            {/* Caldarium */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1691419676878-c97c88a7b61f"
                alt="Roman Bath Complex"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Caldarium (Hot Room)
                </h3>
                <p className="text-gray-700 mb-4">
                  Experience the warmth of the caldarium with hot tubs at various temperatures
                  (98°F, 102°F, 104°F). Classical architecture surrounds you as you soak and
                  unwind.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Three temperature zones</li>
                  <li>• Marble seating and surrounds</li>
                  <li>• Mosaic tile details</li>
                  <li>• Ambient classical music</li>
                </ul>
              </div>
            </div>

            {/* Steam Room */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1761470575018-135c213340eb"
                alt="Steam Room"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Laconicum (Steam Room)
                </h3>
                <p className="text-gray-700 mb-4">
                  Our modern steam room features ambient lighting, eucalyptus-infused steam,
                  and heated stone benches. Purify your skin and respiratory system in comfort.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Eucalyptus aromatherapy</li>
                  <li>• Heated stone seating</li>
                  <li>• Color therapy lighting</li>
                  <li>• Temperature: 110-115°F</li>
                </ul>
              </div>
            </div>

            {/* Sauna */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/34479205/pexels-photo-34479205.png"
                alt="Luxury Sauna"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Dry Sauna
                </h3>
                <p className="text-gray-700 mb-4">
                  Traditional Finnish-style dry sauna with cedarwood construction. Detoxify
                  and improve circulation in the dry heat.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Premium cedarwood interior</li>
                  <li>• Electric heating with controls</li>
                  <li>• Multi-level bench seating</li>
                  <li>• Temperature: 170-190°F</li>
                </ul>
              </div>
            </div>

            {/* Cold Plunge */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1554424518-336ec861b705"
                alt="Cold Plunge Pool"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Frigidarium (Cold Plunge)
                </h3>
                <p className="text-gray-700 mb-4">
                  Complete your thermal circuit with our invigorating cold plunge pool.
                  Stimulate circulation, reduce inflammation, and energize your body.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Temperature: 50-55°F</li>
                  <li>• Filtered and treated water</li>
                  <li>• Stone and marble surround</li>
                  <li>• Classical sculpture accents</li>
                </ul>
              </div>
            </div>

            {/* Massage & Treatments */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1554424518-336ec861b705"
                alt="Treatment Rooms"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-garden mb-3">
                  Massage & Treatment Rooms
                </h3>
                <p className="text-gray-700 mb-4">
                  Six private treatment rooms on the ground and second floors offer a full
                  menu of massage, body treatments, and wellness therapies.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Swedish & deep tissue massage</li>
                  <li>• Hot stone therapy</li>
                  <li>• Couples massage suites</li>
                  <li>• Body scrubs and wraps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-12 text-center">
            Classical Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-terracotta/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🏛️</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Columns & Arches</h3>
              <p className="text-gray-600 text-sm">
                Authentic Corinthian and Ionic columns throughout, with classical arches framing
                each space.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-terracotta/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Tile Mosaics</h3>
              <p className="text-gray-600 text-sm">
                Hand-laid mosaic tile work depicting classical scenes, geometric patterns, and
                nature motifs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-terracotta/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🗿</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Sculptures & Busts</h3>
              <p className="text-gray-600 text-sm">
                Classical marble sculptures and busts of Roman deities adorn the spaces,
                creating an authentic atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-garden to-garden/80 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Experience Ancient Wellness
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay and immerse yourself in the timeless ritual of the Roman thermae.
          </p>
          <a
            href="/booking"
            className="inline-block bg-terracotta text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 shadow-lg"
          >
            Reserve Your Villa
          </a>
        </div>
      </section>
    </div>
  );
};

export default RomanBathsPage;