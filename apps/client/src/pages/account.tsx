import { AuthContext } from "@contexts"
import { trpc } from "@libs/trpc"
import { useContext, useEffect } from "react"

const AccountSettingsPage = () => {
	const { user, isLogged } = useContext(AuthContext)

	useEffect(() => {
		const run = async () => {
			try {
				if (!isLogged) return
				const ac = new AbortController()
				const userData = await trpc.getUser.query(
					{ uuid: user!.uuid },
					{
						signal: ac.signal,
					}
				)

				console.log(userData)
			} catch (err) {
				console.error(err)
			}
		}
		run()
	}, [isLogged, user])

	return <h1>Account</h1>
}

export default AccountSettingsPage
