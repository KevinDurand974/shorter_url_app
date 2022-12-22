import { trpc } from "@libs/trpc"
import { isAuthServer } from "@libs/trpcSsr"
import { useFormikZodAdapter } from "@libs/useFormikZodAdapter"
import { createUserSchema } from "@shorter/validators"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

type Props = {}

type FormValues = {
	email: string
	password: string
	password2: string
	pseudo: string
	urlname: string
}

const RegisterPage = (props: Props) => {
	const router = useRouter()

	const onSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		setSubmitting(false)
		try {
			const ac = new AbortController()
			await trpc.register.mutate(values, { signal: ac.signal })
			resetForm()
			await router.push("/login")
		} catch (err: any) {
			// FIX: Use a toast to show the error
			console.log(err.message)
		}
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

					<Formik
						// FIX: Leave only rememberme to true
						initialValues={{
							email: "test2@test.fr",
							password: "Azerty&1",
							password2: "Azerty&1",
							pseudo: "Test2",
							urlname: "test2",
						}}
						validationSchema={useFormikZodAdapter(createUserSchema)}
						validateOnMount={true}
						onSubmit={onSubmit}
					>
						{({ isSubmitting, isValid, errors, values }) => (
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
											className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
										/>
										<ErrorMessage
											name="password2"
											component="div"
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
											className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
										/>
										<ErrorMessage
											name="pseudo"
											component="div"
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
											className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
										/>
										<ErrorMessage
											name="urlname"
											component="div"
											className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
										/>
									</div>

									<button
										type="submit"
										className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg disabled:grayscale disabled:opacity-20"
										disabled={!isValid || isSubmitting}
									>
										Register my account!
									</button>
								</>
							</Form>
						)}
					</Formik>

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
