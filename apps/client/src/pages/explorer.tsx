import useHasMounted from "@hooks/useHasMounted"
import { trpc } from "@libs/trpc"
import { useEffect, useState } from "react"

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

	return <h1>My Urls</h1>
}

export default ExplorerUrlPage
