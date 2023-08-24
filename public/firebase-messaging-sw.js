importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");
const firebaseConfig = {
  apiKey: "AIzaSyASa4gM9_gHadWc_buSaaAc_HKZPQApGVA",
  authDomain: "expensemanagerpwa-b948e.firebaseapp.com",
  projectId: "expensemanagerpwa-b948e",
  storageBucket: "expensemanagerpwa-b948e.appspot.com",
  messagingSenderId: "841248065391",
  appId: "1:841248065391:web:9d3780ac332fab1f83ca9a",
  measurementId: "G-6EYT8NMZS7",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
