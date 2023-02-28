import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head></Head>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
