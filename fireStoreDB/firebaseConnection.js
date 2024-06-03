// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwbNgx7vMLWQSDaeXQP4hbj_dGcdbjU9E",
  authDomain: "meuprojeto-d6a89.firebaseapp.com",
  projectId: "meuprojeto-d6a89",
  storageBucket: "meuprojeto-d6a89.appspot.com",
  messagingSenderId: "1013934725030",
  appId: "1:1013934725030:web:13e7741b033c386ba32167"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const bancoExterno=getFirestore(app);
export {bancoExterno};