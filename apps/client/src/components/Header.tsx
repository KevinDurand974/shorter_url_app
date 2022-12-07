import Image from "next/image"
import Link from "next/link"
import { LogoColors } from "./svg"

const Header = () => {
	return (
		<header className="w-full flex items-center p-4 flex-shrink-0 justify-between flex-wrap mb-4 box">
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
