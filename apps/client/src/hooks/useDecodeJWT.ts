import { decode } from "jsonwebtoken"

const decodeJWT = (token: string) => {
	const data = decode(token)
	if (!data) return data
	if (typeof data === "string") return data
	delete data.exp
	delete data.iat
	return data
}

const useDecodeJWT = () => ({
	decodeToken: decodeJWT,
})

export default useDecodeJWT
