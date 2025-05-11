import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCzNfTp748u_hGksw15pZIms57hYe5_L4s",
    authDomain: "best-auto-1c303.firebaseapp.com",
    projectId: "best-auto-1c303",
    storageBucket: "best-auto-1c303.appspot.com",
    messagingSenderId: "666580131862",
    appId: "1:666580131862:web:785d01a5f99a0565519537",
    measurementId: "G-P140PLGH26"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
