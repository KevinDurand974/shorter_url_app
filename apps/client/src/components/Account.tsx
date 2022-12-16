import AuthContext from "contexts/AuthContext"
import Link from "next/link"
import { useContext, useMemo, useState } from "react"
import { HiUserCircle } from "react-icons/hi2"
import {
	RiUserSettingsLine,
	RiLogoutBoxRLine,
	RiLoginBoxLine,
	RiUserAddLine,
} from "react-icons/ri"

const Account = () => {
	const { isLogged, user } = useContext(AuthContext)

	const [isOpen, openMenu] = useState<boolean>(true)
	const styleOpenMenu = "scale-y-100"
	const styleClosedMenu = "scale-y-0"

	return (
		<>
			<button
				type="button"
				className="custom-underline flex flex-wrap items-center sm:gap-2 sm:px-2"
				aria-label="Account"
				onClick={() => openMenu(!isOpen)}
			>
				<HiUserCircle className="h-5 w-5 sm:h-7 sm:w-7" />
				<span className="hidden sm:block">Account</span>
			</button>

			<div
				className={`pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100 absolute p-4 sm:flex flex-col gap-4 right-0 top-full mt-4 bg-gradient-to-br from-gradient-top to-gradient-bottom/70 rounded-xl shadow-md shadow-t-alt/40 font-poppins origin-top transition-all duration-300 ${
					isOpen ? styleOpenMenu : styleClosedMenu
				}`}
			>
				{isLogged ? (
					<>
						<div>
							<h1 className="text-2xl text-center border-2 rounded-full text-text border-text mb-4 font-fredoka tracking-wider w-fit px-8 mx-auto">
								{user?.pseudo}
							</h1>

							<div className="flex gap-4 justify-center">
								<div className="box bg-gradient-to-br from-black/40 to-black/20 flex flex-col justify-center items-center gap-2 px-4 py-2">
									<h2 className="text-center custom-underline before:right-0 before:bottom-0 w-fit text-lg font-fredoka px-1">
										Max Urls
									</h2>
									<p className="font-semibold">{user?.vip ? "2000" : "250"}</p>
								</div>

								<div className="box bg-gradient-to-br from-black/40 to-black/20 flex flex-col justify-center items-center gap-2 px-4 py-2">
									<h2 className="text-center custom-underline before:right-0 before:bottom-0 w-fit text-lg font-fredoka px-1">
										Tier
									</h2>
									<div className="font-semibold flex items-center gap-2">
										<span>Free</span>
										<button type="button" className="cta px-3 py-1 uppercase">
											upgrade
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-4 justify-between">
							<Link href="/account">
								<a className="flex items-center gap-2 text-lg justify-center before:bg-gradient-to-r before:from-gradient-top before:to-accent custom-underline text-text py-1 font-fredoka w-fit mx-auto">
									<RiUserSettingsLine className="h-6 w-6" /> Settings
								</a>
							</Link>

							<Link href="/logout">
								<a className="flex items-center gap-2 text-lg justify-center before:bg-gradient-to-r before:from-gradient-top before:to-accent custom-underline text-text py-1 font-fredoka w-fit mx-auto">
									<RiLogoutBoxRLine className="h-6 w-6" /> Logout
								</a>
							</Link>
						</div>
					</>
				) : (
					<div className="flex flex-col gap-4 justify-between">
						<Link href="/login">
							<a className="flex items-center gap-2 text-lg justify-center before:bg-gradient-to-r before:from-gradient-top before:to-accent custom-underline text-text py-1 font-fredoka w-fit mx-auto">
								<RiLoginBoxLine className="h-6 w-6" /> Login
							</a>
						</Link>

						<Link href="/register">
							<a className="flex items-center gap-2 text-lg justify-center before:bg-gradient-to-r before:from-gradient-top before:to-accent custom-underline text-text py-1 font-fredoka w-fit mx-auto">
								<RiUserAddLine className="h-6 w-6" /> Register
							</a>
						</Link>
					</div>
				)}
			</div>
		</>
	)
}

export default Account
