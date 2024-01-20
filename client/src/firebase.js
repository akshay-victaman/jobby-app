// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXz7JrTlQfGMB8JkvzcW2bpRk3XpsmOA8",
  authDomain: "earlyjobs-78b96.firebaseapp.com",
  databaseURL: "https://earlyjobs-78b96-default-rtdb.firebaseio.com",
  projectId: "earlyjobs-78b96",
  storageBucket: "earlyjobs-78b96.appspot.com",
  messagingSenderId: "515235660260",
  appId: "1:515235660260:web:580a570a5c58aaea6607f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;