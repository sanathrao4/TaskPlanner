import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../../database/firestore";


const GetAllPlansServices = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().id}`);
    });
}



export default GetAllPlansServices