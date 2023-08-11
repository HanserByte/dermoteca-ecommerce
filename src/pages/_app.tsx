import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import "../styles/globals.css";

const theme = extendTheme({
  fonts: {
    heading: "'KobeBold', sans-serif",
    body: "system-ui, sans-serif",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;