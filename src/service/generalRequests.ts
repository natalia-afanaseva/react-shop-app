import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export const getAllDocs = async (
  collectionName: string,
  docId?: string,
  subcollectionName?: string
): Promise<any> => {
  const querySnapshot =
    docId && subcollectionName
      ? await getDocs(collection(db, collectionName, docId, subcollectionName))
      : await getDocs(collection(db, collectionName));

  return querySnapshot.empty ? querySnapshot.empty : querySnapshot.docs;
};

export const getDocById = async (
  collectionName: string,
  docId: string | undefined
) => {
  if (!docId) return;
  const result = await getDoc(doc(db, `${collectionName}/${docId}`));
  if (!result.exists) return;

  return result;
};

export const setDocWithId = async (path?: string, data?: any) => {
  if (!path || !data) return false;
  await setDoc(doc(db, path), data, { merge: true });
  return true;
};

export const addDocWithAutoId = async (path?: string, data?: any) => {
  if (!path || !data) return false;
  await addDoc(collection(db, path), data);
  return true;
};
