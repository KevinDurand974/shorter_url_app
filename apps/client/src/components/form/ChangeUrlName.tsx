import {
	FormValues,
	AddValidation,
	FormController,
	Field,
	ErrorMessage,
	Button,
} from "@libs/Form"
import { trpc } from "@libs/trpc"
import {
	updateUserPseudoSchema,
	updateUserUrlNameSchema,
} from "@shorter/validators"

type Props = {
	urlName: string
	closeModal: (urlName: string) => void
}

type FormatedValues = {
	urlName: string
}

const ChangeUrlName = ({ closeModal, urlName }: Props) => {
	const handleSubmit = async (values: FormValues) => {
		try {
			const { signal } = new AbortController()
			await trpc.updateUserUrlName.mutate(values as FormatedValues, { signal })
			closeModal((values as FormatedValues).urlName)
		} catch (err) {
			// FIX: Use a toast to show the error
			console.error(err)
		}
	}

	const handleUrlNameValidation = async ({
		value,
		onSuccess,
		onFail,
	}: AddValidation) => {
		try {
			if (urlName === value) return onFail("Cannot be the same url name.")

			// NOTE - Check is url name not already used
			const { signal } = new AbortController()
			const isUsed = await trpc.alreadyUsedUrlName.mutate(
				{ urlName: value as string },
				{ signal }
			)
			if (isUsed) throw new Error()
			onSuccess()
		} catch (err) {
			onFail("This url name is already used.")
		}
	}

	return (
		<FormController
			className="sm:box sm:p-4 flex flex-col gap-4"
			schema={updateUserUrlNameSchema}
			initialValues={{
				urlName,
			}}
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-4">
				<label
					htmlFor="newUrlName"
					className="custom-underline before:right-0 before:bottom-[-2px] w-fit font-bold caps-small text-lg tracking-wider pr-4"
				>
					&gt; New personal url
				</label>
				<Field
					id="newUrlName"
					type="text"
					name="urlName"
					placeholder="New personal url..."
					className="bg-t-alt/60 border-2 sm:border-4 px-5 py-3 font-fredoka tracking-wider  placeholder:text-text/20 shadow-lg shadow-transparent hover:shadow-accent/50 transition-all duration-[0.4s] outline-none focus:shadow-gradient-top text-sm sm:text-base border-image"
					schema={updateUserUrlNameSchema.shape.urlName}
					addValidation={handleUrlNameValidation}
				/>
				<ErrorMessage
					name="urlName"
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
				Used for url not created globaly.
			</div>
		</FormController>
	)
}

export default ChangeUrlName
