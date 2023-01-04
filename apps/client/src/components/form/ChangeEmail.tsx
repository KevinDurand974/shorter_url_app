import { AuthContext } from "@contexts"
import {
	AddValidation,
	Button,
	ErrorMessage,
	Field,
	FormController,
	FormValues,
} from "@libs/Form"
import { trpc } from "@libs/trpc"
import {
	updateUserEmailDefaultSchema,
	updateUserEmailSchema,
} from "@shorter/validators"
import { useContext } from "react"

type Props = {
	currentEmail: string
}

type FormatedValues = {
	currentEmail: string
	newEmail: string
}

const ChangeEmail = ({ currentEmail }: Props) => {
	const { logout } = useContext(AuthContext)

	const handleSubmit = async (values: FormValues) => {
		try {
			const { signal } = new AbortController()
			await trpc.updateUserEmail.mutate(values as FormatedValues, { signal })
			logout()
		} catch (err) {
			// FIX: Use a toast to show the error
			console.error(err)
		}
	}

	const handleEmailValidation = async ({
		value,
		onSuccess,
		onFail,
	}: AddValidation) => {
		if (currentEmail === value) return onFail("Cannot be the same email.")

		try {
			const { signal } = new AbortController()
			const isUsed = await trpc.alreadyUsedEmail.mutate(
				{ email: value as string },
				{ signal }
			)
			if (isUsed) throw new Error()
			onSuccess()
		} catch (err) {
			onFail("This Email is already used.")
		}
	}

	return (
		<FormController
			className="sm:box sm:p-4 flex flex-col gap-4"
			schema={updateUserEmailSchema}
			initialValues={{
				currentEmail,
				newEmail: "",
			}}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-4">
				<label
					htmlFor="currentEmail"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; Current Email
				</label>
				<Field
					id="currentEmail"
					name="currentEmail"
					type="email"
					placeholder="current-email@gmail.com"
					readOnly
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<label
					htmlFor="newEmail"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; New Email
				</label>
				<Field
					id="newEmail"
					type="email"
					name="newEmail"
					placeholder="new-email@gmail.com"
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
					schema={updateUserEmailDefaultSchema.shape.newEmail}
					addValidation={handleEmailValidation}
				/>
				<ErrorMessage
					name="newEmail"
					className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
				/>
			</div>

			<Button
				type="submit"
				className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg flex justify-center items-center gap-2 disabled:grayscale disabled:opacity-20"
			>
				Validate new email!
			</Button>

			<div className="text-center text-xs text-muted">
				You will be disconnect after changing your email
				<br />
				Don&apos;t forget to validate this new email address in order to
				continue using this service.
				<br />A verification email is automatically sent to you.
			</div>
		</FormController>
	)
}

export default ChangeEmail
