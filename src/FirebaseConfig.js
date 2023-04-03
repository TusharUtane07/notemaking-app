import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCAXgFvS0vbv3EgsN1ZFij6YhkXEO8Dyxw",
  authDomain: "docs-97568.firebaseapp.com",
  projectId: "docs-97568",
  storageBucket: "docs-97568.appspot.com",
  messagingSenderId: "780901026368",
  appId: "1:780901026368:web:e4cda456f23a2db1302da5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);