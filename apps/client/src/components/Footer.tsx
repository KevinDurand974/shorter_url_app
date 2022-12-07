import Image from "next/image"
import Link from "next/link"
import { Logo } from "./svg"

const Footer = () => {
	return (
		<footer className="w-full flex items-center p-4 flex-shrink-0 justify-evenly flex-wrap mt-4 box">
			<div className="flex gap-2 items-center">
				<Logo className="w-10 h-10" background="rgba(0,0,0,0.4)" />
				<h4 className="font-fredoka caps-small text-3xl">Url Shorten</h4>
			</div>
			<ul className="list-disc">
				<li>2022 - KDWeb v1.0 - Sous licence MIT</li>
				<li>
					Pour signaler des potentiels bugs, rendez-vous{" "}
					<Link href="/">
						<a className="underline tracking-widest font-fredoka underline-offset-4">
							ici
						</a>
					</Link>
				</li>
			</ul>
		</footer>
	)
}

export default Footer
