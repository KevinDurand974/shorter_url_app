import { useEffect } from "react"

const copy = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
	} catch (err) {
		throw new Error("Cannot use Clipboard API")
	}
}

const paste = async (text: string) => {
	try {
		return navigator.clipboard.readText()
	} catch (err) {
		throw new Error("Cannot use Clipboard API")
	}
}

const useClipboard = () => {
	return { copy, paste }
}

export default useClipboard
