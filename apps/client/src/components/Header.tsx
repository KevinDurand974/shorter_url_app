import Link from "next/link"
import { HiUserCircle } from "react-icons/hi2"
import { TbListDetails } from "react-icons/tb"
import { RiAddCircleLine } from "react-icons/ri"

import { LogoColors } from "./svg"

const Header = () => {
	return (
		<header className="w-full flex items-center p-2 md:p-4 flex-shrink-0 justify-between flex-wrap mb-2 md:mb-4 box">
			<Link href="/">
				<a className="flex flex-wrap items-center gap-1 md:gap-2">
					<LogoColors className="h-5 w-5 md:h-10 md:w-10" />
					<h4 className="font-fredoka caps-small md:text-3xl">Url Shorten</h4>
				</a>
			</Link>

			<nav className="flex flex-wrap items-center gap-2 md:gap-4 font-fredoka tracking-wide">
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center md:gap-2 md:px-2">
						<RiAddCircleLine className="h-5 w-5 md:h-7 md:w-7" />
						<span className="hidden md:block">Create Url</span>
					</a>
				</Link>
				<div className="h-5 md:h-8 w-[1px] bg-black/20" />
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center md:gap-2 md:px-2">
						<TbListDetails className="h-5 w-5 md:h-7 md:w-7" />
						<span className="hidden md:block">My Urls</span>
					</a>
				</Link>
				<div className="h-5 md:h-8 w-[1px] bg-black/20" />
				<Link href="/">
					<a className="custom-underline flex flex-wrap items-center md:gap-2 md:px-2">
						<HiUserCircle className="h-5 w-5 md:h-7 md:w-7" />
						<span className="hidden md:block">Account</span>
					</a>
				</Link>
			</nav>
		</header>
	)
}

export default Header
