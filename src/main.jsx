// main.jsx - Stela Shop: Tienda en línea multi-tenant
import { StrictMode } from "react";
import PropTypes from 'prop-types';
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import { StoreProvider, useStore } from "./contexts/StoreContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initGA } from './analytics';

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useAutoUpdate } from "./hooks/useAutoUpdate";

// Pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import LandingPage from "./pages/LandingPage";

initGA(import.meta.env.VITE_GA_ID || "G-GEM1LZE0TF");

/* eslint-disable react-refresh/only-export-components */

// Wrapper para Catalog que usa location como key
const CatalogWrapper = () => {
  const location = useLocation();
  return <Catalog key={location.search} />;
};

// Layout con Header/Footer dinámico por tienda
const Layout = ({ children }) => {
  useAutoUpdate();

  return (
    <>
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

// Wrapper que extrae el slug de la URL y setea los providers
const StoreWrapper = ({ children }) => {
  const { slug } = useParams();
  return (
    <StoreProvider slug={slug}>
      <StoreGuard>
        <ProductsProvider>
          <Layout>{children}</Layout>
        </ProductsProvider>
      </StoreGuard>
    </StoreProvider>
  );
};

// Bloquea el acceso a la tienda si el dueño no tiene plan Business activo
const StoreGuard = ({ children }) => {
  const { storeInactive, store, loading } = useStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando tienda...</p>
        </div>
      </div>
    );
  }

  if (storeInactive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
        <div className="text-center max-w-md">
          {store?.logo && (
            <img
              src={store.logo}
              alt={store?.nombreNegocio || 'Tienda'}
              className="h-20 w-20 object-contain mx-auto mb-6 rounded-xl shadow-sm"
            />
          )}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className="font-bold text-2xl text-gray-900 mb-2">
            {store?.nombreNegocio || 'Esta tienda'}
          </h1>
          <p className="text-gray-500 text-base mb-8">
            Esta tienda en línea no está disponible en este momento.
          </p>
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return children;
};

StoreGuard.propTypes = {
  children: PropTypes.node,
};

StoreWrapper.propTypes = {
  children: PropTypes.node,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing page: explica qué es Stela */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas de tienda: /:slug */}
        <Route path="/:slug" element={<StoreWrapper><Home /></StoreWrapper>} />
        <Route path="/:slug/catalogo" element={<StoreWrapper><CatalogWrapper /></StoreWrapper>} />
        <Route path="/:slug/producto/:productId" element={<StoreWrapper><ProductDetail /></StoreWrapper>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
