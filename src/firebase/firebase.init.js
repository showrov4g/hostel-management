// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHDGeotHSfSf_WxHn6MT3F9Vt3-cqNGAE",
  authDomain: "ssaignment12.firebaseapp.com",
  projectId: "ssaignment12",
  storageBucket: "ssaignment12.firebasestorage.app",
  messagingSenderId: "1034442787238",
  appId: "1:1034442787238:web:dd99575f3d11aad9e66767",
  measurementId: "G-G137GWDNXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);