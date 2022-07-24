import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const signIn = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    // check if doc exists;
    const userInCollection = await getDoc(doc(db, `users/${user?.uid}}`));

    if (!userInCollection?.exists()) {
      await setDoc(doc(db, "users", user?.uid), {
        fullName: user?.displayName,
      });
    }

    return user.uid;
  } catch (error) {
    console.log(error);
    return null;
  }
};
