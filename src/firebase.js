import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDNr3XgU7n4dbkmbkOi1r3XlRPZtBAibnQ",
    authDomain: "crud-4989e.firebaseapp.com",
    projectId: "crud-4989e",
    storageBucket: "crud-4989e.appspot.com",
    messagingSenderId: "774407462282",
    appId: "1:774407462282:web:0b86a61d82e3a1a71b7c73"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export {firebase}