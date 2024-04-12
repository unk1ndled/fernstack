import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaZBezp7gpsiLH2bqUiqKRY-MSmzwndlQ",
  authDomain: "fernstack-ec664.firebaseapp.com",
  projectId: "fernstack-ec664",
  storageBucket: "fernstack-ec664.appspot.com",
  messagingSenderId: "159821605106",
  appId: "1:159821605106:web:24f6acd22d62001c49886b",
  measurementId: "G-MWE17Y71FQ",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
const db = getFirestore(app);

export const database = {
  folders: collection(db, "folders"),
  files: collection(db, "files"),
  getCurrTime: serverTimestamp,
};

export const googleProvider = new GoogleAuthProvider();
