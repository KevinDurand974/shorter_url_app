import Image from "next/image"
import { useEffect, useState } from "react"

const ScrollTop = () => {
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	const [hidden, setHidden] = useState("hidden")

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 0) {
				console.log("??")
				setHidden("scale-100")
			} else {
				setHidden("scale-0")
			}
		}

		window.addEventListener("scroll", onScroll)

		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`fixed z-50 right-4 bottom-4 w-10 h-10 sm:w-16 sm:h-16 ${hidden} transition-all duration-500`}
		>
			<Image src="/rocket.svg" alt="Scroll to top" layout="fill" />
		</button>
	)
}

export default ScrollTop
