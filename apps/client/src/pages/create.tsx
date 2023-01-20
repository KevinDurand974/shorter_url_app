import {
	Checkbox,
	Button,
	ErrorMessage,
	Field,
	FormController,
	Select,
	FormOnChange,
} from "@libs/Form"
import { trpc } from "@libs/trpc"
import { getUserDataServer } from "@libs/trpcSsr"
import { Profile } from "@shorter/backend/dist/entities"
import { createUrlSchema } from "@shorter/validators"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { ZodError } from "zod"

type Props = {
	userData: Profile
}

type DurationChoice = typeof durationChoices[number]

type FormValues = {
	to: string
	duration_timing?: DurationChoice
	duration_number?: number
	ephemeral: boolean
	enable_custom: boolean
	custom?: string
	useUrlName: boolean
	duration?: number
}

const durationChoices = ["Hours", "Days", "Weeks", "Months"] as const

const prepateFormValues = (values: any) => {
	const formValues = values as FormValues

	switch (formValues.duration_timing) {
		case "Hours":
			formValues.duration = Number(formValues.duration_number)
			break
		case "Days":
			formValues.duration = Number(formValues.duration_number) * 24
			break
		case "Weeks":
			formValues.duration = Number(formValues.duration_number) * 168
			break
		case "Months":
			formValues.duration = Number(formValues.duration_number) * 720
			break
		default:
			formValues.duration = Number(formValues.duration_number)
			break
	}

	const { to, duration, ephemeral, useUrlName } = formValues

	if (formValues.enable_custom) {
		return {
			to,
			useUrlName,
			ephemeral,
			custom: formValues.custom,
			duration,
		}
	} else {
		return {
			to,
			useUrlName,
			ephemeral,
			duration,
		}
	}
}

const CreateUrlPage = ({ userData }: Props) => {
	const { push } = useRouter()

	useEffect(() => {
		if (!userData) push("/login")
	}, [push, userData])

	const [isEphemeral, setEphemeral] = useState(true)
	const [isCustomEnabled, setCustomEnabled] = useState(false)

	const handleFormOnChange = async ({
		values,
		addError,
		removeErrors,
	}: FormOnChange) => {
		try {
			removeErrors()
			const preparedValues = prepateFormValues(values)
			createUrlSchema.parse(preparedValues)
		} catch (err: any) {
			if (err.name === "ZodError") {
				const issues = (err as ZodError).issues
				issues.forEach((issue) => {
					const issueName = issue.path[0] as string
					if (RegExp("duration").test(issueName)) {
						addError("duration_number", issue.message)
					} else {
						addError(issueName, issue.message)
					}
				})
			}
		}
	}

	const onSubmit = async (values: any) => {
		try {
			const preparedValues = prepateFormValues(values)
			const formValues = createUrlSchema.parse(preparedValues)
			const ac = new AbortController()
			const data = await trpc.createUrl.mutate(formValues, {
				signal: ac.signal,
			})
			alert("Url Created: >> " + data.url)
		} catch (err: any) {
			// FIX: Use a toast to show the error
			console.log(err.message)
		}
	}

	// FIX - Show a message that user cant create url without validating his email

	return (
		<Fragment>
			<Head>
				<title>Create an url - Url Shorten</title>
				<meta name="description" content="Create an url." />
			</Head>

			<span id="main" className="fixed translate-y-[-99999999]" tabIndex={-1} />

			<section className="p-2 sm:p-4 box flex justify-center w-full">
				<div className="flex flex-col gap-2 sm:gap-4 my-auto w-full sm:w-2/3">
					<h1 className="font-fredoka text-lg sm:text-3xl text-center">
						Create URL
					</h1>

					<FormController
						initialValues={
							{
								to: "",
								duration_number: 24,
								duration_timing: "Hours",
								ephemeral: true,
								useUrlName: false,
								enable_custom: false,
							} as FormValues
						}
						className="sm:box sm:p-4 flex flex-col gap-4"
						onChange={handleFormOnChange}
						onSubmit={onSubmit}
						dev
					>
						<div className="flex flex-col gap-4">
							<label
								htmlFor="to"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Redirecting Url
							</label>
							<Field
								id="to"
								name="to"
								type="url"
								placeholder="https://exemple.com"
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="to"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4">
								&gt; Expiration duration
							</label>
							<Checkbox
								name="ephemeral"
								label="Make it Ephemeral"
								onChange={setEphemeral}
								className="h-8 w-8 border-image border-4 bg-t-alt/60 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s]"
							/>
							<div className="flex">
								<Field
									name="duration_number"
									type="number"
									min={1}
									step={1}
									max={1440}
									placeholder="24"
									schema={createUrlSchema.shape.duration}
									className="w-full bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
									disabled={!isEphemeral}
								/>
								<Select
									name="duration_timing"
									choices={durationChoices}
									disabled={!isEphemeral}
								/>
							</div>
							<ErrorMessage
								name="duration_number"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label
								htmlFor="custom"
								className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
							>
								&gt; Custom url
							</label>
							<Checkbox
								name="enable_custom"
								label="Use custom url"
								onChange={setCustomEnabled}
								className="h-8 w-8 border-image border-4 bg-t-alt/60 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s]"
							/>
							<Field
								id="custom"
								type="text"
								name="custom"
								placeholder="exemple"
								disabled={!isCustomEnabled}
								className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
							/>
							<ErrorMessage
								name="custom"
								className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4">
								&gt; Use personal Url
							</label>
							<Checkbox
								name="useUrlName"
								label="Create personal Url"
								checked={isCustomEnabled ? true : undefined}
								disabled={isCustomEnabled}
								className="h-8 w-8 border-image border-4 bg-t-alt/60 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s]"
							/>
						</div>

						<Button className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg flex justify-center items-center gap-2 disabled:grayscale disabled:opacity-20">
							Create url!
						</Button>
					</FormController>
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

export default CreateUrlPage
