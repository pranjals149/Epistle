import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBz0_IYYr--e-A3psDsgN723CsevSlN81c",
    authDomain: "epistle-366a3.firebaseapp.com",
    databaseURL: "https://epistle-366a3.firebaseio.com",
    projectId: "epistle-366a3",
    storageBucket: "epistle-366a3.appspot.com",
    messagingSenderId: "916430670023",
    appId: "1:916430670023:web:a73b0053cb4499644ad6e2",
    measurementId: "G-ZES1LZ0QWR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;