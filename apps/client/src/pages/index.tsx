import type { NextPage } from "next"
import Head from "next/head"
import { Fragment, useEffect } from "react"
import { trpc } from "@libs/trpc"
import { TiCancel } from "react-icons/ti"
import { Close } from "@components/svg"

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

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>

			<section className="p-2 md:p-4 box grid grid-cols-3 grid-rows-2 mb-2 md:mb-4">
				<h1 className="font-fredoka text-2xl col-span-3 md:col-span-2 mt-4 text-center">
					Stop with urls with 500 characters when you share a link!
				</h1>
				<div className="hidden row-span-2 md:flex justify-center items-center">
					<Close className="h-48 w-48" />
				</div>
				<div className="col-span-3 md:col-span-2 flex flex-col md:flex-row gap-4 md:gap-2 items-center justify-center">
					<span>Want to create shorter one?</span>
					<button
						type="button"
						className="font-semibold tracking-wider px-3 py-1 cta"
					>
						Create an Account
					</button>
				</div>
			</section>
		</Fragment>
	)
}

export default Home
