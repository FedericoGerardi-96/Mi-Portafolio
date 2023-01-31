import { theme, ThemeState } from "./";

type ThemeActionType =
  | { type: "[THEME] - ToggleTheme"; payload: theme }
  | { type: "[THEME] - getTheme"; payload: theme };

export const themeReducer = (state: ThemeState, action: ThemeActionType): ThemeState => {
  switch (action.type) {
    case "[THEME] - ToggleTheme":
      return {
        ...state,
        ThemeActive: action.payload,
      };
    case "[THEME] - getTheme":
      return {
        ...state,
        ThemeActive: action.payload,
      };

    default:
      return state;
  }
};
