import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../../database/firestore";


const GetAllUsersServices = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot
}




export default GetAllUsersServices