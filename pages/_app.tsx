import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import "../styles/globals.css";

import { ThemeProvider } from "../context/theme";
import { AuthProvider } from "../context/auth";
import { PortfolioProvider } from "../context/portfolio";

import Container from "./_Container";
import { useEffect } from "react";

function MyApp(appProps: AppProps) {
  useEffect(() => {
    const theme = window.localStorage.getItem("data-theme") || "theme-dark";
    document.documentElement.className = theme;
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <PortfolioProvider>
            <Container {...appProps} />
          </PortfolioProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
