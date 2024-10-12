import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


// Your Firebase configuration (get this from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyCwPD2O7rS3ImEaCa_Mw73xUgD5Rf_umTc",
    authDomain: "tea-estate-ms.firebaseapp.com",
    projectId: "tea-estate-ms",
    storageBucket: "tea-estate-ms.appspot.com",
    messagingSenderId: "729576568007",
    appId: "1:729576568007:web:be0b17704a4be8a8f0fae2",
    measurementId: "G-0TZQVCQ4JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(app);

export { storage };