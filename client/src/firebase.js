// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-906c1.firebaseapp.com",
  projectId: "mern-blog-906c1",
  storageBucket: "mern-blog-906c1.appspot.com",
  messagingSenderId: "1043561050497",
  appId: "1:1043561050497:web:8ddbf9f792da972adaf880",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
