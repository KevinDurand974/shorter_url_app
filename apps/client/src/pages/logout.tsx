import { AuthContext } from "@contexts"
import useLocalStorage from "@hooks/useLocalStorage"
import { trpc } from "@libs/trpc"
import { isAuthServer } from "@libs/trpcSsr"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

type Props = {
	isLogged: boolean
}

const LogoutPage = ({ isLogged }: Props) => {
	const { isStorageAvailable, removeStorageValue } = useLocalStorage()
	const { logout } = useContext(AuthContext)
	const { push } = useRouter()
	const [calledPush, setCalledPush] = useState(false)

	useEffect(() => {
		if (isLogged) {
			trpc.logout
				.query(undefined, { signal: new AbortController().signal })
				.then(() => {
					if (isStorageAvailable()) {
						logout()
						removeStorageValue("logged_in")
						if (!calledPush) {
							push("/", undefined, { shallow: true })
							setCalledPush(true)
						}
					}
				})
		} else {
			if (!calledPush) {
				push("/", undefined, { shallow: true })
				setCalledPush(true)
			}
		}
	}, [
		calledPush,
		isLogged,
		isStorageAvailable,
		logout,
		push,
		removeStorageValue,
	])

	return null
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const isAuth = await isAuthServer(req.headers.cookie)
		if (!isAuth) throw new Error("User not connected!")
		return {
			props: {
				isLogged: true,
			},
		}
	} catch (err: any) {
		return {
			props: {
				isLogged: false,
			},
		}
	}
}

export default LogoutPage
