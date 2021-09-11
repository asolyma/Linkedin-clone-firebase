import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb2ZDaLcVDJA-x4qz93SwlkpU-iKNGJyw",
  authDomain: "linkedin-clone-80070.firebaseapp.com",
  projectId: "linkedin-clone-80070",
  storageBucket: "linkedin-clone-80070.appspot.com",
  messagingSenderId: "850981619676",
  appId: "1:850981619676:web:6186bc606dc186562bb119",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth, firebaseApp };
