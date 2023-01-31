import React, { FC, PropsWithChildren, useReducer } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { AuthContext, AuthReducer } from "./";
import { IUser } from "../../interfaces";
import { logInWithEmailPassword, logOutFirebase } from "../../firebase/providers";
import { FirebaseAuth } from "../../firebase/config";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  errorMessage?: string | null;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  errorMessage: null,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { ok, uid, photoURL, name, errorMessage } = await logInWithEmailPassword({
        email,
        password,
      });
      if (!ok) {
        dispatch({ type: "[Auth] - Logout", payload: { errorMessage } });
        return false;
      }
      dispatch({ type: "[Auth] - Login", payload: { uid, email, name, photoURL, errorMessage } });
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const logOutUser = async (): Promise<boolean> => {
    await logOutFirebase();
    dispatch({ type: "[Auth] - Logout", payload: { errorMessage: null } });
    return true;
  };

  const setLogUser = async (): Promise<boolean> => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return logOutUser();
      const { uid, email, name, photoURL } = user as IUser;
      dispatch({ type: "[Auth] - Login", payload: { uid, email, name, photoURL } });
    });

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Methods
        loginUser,
        logOutUser,
        setLogUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
