import { useContext, useEffect } from "react";

import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { ThemeContext } from "../context/theme";
import { AuthContext } from "../context/auth";
import { PortfolioContext } from "../context/portfolio";
import { useDrawerToggle } from "../hooks";
import { Drawer } from "../components/drawer";

const Container = ({ Component, pageProps }: AppProps) => {
  const { getLocalStorageActiveTheme } = useContext(ThemeContext);
  const { getPortafolioURL, getSkills, getProyects, getExperience, getEducation } = useContext(PortfolioContext);
  const { setLogUser } = useContext(AuthContext);
  const { drawerState, toggleDrawerState } = useDrawerToggle();
  const router = useRouter();

  useEffect(() => {
    setLogUser();
    getLocalStorageActiveTheme();
    getPortafolioURL();
    getSkills();
    getProyects();
    getExperience();
    getEducation();
  }, []);

  if (router.pathname !== "/auth/login") {
    if (drawerState) return <Drawer drawerState toggleDrawerState={toggleDrawerState} />;
  }

  return <Component class="scroll-smooth" {...pageProps} />;
};

export default Container;
