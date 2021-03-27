import "firebase/auth"
import * as firebase from 'firebase';

const firebaseSetUp = firebase.initializeApp({
    apiKey: "AIzaSyBwl3BxwCO2pIhPS02udk3Bt4bd71VAwSo",
    authDomain: "doctra-f4f4b.firebaseapp.com",
    projectId: "doctra-f4f4b",
    storageBucket: "doctra-f4f4b.appspot.com",
    messagingSenderId: "813152005106",
    appId: "1:813152005106:web:7ed09ae892a9e9b535196b",
    measurementId: "G-Z3K10JX1PS"
})





firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(() => {
    var provider = new firebase.auth.GoogleAuthProvider();
    // In memory persistence will be applied to the signed in Google user
    // even though the persistence was set to 'none' and a page redirect
    // occurred.
    return firebase.auth().signInWithRedirect(provider);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

export default firebaseSetUp