import { useState } from "react";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1676517243531-69e3b27276e9",
      title: "Neoclassical Architecture",
      category: "Architecture",
    },
    {
      url: "https://images.unsplash.com/photo-1676517201570-beb8e2f36ede",
      title: "Classical Columns",
      category: "Architecture",
    },
    {
      url: "https://images.pexels.com/photos/34489249/pexels-photo-34489249.jpeg",
      title: "Marble Details",
      category: "Architecture",
    },
    {
      url: "https://images.unsplash.com/photo-1551918120-9739cb430c6d",
      title: "Infinity Pool",
      category: "Wellness",
    },
    {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
      title: "Resort Pool",
      category: "Wellness",
    },
    {
      url: "https://images.unsplash.com/photo-1554424518-336ec861b705",
      title: "Spa Setting",
      category: "Wellness",
    },
    {
      url: "https://images.unsplash.com/photo-1689582915840-8046c641064c",
      title: "Garden Pathway",
      category: "Gardens",
    },
    {
      url: "https://images.unsplash.com/photo-1715633742857-767015a0925c",
      title: "Tree-Lined Path",
      category: "Gardens",
    },
    {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
      title: "Luxury Villa with Pool",
      category: "Villas",
    },
    {
      url: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5",
      title: "Secluded Villa",
      category: "Villas",
    },
    {
      url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
      title: "Fine Dining",
      category: "Dining",
    },
    {
      url: "https://images.unsplash.com/photo-1694021408920-922ff450c525",
      title: "Elegant Ambiance",
      category: "Dining",
    },
  ];

  return (
    <div className="gallery-page pt-20" data-testid="gallery-page">
      {/* Hero */}
      <section className="bg-gradient-to-br from-garden/5 to-terracotta/5 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-garden mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Explore the timeless beauty of Apollo's Hideaway
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-item relative overflow-hidden rounded-lg shadow-lg group"
                onClick={() => setSelectedImage(image)}
                data-testid={`gallery-item-${index}`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="text-sm font-medium text-gold">{image.category}</p>
                    <h3 className="font-display text-lg font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          data-testid="lightbox"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-terracotta"
              onClick={() => setSelectedImage(null)}
              data-testid="lightbox-close"
            >
              ×
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <p className="text-sm text-gold">{selectedImage.category}</p>
              <h3 className="font-display text-2xl font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;