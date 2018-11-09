import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.fbApiKey,
    authDomain: "osake-d4cfe.firebaseapp.com",
    databaseURL: "https://osake-d4cfe.firebaseio.com",
    projectId: "osake-d4cfe",
    storageBucket: "osake-d4cfe.appspot.com",
    messagingSenderId: "35109029864"
  })
}

export default firebase