// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcTjG5hsmdjse__BKmYNcrL25ZEjf92bs',
  authDomain: 'twitter-2023-3916f.firebaseapp.com',
  projectId: 'twitter-2023-3916f',
  storageBucket: 'twitter-2023-3916f.appspot.com',
  messagingSenderId: '480720966657',
  appId: '1:480720966657:web:e28407574fb96b09c35c00',
  measurementId: 'G-N25TEBTRYK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth };
