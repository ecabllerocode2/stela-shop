// Sección de productos destacados
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useProducts } from '../../contexts/ProductsContext';
import ProductCard from '../product/ProductCard';
import { ProductGridSkeleton } from '../ui/Skeleton';
import Button from '../ui/Button';
import { FaArrowRight } from 'react-icons/fa';

const FeaturedProducts = ({ title = 'Productos Destacados', limit = 8 }) => {
  const { products, loading } = useProducts();
  const { slug } = useParams();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const basePath = slug ? `/${slug}` : '';
  const featuredProducts = products.slice(0, limit);

  if (!loading && featuredProducts.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestra selección especial para ti
          </p>
        </motion.div>

        {loading ? (
          <ProductGridSkeleton count={limit} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            as={Link}
            to={`${basePath}/catalogo`}
            variant="outline"
            size="lg"
            icon={<FaArrowRight />}
            iconPosition="right"
          >
            Ver Todo el Catálogo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
