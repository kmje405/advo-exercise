import { db } from "../firebase/client";
import { collection, getDocs } from "firebase/firestore";

export const fetchData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map(doc => doc.data());
  return data;
};
