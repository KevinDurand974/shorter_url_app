import useHasMounted from "@hooks/useHasMounted"
import { PropsWithChildren, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { RiCloseCircleFill } from "react-icons/ri"
import { Close } from "./svg"

type Props = PropsWithChildren<{
	isOpen: boolean
	close: () => void
	title?: string | ""
}>

const Modal = ({ children, close, isOpen, title }: Props) => {
	if (!useHasMounted()) return null

	const openModalStyle = isOpen
		? "opacity-100 pointer-events-auto"
		: "opacity-0 pointer-events-none"

	const handleClose = () => {
		close()
	}

	const insideModalHTML = (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<div className="flex flex-col gap-4 box p-16 from-gradient-top/90 to-gradient-bottom/90 relative w-screen max-w-screen-lg">
				<button
					className="absolute top-4 right-4 transition-all duration-[0.4s] ease-in-out hover:rotate-90 hover:scale-110"
					onClick={() => handleClose()}
				>
					<Close className="h-9 w-9" />
				</button>
				{title ? (
					<h1 className="text-3xl font-fredoka tracking-wider text-center">
						{title}
					</h1>
				) : null}
				{children}
			</div>
		</div>
	)

	const modalHTML = (
		<div
			className={`fixed inset-0 z-[999] transition-all duration-[0.4s] ${openModalStyle}`}
		>
			<div
				className="bg-black/75 absolute inset-0"
				role="button"
				onClick={() => handleClose()}
			/>
			{!isOpen ? null : insideModalHTML}
		</div>
	)

	return createPortal(modalHTML, document.getElementById("modal")!)
}

export default Modal
