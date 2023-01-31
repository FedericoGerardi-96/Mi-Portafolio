import { createContext } from "react";
import { IUser } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  errorMessage?: string | null;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logOutUser: () => Promise<boolean>;
  setLogUser: () => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
