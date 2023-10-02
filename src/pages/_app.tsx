import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSessionVariables } from "@/store";

const theme = extendTheme({
  fonts: {
    heading: "'KobeBold', sans-serif",
    body: "system-ui, sans-serif",
  },
});

function MyApp({ Component, pageProps }: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Dermoteca</title>
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Session>
              <Component {...pageProps} />
            </Session>
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

function Session({ children }: { children: React.ReactNode }) {
  const { userToken, setUserToken, setCartId } = useSessionVariables();

  useEffect(() => {
    const userToken = localStorage.getItem("userAccessToken");
    const cartId = localStorage.getItem("cartId");

    userToken && setUserToken(userToken);
    cartId && setCartId(cartId);
  }, []);

  return <>{children}</>;
}

export default MyApp;
