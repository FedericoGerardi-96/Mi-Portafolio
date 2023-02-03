import { useEffect } from "react";

import type { AppProps } from "next/app";

import "../styles/globals.css";

import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { PortfolioProvider } from "../context/portfolio";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const theme = window.localStorage.getItem("data-theme") || "theme-dark";
    document.documentElement.className = theme;
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <PortfolioProvider>
            <Component {...pageProps} />
          </PortfolioProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
