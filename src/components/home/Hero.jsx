// Hero section - Stela Shop (multi-tenant)
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { useStore } from '../../contexts/StoreContext';
import { useProducts } from '../../contexts/ProductsContext';
import Button from '../ui/Button';

const Hero = () => {
  const { slug } = useParams();
  const { store, getWhatsAppLink } = useStore();
  const { products } = useProducts();

  const storeName = store?.nombreNegocio || store?.nombre || 'Tienda';
  const basePath = slug ? `/${slug}` : '';
  const productCount = products?.length || 0;

  // Get a product image for the hero if available
  const heroImage = products?.[0]?.variants?.[0]?.imageUrls?.[0] || null;

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-secondary-300 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Bienvenido a
              <span className="block text-primary-600">{storeName}</span>
            </motion.h1>

            {store?.descripcion && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0"
              >
                {store.descripcion}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                as={Link}
                to={`${basePath}/catalogo`}
                variant="primary"
                size="lg"
                icon={<FaArrowRight />}
                iconPosition="right"
              >
                Ver Catálogo
              </Button>
              {store?.whatsapp && (
                <Button
                  as="a"
                  href={getWhatsAppLink('Hola, vi tu catálogo y me gustaría más información')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  icon={<FaWhatsapp />}
                  iconPosition="left"
                >
                  Contáctanos
                </Button>
              )}
            </motion.div>

            {/* Stats */}
            {productCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center gap-8 justify-center lg:justify-start pt-4"
              >
                <div>
                  <p className="text-3xl font-bold text-gray-900">{productCount}</p>
                  <p className="text-sm text-gray-600">Productos</p>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">Pedidos directos</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Product image showcase */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative z-10"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-large">
                  <img
                    src={heroImage}
                    alt={`Productos de ${storeName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Second product image floating */}
              {products?.[1]?.variants?.[0]?.imageUrls?.[0] && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute -bottom-8 -left-8 w-48 h-48"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-large">
                    <img
                      src={products[1].variants[0].imageUrls[0]}
                      alt="Producto destacado"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
