import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBsrWZmVKGVysgLprbJ5KhLvtErlz6Wg5o",
    authDomain: "sticker-chat-app.firebaseapp.com",
    projectId: "sticker-chat-app",
    storageBucket: "sticker-chat-app.appspot.com",
    messagingSenderId: "680306471642",
    appId: "1:680306471642:web:f159ef5beb1dc421e52be3",
    measurementId: "G-ZGKD9BYRFF"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);