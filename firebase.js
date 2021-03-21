import "firebase/auth"
import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBwl3BxwCO2pIhPS02udk3Bt4bd71VAwSo",
    authDomain: "doctra-f4f4b.firebaseapp.com",
    projectId: "doctra-f4f4b",
    storageBucket: "doctra-f4f4b.appspot.com",
    messagingSenderId: "813152005106",
    appId: "1:813152005106:web:7ed09ae892a9e9b535196b",
    measurementId: "G-Z3K10JX1PS"
})
const email = "123@123.com"
const password = "123456"
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

export const auth = app.auth()
export default app