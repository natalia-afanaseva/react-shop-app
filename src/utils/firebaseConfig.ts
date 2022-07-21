import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY_1upn1gPsZk0r4bcVleb0lpvOOjWqH8",
  authDomain: "shop-react-app-28f33.firebaseapp.com",
  projectId: "shop-react-app-28f33",
  storageBucket: "shop-react-app-28f33.appspot.com",
  messagingSenderId: "876268455920",
  appId: "1:876268455920:web:a68ad0d7df4ddd2f283f35",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
