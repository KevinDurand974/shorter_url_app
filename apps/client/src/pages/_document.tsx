import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Fredoka+One&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
			</Head>
			<body className="bg-gradient-bottom text-text font-poppins bg-gradient-to-br from-gradient-top to-gradient-bottom">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default Document;