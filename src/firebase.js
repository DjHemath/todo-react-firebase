import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBP5JTNbUqrOPLpGEnexdxbEJb8rxe685Q",
    authDomain: "todo-15c77.firebaseapp.com",
    databaseURL: "https://todo-15c77.firebaseio.com",
    projectId: "todo-15c77",
    storageBucket: "todo-15c77.appspot.com",
    messagingSenderId: "569919295590",
    appId: "1:569919295590:web:8bbdb289300b2294d85da7"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export {db};