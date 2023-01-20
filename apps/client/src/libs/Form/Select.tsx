import useOnOutsideElementClick from "@hooks/useOnOutsideElementClick"
import { useState, useRef } from "react"
import { BsCaretUpSquareFill } from "react-icons/bs"
import useForm from "./useForm"

type Props = {
	name: string
	choices: readonly string[]
	onChoice?: (choice: string) => void
	disabled?: boolean
}

const Select = ({ choices, onChoice, name, disabled }: Props) => {
	const { getInputValue, addInputValue } = useForm()

	const defaultValue = (getInputValue(name) as string) ?? choices[0]

	const [isSelectOpened, setOpeningSelect] = useState(false)

	const toggleSelectNavigation = () => {
		setOpeningSelect(!isSelectOpened)
	}

	const closeSelect = () => {
		if (isSelectOpened) setOpeningSelect(false)
	}

	const handleChoice = (value: string) => {
		addInputValue(name, value)
		if (onChoice) onChoice(value)
		toggleSelectNavigation()
	}

	const showNav = isSelectOpened ? "scale-y-100" : "scale-y-0"

	const divRef = useRef<HTMLDivElement>(null)
	useOnOutsideElementClick(divRef, closeSelect)

	return (
		<div ref={divRef} className="relative" role="select">
			<button
				type="button"
				onClick={toggleSelectNavigation}
				className="flex gap-4 items-center font-fredoka tracking-wider min-w-[150px] justify-center h-full bg-accent/75 focus:bg-gradient-to-tr focus:from-gradient-top focus:to-gradient-bottom outline-none transition-all duration-[0.4s] disabled:grayscale"
				disabled={disabled}
			>
				{defaultValue}
				<BsCaretUpSquareFill
					className={`transition-all duration-300 ${
						isSelectOpened ? "rotate-0" : "rotate-180"
					}`}
				/>
			</button>

			<div
				className={`absolute transition-all duration-300 ease-in-out origin-top flex flex-col ${showNav} bg-t-alt border-2 border-image w-full mt-2 border-collapse z-50`}
			>
				{choices.map((c) => (
					<button
						type="button"
						key={c.toLowerCase()}
						onClick={() => handleChoice(c)}
						className={`p-3 w-full text-left hover:bg-gradient-to-tr hover:from-gradient-top hover:to-gradient-bottom border border-gradient-top font-fredoka tracking-wider ${
							defaultValue === c &&
							"bg-gradient-to-tr from-gradient-top/50 to-gradient-bottom/50"
						} outline-none focus:bg-gradient-to-tr focus:from-gradient-top focus:to-gradient-bottom`}
						tabIndex={isSelectOpened ? 0 : -1}
					>
						{c}
					</button>
				))}
			</div>
		</div>
	)
}

export default Select
