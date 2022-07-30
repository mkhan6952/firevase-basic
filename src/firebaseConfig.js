import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFAR3jny-M5WohikRl4V9EqEWkC3Vgvvk",
  authDomain: "firebasic-d604a.firebaseapp.com",
  projectId: "firebasic-d604a",
  storageBucket: "firebasic-d604a.appspot.com",
  messagingSenderId: "1043750059111",
  appId: "1:1043750059111:web:2546870e569a0315cc28c2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const storage = getStorage(app);
