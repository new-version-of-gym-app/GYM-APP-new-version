import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Correct import here

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh6LvE8MmSCuMMwzL5K40S7iDpa4Xj1bw",
  authDomain: "gym-app-2f65d.firebaseapp.com",
  projectId: "gym-app-2f65d",
  storageBucket: "gym-app-2f65d.appspot.com",
  messagingSenderId: "544490172671",
  appId: "1:544490172671:web:d685ab9a4c7b4a969c5cca"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
