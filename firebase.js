import "@firebase/auth"
import firebase from 'firebase'

const firebaseSetUp = firebase.initializeApp({
    apiKey: "AIzaSyBwl3BxwCO2pIhPS02udk3Bt4bd71VAwSo",
    authDomain: "doctra-f4f4b.firebaseapp.com",
    projectId: "doctra-f4f4b",
    storageBucket: "doctra-f4f4b.appspot.com",
    messagingSenderId: "813152005106",
    appId: "1:813152005106:web:7ed09ae892a9e9b535196b",
    measurementId: "G-Z3K10JX1PS"
})

var firebaseLogin = firebase.auth().onAuthStateChanged(user => {
    
    if (user != null) {
      console.log('We are authenticated now!');
      console.log(user)
    }else{
        let email = "admin@123.com"
        let password = "123456"
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        firebase.database().ref('user-information/'+ firebase.auth().currentUser.uid).set({
            familyName: "Test account",
            givenName:"",
            name: "Test account",
            eamil:"admin@123.com",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/doctra-f4f4b.appspot.com/o/doctraLogo.png?alt=media&token=a44d4d6a-a2e3-41a9-979b-c99798b6fd07"
          })
        console.log("test_account login")
        // ...
        })
        .catch((error) => {
        console.log("error")
        });
    }
})
firebaseLogin()

export default firebaseSetUp