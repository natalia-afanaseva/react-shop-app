import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const handleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;

    await setDoc(doc(db, "users", user?.uid), {
      fullName: user?.displayName,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
