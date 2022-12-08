import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useEffect, useRef } from "react"
import { trpc } from "@libs/trpc"
import { TiCancel } from "react-icons/ti"
import { Add, Close } from "@components/svg"

const Home: NextPage = () => {
	useEffect(() => {
		const run = async () => {
			// const test = await trpc...
		}
		run()
	}, [])

	const moreInfoRef = useRef<HTMLElement>(null)
	const handleScrollToMoreInfo = () => {
		let header = document.querySelector("header")
		const el = moreInfoRef.current
		if (!header || !el) return
		const { bottom, top } = header.getBoundingClientRect()
		window.scrollTo({
			top: Math.max(el.offsetTop - bottom + top, 0),
			behavior: "smooth",
		})
	}

	return (
		<Fragment>
			<Head>
				<title>Url Shorten - Home</title>
				<meta
					name="description"
					content="Create shorten url and share it to any one freely. Create an account and begin your adventure throught the world of urls!"
				/>
			</Head>

			<section className="p-2 md:p-4 box flex justify-evenly mb-2 md:mb-4 relative gap-2">
				<div className="flex justify-center items-center absolute md:static inset-0 md:inset-auto -z-10 opacity-20 md:opacity-100 overflow-hidden md:overflow-auto">
					<Add className="h-48 w-48" />
				</div>
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="font-fredoka md:text-2xl text-center">
						Create simple url like:
					</h1>
					<div className="flex flex-col gap-4 md:gap-2 justify-center items-center">
						<div className="flex flex-col gap-1 md:gap-2">
							<p className="flex flex-col items-center justify-center md:block text-xs md:text-base">
								<span className="url">kurl.app/############</span> will redirect
								to a certain url.
							</p>
							<p className="flex flex-col items-center justify-center md:block text-xs md:text-base">
								<span className="url">kurl.app/############</span> will redirect
								you to another.
							</p>
							<p className="flex flex-col items-center justify-center md:block text-xs md:text-base">
								<span className="url">kurl.app/...</span> and again and again...
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="p-2 md:p-4 box flex justify-evenly mb-2 md:mb-4 relative gap-2">
				<div className="flex flex-col gap-1 md:gap-2 justify-center items-center">
					<h1 className="font-fredoka md:text-2xl text-center">
						Create personal url:
					</h1>
					<div className="flex flex-col gap-4 md:gap-2 justify-center items-center mb-2">
						<p className="flex flex-col items-center justify-center md:block text-xs md:text-base">
							<span className="url">kurl.app/pseudo</span> will redirect to your
							assigned url.
						</p>
					</div>

					<h1 className="font-fredoka md:text-2xl text-center">
						Or better, personal and safe:
					</h1>
					<div className="flex flex-col gap-4 md:gap-2 justify-center items-center">
						<p className="flex flex-col items-center justify-center md:block text-xs md:text-base">
							<span className="url">kurl.app/pseudo/########</span> will
							redirect to a certain url.
						</p>
					</div>
				</div>

				<div className="flex justify-center items-center absolute md:static inset-0 md:inset-auto -z-10 opacity-20 md:opacity-100 overflow-hidden md:overflow-auto">
					<Add className="h-48 w-48" />
				</div>
			</section>

			<div className="flex flex-col md:flex-row justify-evenly mb-2 md:mb-4 gap-2 md:gap-4">
				<section className="p-2 md:p-4 md:w-1/2 box flex flex-col items-center gap-2 md:gap-4">
					<h1 className="font-fredoka md:text-2xl text-center">Free Tier</h1>
					<div className="my-auto md:w-3/4">
						<ul className="list-disc list-inside flex flex-col gap-2 text-xs md:text-base">
							<li>
								250 urls
								<button
									type="button"
									className="text-[0.6rem] leading-4 align-top custom-underline before:bottom-0 px-1"
									onClick={handleScrollToMoreInfo}
								>
									1
								</button>
							</li>
							<li>2 ways to create urls</li>
							<li>A personal url</li>
							<li>Limited analytics</li>
						</ul>
					</div>
				</section>

				<section className="p-2 md:p-4 md:w-1/2 box flex flex-col items-center gap-2 md:gap-4">
					<h1 className="font-fredoka md:text-2xl text-center">
						Subcriber Tier
					</h1>
					<div className="my-auto md:w-3/4">
						<ul className="list-disc list-inside flex flex-col gap-2 my-auto text-xs md:text-base">
							<li>Same as Free tier</li>
							<li>
								Up to 2000 urls
								<button
									type="button"
									className="text-[0.6rem] leading-4 align-top custom-underline before:bottom-0 px-1"
									onClick={handleScrollToMoreInfo}
								>
									2
								</button>
							</li>
							<li>New ways to create urls</li>
							<li>Custom urls when using personal</li>
							<li>Shorter urls when using personal</li>
							<li>Full analytics</li>
							<li>
								Access to navigator extension
								<button
									type="button"
									className="text-[0.6rem] leading-4 align-top custom-underline before:bottom-0 px-1"
									onClick={handleScrollToMoreInfo}
								>
									3
								</button>
							</li>
							<li>
								An access to API
								<button
									type="button"
									className="text-[0.6rem] leading-4 align-top custom-underline before:bottom-0 px-1"
									onClick={handleScrollToMoreInfo}
								>
									4
								</button>
							</li>
						</ul>
					</div>
				</section>
			</div>

			<section className="p-2 md:p-4 box flex justify-evenly mb-2 md:mb-4 relative gap-2">
				<div className="flex flex-col gap-2 items-center justify-evenly">
					<h1 className="font-fredoka md:text-2xl text-center">
						Stop making urls with 500 characters when you share a link!
					</h1>

					<div className="flex flex-col md:flex-row gap-2 items-center justify-center text-xs md:text-base">
						<span>Want to create shorter one?</span>
						<button
							type="button"
							className="tracking-wider font-fredoka px-3 py-1 cta"
						>
							Create an Account
						</button>
					</div>
				</div>
				<div className="flex justify-center items-center absolute md:static inset-0 md:inset-auto -z-10 opacity-20 md:opacity-100 overflow-hidden md:overflow-auto">
					<Close className="h-48 w-48" />
				</div>
			</section>

			<section
				className="p-2 md:p-4 box relative flex flex-col justify-center items-center gap-2 md:gap-4"
				ref={moreInfoRef}
			>
				<h1 className="font-fredoka md:text-2xl text-center md:col-span-2">
					Explanatory notes
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
					<div className="flex gap-2 items-center">
						<span className="url w-4 md:w-8 px-0 text-center text-[0.5rem] md:text-base">
							1
						</span>
						<p className="text-xs md:text-base">
							Doesn&apos;t count the personal url.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 md:w-8 px-0 text-center text-[0.5rem] md:text-base">
							2
						</span>
						<p className="text-xs md:text-base">
							Depend of each subscriber tier you choose.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 md:w-8 px-0 text-center text-[0.5rem] md:text-base">
							3
						</span>
						<p className="text-xs md:text-base">
							Work in progress, will be released at older time.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 md:w-8 px-0 text-center text-[0.5rem] md:text-base">
							4
						</span>
						<p className="text-xs md:text-base">
							Work in progress, will be released after extension.
						</p>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Home
