import axios from "axios"

const sTrpc = axios.create({
	baseURL: "http://localhost:8080/trpc",
	withCredentials: true,
})

export const isAuthServer = async (cookies?: string) => {
	const { signal } = new AbortController()
	const res = await sTrpc.get("/testAuth", {
		headers: { cookie: cookies || "" },
		signal,
	})
	return res.data.result.data.valid
}

export const getUserDataServer = async (cookies?: string) => {
	const { signal } = new AbortController()
	const res = await sTrpc.get("/getMe", {
		headers: { cookie: cookies || "" },
		signal,
	})
	return res.data.result.data
}

export default sTrpc
