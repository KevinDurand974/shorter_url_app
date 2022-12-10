import { MouseEvent } from "react"

const TabSkipMenu = () => {
	const handleClick = (e: MouseEvent) => {
		;(e.currentTarget as HTMLElement).blur()
		document.querySelector<HTMLElement>("#main")!.focus()
	}

	return (
		<button
			type="button"
			className="text-center p-2 sm:p-4 box fixed top-2 sm:top-4 inset-x-0 w-fit mx-auto bg-gradient-to-br from-gradient-top to-gradient-bottom text-xl z-50 transition-all translate-y-[-250px] focus:translate-y-0"
			onClick={handleClick}
		>
			Skip to main content
		</button>
	)
}

export default TabSkipMenu
