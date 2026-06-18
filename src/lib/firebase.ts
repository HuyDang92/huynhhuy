import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeEhSf4DwThw4tOCjuznx-pku5MidzrW0",
  authDomain: "portfolio-b9f1e.firebaseapp.com",
  projectId: "portfolio-b9f1e",
  storageBucket: "portfolio-b9f1e.firebasestorage.app",
  messagingSenderId: "93327671968",
  appId: "1:93327671968:web:4c3bf27a1b6534e8b1bfc5",
  measurementId: "G-XRWYQKZ0PP",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
