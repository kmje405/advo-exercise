// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASEAPIKEY,
  authDomain: import.meta.env.FIREBASEAUTHDOMAIN,
  projectId: import.meta.env.FIREBASEPROJECTID,
  storageBucket: import.meta.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: import.meta.env.FIREBASEMESSAGINGSENDERID,
  appId: import.meta.env.FIREBASEAPPID,
  measurementId: import.meta.env.FIREBASEMEASUREMENTID
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

export { db };
