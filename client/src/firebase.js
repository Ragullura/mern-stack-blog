// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-91757.firebaseapp.com",
  projectId: "mern-blog-91757",
  storageBucket: "mern-blog-91757.appspot.com",
  messagingSenderId: "518660198932",
  appId: "1:518660198932:web:439b1beae7ca34f8a7cd01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
