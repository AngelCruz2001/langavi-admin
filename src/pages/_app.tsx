import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { motion } from "framer-motion";
import { ProtectedPage } from "@/templates";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      {/* <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hello World
      </motion.h1> */}
      <ProtectedPage>
        <Component {...pageProps} />
      </ProtectedPage>
    </main>
  );
}
