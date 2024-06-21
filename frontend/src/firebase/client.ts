// client.ts
`client:only`;
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";

// Check if Firebase app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}const db = getFirestore(app);

export { analytics, app, db };
