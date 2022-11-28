import Head from "next/head";

const NotFoundPage = () => {
	// http://localhost:5000/notfound

	return (
		<>
			<Head>
				<title>What are you doing here? - Kurl</title>
				<meta name="description" content="This redirect url doesn't exist." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-gradient-to-br from-bg-primary to-bg-secondary w-full h-screen flex justify-center items-center">
				<div className="border-2 border-gray-600 border-opacity-20 p-4 md:p-8 rounded-2xl shadow-lg bg-gradient-to-tl from-transparent to-black/50 transition-all duration-300">
					<h1 className="text-3xl md:text-5xl lg:text-7xl text-center smallcase text-accent font-rubik tracking-wider transition-all duration-300">
						This url doesn&apos;t exist!
					</h1>
					<div className="mt-4 text-center">
						<div className="text-text font-semibold">
							You can close this page.
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default NotFoundPage;
