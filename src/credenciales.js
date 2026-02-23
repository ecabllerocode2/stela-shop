// credenciales.js - Stela Shop (conectado a proyecto stela-a8c06)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase - Proyecto Stela
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyDYJbwJgqTFBdToJIkhMRbwbI0x88QiCwI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "stela-a8c06.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "stela-a8c06",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "stela-a8c06.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "844317368141",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:844317368141:web:d4f862c7a7ee32859f6104",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-GEM1LZE0TF"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Analytics (solo si window existe)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Backend API
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://stela-backend.vercel.app';

// Exporta instancias
export { db, analytics };
