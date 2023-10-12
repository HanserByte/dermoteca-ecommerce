import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSessionVariables } from "@/store";
import { useCart, useCartActions } from "@/hooks/cart";

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
  const { setUserToken, setCartId, cartId } = useSessionVariables();
  const { createCartMutation } = useCartActions();
  useCart(cartId);

  useEffect(() => {
    const userToken = localStorage.getItem("userAccessToken");
    const cartId = localStorage.getItem("cartId");
    userToken && setUserToken(userToken);

    // Create a cart if one doesn't exist
    if (!cartId) {
      createCartMutation.mutate();
      return;
    }

    cartId && setCartId(cartId);
  }, []);

  // Set the cartId in local storage if it doesn't exists
  useEffect(() => {
    if (createCartMutation?.data?.cart?.id) {
      localStorage.setItem(
        "cartId",
        createCartMutation?.data?.cart?.id as string
      );
      setCartId(createCartMutation?.data?.cart?.id);
    }
  }, [createCartMutation?.data?.cart?.id]);

  return <>{children}</>;
}

export default MyApp;
