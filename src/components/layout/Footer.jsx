// Footer - Stela Shop (multi-tenant)
import { Link, useParams } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useStore } from '../../contexts/StoreContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { slug } = useParams();
  const { store, getWhatsAppLink } = useStore();

  const basePath = slug ? `/${slug}` : '';
  const storeName = store?.nombreNegocio || store?.nombre || 'Tienda';

  const links = {
    shop: [
      { name: 'Catálogo', href: `${basePath}/catalogo` },
      { name: 'Ofertas', href: `${basePath}/catalogo?ofertas=true` },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Store info */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-white mb-3">{storeName}</h3>
            {store?.descripcion && (
              <p className="text-gray-400 mb-4">{store.descripcion}</p>
            )}
            
            {/* Social Links */}
            <div className="flex gap-3">
              {store?.instagram && (
                <a
                  href={store.instagram.startsWith('http') ? store.instagram : `https://instagram.com/${store.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              )}
              {store?.facebook && (
                <a
                  href={store.facebook.startsWith('http') ? store.facebook : `https://facebook.com/${store.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
              )}
              {store?.whatsapp && (
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Tienda</h4>
            <ul className="space-y-2">
              {links.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              {store?.email && (
                <li className="flex items-center gap-3">
                  <FaEnvelope className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <a href={`mailto:${store.email}`} className="text-gray-400 hover:text-white transition-colors">
                    {store.email}
                  </a>
                </li>
              )}
              {store?.whatsapp && (
                <li className="flex items-center gap-3">
                  <FaWhatsapp className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {store.whatsapp}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} {storeName}. Todos los derechos reservados.</p>
          <p className="mt-2">
            Potenciado por <a href="/" className="text-primary-400 hover:text-primary-300">Stela</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
