import React from "react";
import "@styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import '@styles/main.scss';

const AppPropsWithLayout = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
};

export default AppPropsWithLayout;
