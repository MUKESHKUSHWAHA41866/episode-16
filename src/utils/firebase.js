// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKqD6GqnR8Puc5X1kxMTHGOSa8XTxYN_c",
  authDomain: "netflixgpt-ddfa8.firebaseapp.com",
  projectId: "netflixgpt-ddfa8",
  storageBucket: "netflixgpt-ddfa8.appspot.com",
  messagingSenderId: "626246288654",
  appId: "1:626246288654:web:4eb44916b7e850e908035f",
  measurementId: "G-F88SDMY1VJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();



