// Sección de categorías destacadas
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { CATEGORIAS_COMERCIALES } from '../../data/categorias';
import { useProducts } from '../../contexts/ProductsContext';
import { useMemo } from 'react';

const FeaturedCategories = () => {
  const { products = [], loading } = useProducts();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Obtener la primera imagen de producto para cada categoría comercial
  const categoriasConImagen = useMemo(() => {
    if (loading && products.length === 0) return [];

    return CATEGORIAS_COMERCIALES.map(cat => {
      // Buscar el primer producto que pertenezca a alguna de las categorías técnicas
      // Hacemos el match más flexible para asegurar que encuentre algo
      const primerProducto = products.find(p => {
        const pCat = (p.categoria || "").toUpperCase();
        const pSub = (p.subcategoria || "").toUpperCase();
        
        return cat.categoriasTecnicas.some(ct => 
          pCat.includes(ct) || 
          pSub.includes(ct) ||
          p.categoriaID === ct
        ) || pCat.includes(cat.nombre.toUpperCase());
      });

      // Si no hay producto, usamos la imagen por defecto del objeto de categoría
      return {
        ...cat,
        imagenDinamica: primerProducto?.imagen || primerProducto?.imagenes?.[0] || cat.imagen,
        tieneProductos: !!primerProducto
      };
    }).filter(cat => cat.tieneProductos || products.length === 0); // Si no hay productos aún, mostramos todas (fallback)
  }, [products, loading]);

  if (categoriasConImagen.length === 0 && !loading) return null;

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explora por Categoría
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra el estilo perfecto para cada ocasión
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categoriasConImagen.slice(0, 8).map((categoria, index) => (
            <motion.div
              key={categoria.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/catalogo?categoria=${categoria.id}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-large transition-shadow duration-300"
                >
                  {/* Imagen de categoría */}
                  <img
                    src={categoria.imagenDinamica}
                    alt={categoria.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Nombre de categoría */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white">
                      {categoria.nombre}
                    </h3>
                  </div>

                  {/* Icono de flecha en hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
