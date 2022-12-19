import { AuthContext } from "@contexts"
import useHasMounted from "@hooks/useHasMounted"
import useSessionStorage from "@hooks/useSessionStorage"
import { trpc } from "@libs/trpc"
import { useRouter } from "next/router"
import { useContext } from "react"

const LogoutPage = () => {
	const { logout, isLogged } = useContext(AuthContext)
	const { push } = useRouter()
	const hasMounted = useHasMounted()
	const { isSessionAvailable, removeSessionValue } = useSessionStorage()

	if (hasMounted && isLogged) {
		;(async () => {
			try {
				const ac = new AbortController()
				await trpc.logout.query(undefined, { signal: ac.signal })
			} catch (err: any) {
				console.error(err.message)
			} finally {
				if (isSessionAvailable()) removeSessionValue("us_at")
				logout()
				push("/")
			}
		})()
	}

	if (hasMounted && !isLogged) {
		push("/")
	}

	return null
}

export default LogoutPage
