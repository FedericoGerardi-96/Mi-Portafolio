import { AuthState } from "./";
import { IUser } from "../../interfaces";

type AuthActionType = { type: "[Auth] - Login"; payload: IUser } | { type: "[Auth] - Logout"; payload: IUser };

export const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};
