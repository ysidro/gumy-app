
import { initializeApp } from "firebase/app";
 import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API, // "AIzaSyAGWf_74xVeRoRMucjYj4QrupxU2U1Rego",
  authDomain: Constants.expoConfig.extra.AUTH_DOMAIN, // "gumy-app.firebaseapp.com",
  projectId: Constants.expoConfig.extra.PROYECT_ID, // "gumy-app",
  storageBucket: Constants.expoConfig.extra.STORE_BUKET, // "gumy-app.appspot.com",
  messagingSenderId: Constants.expoConfig.extra.MESSAGIN_SENDER_ID, // "871591234137",
  appId: Constants.expoConfig.extra.FIREBASE_ID, // "1:871591234137:web:26caf14bdec025cc0abf48"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const authConfig = getAuth();