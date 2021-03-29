import "@firebase/auth"
import * as firebase from 'firebase'

const firebaseSetUp = firebase.initializeApp({
    apiKey: "AIzaSyBwl3BxwCO2pIhPS02udk3Bt4bd71VAwSo",
    authDomain: "doctra-f4f4b.firebaseapp.com",
    projectId: "doctra-f4f4b",
    storageBucket: "doctra-f4f4b.appspot.com",
    messagingSenderId: "813152005106",
    appId: "1:813152005106:web:7ed09ae892a9e9b535196b",
    measurementId: "G-Z3K10JX1PS"
})

export default firebaseSetUp