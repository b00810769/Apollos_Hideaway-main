const AboutPage = () => {
  return (
    <div className="about-page pt-20" data-testid="about-page">
      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1676517201570-beb8e2f36ede')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">
            About Apollo's Hideaway
          </h1>
          <p className="text-xl">Where Ancient Wisdom Meets Modern Luxury</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Nestled in the scenic beauty of New Buffalo, Michigan, Apollo's Hideaway is more than
              a resort—it's a sanctuary where time slows down and connections deepen. Just two hours
              from the bustling cities of Chicago and Milwaukee, our retreat offers an intimate escape
              for couples seeking to reconnect without the need for long-distance travel.
            </p>
            <p>
              Inspired by the timeless elegance of neoclassical architecture and the rejuvenating
              traditions of ancient Roman baths, Apollo's Hideaway is designed to engage all your senses.
              From the moment you arrive, you'll be enveloped by marble columns, terracotta tiles,
              lush gardens, and the soothing sound of water from our reflecting pools.
            </p>
            <p>
              Our vision is simple: to create a space where luxury meets wellness, where nature embraces
              architecture, and where every detail is crafted to help you disconnect from daily stress
              and reconnect with what matters most—your partner and yourself.
            </p>
          </div>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl font-bold text-garden mb-12 text-center">
            The Apollo's Hideaway Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                Secluded Villas
              </h3>
              <p className="text-gray-700 mb-6">
                Our 10 luxury villas are thoughtfully positioned around a serene pond, each hidden
                by lush greenery to ensure complete privacy. Connected by winding garden pathways,
                each villa is a sanctuary unto itself, featuring neoclassical design elements and
                modern comforts.
              </p>
              <img
                src="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5"
                alt="Secluded Villa"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                Roman Bath Wellness Complex
              </h3>
              <p className="text-gray-700 mb-6">
                At the heart of Apollo's Hideaway lies our Roman-inspired wellness facility. Experience
                the ancient ritual of thermae with steam rooms, saunas, hot tubs at various temperatures,
                invigorating cold plunges, and tranquil massage rooms—all designed to purify, rejuvenate,
                and restore.
              </p>
              <img
                src="https://images.unsplash.com/photo-1554424518-336ec861b705"
                alt="Wellness Facility"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                Gardens & Nature
              </h3>
              <p className="text-gray-700 mb-6">
                Wander through meticulously designed gardens featuring reflecting pools, herb gardens,
                orchards, and butterfly pavilions. Each pathway is an invitation to slow down, breathe
                deeply, and immerse yourself in the beauty of nature.
              </p>
              <img
                src="https://images.unsplash.com/photo-1689582915840-8046c641064c"
                alt="Garden Pathways"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-terracotta mb-4">
                Fine Dining
              </h3>
              <p className="text-gray-700 mb-6">
                Savor farm-to-table cuisine crafted from local ingredients and herbs from our own gardens.
                Our dining experience celebrates the flavors of the region while honoring the artistry
                of culinary tradition.
              </p>
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                alt="Fine Dining"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-display text-4xl font-bold text-garden mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🕊️</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Tranquility</h3>
              <p className="text-gray-600 text-sm">
                Creating spaces of peace where the mind can rest and the soul can breathe.
              </p>
            </div>

            <div>
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Connection</h3>
              <p className="text-gray-600 text-sm">
                Fostering deep connections—with your partner, with nature, and with yourself.
              </p>
            </div>

            <div>
              <div className="bg-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-garden mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Delivering uncompromising luxury and attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;