// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLlVkuqPNZuNKcQQp7DdNHD_csIPwlEY8",
  authDomain: "react-wildlife-safaris-rusho.firebaseapp.com",
  projectId: "react-wildlife-safaris-rusho",
  storageBucket: "react-wildlife-safaris-rusho.firebasestorage.app",
  messagingSenderId: "344294983171",
  appId: "1:344294983171:web:352ef1a28dc5123f4d7036",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
