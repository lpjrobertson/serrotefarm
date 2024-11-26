// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBpOVq88OfQ_UBA6mZv4RI2hvYNyFv6u3c",
    authDomain: "minha-fazenda-57bbf.firebaseapp.com",
    projectId: "minha-fazenda-57bbf",
    storageBucket: "minha-fazenda-57bbf.appspot.com",
    messagingSenderId: "459834257619",
    appId: "1:459834257619:web:7eb7d5d0ea6f3ec0856426",
    measurementId: "G-3Y6SR10FSH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
