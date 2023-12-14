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
import WhatsAppButton from "@/components/WhatsAppButton";

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
        <meta
          name="description"
          content="Explora soluciones dermatológicas personalizadas para el cuidado de tu piel. Nuestro equipo de dermatólogos expertos ofrece tratamientos especializados para afecciones cutáneas, procedimientos estéticos y consejos de cuidado de la piel. Descubre una piel saludable y radiante con nuestros servicios de dermatología de vanguardia."
        />
        {/* <html lang="es" /> */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Session>
              <Component {...pageProps} />
              <WhatsAppButton />
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
  const cartData = useCart(cartId);

  useEffect(() => {
    const userToken = localStorage.getItem("userAccessToken");
    const cartId = localStorage.getItem("cartId");
    const cartIdExpiration = localStorage.getItem("cartIdExpiration");
    userToken && setUserToken(userToken);
    // Create a cart if one doesn't exist or if the cartId has expired
    if (
      (!cartData.isLoading && !cartData?.data) ||
      cartId === "undefined" ||
      !cartId ||
      (cartId && Number(cartIdExpiration) < new Date().getTime())
    ) {
      createCartMutation.mutate();
      return;
    }

    cartId && setCartId(cartId);
  }, [cartData.isLoading, cartData?.data]);

  // Set the cartId in local storage if it doesn't exists
  useEffect(() => {
    const cartIdExpiration = localStorage.getItem("cartIdExpiration");

    if (
      (!cartId && createCartMutation?.data?.cart?.id) ||
      (cartId && Number(cartIdExpiration) > new Date().getTime())
    ) {
      localStorage.setItem(
        "cartId",
        createCartMutation?.data?.cart?.id as string
      );
      localStorage.setItem(
        "cartIdExpiration",
        String(
          new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).getTime()
        )
      );
      setCartId(createCartMutation?.data?.cart?.id);
    }
  }, [createCartMutation?.data?.cart?.id]);

  return <>{children}</>;
}

export default MyApp;
