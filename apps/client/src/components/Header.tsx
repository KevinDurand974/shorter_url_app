import Link from "next/link"
import { HiUserCircle } from "react-icons/hi2"
import { TbListDetails } from "react-icons/tb"
import { RiAddCircleLine } from "react-icons/ri"

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

			<nav className="flex flex-wrap items-center gap-4 font-fredoka tracking-wide">
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center gap-2 px-2">
						<RiAddCircleLine className="h-7 w-7" />
						Create Url
					</a>
				</Link>
				<div className="h-8 w-[1px] bg-black/20" />
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center gap-2 px-2">
						<TbListDetails className="h-7 w-7" />
						My Urls
					</a>
				</Link>
				<div className="h-8 w-[1px] bg-black/20" />
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center gap-2 px-2">
						<HiUserCircle className="h-7 w-7" /> Account
					</a>
				</Link>
			</nav>
		</header>
	)
}

export default Header
