import { AuthContext } from "@contexts"
import useLocalStorage from "@hooks/useLocalStorage"
import { trpc } from "@libs/trpc"
import { isAuthServer } from "@libs/trpcSsr"
import { useFormikZodAdapter } from "@libs/useFormikZodAdapter"
import { loginSchema } from "@shorter/validators"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useContext, useEffect, useState } from "react"

type FormValues = {
	email: string
	password: string
	rememberme: boolean
}

const LoginPage = () => {
	const router = useRouter()
	const { setUser } = useContext(AuthContext)
	const { isStorageAvailable, setStorageValue } = useLocalStorage()

	const [enabledCookie, setEnabledCookie] = useState(false)
	useEffect(() => {
		setEnabledCookie(navigator.cookieEnabled)
	}, [])

	const onSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		setSubmitting(false)
		try {
			const ac = new AbortController()
			const data = await trpc.login.mutate(
				{ ...values, enabledCookie },
				{ signal: ac.signal }
			)
			if (isStorageAvailable()) setStorageValue("logged_in", 1)
			setUser(data.user)
			// FIX: Implement no cookie here
			resetForm()
			await router.push("/")
		} catch (err: any) {
			// FIX: Use a toast to show the error
			console.log(err.message)
		}
	}

	return (
		<Fragment>
			<Head>
				<title>Log in to your account - Url Shorten</title>
				<meta
					name="description"
					content="Login account page, not less, not more."
				/>
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex justify-center absolute inset-0">
				<div className="flex flex-col gap-2 sm:gap-4 my-auto w-full sm:w-2/3">
					<h1 className="font-fredoka text-lg sm:text-3xl text-center">
						Log in to your account
					</h1>

					<Formik
						// FIX: Leave only rememberme to true
						initialValues={{
							email: "test1@test.fr",
							password: "Azerty&1",
							rememberme: true,
						}}
						validationSchema={useFormikZodAdapter(loginSchema)}
						onSubmit={onSubmit}
					>
						{({ isSubmitting, isValid }) => (
							<Form className="sm:box sm:p-4 flex flex-col gap-4">
								<>
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
											className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
										/>
										<ErrorMessage
											name="email"
											component="div"
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
											className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
										/>
										<ErrorMessage
											name="password"
											component="div"
											className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
										/>
									</div>

									<div className="flex gap-2">
										<Field
											id="rememberme"
											type="checkbox"
											name="rememberme"
											className="cursor-pointer"
										/>
										<label htmlFor="rememberme">Keep me logged</label>
									</div>

									<button
										type="submit"
										className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg disabled:grayscale disabled:opacity-20"
										disabled={!isValid || isSubmitting}
									>
										Connect me!
									</button>
								</>
							</Form>
						)}
					</Formik>

					<div className="flex items-center gap-2 justify-end">
						<div>Doesn&apos;t have an account?</div>
						<Link href="/register">
							<a aria-label="Register an account" className="cta px-3 py-1">
								Signup here
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

export default LoginPage
