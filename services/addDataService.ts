import { addDoc, collection, getDocs } from "firebase/firestore";
import db from "../database/firestore";


async function AddDocumentService(collectionName: string, data: any) {
    console.log('data', data)
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
        return
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default AddDocumentService