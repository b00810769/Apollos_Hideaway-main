import React from "react";

const NearbyAttractionsPage = () => {
  const attractions = [
    {
      name: "New Buffalo Beach",
      description: "Beautiful sandy beaches on Lake Michigan, perfect for swimming, sunbathing, and sunset walks. Just minutes from the resort.",
      category: "Beach",
      distance: "5 min drive",
      image: "https://images.unsplash.com/photo-1713108854702-458a21d3737e"
    },
    {
      name: "Indiana Dunes National Park",
      description: "15 miles of pristine Lake Michigan shoreline with towering sand dunes, hiking trails, and diverse ecosystems.",
      category: "Nature",
      distance: "25 min drive",
      image: "https://images.unsplash.com/photo-1657653038900-ec2fda7affcd"
    },
    {
      name: "Warren Dunes State Park",
      description: "Michigan's premier dune park featuring 260-foot sand dunes, hiking trails, and beautiful beaches.",
      category: "Nature",
      distance: "15 min drive",
      image: "https://images.pexels.com/photos/2775230/pexels-photo-2775230.jpeg"
    },
    {
      name: "Four Winds Casino",
      description: "Luxury gaming resort with slots, table games, entertainment, and fine dining options.",
      category: "Entertainment",
      distance: "10 min drive",
      image: "https://images.unsplash.com/photo-1616499062101-3a7e34488ae3"
    },
    {
      name: "Galien River County Park",
      description: "Scenic park featuring boardwalks, treetop walks, and beautiful views of the Galien River and surrounding wetlands.",
      category: "Nature",
      distance: "12 min drive",
      image: "https://images.unsplash.com/photo-1707016522022-a93dfc5a411b"
    },
    {
      name: "Local Wineries",
      description: "Explore Southwest Michigan's wine country with over a dozen wineries offering tastings and tours.",
      category: "Wine & Dining",
      distance: "15-30 min drive",
      image: "https://images.unsplash.com/photo-1707016522558-498a3dc5057e"
    }
  ];

  const categories = ["All", "Beach", "Nature", "Entertainment", "Wine & Dining"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredAttractions = selectedCategory === "All" 
    ? attractions 
    : attractions.filter(a => a.category === selectedCategory);

  return (
    <div className="attractions-page pt-20" data-testid="attractions-page">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1713108854702-458a21d3737e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
            Nearby Attractions
          </h1>
          <p className="text-xl">Discover the Beauty of New Buffalo & Beyond</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold text-garden mb-6">
            Explore Southwest Michigan
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            While Apollo's Hideaway offers everything you need for a perfect retreat, the New Buffalo
            area is rich with attractions. From pristine Lake Michigan beaches to towering sand dunes,
            world-class wineries to exciting entertainment, your adventure extends beyond our gates.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? "bg-terracotta text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map((attraction, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                data-testid={`attraction-${index}`}
              >
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-terracotta/10 text-terracotta px-3 py-1 rounded-full font-semibold">
                      {attraction.category}
                    </span>
                    <span className="text-sm text-gray-500">{attraction.distance}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-garden mb-2">
                    {attraction.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-gradient-to-br from-garden/5 to-terracotta/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-8 text-center">
            Convenient Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                From Major Cities
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Chicago, IL</span>
                  <span className="font-semibold">2 hours</span>
                </li>
                <li className="flex justify-between">
                  <span>Milwaukee, WI</span>
                  <span className="font-semibold">2 hours</span>
                </li>
                <li className="flex justify-between">
                  <span>Grand Rapids, MI</span>
                  <span className="font-semibold">2.5 hours</span>
                </li>
                <li className="flex justify-between">
                  <span>Indianapolis, IN</span>
                  <span className="font-semibold">3 hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                Getting Here
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>By Car:</strong> Easily accessible via I-94
                </li>
                <li>
                  <strong>By Train:</strong> Amtrak serves New Buffalo
                </li>
                <li>
                  <strong>Airports:</strong> Chicago O'Hare (90 min), Midway (90 min), South Bend (45 min)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-garden text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Plan Your Perfect Getaway
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay at Apollo's Hideaway and explore everything New Buffalo has to offer.
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

export default NearbyAttractionsPage;