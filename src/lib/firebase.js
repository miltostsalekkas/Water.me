import firebase from "firebase/app";
import "firebase/database";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  const firebaseConfig = {
    apiKey: "AIzaSyDoRAQIcJzcA7ySVqPoEMbfxqT-zUUYRLU",
    authDomain: "led-app-2b429.firebaseapp.com",
    databaseURL: "https://led-app-2b429.firebaseio.com",
    projectId: "led-app-2b429",
    storageBucket: "led-app-2b429.appspot.com",
    messagingSenderId: "55175796639",
    appId: "1:55175796639:web:6fd74b1aa690b895bfcfaa"
  };

  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database();
