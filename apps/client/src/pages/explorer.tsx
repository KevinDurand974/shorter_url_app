import useHasMounted from "@hooks/useHasMounted"
import { trpc } from "@libs/trpc"
import Head from "next/head"
import { Fragment, useEffect, useState } from "react"

const ExplorerUrlPage = () => {
	const [data, setData] = useState<any>(null)

	useEffect(() => {
		const run = async () => {
			try {
				const ac = new AbortController()
				const dataUrls = await trpc.getUrls.query(undefined, {
					signal: ac.signal,
				})

				console.log(dataUrls)
			} catch (err) {
				console.error(err)
			}
		}
		run()
	}, [])

	return (
		<Fragment>
			<Head>
				<title>My Urls - Url Shorten</title>
				<meta name="description" content="Create an url." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex flex-col gap-4 w-full">
				<h1 className="font-fredoka sm:text-3xl text-center">My Urls</h1>
			</section>
		</Fragment>
	)
}

export default ExplorerUrlPage
