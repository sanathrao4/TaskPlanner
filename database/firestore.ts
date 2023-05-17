import { initializeApp, } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCpwuDIEEOXkZZe-_GVZKaNCmSfOIk6CwI",
    authDomain: "workout-planner-app-e0e45.firebaseapp.com",
    projectId: "workout-planner-app-e0e45",
    storageBucket: "workout-planner-app-e0e45.appspot.com",
    messagingSenderId: "301673509892",
    appId: "1:301673509892:web:d9016d492f4a84829a3151",
    measurementId: "G-QG2GB42QT0"
};
const fireStore = initializeApp(firebaseConfig)

const db = getFirestore(fireStore)
export default db