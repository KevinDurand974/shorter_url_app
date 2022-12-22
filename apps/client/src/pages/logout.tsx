import { AuthContext } from "@contexts"
import useLocalStorage from "@hooks/useLocalStorage"
import { trpc } from "@libs/trpc"
import { isAuthServer } from "@libs/trpcSsr"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

const LogoutPage = () => {
	const { isStorageAvailable, removeStorageValue } = useLocalStorage()
	const { logout } = useContext(AuthContext)
	const { push } = useRouter()

	useEffect(() => {
		trpc.logout
			.query(undefined, { signal: new AbortController().signal })
			.then(() => {
				if (isStorageAvailable()) {
					logout()
					removeStorageValue("logged_in")
					push("/")
				}
			})
	}, [isStorageAvailable, logout, push, removeStorageValue])

	return null
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const isAuth = await isAuthServer(req.headers.cookie)
		if (!isAuth) throw new Error("User not connected!")
		return {
			props: {},
		}
	} catch (err: any) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}
}

export default LogoutPage
