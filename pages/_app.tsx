import { useDarkMode } from "@/hooks";
import "@/styles/globals.css";
import configLogger from "@/utils/logger";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

configLogger();

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useDarkMode();

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
