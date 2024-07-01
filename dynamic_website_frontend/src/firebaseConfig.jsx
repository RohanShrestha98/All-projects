import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkVxYY5eT4ryRwMY_bc2aDEeZj43s5Kmc",
  authDomain: "dynamic-website-48c16.firebaseapp.com",
  projectId: "dynamic-website-48c16",
  storageBucket: "dynamic-website-48c16.appspot.com",
  messagingSenderId: "1046541354628",
  appId: "1:1046541354628:web:c435b4bdc450445fab64d1",
  measurementId: "G-G5QXRZXDSK",
};

const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
