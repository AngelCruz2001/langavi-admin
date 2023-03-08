import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ProtectedPage } from "@/templates";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ProtectedPage>
        <Component {...pageProps} />
      </ProtectedPage>
    </main>
  );
}
