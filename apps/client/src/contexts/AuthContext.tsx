import useLocalStorage from "@hooks/useLocalStorage"
import { createContext, PropsWithChildren, useEffect, useState } from "react"

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

	const { isStorageAvailable, getStorageValue } = useLocalStorage()

	useEffect(() => {
		if (isStorageAvailable()) {
			const loggedIn = !!getStorageValue("logged_in")
			if (loggedIn) {
				setLogged(true)
			} else {
				setLogged(false)
			}
		}
	}, [getStorageValue, isStorageAvailable])

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
