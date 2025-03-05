// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYzmgnDpg0WD0-sXE9xgv32W9ji0F5hf8",
  authDomain: "kid-video-app.firebaseapp.com",
  projectId: "kid-video-app",
  storageBucket: "kid-video-app.firebasestorage.app",
  messagingSenderId: "555045661496",
  appId: "1:555045661496:web:31eeb725b585c3a18aefcd",
  measurementId: "G-1R6ZYN02T3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
