import useClipboard from "@hooks/useClipboard"
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type Props = PropsWithChildren<{
	copy: string
	disabled?: boolean
}>

const CopyButton = ({ copy, children, disabled }: Props) => {
	const clipboard = useClipboard()
	const [onCopy, setOnCopy] = useState(false)

	const handleCopyLink = async () => {
		await clipboard.copy(copy)
		setOnCopy(true)
	}

	useEffect(() => {
		let timeout: any
		if (onCopy) {
			timeout = setTimeout(() => {
				setOnCopy(false)
			}, 500)
		}

		return () => {
			if (timeout) clearTimeout(timeout)
		}
	}, [onCopy])

	return (
		<button
			type="button"
			disabled={disabled}
			className="text-3xl cta p-2 mr-2 disabled:grayscale disabled:pointer-events-none"
			onClick={handleCopyLink}
		>
			{onCopy ? (
				<AiOutlineLoading3Quarters className="animate-spin" />
			) : (
				children
			)}
		</button>
	)
}

export default CopyButton
