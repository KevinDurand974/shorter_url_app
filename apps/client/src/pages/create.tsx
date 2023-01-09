import Head from "next/head"
import { Fragment } from "react"

const CreateUrlPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Create an url - Url Shorten</title>
				<meta name="description" content="Create an url." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex flex-col gap-4 w-full">
				<h1 className="font-fredoka sm:text-3xl text-center">Create URL</h1>
			</section>
		</Fragment>
	)
}

export default CreateUrlPage
