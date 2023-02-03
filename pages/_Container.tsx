import { useContext, useEffect } from "react";

import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { ThemeContext } from "../context/theme";
import { AuthContext } from "../context/auth";
import { PortfolioContext } from "../context/portfolio";

const Container = ({ Component, pageProps }: AppProps) => {
  const { getLocalStorageActiveTheme } = useContext(ThemeContext);
  const { getPortafolioURL, getSkills, getProyects, getExperience, getEducation } = useContext(PortfolioContext);
  const { setLogUser } = useContext(AuthContext);

  useEffect(() => {
    setLogUser();
    getLocalStorageActiveTheme();
    getPortafolioURL();
    getSkills();
    getProyects();
    getExperience();
    getEducation();
  }, []);

  return <Component class="scroll-smooth" {...pageProps} />;
};

export default Container;
