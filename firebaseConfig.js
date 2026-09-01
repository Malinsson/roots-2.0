import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/* Kommentera in detta om du vill använda från datorn och kommentera ut auth på rad 23 */

const firebaseConfig = {
  apiKey: "AIzaSyCv3gCdyqwl1Rky7WAbmYZ5qBL6rq-hZ98",
  authDomain: "root-6e55c.firebaseapp.com",
  projectId: "root-6e55c",
  storageBucket: "root-6e55c.firebasestorage.app",
  messagingSenderId: "811312566514",
  appId: "1:811312566514:web:0b4afe77ea56ff55d6c06b",
  measurementId: "G-Z35RTXXT2S"
};
const app = initializeApp(firebaseConfig);

import { getAuth } from "firebase/auth";
export const auth = getAuth(app);

//export const auth = initializeAuth(app, {
//  persistence: getReactNativePersistence(AsyncStorage),
//});


export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
