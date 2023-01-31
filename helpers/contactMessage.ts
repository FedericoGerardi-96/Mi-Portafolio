import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { Imessage } from "../interfaces/MessageContact";

export const insertMessage = async (message: Imessage): Promise<boolean> => {
  try {
    const newDoc = doc(collection(FirebaseDB, `Portafolio/Cv/Message`));
    await setDoc(newDoc, message);
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export const getMessage = async (): Promise<Imessage[] | null> => {
  try {
    const collectionRef = collection(FirebaseDB, `Portafolio/Cv/Message`);
    const docs = await getDocs(collectionRef);
    const dataResponse: any = [];
    const proyectsList: Imessage[] = [];
    docs.forEach((doc) => {
      dataResponse.push({ id: doc.id, ...doc.data() });
    });
    dataResponse.forEach(({ id, name, email, message, date }: Imessage) => {
      proyectsList.push({ id, name, email, message, date });
    });

    return proyectsList;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(FirebaseDB, `Portafolio/Cv/Message/${id}`);
    await deleteDoc(docRef);

    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};
