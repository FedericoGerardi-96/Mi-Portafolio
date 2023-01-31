import { useState } from "react";

export const useDrawerToggle = () => {
  const [drawerState, setDrawerState] = useState(true);

  const toggleDrawerState = () => {
    setDrawerState(!drawerState);
  };

  return {
    drawerState,
    toggleDrawerState,
  };
};
