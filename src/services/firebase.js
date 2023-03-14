// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASa4gM9_gHadWc_buSaaAc_HKZPQApGVA",
  authDomain: "expensemanagerpwa-b948e.firebaseapp.com",
  projectId: "expensemanagerpwa-b948e",
  storageBucket: "expensemanagerpwa-b948e.appspot.com",
  messagingSenderId: "841248065391",
  appId: "1:841248065391:web:9d3780ac332fab1f83ca9a",
  measurementId: "G-6EYT8NMZS7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);