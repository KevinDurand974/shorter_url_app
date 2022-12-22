import { Profile } from "@shorter/backend/dist/entities"
import axios from "axios"

const sTrpc = axios.create({
	baseURL: "http://localhost:8080/trpc",
	withCredentials: true,
})

export const isAuthServer = async (cookies?: string) => {
	try {
		const { signal } = new AbortController()
		await sTrpc.get("/testAuth", {
			headers: { cookie: cookies || "" },
			signal,
		})
		return true
	} catch (err) {
		return false
	}
}

export const getUserDataServer = async (cookies?: string) => {
	const { signal } = new AbortController()
	const res = await sTrpc.get("/getMe", {
		headers: { cookie: cookies || "" },
		signal,
	})
	return res.data.result.data as Profile
}

export default sTrpc
