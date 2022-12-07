import Image from "next/image"
import Link from "next/link"
import { LogoColors } from "./svg"

const Header = () => {
	return (
		<header className="w-full flex items-center bg-gradient-to-b from-black/10 to-black/30 p-4 flex-shrink-0 rounded-xl shadow-md shadow-t-alt/40 justify-between flex-wrap mb-4">
			<Link href="/">
				<a className="flex flex-wrap items-center gap-2">
					<LogoColors className="h-10 w-10" />
					<h4 className="font-fredoka caps-small text-3xl">Url Shorten</h4>
				</a>
			</Link>

			<nav>
				<Link href="/">Create Url</Link>
				<Link href="/">My Urls</Link>
				<Link href="/">Account</Link>
			</nav>
		</header>
	)
}

export default Header
