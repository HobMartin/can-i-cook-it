// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQn-286qJ-jWzRWFfRSOpdN3OcjycJJFQ",
  authDomain: "can-i-cook-it.firebaseapp.com",
  projectId: "can-i-cook-it",
  storageBucket: "can-i-cook-it.appspot.com",
  messagingSenderId: "583313590399",
  appId: "1:583313590399:web:06db8a719a9005cb34174a",
  measurementId: "G-10564TM29L",
  databaseURL:
    "https://can-i-cook-it-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
