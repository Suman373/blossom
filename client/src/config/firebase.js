import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import keys from "./keys";

const firebaseConfig = {
  apiKey: keys?.firebase?.apiKey,
  authDomain: keys?.firebase?.authDomain,
  projectId: keys?.firebase?.projectId,
  storageBucket: keys?.firebase?.storageBucket,
  messagingSenderId: keys?.firebase?.messagingSenderId,
  appId:keys?.firebase?.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // storage reference needed to access from different place