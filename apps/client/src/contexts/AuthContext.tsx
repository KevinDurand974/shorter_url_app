import useSessionStorage from "@hooks/useSessionStorage"
import { decode } from "jsonwebtoken"
import { createContext, PropsWithChildren, useState } from "react"

type ProviderProps = PropsWithChildren<{}>

export type AuthUser = {
	uuid: string
	pseudo: string
	vip: boolean
	emailVerified: boolean
}

const AuthContext = createContext<{
	isLogged: boolean
	user: AuthUser | null
	setUser: (u: AuthUser) => void
	logout: () => void
}>({
	isLogged: false,
	user: null,
	setUser: (u: AuthUser) => {},
	logout: () => {},
})

export const AuthProvider = ({ children }: ProviderProps) => {
	const [isLogged, setLogged] = useState(false)
	const [user, setUser] = useState<AuthUser | null>(null)

	const { isSessionAvailable, getSessionValue } = useSessionStorage()

	if (isSessionAvailable()) {
		if (!user) {
			const token = getSessionValue("us_at")
			if (token) {
				const userInfo = decode(token) as AuthUser
				setUser(userInfo)
				setLogged(true)
			}
		}
	}

	const updateUserInfo = (user: AuthUser) => {
		setUser(user)
		setLogged(true)
	}

	const logout = () => {
		setUser(null)
		setLogged(false)
	}

	const values = {
		isLogged,
		user,
		setUser: updateUserInfo,
		logout,
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext
