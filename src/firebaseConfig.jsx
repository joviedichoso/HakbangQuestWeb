// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1hGesP_WHPzBHgtU_-T2__IdKaqfQ0NQ",
  authDomain: "hakbangquest-c6093.firebaseapp.com",
  databaseURL: "https://hakbangquest-c6093-default-rtdb.firebaseio.com",
  projectId: "hakbangquest-c6093",
  storageBucket: "hakbangquest-c6093.firebasestorage.app",
  messagingSenderId: "233499329364",
  appId: "1:233499329364:web:71446aba85e1d312e67ec1",
  measurementId: "G-V49D5CCZQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Analytics (optional – works only in browsers with HTTPS)
export const analytics = getAnalytics(app);
