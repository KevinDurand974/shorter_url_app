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
	updateUserEmailSchema,
	updateUserEmailDefaultSchema,
	updateUserPseudoSchema,
} from "@shorter/validators"

type Props = {
	pseudo: string
	closeModal: (pseudo: string) => void
}

type FormatedValues = {
	pseudo: string
}

const ChangePseudo = ({ pseudo, closeModal }: Props) => {
	const handleSubmit = async (values: FormValues) => {
		try {
			const { signal } = new AbortController()
			await trpc.updateUserPseudo.mutate(values as FormatedValues, { signal })
			closeModal((values as FormatedValues).pseudo)
		} catch (err) {
			// FIX: Use a toast to show the error
			console.error(err)
		}
	}

	const handlePseudoValidation = async ({
		value,
		onSuccess,
		onFail,
	}: AddValidation) => {
		if (pseudo === value)
			return onFail("Choose another one, you currently using it.")
		onSuccess()
	}

	return (
		<FormController
			className="sm:box sm:p-4 flex flex-col gap-4"
			schema={updateUserPseudoSchema}
			initialValues={{
				pseudo,
			}}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-4">
				<label
					htmlFor="newPseudo"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; New Pseudo
				</label>
				<Field
					id="newPseudo"
					type="text"
					name="pseudo"
					placeholder="New pseudo..."
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
					schema={updateUserPseudoSchema.shape.pseudo}
					addValidation={handlePseudoValidation}
				/>
				<ErrorMessage
					name="pseudo"
					className="font-fredoka tracking-wider text-sm -mt-2 text-danger/80"
				/>
			</div>

			<Button
				type="submit"
				className="px-5 py-3 font-fredoka tracking-wider bg-gradient-to-r from-gradient-top to-accent mt-4 uppercase transition-all duration-[0.4s] text-sm sm:text-lg flex justify-center items-center gap-2 disabled:grayscale disabled:opacity-20"
			>
				Validate this pseudo!
			</Button>

			<div className="text-center text-xs text-muted">
				This will be only shown to you.
			</div>
		</FormController>
	)
}

export default ChangePseudo
