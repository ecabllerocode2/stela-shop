// src/components/home/TestimonialsFeed.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const testimonials = [
  { id: 1, src: '/testimonios/IMG_20260313_103037.jpg' },
  { id: 2, src: '/testimonios/IMG_20260313_103059.jpg' },
  { id: 3, src: '/testimonios/IMG_20260313_103126.jpg' },
  { id: 4, src: '/testimonios/IMG_20260313_103212.jpg' },
  { id: 5, src: '/testimonios/IMG_20260313_103231.jpg' },
  { id: 6, src: '/testimonios/Screenshot_2026-03-13-10-18-23-26_a23b203fd3aafc6dcb84e438dda678b6.jpg' },
];

const TestimonialsFeed = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const whatsappNumber = "5215578505562"; // Assuming this is the number based on typical context or placeholder
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola,%20tengo%20dudas%20sobre%20mi%20pedido`;

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clientas Felices
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nuestra mayor satisfacción es verlas felices con sus pedidos.
          </p>
        </div>

        {/* Masonry-like Feed (Pinterest Style) */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {testimonials.map((testimonio) => (
            <motion.div
              key={testimonio.id}
              whileHover={{ scale: 1.02 }}
              className="relative break-inside-avoid overflow-hidden rounded-xl shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(testimonio.src)}
            >
              <img
                src={testimonio.src}
                alt={`Testimonio ${testimonio.id}`}
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  Ampliar
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Floating Button - Fixed to corner and with label always above */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg text-[10px] sm:text-xs font-bold text-gray-800 border border-gray-100 transition-all duration-300 group-hover:scale-105">
            ¿Tienes dudas? Chatea con nosotras
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-all hover:scale-110 active:scale-95"
            aria-label="Chatear por WhatsApp"
          >
            <FaWhatsapp className="text-3xl" />
          </a>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={selectedImage}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
};

export default TestimonialsFeed;
