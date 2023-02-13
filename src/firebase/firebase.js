// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoNJc9p7DR-7t9VKJ2zlAlSuUXk1tevzk",
    authDomain: "task-board-7ff95.firebaseapp.com",
    projectId: "task-board-7ff95",
    storageBucket: "task-board-7ff95.appspot.com",
    messagingSenderId: "428297123066",
    appId: "1:428297123066:web:49661c9625d6f8423bc543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }