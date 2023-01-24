import { parseZodError } from "@shorter/validators"
import {
	ChangeEvent,
	createContext,
	FormEvent,
	PropsWithChildren,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react"
import {
	BehaviorSubject,
	concat,
	debounceTime,
	forkJoin,
	fromEvent,
	map,
	merge,
} from "rxjs"
import { object, ZodError, ZodIssue, ZodSchema } from "zod"
import { AddValidation, ErrorValues, FormOnChange, FormValues } from "./types"
import { getFirstZodErrors, isSameValueFromInitial } from "./utils"

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

type FormProps = Omit<JSX.IntrinsicElements["form"], "onSubmit" | "onInput"> &
	PropsWithChildren<{
		initialValues: FormValues
		schema?: ZodSchema
		validateOnMount?: boolean
		onSubmit?: (values: FormValues) => Promise<void> | void
		onChange?: (values: FormOnChange) => Promise<void> | void
		dev?: boolean
	}>

// NOTE - Create Form Context
const FormContext = createContext<ContextValues>({} as ContextValues)

// NOTE - Form Component with Context.Provider
export const FormController = ({
	onSubmit,
	onChange,
	children,
	schema,
	validateOnMount,
	initialValues,
	dev,
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

	const removeErrors = () => {
		setErrors({})
	}

	// TODO - To be reviewed because it sucks
	useEffect(() => {
		if (
			!isSameValueFromInitial(initialValues, formValues) &&
			Object.values(formValues).length > 0 &&
			Object.values(formValues).every((v) => v !== null) &&
			Object.values(errors).length === 0
		) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [errors, formValues, initialValues])

	// FIX - Just remove it after all good
	useEffect(() => {
		if (dev) {
			console.log(">> Error")
			console.table(errors)
			console.log(">> Form")
			console.table(formValues)
		}
	}, [dev, errors, formValues])

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
	const formValues$ = new BehaviorSubject(formValues)
		.asObservable()
		.pipe(debounceTime(400))

	const handleOnSubmit = (v: FormValues) => onSubmit && onSubmit(v)

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		let validatedData = formValues

		// NOTE - Cancel submit if there are any errors before starting
		if (Object.keys(errors).length > 0) return

		// NOTE - If schema
		if (schema) {
			try {
				removeErrors()
				validatedData = schema.parse(validatedData)
			} catch (e: any) {
				parseZodError(e.issues).forEach((error) =>
					addError(error.key, error.message)
				)
				return
			}
		}

		// NOTE - Trigger onSubmit method
		handleOnSubmit(validatedData)
	}

	useEffect(() => {
		const sub$ = formValues$.subscribe((values) => {
			// NOTE - Cancel on mount
			if (!validateOnMount && isSameValueFromInitial(initialValues, values))
				return

			if (onChange) {
				let datas = values

				if (schema) {
					try {
						datas = schema.parse(datas)
						removeErrors()
					} catch (err: any) {
						const errors = getFirstZodErrors(err)
						if (errors) {
							Object.entries(errors).forEach(([name, message]) => {
								addError(name, message)
							})
						}
					}
				}

				onChange({ values: datas, removeErrors, addError })
			}
		})

		return () => {
			sub$.unsubscribe()
		}
	}, [formValues$, initialValues, onChange, schema, validateOnMount])
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
