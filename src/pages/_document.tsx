import { Html, Head, Main, NextScript } from "next/document";

const GTM_ID = "GTM-5WS4R6MP";

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
