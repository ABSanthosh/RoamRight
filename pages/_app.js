import Head from "next/head";
import "../styles/root/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>roamright </title>
        <meta name="description" content="Awesome website for roamright hack" />
        <link rel="icon" href="/Images/roamrightLogo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
