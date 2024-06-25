// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firestore from "@react-native-firebase/firestore";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9onKySATX31uAf9vY0nTyv0tkgF6enpE",
  authDomain: "flower-a50a0.firebaseapp.com",
  projectId: "flower-a50a0",
  storageBucket: "flower-a50a0.appspot.com",
  messagingSenderId: "675740039927",
  appId: "1:675740039927:web:8b6a78f73450c0f8fc31f2",
};

// Initialize Firebase
export { firestore };
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
