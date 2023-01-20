import { useEffect, useState } from "react"
import { MdCheck } from "react-icons/md"
import useForm from "./useForm"

type Props = {
	name: string
	label: string
	disabled?: boolean
	checked?: boolean
	className?: string
	textPosition?: "left" | "right"
	onChange?: (value: boolean) => void
}

const Checkbox = ({
	name,
	textPosition,
	label,
	onChange,
	className,
	checked,
	disabled,
}: Props) => {
	const { getInputValue, addInputValue } = useForm()
	const [isTruth, setTruth] = useState(getInputValue(name) || false)

	const textPos =
		!textPosition || textPosition === "right" ? "" : "flex-row-reverse"
	const showCheck = isTruth
		? "scale-100 opacity-100 rotate-0"
		: "scale-0 opacity-0 -rotate-45"

	const handleOnChange = () => {
		if (disabled) return
		const inverse = !isTruth
		setTruth(inverse)
		addInputValue(name, inverse)
		if (onChange) onChange(inverse)
	}

	useEffect(() => {
		if (checked) {
			setTruth(true)
			addInputValue(name, true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked])

	return (
		<div className={`flex gap-4 items-center ${textPos}`}>
			<button
				type="button"
				onClick={handleOnChange}
				className="outline-none group relative disabled:grayscale"
				disabled={disabled}
			>
				<div
					className={`relative ${
						className ||
						"h-8 w-8 border-4 bg-gray-700/60 shadow-lg shadow-transparent hover:shadow-gray-700/50 transition-all duration-[0.4s]"
					}`}
				>
					<MdCheck
						className={`absolute origin-[0rem 1rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl transition-all duration-[0.4s] ease-in-out ${showCheck}`}
					/>
				</div>
				<div className="absolute -inset-1 border-2 border-transparent group-focus:border-white/50 transition-all" />
			</button>
			<label
				onClick={handleOnChange}
				role="button"
				className={disabled ? "cursor-default" : ""}
			>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
