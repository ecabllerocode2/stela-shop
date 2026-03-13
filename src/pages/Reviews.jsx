// src/pages/Reviews.jsx
import { motion } from 'framer-motion';
import { FaShieldAlt, FaTruck, FaRegCheckCircle, FaWhatsapp } from 'react-icons/fa';
import TestimonialsFeed from '../components/home/TestimonialsFeed';

const Reviews = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-primary-500 text-4xl mb-4" />,
      title: "Compra Segura",
      description: "Tus datos y transacciones están protegidos. Somos una marca confiable con miles de entregas exitosas."
    },
    {
      icon: <FaTruck className="text-secondary-500 text-4xl mb-4" />,
      title: "Envíos Garantizados",
      description: "Llegamos a todo México. Al enviar tu paquete, te proporcionamos una guía de seguimiento para tu tranquilidad."
    },
    {
      icon: <FaRegCheckCircle className="text-pink-500 text-4xl mb-4" />,
      title: "Calidad Premium",
      description: "Cada pieza es revisada meticulosamente antes de ser enviada para asegurar que llegue en perfectas condiciones."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Validation Info */}
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            ¿Por qué confiar en Malim?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto mb-12"
          >
            Entendemos que comprar en línea puede dar miedo. Pero no te preocupes, ¡tenemos el respaldo de miles de clientas satisfechas!
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Feed */}
        <div className="mt-12 bg-[#fff5f5] rounded-3xl p-4 md:p-8">
          <TestimonialsFeed />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
