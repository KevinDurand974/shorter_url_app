import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useEffect, useRef } from "react"
import { trpc } from "@libs/trpc"
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

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex justify-evenly mb-2 sm:mb-4 relative gap-2">
				<div className="flex justify-center items-center absolute sm:static inset-0 sm:inset-auto -z-10 opacity-20 sm:opacity-100 overflow-hidden sm:overflow-auto">
					<Add className="h-48 w-48" />
				</div>
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="font-fredoka sm:text-2xl text-center">
						Create simple url like:
					</h1>
					<div className="flex flex-col gap-4 sm:gap-2 justify-center items-center">
						<div className="flex flex-col gap-1 sm:gap-2">
							<p className="flex flex-col items-center justify-center sm:block text-xs sm:text-base">
								<span className="url">kurl.app/############</span> will redirect
								to a certain url.
							</p>
							<p className="flex flex-col items-center justify-center sm:block text-xs sm:text-base">
								<span className="url">kurl.app/############</span> will redirect
								you to another.
							</p>
							<p className="flex flex-col items-center justify-center sm:block text-xs sm:text-base">
								<span className="url">kurl.app/...</span> and again and again...
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="p-2 sm:p-4 box flex justify-evenly mb-2 sm:mb-4 relative gap-2">
				<div className="flex flex-col gap-1 sm:gap-2 justify-center items-center">
					<h1 className="font-fredoka sm:text-2xl text-center">
						Create personal url:
					</h1>
					<div className="flex flex-col gap-4 sm:gap-2 justify-center items-center mb-2">
						<p className="flex flex-col items-center justify-center sm:block text-xs sm:text-base">
							<span className="url">kurl.app/pseudo</span> will redirect to your
							assigned url.
						</p>
					</div>

					<h1 className="font-fredoka sm:text-2xl text-center">
						Or better, personal and safe:
					</h1>
					<div className="flex flex-col gap-4 sm:gap-2 justify-center items-center">
						<p className="flex flex-col items-center justify-center sm:block text-xs sm:text-base">
							<span className="url">kurl.app/pseudo/########</span> will
							redirect to a certain url.
						</p>
					</div>
				</div>

				<div className="flex justify-center items-center absolute sm:static inset-0 sm:inset-auto -z-10 opacity-20 sm:opacity-100 overflow-hidden sm:overflow-auto">
					<Add className="h-48 w-48" />
				</div>
			</section>

			<div className="flex flex-col sm:flex-row justify-evenly mb-2 sm:mb-4 gap-2 sm:gap-4">
				<section className="p-2 sm:p-4 sm:w-1/2 box flex flex-col items-center gap-2 sm:gap-4">
					<h1 className="font-fredoka sm:text-2xl text-center">Free Tier</h1>
					<div className="my-auto sm:w-3/4">
						<ul className="list-disc list-inside flex flex-col gap-2 text-xs sm:text-base">
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

				<section className="p-2 sm:p-4 sm:w-1/2 box flex flex-col items-center gap-2 sm:gap-4">
					<h1 className="font-fredoka sm:text-2xl text-center">
						Subcriber Tier
					</h1>
					<div className="my-auto sm:w-3/4">
						<ul className="list-disc list-inside flex flex-col gap-2 my-auto text-xs sm:text-base">
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

			<section className="p-2 sm:p-4 box flex justify-evenly mb-2 sm:mb-4 relative gap-2">
				<div className="flex flex-col gap-2 items-center justify-evenly">
					<h1 className="font-fredoka sm:text-2xl text-center">
						Stop making urls with 500 characters when you share a link!
					</h1>

					<div className="flex flex-col sm:flex-row gap-2 items-center justify-center text-xs sm:text-base">
						<span>Want to create shorter one?</span>
						<button
							type="button"
							className="tracking-wider font-fredoka px-3 py-1 cta"
						>
							Create an Account
						</button>
					</div>
				</div>
				<div className="flex justify-center items-center absolute sm:static inset-0 sm:inset-auto -z-10 opacity-20 sm:opacity-100 overflow-hidden sm:overflow-auto">
					<Close className="h-48 w-48" />
				</div>
			</section>

			<section className="p-2 sm:p-4 box relative flex flex-col justify-center items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
				<h1 className="font-fredoka sm:text-2xl text-center sm:col-span-2">
					[Q/A] Questions / Answers
				</h1>
				<div className="flex items-center justify-center">
					<div className="flex flex-col gap-2 sm:gap-4">
						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								Why urls aren&apos;t from the same domain?
							</h4>
							<p className="text-xs sm:text-base">
								It is much easier to do with another, moreover, the domain used
								to create these urls is shorter than the current domain.
							</p>
						</div>

						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								Why creating this app when apps like cutt.ly or bit.ly exist?
							</h4>
							<p className="text-xs sm:text-base">
								I will say, at the begining that&apos;s was only for me. But
								after thinking about it, I decided to share it. And why? Because
								I don&apos;t want to use these apps...
							</p>
						</div>

						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								Why such colors?
							</h4>
							<p className="text-xs sm:text-base">Because...</p>
						</div>

						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								Why do cookies need to know about our country?
							</h4>
							<p className="text-xs sm:text-base">
								Just to do some analytics for anyone who wanted it. Refusing the
								cookie will save your country as undefined.
							</p>
						</div>

						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								Why did you not have a company tier?
							</h4>
							<p className="text-xs sm:text-base">
								This is not a worldwide service, if this app really work, why
								not try to create one...
							</p>
						</div>

						<div>
							<h4 className="font-bold tracking-wide sm:text-lg custom-underline before:right-0 before:bottom-0 w-fit mb-1 text-sm">
								How Subcriber tier work?
							</h4>
							<p className="text-xs sm:text-base">
								It&apos;s monthly paid, each tier will unlock more urls.
								It&apos;s relatively cheap.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				className="p-2 sm:p-4 box relative flex flex-col justify-center items-center gap-2 sm:gap-4"
				ref={moreInfoRef}
			>
				<h1 className="font-fredoka sm:text-2xl text-center sm:col-span-2">
					Explanatory notes
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
					<div className="flex gap-2 items-center">
						<span className="url w-4 sm:w-8 px-0 text-center text-[0.5rem] sm:text-base">
							1
						</span>
						<p className="text-xs sm:text-base">
							Doesn&apos;t count the personal url.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 sm:w-8 px-0 text-center text-[0.5rem] sm:text-base">
							2
						</span>
						<p className="text-xs sm:text-base">
							Depend of each subscriber tier you choose.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 sm:w-8 px-0 text-center text-[0.5rem] sm:text-base">
							3
						</span>
						<p className="text-xs sm:text-base">
							Work in progress, will be released at older time.
						</p>
					</div>
					<div className="flex gap-2 items-center">
						<span className="url w-4 sm:w-8 px-0 text-center text-[0.5rem] sm:text-base">
							4
						</span>
						<p className="text-xs sm:text-base">
							Work in progress, will be released after extension.
						</p>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export default Home
