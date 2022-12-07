import { Layout } from "@components";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Fragment>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
			</Head>

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Fragment>
	);
}

export default MyApp;
