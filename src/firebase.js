import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC6r4OleUZZwoqTEuLU5KVfDgLs4nglHaQ",
  authDomain: "chat-app-23b98.firebaseapp.com",
  projectId: "chat-app-23b98",
  storageBucket: "chat-app-23b98.appspot.com",
  messagingSenderId: "1028127444054",
  appId: "1:1028127444054:web:1bf7d9efd1ace72575fff7"
};

export const app = initializeApp(firebaseConfig);