import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD5tpqoDhiIpRprL2aNBLuNSm8GluJNOWQ",
  authDomain: "filmyverse-fed5a.firebaseapp.com",
  projectId: "filmyverse-fed5a",
  storageBucket: "filmyverse-fed5a.appspot.com",
  messagingSenderId: "847969254941",
  appId: "1:847969254941:web:ca6fb44acfa6e8ffcc10f4"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;