import { decode } from "jsonwebtoken"
import { useContext, useEffect } from "react"
import { AuthContext } from "@contexts"
import { AuthUser } from "@contexts/AuthContext"
import { trpc, setAuthToken } from "@libs/trpc"
import useSessionStorage from "./useSessionStorage"

const useAutoRefreshToken = () => {
	const { isSessionAvailable } = useSessionStorage()
	const { setUser, logout } = useContext(AuthContext)

	useEffect(() => {
		const run = async () => {
			try {
				const { signal } = new AbortController()
				const valid = await trpc.verifyToken.query(undefined, { signal })
				if (!valid) {
					const { accessToken } = await trpc.refresh.query(undefined, {
						signal,
					})
					if (isSessionAvailable()) {
						const userInfo = decode(accessToken) as AuthUser
						setUser(userInfo)
						setAuthToken(accessToken)
					}
				}
			} catch (err: any) {
				logout()
			}
		}
		run()
	})
}

export default useAutoRefreshToken
