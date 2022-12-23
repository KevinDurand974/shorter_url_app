import { Html, Head, Main, NextScript } from "next/document"

const Document = () => {
	return (
		<Html lang="en" className="scroll-smooth">
			<Head>
				<meta charSet="utf-8" />
				{/* <base href="//cdn.example.com/" /> */}
				{/* <meta name="application-name" content="Application Name" /> */}

				<link
					rel="icon"
					href="/favicon-16.png"
					sizes="16x16"
					type="image/png"
				/>
				<link
					rel="icon"
					href="/favicon-32.png"
					sizes="32x32"
					type="image/png"
				/>
				<link
					rel="icon"
					href="/favicon-96.png"
					sizes="96x96"
					type="image/png"
				/>
				<link
					rel="icon"
					href="/favicon-192.png"
					sizes="192x192"
					type="image/png"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Fredoka+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body className="bg-fixed bg-gradient-bottom text-text font-poppins bg-gradient-to-br from-gradient-top to-gradient-bottom selection:text-t-alt/70 selection:bg-accent">
				<Main />
				<div id="modal" />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
