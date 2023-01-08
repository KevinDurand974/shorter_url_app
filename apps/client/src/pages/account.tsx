import { Modal } from "@components"
import {
	ChangeEmail,
	ChangePassword,
	ChangePseudo,
	ChangeUrlName,
} from "@components/form"
import { getUserDataServer } from "@libs/trpcSsr"
import { Profile } from "@shorter/backend/dist/entities"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { BsFillQuestionCircleFill } from "react-icons/bs"
import {
	MdAlternateEmail,
	MdDelete,
	MdExtension,
	MdLoop,
	MdRestore,
	MdSecurity,
} from "react-icons/md"
import { TbChevronsRight } from "react-icons/tb"
import { TiUser } from "react-icons/ti"

type Props = {
	userData: Profile
}

const AccountSettingsPage = (props: Props) => {
	const [userData, setUserData] = useState(props.userData)

	const [openEmailModal, setOpenEmailModal] = useState(false)
	const [openPasswordModal, setOpenPasswordModal] = useState(false)
	const [openPseudoModal, setOpenPseudoModal] = useState(false)
	const [openUrlNameModal, setOpenUrlNameModal] = useState(false)
	const { push } = useRouter()

	useEffect(() => {
		if (!userData) push("/login")
	}, [push, userData])

	const handleUpdatePseudo = (newPseudo: string) => {
		setUserData((old) => ({
			...old,
			user: {
				...old.user,
				pseudo: newPseudo,
			},
		}))
		setOpenPseudoModal(false)
	}

	const handleUpdateUrlName = (newUrlName: string) => {
		setUserData((old) => ({
			...old,
			urlName: newUrlName,
		}))
		setOpenUrlNameModal(false)
	}

	if (!userData) return <div>Redirect to login page...</div>

	return (
		<Fragment>
			<Head>
				<title>My Account Settings - Url Shorten</title>
				<meta name="description" content="Change your account settings." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex flex-col gap-4 w-full">
				<h1 className="font-fredoka sm:text-3xl text-center">
					Account Settings
				</h1>

				<div className="box flex flex-col gap-4 p-4">
					<h2 className="font-fredoka text-sm sm:text-2xl border-image border-2 sm:border-4 w-fit px-4 py-1 uppercase tracking-widest">
						Profil
					</h2>

					<div className="grid sm:grid-profil-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdAlternateEmail />
							Email
						</h3>
						<p className="url w-fit">{userData.user.email}</p>
						<button
							type="button"
							aria-label="Change email"
							className="text-3xl cta flex items-center w-fit p-2 before:bottom-0 relative group hover:mr-2 transition-all duration-[0.4s]"
							onClick={() => setOpenEmailModal(true)}
						>
							<BiEdit />

							<span className="text-base font-fredoka tracking-wider ml-2 absolute right-full mr-4 -translate-x-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.4s] text-text">
								Change
							</span>
						</button>
						<Modal
							isOpen={openEmailModal}
							close={() => setOpenEmailModal(false)}
							title="Change your email"
						>
							<ChangeEmail currentEmail={userData.user.email} />
						</Modal>
					</div>

					<div className="grid grid-profil-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdSecurity />
							Password
						</h3>
						<p className="url w-fit">The one you put when you registered</p>
						<button
							type="button"
							aria-label="Change email"
							className="text-3xl cta flex items-center w-fit p-2 before:bottom-0 relative group hover:mr-2 transition-all duration-[0.4s]"
							onClick={() => setOpenPasswordModal(true)}
						>
							<BiEdit />

							<span className="text-base font-fredoka tracking-wider ml-2 absolute right-full mr-4 -translate-x-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.4s] text-text">
								Change
							</span>
						</button>
						<Modal
							isOpen={openPasswordModal}
							close={() => setOpenPasswordModal(false)}
							title="Change your password"
						>
							<ChangePassword />
						</Modal>
					</div>

					<div className="grid grid-profil-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TiUser />
							Pseudo
						</h3>
						<p className="url w-fit">{userData.user.pseudo}</p>
						<button
							type="button"
							aria-label="Change email"
							className="text-3xl cta flex items-center w-fit p-2 before:bottom-0 relative group hover:mr-2 transition-all duration-[0.4s]"
							onClick={() => setOpenPseudoModal(true)}
						>
							<BiEdit />

							<span className="text-base font-fredoka tracking-wider ml-2 absolute right-full mr-4 -translate-x-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.4s] text-text">
								Change
							</span>
						</button>
						<Modal
							isOpen={openPseudoModal}
							close={() => setOpenPseudoModal(false)}
							title="Change your pseudo"
						>
							<ChangePseudo
								pseudo={userData.user.pseudo}
								closeModal={handleUpdatePseudo}
							/>
						</Modal>
					</div>

					<div className="grid grid-profil-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdExtension />
							Personal URL
						</h3>
						<p className="url w-fit">{userData.urlName}</p>
						<button
							type="button"
							aria-label="Change email"
							className="text-3xl cta flex items-center w-fit p-2 before:bottom-0 relative group hover:mr-2 transition-all duration-[0.4s]"
							onClick={() => setOpenUrlNameModal(true)}
						>
							<BiEdit />

							<span className="text-base font-fredoka tracking-wider ml-2 absolute right-full mr-4 -translate-x-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[0.4s] text-text">
								Change
							</span>
						</button>
						<Modal
							isOpen={openUrlNameModal}
							close={() => setOpenUrlNameModal(false)}
							title="Change your personal url"
						>
							<ChangeUrlName
								urlName={userData.urlName}
								closeModal={handleUpdateUrlName}
							/>
						</Modal>
					</div>

					{/* IF email not verified */}
					{!!userData.verified && (
						<div className="flex items-center gap-2 px-4 py-2 border-2 border-warning rounded-full w-fit bg-warning/70 font-fredoka tracking-wide mx-auto">
							<BsFillQuestionCircleFill />
							<span>
								Please verify your email address to access the full application.
							</span>
							<button
								className="simple-url"
								type="button"
								aria-label="Resend email verification"
							>
								Resend verification
							</button>
						</div>
					)}
				</div>

				<div className="box flex flex-col gap-4 p-4">
					<h2 className="font-fredoka text-2xl border-image border-4 w-fit px-4 py-1 uppercase tracking-widest">
						Urls Statistics
					</h2>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Current Tier
						</h3>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">
							Free
						</p>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2 relative">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Max Url available
						</h3>
						<div className="absolute text-xs left-10 bottom-0 text-muted">
							Not counting your own personal Url
						</div>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">
							{userData.maxUrls}
						</p>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Currently used
						</h3>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">
							{userData.maxUrls - userData.availableUrls} (
							{Math.min(
								Math.round(
									((userData.maxUrls - userData.availableUrls) /
										userData.maxUrls) *
										100
								),
								100
							)}
							%)
						</p>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Global url
						</h3>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">N/A</p>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Using your personal url
						</h3>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">N/A</p>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<TbChevronsRight />
							Total number of usage
						</h3>
						<p className="url text-right mr-2 min-w-[50%] w-fit ml-auto">N/A</p>
					</div>
				</div>

				<div className="box flex flex-col gap-4 p-4">
					<h2 className="font-fredoka text-2xl border-image border-4 w-fit px-4 py-1 uppercase tracking-widest">
						Account
					</h2>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdLoop />
							Reset password
						</h3>
						<button
							type="button"
							className="w-fit ml-auto cta before:-bottom-1 px-5 py-2"
						>
							Reset my password
						</button>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdRestore />
							Reset Account (Urls)
						</h3>
						<button
							type="button"
							className="w-fit ml-auto cta before:-bottom-1 px-5 py-2"
						>
							Reset me
						</button>
					</div>

					<div className="grid grid-stats-account items-center bg-gradient-to-l from-black/20 rounded-full px-2 py-2">
						<h3 className="font-bold text-xl tracking-wider w-fit px-1 flex gap-2 items-center">
							<MdDelete />
							Delete Account (All)
						</h3>
						<button
							type="button"
							className="w-fit ml-auto cta before:-bottom-1 px-5 py-2"
						>
							Bye bye my account
						</button>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const userData = await getUserDataServer(req.headers.cookie)
		if (!userData) throw new Error("User not exist!")
		return {
			props: {
				userData,
			},
		}
	} catch (err: any) {
		return {
			props: {
				userData: null,
			},
		}
	}
}

export default AccountSettingsPage
