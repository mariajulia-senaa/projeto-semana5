import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYE4tSd4Py5A3fZ4p7qA1e80QDi2RQf48",
  authDomain: "mariajuliasena.firebaseapp.com",
  projectId: "mariajuliasena",
  storageBucket: "mariajuliasena.firebasestorage.app",
  messagingSenderId: "556857144724",
  appId: "1:556857144724:web:a702c5147f736a81a10b81",
  measurementId: "G-T333QRJKE0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}