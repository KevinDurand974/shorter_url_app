import {
	Button,
	ErrorMessage,
	Field,
	FormController,
	FormValues,
} from "@libs/Form"
import { trpc } from "@libs/trpc"
import { isAuthServer } from "@libs/trpcSsr"
import { createUserSchema, createUserDefaultSchema } from "@shorter/validators"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

type FormatedValues = {
	email: string
	password: string
	password2: string
	pseudo: string
	urlname: string
}

const RegisterPage = () => {
	const router = useRouter()

	const onSubmit = async (values: FormValues) => {
		try {
			const ac = new AbortController()
			await trpc.register.mutate(values as FormatedValues, {
				signal: ac.signal,
			})
			// FIX - Make a reset form function
			await router.push("/login")
		} catch (err: any) {
			// FIX: Use a toast to show the error
			console.log(err.message)
		}
	}

	// FIX: Leave only rememberme to true
	const initialValues = {
		email: "test2@test.fr",
		password: "Azerty&1",
		password2: "Azerty&1",
		pseudo: "Test2",
		urlname: "test2",
	}

	return (
		<Fragment>
			<Head>
				<title>Signup to create an account - Url Shorten</title>
				<meta name="description" content="Signup page, not less, not more." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex justify-center w-full">
				<div className="flex flex-col gap-2 sm:gap-4 my-auto w-full sm:w-2/3">
					<h1 className="font-fredoka text-lg sm:text-3xl text-center">
						Create your account.
					</h1>

					<FormController
						initialValues={initialValues}
						schema={createUserSchema}
						onSubmit={onSubmit}
						className="sm:box sm:p-4 flex flex-col gap-4"
					>
						<div className="flex flex-col gap-4">
							<label
								htmlFor="email"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Email
							</label>
							<Field
								id="email"
								type="email"
								name="email"
								placeholder="exemple@gmail.com"
								schema={createUserDefaultSchema.shape.email}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="email"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label
								htmlFor="password"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Password
							</label>
							<Field
								id="password"
								type="password"
								name="password"
								placeholder="password"
								schema={createUserDefaultSchema.shape.password}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="password"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label
								htmlFor="password"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Password Confirmation
							</label>
							<Field
								id="password2"
								type="password"
								name="password2"
								placeholder="password confirmation"
								schema={createUserDefaultSchema.shape.password2}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="password2"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label
								htmlFor="Pseudo"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Pseudo{" "}
								<span className="text-xs caps-normal text-muted">
									Will be only display to you
								</span>
							</label>
							<Field
								id="pseudo"
								type="text"
								name="pseudo"
								placeholder="Pseudo"
								schema={createUserDefaultSchema.shape.pseudo}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="pseudo"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label
								htmlFor="urlname"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Personnal URL name
							</label>
							<Field
								id="urlname"
								type="text"
								name="urlname"
								placeholder="Url Name"
								schema={createUserDefaultSchema.shape.urlname}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="urlname"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<Button
							type="submit"
							className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg disabled:grayscale disabled:opacity-20"
						>
							Register my account!
						</Button>
					</FormController>

					<div className="flex items-center gap-2 justify-end">
						<div>Already have an account?</div>
						<Link href="/login">
							<a aria-label="Login to your account" className="cta px-3 py-1">
								Login here
							</a>
						</Link>
					</div>
				</div>
			</section>
		</Fragment>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const isAuth = await isAuthServer(req.headers.cookie)
		if (isAuth) throw new Error("User already connected!")
		return {
			props: {},
		}
	} catch (err: any) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}
}

export default RegisterPage
