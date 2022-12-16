function storageAvailable() {
	try {
		const storage = window["localStorage"]
		const x = "__storage_test__"
		storage.setItem(x, x)
		storage.removeItem(x)
		return true
	} catch (e) {
		return false
	}
}

const getStorageValue = (name: string) => {
	return localStorage.getItem(name)
}

const setStorageValue = (name: string, value: unknown) => {
	const v = typeof value === "string" ? value : JSON.stringify(value)
	localStorage.setItem(name, v)
}

const removeStorageValue = (name: string) => {
	localStorage.removeItem(name)
}

const useLocalStorage = () => {
	if (storageAvailable()) {
		return {
			getStorageValue,
			setStorageValue,
			removeStorageValue,
		}
	}
	throw new Error("Cannot use Local Storage.")
}

export default useLocalStorage
