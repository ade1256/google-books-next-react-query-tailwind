// _app.tsx

import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  // You can add global context providers here
  return <Component {...pageProps} />;
}

export default MyApp;
