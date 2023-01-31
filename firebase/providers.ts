import { browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { IUser } from "../interfaces/user";
import { FirebaseAuth } from "./config";

// firebase.auth.Auth.Persistence.LOCAL in V9	browserLocalPersistence
// firebase.auth.Auth.Persistence.SESSION	in V9	browserSessionPersistence
// firebase.auth.Auth.Persistence.NONE	in V9	inMemoryPersistence

export const logInWithEmailPassword = async ({ email = "", password = "" }: IUser) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    await FirebaseAuth.setPersistence(browserSessionPersistence);
    const { uid, photoURL, displayName: name } = response.user;
    return {
      ok: true,
      uid,
      photoURL,
      email,
      name,
    };
  } catch (error: any) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logOutFirebase = async () => {
  try {
    return await FirebaseAuth.signOut();
  } catch (error: any) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage,
    };
  }
};
