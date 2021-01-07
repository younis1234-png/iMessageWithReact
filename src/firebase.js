// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase"; 

const firebaseConfig = {
    apiKey: "AIzaSyDJbSu6U9Z9gMkuZCHU6uhRdbv4bnDeuRw",
    authDomain: "imessage-clone-23085.firebaseapp.com",
    projectId: "imessage-clone-23085",
    storageBucket: "imessage-clone-23085.appspot.com",
    messagingSenderId: "781816192551",
    appId: "1:781816192551:web:cd41555870859fda3cb802",
    measurementId: "G-GNLY9G2N1X"
};
  
// /we can use this as key to get into our firebase backend 
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider(); //for auth signup

export { auth, provider };
export default db;