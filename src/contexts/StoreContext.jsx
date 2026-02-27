/* eslint-disable react-refresh/only-export-components */
/**
 * StoreContext - Multi-tenant store context
 * 
 * Loads the store owner's profile based on the URL slug.
 * Each Stela Business user has a unique slug (e.g., /modas-lupita).
 * This context provides the store owner's info (name, whatsapp, logo, etc.)
 * to all child components.
 * 
 * Data flow:
 *   1. URL slug → lookup in Firestore 'users' collection (field: slug)
 *   2. Found user → provide userId, store name, whatsapp, etc.
 *   3. ProductsContext uses this userId to filter productos_public
 */

import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../credenciales';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const StoreContext = createContext();

export const StoreProvider = ({ slug, children }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storeInactive, setStoreInactive] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('No se proporcionó una tienda');
      return;
    }

    const loadStore = async () => {
      setLoading(true);
      setError(null);
      setStoreInactive(false);

      try {
        // Buscar usuario por slug en la colección 'users'
        const q = query(
          collection(db, 'users'),
          where('slug', '==', slug.toLowerCase()),
          limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError('Tienda no encontrada');
          setLoading(false);
          return;
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Verificar si la tienda está activa (requiere plan Business o trial activo)
        let tiendaActiva = userData.tiendaActiva === true;

        // Si tiendaActiva no está marcada por webhook, verificar trial local vigente
        if (!tiendaActiva && userData.trialEndsAt) {
          const trialEnd = userData.trialEndsAt?.toDate
            ? userData.trialEndsAt.toDate()
            : new Date(userData.trialEndsAt);
          tiendaActiva = new Date() < trialEnd;
        }

        if (!tiendaActiva) {
          setStoreInactive(true);
          setStore({
            nombreNegocio: userData.nombreNegocio || userData.nombre || '',
            logo: userData.logo || null,
          });
          setLoading(false);
          return;
        }

        setStore({
          userId: userDoc.id,
          nombre: userData.nombre || '',
          nombreNegocio: userData.nombreNegocio || userData.nombre || '',
          slug: userData.slug,
          telefono: userData.telefono || '',
          whatsapp: userData.whatsapp || userData.telefono || '',
          email: userData.email || '',
          logo: userData.logo || null,
          descripcion: userData.descripcionTienda || '',
          instagram: userData.instagram || '',
          facebook: userData.facebook || '',
          direccion: userData.direccion || '',
          // Tema personalizable (futuro)
          colorPrimario: userData.colorPrimario || '#d88c6d',
          colorSecundario: userData.colorSecundario || '#f6d28c',
        });
      } catch (err) {
        console.error('Error cargando tienda:', err);
        setError('Error al cargar la tienda');
      } finally {
        setLoading(false);
      }
    };

    loadStore();
  }, [slug]);

  /**
   * Genera un link de WhatsApp con mensaje pre-llenado
   */
  const getWhatsAppLink = (message = '') => {
    if (!store?.whatsapp) return '#';
    // Limpiar número: quitar espacios, guiones, paréntesis
    const cleanNumber = store.whatsapp.replace(/[\s\-()]/g, '');
    // Si ya tiene código de país, usarlo; si no, agregar +52
    const fullNumber = cleanNumber.startsWith('+') 
      ? cleanNumber.replace('+', '') 
      : cleanNumber.startsWith('52') 
        ? cleanNumber 
        : `52${cleanNumber}`;
    
    const encodedMsg = encodeURIComponent(message);
    return `https://wa.me/${fullNumber}${message ? `?text=${encodedMsg}` : ''}`;
  };

  const value = {
    store,
    loading,
    error,
    storeInactive,
    getWhatsAppLink,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  slug: PropTypes.string,
  children: PropTypes.node,
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore debe usarse dentro de StoreProvider');
  return ctx;
};
