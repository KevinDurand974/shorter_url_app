import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { HiUserCircle } from "react-icons/hi2"
import { TbListDetails } from "react-icons/tb"
import {
	RiAddCircleLine,
	RiLoginBoxLine,
	RiLogoutBoxLine,
} from "react-icons/ri"
import { AuthContext } from "@contexts"
import useHasMounted from "@hooks/useHasMounted"
import { LogoColors } from "./svg"

const Header = () => {
	const { isLogged } = useContext(AuthContext)
	const hasMounted = useHasMounted()

	const [{ headerOpacity, separatorColor }, setScrollY] = useState({
		headerOpacity: "before:bg-black/0",
		separatorColor: "bg-black/20",
	})

	useEffect(() => {
		const onScroll = () => setScrollY(UpdateOnScroll(window.scrollY))
		window.addEventListener("scroll", onScroll)
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const UpdateOnScroll = (scrollY: number) => {
		if (scrollY > 0)
			return {
				headerOpacity: "before:bg-black/80",
				separatorColor: "bg-text/10",
			}
		return { headerOpacity: "before:bg-black/0", separatorColor: "bg-black/20" }
	}

	return (
		<header
			className={`w-full flex items-center p-2 sm:p-4 flex-shrink-0 justify-between flex-wrap mb-2 sm:mb-4 box sticky top-2 sm:top-4 z-20 before:absolute before:inset-0 before:z-10 before:rounded-xl before:transition-all before:duration-[0.4s] ${headerOpacity}`}
		>
			<Link href="/">
				<a
					className="flex flex-wrap items-center gap-1 sm:gap-2 z-10"
					tabIndex={0}
					aria-label="Home"
				>
					<LogoColors className="h-5 w-5 sm:h-10 sm:w-10" />
					<h4 className="font-fredoka caps-small sm:text-3xl">Url Shorten</h4>
				</a>
			</Link>

			<nav className="flex flex-wrap items-center gap-2 sm:gap-4 font-fredoka tracking-wide">
				<Link href="/create">
					<a
						className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
						tabIndex={0}
						aria-label="Create Url"
					>
						<RiAddCircleLine className="h-5 w-5 sm:h-7 sm:w-7" />
						<span className="hidden sm:block">Create Url</span>
					</a>
				</Link>
				<div
					className={`h-5 sm:h-8 w-[1px] z-10 ${separatorColor} transition-all duration-[0.4s]`}
				/>
				<Link href="/explorer">
					<a
						className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
						tabIndex={0}
						aria-label="My Urls"
					>
						<TbListDetails className="h-5 w-5 sm:h-7 sm:w-7" />
						<span className="hidden sm:block">My Urls</span>
					</a>
				</Link>
				<div
					className={`h-5 sm:h-8 w-[1px] z-10 ${separatorColor} transition-all duration-[0.4s]`}
				/>
				{isLogged && hasMounted ? (
					<>
						<Link href="/account">
							<a
								className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
								tabIndex={0}
								aria-label="Account"
							>
								<HiUserCircle className="h-5 w-5 sm:h-7 sm:w-7" />
								<span className="hidden sm:block">Account</span>
							</a>
						</Link>
						<div
							className={`h-5 sm:h-8 w-[1px] z-10 ${separatorColor} transition-all duration-[0.4s]`}
						/>
						<Link href="/logout">
							<a
								className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
								tabIndex={0}
								aria-label="Logout"
							>
								<RiLogoutBoxLine className="h-5 w-5 sm:h-7 sm:w-7" />
								<span className="hidden sm:block">Logout</span>
							</a>
						</Link>
					</>
				) : (
					<Link href="/login">
						<a
							className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
							tabIndex={0}
							aria-label="Login"
						>
							<RiLoginBoxLine className="h-5 w-5 sm:h-7 sm:w-7" />
							<span className="hidden sm:block">Login / Register</span>
						</a>
					</Link>
				)}
			</nav>
		</header>
	)
}

export default Header
