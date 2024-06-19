// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  projectId: process.env.FIREBASEPROJECTID,
  storageBucket: process.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
  appId: process.env.FIREBASEAPPID,
  measurementId: process.env.FIREBASEMEASUREMENTID
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
