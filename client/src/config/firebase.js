import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDRhRrEOfh2zjE54wlZy8ibdzBTsK8ugeY",
  authDomain: "blossom-391509.firebaseapp.com",
  projectId: "blossom-391509",
  storageBucket: "blossom-391509.appspot.com",
  messagingSenderId: "571325576470",
  appId: "1:571325576470:web:4c4aee8817b41564310c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // storage reference needed to access from different place