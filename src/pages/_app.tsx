import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ProtectedPage } from "@/templates";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/store";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <NextUIProvider>
          <ProtectedPage>
            <Component {...pageProps} />
          </ProtectedPage>
        </NextUIProvider>
      </Provider>
    </main>
  );
}
