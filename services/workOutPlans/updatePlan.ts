import { doc, setDoc, addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import db from "../../database/firestore";




const EditPlanService = async (id: String, data) => {
    const docRef = doc(db, "tasks", id.trim());
    setDoc(docRef, data, { merge: true }).then(() => console.log("Document updated"));


}



export default EditPlanService