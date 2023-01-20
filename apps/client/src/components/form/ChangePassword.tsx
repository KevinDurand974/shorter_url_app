import { AuthContext } from "@contexts"
import {
	AddValidation,
	Button,
	ErrorMessage,
	Field,
	FormController,
	FormValues,
	useForm,
} from "@libs/Form"
import { trpc } from "@libs/trpc"
import {
	updateUserPasswordSchema,
	updateUserPasswordDefaultSchema,
} from "@shorter/validators"
import { useContext, useMemo } from "react"

type Props = {}

type FormatedValues = {
	currentPassword: string
	newPassword: string
}

const ChangePassword = () => {
	const { logout } = useContext(AuthContext)

	const handleSubmit = async (values: FormValues) => {
		try {
			console.log(values)
			const { signal } = new AbortController()
			// await trpc.updateUserEmail.mutate(values as FormatedValues, { signal })
			logout()
		} catch (err) {
			// FIX: Use a toast to show the error
			console.error(err)
		}
	}

	const handlePasswordValidation = async ({
		value,
		fields,
		onSuccess,
		onFail,
	}: AddValidation) => {
		try {
			const curPass = fields["currentPassword"] || ""
			if (curPass === value) return onFail("Cannot be the same password.")
			return onSuccess()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<FormController
			className="sm:box sm:p-4 flex flex-col gap-4"
			schema={updateUserPasswordSchema}
			initialValues={{
				currentPassword: "",
				newPassword: "",
			}}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-4">
				<label
					htmlFor="currentPassword"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; Current Password
				</label>
				<Field
					id="currentPassword"
					name="currentPassword"
					type="password"
					placeholder="Current password..."
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
				/>
				<ErrorMessage
					name="currentPassword"
					className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<label
					htmlFor="newPassword"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; New Password
				</label>
				<Field
					id="newPassword"
					type="password"
					name="newPassword"
					placeholder="New password..."
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
					schema={updateUserPasswordDefaultSchema.shape.newPassword}
					addValidation={handlePasswordValidation}
				/>
				<ErrorMessage
					name="newPassword"
					className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
				/>
			</div>

			<Button className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg flex justify-center items-center gap-2 disabled:grayscale disabled:opacity-20">
				Validate this password!
			</Button>

			<div className="text-center text-xs text-muted">
				You will need to reconnect after changing your password.
			</div>
		</FormController>
	)
}

export default ChangePassword
