// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWxlhss2DOWNqb1IvJLW-ZU4lktKIRcqw",
  authDomain: "ecommerce-prohogar.firebaseapp.com",
  projectId: "ecommerce-prohogar",
  storageBucket: "ecommerce-prohogar.appspot.com",
  messagingSenderId: "487140927015",
  appId: "1:487140927015:web:2af8f5999c4e49a2d05002",
  measurementId: "G-LMCRRY4JCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {app, storage}
