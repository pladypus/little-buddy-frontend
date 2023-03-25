import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import awsExports from "~/aws-exports";
import Header from "~/components/Header";
import { useDarkMode } from "~/hooks";
import "~/styles/globals.css";
import configLogger from "~/utils/logger";

configLogger();
Amplify.configure({ ...awsExports, ssr: true });

const App: React.FC<AppPropsWithLayout & WithAuthenticatorProps> = ({
  Component,
  pageProps: { session, title, ...pageProps },
  signOut,
}) => {
  useDarkMode();

  const getLayout =
    Component.getLayout ??
    ((page) => (
      <>
        <Header title={title} signOut={signOut} />
        {page}
      </>
    ));

  return (
    <>
      {/* <ThemeProvider
      colorMode="dark"
      theme={{
        name: "my-theme",
        overrides: [defaultDarkModeOverride],
      }}
      >
      <Authenticator variation="modal"> */}
      {getLayout(<Component {...pageProps} signOut={signOut} />)}
      {/* </Authenticator>
    </ThemeProvider> */}
    </>
  );
};

export default withAuthenticator(App);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
