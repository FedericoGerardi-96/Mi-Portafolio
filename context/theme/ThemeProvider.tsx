import { FC, PropsWithChildren, useReducer } from "react";
import { ThemeContext, themeReducer } from "./";

export type theme = "theme-dark" | "theme-light";

export interface ThemeState {
  ThemeActive: theme;
}

const THEME_INITIAL_STATE: ThemeState = {
  ThemeActive: "theme-dark",
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, THEME_INITIAL_STATE);

  const toggleTheme = (): void => {
    const modifiedTheme = state.ThemeActive === "theme-light" ? "theme-dark" : "theme-light";
    dispatch({ type: "[THEME] - ToggleTheme", payload: modifiedTheme });
    window.localStorage.setItem("data-theme", modifiedTheme);
    document.documentElement.className = modifiedTheme;
  };

  const getLocalStorageActiveTheme = () => {
    const activeTheme: theme = (window.localStorage.getItem("data-theme") as theme) || "theme-dark";
    dispatch({ type: "[THEME] - getTheme", payload: activeTheme });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme,
        getLocalStorageActiveTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
