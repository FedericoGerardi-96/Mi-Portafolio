import { createContext } from "react";

interface ContextProps {
  ThemeActive: string;
  toggleTheme: () => void;
  getLocalStorageActiveTheme: () => void;
}

export const ThemeContext = createContext({} as ContextProps);
