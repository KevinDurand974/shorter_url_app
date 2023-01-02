import { parseZodError } from "@shorter/validators"
import {
	ChangeEvent,
	createContext,
	FormEvent,
	PropsWithChildren,
	useEffect,
	useState,
} from "react"
import { ZodSchema } from "zod"
import { ErrorValues, FormValues } from "./types"

type ContextValues = {
	fields: FormValues
	errors: ErrorValues
	addInputValue: (name: string, value: unknown | null) => void
	getInputValue: (name: string) => unknown
	addError: (name: string, message: string) => void
	removeError: (name: string) => void
	getError: (name: string) => string
	isValid: boolean
}

type FormProps = Omit<JSX.IntrinsicElements["form"], "onSubmit" | "onChange"> &
	PropsWithChildren<{
		initialValues: FormValues
		schema: ZodSchema
		onSubmit?: (values: FormValues) => Promise<void> | void
		onChange?: (values: FormValues) => Promise<void> | void
	}>

// NOTE - Create Form Context
const FormContext = createContext<ContextValues>({} as ContextValues)

// NOTE - Form Component with Context.Provider
export const FormController = ({
	onSubmit,
	onChange,
	children,
	schema,
	initialValues,
	...props
}: FormProps) => {
	// SECTION - Provider
	const [formValues, setFormValues] = useState<FormValues>(initialValues || {})
	const [errors, setErrors] = useState<ErrorValues>({})
	const [isValid, setIsValid] = useState(false)

	const setValue = (name: string, value: unknown | null) => {
		setFormValues((pre: any) => ({ ...pre, [name]: value }))
	}

	const getValue = (name: string) => {
		return formValues[name]
	}

	const addError = (name: string, message: string) => {
		setErrors((pre: any) => ({ ...pre, [name]: message }))
	}

	const getError = (name: string) => {
		return errors[name]
	}

	const removeError = (name: string) => {
		setErrors(({ [name]: _r, ...rest }) => rest)
	}

	useEffect(() => {
		if (
			Object.values(formValues).length > 0 &&
			Object.values(formValues).every((v) => v !== null) &&
			Object.values(errors).length === 0
		) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [errors, formValues])

	useEffect(() => {
		console.log("Error", errors)
	}, [errors])

	useEffect(() => {
		console.log("Form", formValues)
	}, [formValues])

	const values = {
		fields: formValues,
		errors: errors,
		addInputValue: setValue,
		getInputValue: getValue,
		addError,
		removeError,
		getError,
		isValid,
	}
	// !SECTION - End Provider

	// SECTION - Component
	const handleOnSubmit = (v: FormValues) => onSubmit && onSubmit(v)

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		let validatedData = formValues

		// NOTE - Cancel submit if there are any errors before starting
		if (Object.keys(errors).length > 0) return

		// NOTE - If schema
		try {
			validatedData = schema.parse(validatedData)
		} catch (e: any) {
			parseZodError(e.issues).forEach((error) =>
				addError(error.key, error.message)
			)
			return
		}

		// NOTE - Trigger onSubmit method
		handleOnSubmit(validatedData)
	}
	// !SECTION - End Component

	return (
		<FormContext.Provider value={values}>
			<form onSubmit={handleSubmit} {...props}>
				{children}
			</form>
		</FormContext.Provider>
	)
}

export default FormContext
