import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDX6y8mmrplvEWi3kCu7ZGtuJLm9GgiX24",
    authDomain: "whatsapp-ba678.firebaseapp.com",
    projectId: "whatsapp-ba678",
    storageBucket: "whatsapp-ba678.appspot.com",
    messagingSenderId: "953579712830",
    appId: "1:953579712830:web:cb6affbfc681ff231a7c6f"
  };


const app =!firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();
const auth=app.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export {db,auth,provider}