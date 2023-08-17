import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "../styles/globals.css";
import Head from "next/head";

const theme = extendTheme({
  fonts: {
    heading: "'KobeBold', sans-serif",
    body: "system-ui, sans-serif",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Dermoteca</title>
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
