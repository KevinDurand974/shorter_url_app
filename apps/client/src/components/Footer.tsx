import Link from "next/link"
import { Logo } from "./svg"

const Footer = () => {
	return (
		<footer className="w-full flex items-center p-2 sm:p-4 flex-shrink-0 justify-evenly flex-wrap box mt-2 sm:mt-4">
			<div className="hidden sm:flex gap-2 items-center">
				<Logo className="w-10 h-10" background="rgba(0,0,0,0.4)" />
				<h4 className="font-fredoka caps-small sm:text-3xl">Url Shorten</h4>
			</div>
			<ul className="sm:list-disc w-full sm:w-auto text-center sm:text-left">
				<li className="text-xs sm:text-base flex items-center gap-1 justify-center sm:list-item">
					<Logo
						className="w-3 h-3 inline-block sm:hidden"
						background="rgba(0,0,0,0.4)"
					/>
					2022 - 2023 · KDWeb v1.0 · Sous licence MIT
				</li>
				<li className="hidden sm:list-item">
					Pour signaler des potentiels bugs, rendez-vous{" "}
					<Link href="/">
						<a className="custom-underline before:right-0 hover:px-2 tracking-widest font-fredoka transition-all">
							ici
						</a>
					</Link>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
