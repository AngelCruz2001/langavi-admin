import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { ProtectedPage } from "@/templates";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/store";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <main className={inter.className}>
      <Provider store={store}>
        <NextUIProvider>
          <Toaster position="top-right" reverseOrder={false} />

          {!router.asPath.includes('/login') ? (
            // {store.getState().auth.isAuthenticated ? (
            <ProtectedPage>
              <Component {...pageProps} />
            </ProtectedPage>
          ) : (
            <Component {...pageProps} />
          )}
        </NextUIProvider>
      </Provider>
    </main>
  );
}
