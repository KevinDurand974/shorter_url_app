import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useEffect } from "react"
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
				<div className="flex flex-col gap-2 items-center justify-evenly">
					<h1 className="font-fredoka md:text-2xl text-center">
						Stop with urls with 500 characters when you share a link!
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
		</Fragment>
	)
}

export default Home
