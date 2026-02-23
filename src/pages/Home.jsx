// Página principal/Home - Stela Shop (multi-tenant)
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useStore } from '../contexts/StoreContext';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const Home = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { store, loading, error, getWhatsAppLink } = useStore();
  const { slug } = useParams();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando tienda...</p>
        </div>
      </div>
    );
  }

  // Error state (store not found)
  if (error || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md px-4">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Tienda no encontrada</h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar la tienda &quot;{slug}&quot;. Verifica que el enlace sea correcto.
          </p>
          <Link to="/" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  const basePath = `/${slug}`;

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />

      {/* CTA Section */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-16 bg-gradient-to-br from-primary-500 to-secondary-500"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Te interesa algo?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explora nuestro catálogo completo o contáctanos por WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={`${basePath}/catalogo`}
                className="inline-block px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-2xl shadow-large hover:shadow-xl transition-shadow"
              >
                Ver Catálogo
              </Link>
            </motion.div>
            {store.whatsapp && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={getWhatsAppLink('Hola, vi tu catálogo y me gustaría más información')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold text-lg rounded-2xl shadow-large hover:bg-green-600 hover:shadow-xl transition-all"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  WhatsApp
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: '💬', title: 'Pedido Directo', desc: 'Por WhatsApp' },
              { icon: '🛡️', title: 'Confianza', desc: 'Trato personal' },
              { icon: '📦', title: 'Catálogo', desc: 'Siempre actualizado' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      {store.whatsapp && (
        <a
          href={getWhatsAppLink('Hola, vi tu catálogo y tengo una pregunta')}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 hover:bg-green-600 transition-all"
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      )}
    </div>
  );
};

export default Home;
