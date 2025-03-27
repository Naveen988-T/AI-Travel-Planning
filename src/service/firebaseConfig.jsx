// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7HjAOEKs7nhcbH-4RuRfciV0NLTEDb_U",
  authDomain: "ai-traval.firebaseapp.com",
  projectId: "ai-traval",
  storageBucket: "ai-traval.firebasestorage.app",
  messagingSenderId: "1039923014958",
  appId: "1:1039923014958:web:6f3fd2e7423317df6c5ebf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);