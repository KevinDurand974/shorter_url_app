function storageAvailable() {
	try {
		const storage = window["sessionStorage"]
		const x = "__storage_test__"
		storage.setItem(x, x)
		storage.removeItem(x)
		return true
	} catch (e) {
		return false
	}
}

const getSessionValue = (name: string) => {
	return sessionStorage.getItem(name)
}

const setSessionValue = (name: string, value: unknown) => {
	const v = typeof value === "string" ? value : JSON.stringify(value)
	sessionStorage.setItem(name, v)
}

const removeSessionValue = (name: string) => {
	sessionStorage.removeItem(name)
}

const useSessionStorage = () => {
	if (storageAvailable()) {
		return {
			getSessionValue,
			setSessionValue,
			removeSessionValue,
		}
	}
	throw new Error("Cannot use Session Storage.")
}

export default useSessionStorage
