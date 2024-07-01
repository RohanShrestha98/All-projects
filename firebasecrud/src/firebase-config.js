import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDcZovc2WEjjsbxGq8PtqVS8x1sh6CkAP0",
    authDomain: "crud-e3948.firebaseapp.com",
    projectId: "crud-e3948",
    storageBucket: "crud-e3948.appspot.com",
    messagingSenderId: "249221306976",
    appId: "1:249221306976:web:612f3308621fb7a6c68105",
    measurementId: "G-S4Y861764L"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)