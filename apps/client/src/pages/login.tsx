import Head from "next/head"
import { Fragment } from "react"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { trpc } from "@libs/trpc"
import { loginSchema } from "@shorter/validators"
import { useFormikZodAdapter } from "@libs/useFormikZodAdapter"

type Props = {}

type FormValues = {
	email: string
	password: string
}

const LoginPage = (props: Props) => {
	const onSubmit = async (
		values: FormValues,
		{ setSubmitting }: FormikHelpers<FormValues>
	) => {
		setSubmitting(false)
		const data = await trpc.login.mutate(values)

		console.log(data)
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
						initialValues={{ email: "", password: "" }}
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
				</div>
			</section>
		</Fragment>
	)
}

export default LoginPage
