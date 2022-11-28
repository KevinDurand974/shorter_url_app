import Head from "next/head";

const NotAvailablePage = () => {
	// http://localhost:5000/notavailable

	return (
		<>
			<Head>
				<title>Oops, it doesn&apos;t work - Kurl</title>
				<meta
					name="description"
					content="This redirect url isn't available at this moment."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-gradient-to-br from-bg-primary to-bg-secondary w-full h-screen flex justify-center items-center">
				<div className="border-2 border-gray-600 border-opacity-20 p-4 md:p-8 rounded-2xl shadow-lg bg-gradient-to-tl from-transparent to-black/50 transition-all duration-300">
					<div>
						<h1 className="text-3xl md:text-5xl lg:text-7xl text-center smallcase text-accent font-rubik tracking-wider transition-all duration-300">
							This url is unavailable!
						</h1>
						<p className="text-hover font-extrabold text-center tracking-wide">
							Report this issue to its owner
						</p>
					</div>
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

export default NotAvailablePage;
