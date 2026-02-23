// Header principal - Stela Shop (multi-tenant)
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { useStore } from '../../contexts/StoreContext';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { slug } = useParams();
  const navigate = useNavigate();
  const { store, getWhatsAppLink } = useStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && slug) {
      navigate(`/${slug}/catalogo?busqueda=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const basePath = slug ? `/${slug}` : '';
  const storeName = store?.nombreNegocio || store?.nombre || 'Tienda';

  const navigation = [
    { name: 'Inicio', href: `${basePath}` },
    { name: 'Catálogo', href: `${basePath}/catalogo` },
    { name: 'Ofertas', href: `${basePath}/catalogo?ofertas=true` },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Store Name */}
            <Link to={basePath || '/'} className="flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
                {store?.logo ? (
                  <img src={store.logo} alt={storeName} className="h-10 md:h-12 w-auto" />
                ) : (
                  <h1 className="font-playfair text-xl md:text-2xl font-bold text-gray-900">
                    {storeName}
                  </h1>
                )}
              </motion.div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FaSearch className="w-5 h-5" />
              </motion.button>

              {store?.whatsapp && (
                <a
                  href={getWhatsAppLink('Hola, vi tu catálogo y me gustaría más información')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Contactar</span>
                </a>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-3">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSearchOpen(true)} className="text-gray-700">
                <FaSearch className="w-5 h-5" />
              </motion.button>
              {store?.whatsapp && (
                <a
                  href={getWhatsAppLink('Hola, vi tu catálogo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700"
              >
                {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-large z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-playfair font-bold text-gray-900">{storeName}</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
                {store?.whatsapp && (
                  <div className="p-6 border-t">
                    <a
                      href={getWhatsAppLink('Hola, vi tu catálogo y me gustaría más información')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50"
            >
              <div className="bg-white rounded-3xl shadow-large p-6">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar productos..."
                      autoFocus
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center">Presiona Enter para buscar</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
