import "@/styles/globals.css";
import configLogger from "@/utils/logger";
import type { AppProps } from "next/app";

configLogger();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
