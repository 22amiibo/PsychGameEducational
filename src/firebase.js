import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YAIzaSyD1Mg3AnBfXyA6po0xLOJmf2VhIU999i_0",
  authDomain: "psych-edac2.firebaseapp.com",
  projectId: "psych-edac2",
  storageBucket: "psych-edac2.firebasestorage.app",
  messagingSenderId: "947042091001",
  appId: "1:947042091001:web:909fa00905f976e0814728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
