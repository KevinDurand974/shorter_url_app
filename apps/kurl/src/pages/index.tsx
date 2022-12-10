import Head from "next/head"

const Home = () => {
	return (
		<div>
			<Head>
				<title>Kurl - Oh my, why are you here?</title>
				<meta name="description" content="Just another shorten URL website." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="bg-gradient-to-br from-bg-primary to-bg-secondary w-full h-screen p-4 flex overflow-auto">
				<div className="m-auto flex flex-col items-center">
					<h1 className="text-4xl sm:text-6xl font-rubik text-accent mb-8 text-center">
						What this website doing?
					</h1>

					<p className="text-xl mb-2 text-center">
						As such, it&apos;s a bit.ly like.
					</p>

					<p className="text-xl mb-2 text-center">
						You will only found shorten URL with this domain.
					</p>

					<p className="text-xl mb-2 text-center">Want to create one?</p>

					<a
						href={process.env.BASESITE_URL}
						className="mt-4 border-2 border-accent rounded-full bg-black bg-opacity-20 px-5 py-2 shadow-md shadow-accent hover:px-8 transition-all text-center"
					>
						More information here
					</a>
				</div>
			</main>
		</div>
	)
}

export default Home
