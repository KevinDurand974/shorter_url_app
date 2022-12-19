import { authToken, setAuthToken, trpc } from "@libs/trpc"
import useSessionStorage from "./useSessionStorage"
import { useEffect } from "react"

const useTrpcToken = () => {
	const { isSessionAvailable, getSessionValue } = useSessionStorage()

	useEffect(() => {
		if (isSessionAvailable()) {
			const token = getSessionValue("us_at")
			if (!authToken && token) setAuthToken(token)
		}
	}, [getSessionValue, isSessionAvailable])
}

export default useTrpcToken
