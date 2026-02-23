// Sección de categorías - muestra las categorías con productos disponibles
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useProducts } from '../../contexts/ProductsContext';
import { getNombreCategoriaTecnica } from '../../data/categorias';

const FeaturedCategories = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { products } = useProducts();
  const { slug } = useParams();

  const basePath = slug ? `/${slug}` : '';

  // Extract unique categories from actual products
  const categories = useMemo(() => {
    const catMap = {};
    (products || []).forEach(p => {
      const cat = p.category;
      if (!cat) return;
      if (!catMap[cat]) {
        catMap[cat] = {
          id: cat,
          nombre: getNombreCategoriaTecnica(cat),
          count: 0,
          image: null,
        };
      }
      catMap[cat].count++;
      // Use the first product's first image as category image
      if (!catMap[cat].image) {
        catMap[cat].image = p.variants?.[0]?.imageUrls?.[0] || null;
      }
    });
    return Object.values(catMap).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [products]);

  if (categories.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explora por Categoría
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra lo que buscas
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <Link to={`${basePath}/catalogo?categoria=${cat.id}`}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-300"
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="font-playfair text-lg md:text-xl font-bold text-white">
                      {cat.nombre}
                    </h3>
                    <p className="text-white/70 text-xs mt-1">{cat.count} productos</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
