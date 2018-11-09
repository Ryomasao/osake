import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default  (context, inject) => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCFYIxCa3EHi_8ZHfIT97ZuiylqFmhYksE",
        authDomain: "osake-d4cfe.firebaseapp.com",
        databaseURL: "https://osake-d4cfe.firebaseio.com",
        projectId: "osake-d4cfe",
        storageBucket: "osake-d4cfe.appspot.com",
        messagingSenderId: "35109029864"
      })
    }

    inject('hoge', firebase)
}