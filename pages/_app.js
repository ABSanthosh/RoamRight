import Head from "next/head";
import "../styles/root/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Glitch </title>
        <meta name="description" content="Awesome website for Glitch hack" />
        <link rel="icon" href="/Images/glitchLogo.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
