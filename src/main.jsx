// main.jsx - Stela Shop: Tienda en línea multi-tenant
import { StrictMode } from "react";
import PropTypes from 'prop-types';
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation, useParams } from "react-router-dom";
import { StoreProvider } from "./contexts/StoreContext";
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
      <ProductsProvider>
        <Layout>{children}</Layout>
      </ProductsProvider>
    </StoreProvider>
  );
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
