// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "vividindia-67ea9.firebaseapp.com",
  projectId: "vividindia-67ea9",
  storageBucket: "vividindia-67ea9.appspot.com",
  messagingSenderId: "459684911978",
  appId: "1:459684911978:web:b77bfa274f7342ba396313"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);