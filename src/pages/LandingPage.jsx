// Página de aterrizaje cuando se accede sin slug de tienda
import { motion } from 'framer-motion';
import { FaStore, FaWhatsapp, FaMobileAlt, FaRocket } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Header simple */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-playfair text-2xl font-bold text-primary-600">Stela</h1>
            <a
              href="https://stela-admin.vercel.app"
              className="px-6 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Tu catálogo digital
            <span className="block text-primary-600">en minutos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Stela te permite crear tu tienda en línea profesional. 
            Tus clientes ven tu catálogo y te contactan directo por WhatsApp.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="https://stela-admin.vercel.app"
            className="inline-block px-10 py-4 bg-primary-600 text-white font-bold text-lg rounded-2xl shadow-large hover:bg-primary-700 hover:shadow-xl transition-all"
          >
            Crear mi tienda gratis
          </motion.a>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-center font-playfair text-3xl font-bold text-gray-900 mb-12">
            Todo lo que necesitas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <FaStore className="w-8 h-8" />,
                title: 'Tu propia tienda',
                desc: 'Un link único para compartir con tus clientes',
              },
              {
                icon: <FaWhatsapp className="w-8 h-8" />,
                title: 'Pedidos por WhatsApp',
                desc: 'Tus clientes te contactan directo sin intermediarios',
              },
              {
                icon: <FaMobileAlt className="w-8 h-8" />,
                title: 'Diseño responsive',
                desc: 'Se ve increíble en celular, tablet y computadora',
              },
              {
                icon: <FaRocket className="w-8 h-8" />,
                title: 'Sin comisiones',
                desc: 'Cobra directo. Sin porcentaje sobre tus ventas',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Stela. Todos los derechos reservados.</p>
        <p className="mt-1">Potenciado por Stela &mdash; Tu negocio, tu catálogo, tus reglas.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
