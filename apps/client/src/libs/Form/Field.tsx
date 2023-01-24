import { ChangeEvent, useCallback, useEffect, useRef } from "react"
import { debounceTime, filter, fromEvent, map } from "rxjs"
import { ZodError, ZodSchema } from "zod"
import { AddValidation } from "./types"
import useForm from "./useForm"

type Props = Omit<JSX.IntrinsicElements["input"], "onInput"> & {
	name: string
	schema?: ZodSchema
	addValidation?: (v: AddValidation) => Promise<void>
	onInput?: (v: unknown | null) => void
}

const Field = ({
	onInput,
	schema,
	addValidation,
	className,
	...props
}: Props) => {
	const {
		getInputValue,
		addError,
		removeError,
		getError,
		addInputValue,
		fields,
	} = useForm()

	const inputRef = useRef<HTMLInputElement>(null)

	const convertToRealType = (value: unknown) => {
		if (value === "true") return true
		if (value === "false") return false
		if (value === true) return true
		if (value === false) return false
		if (Number(value)) return Number(value)
		if (String(value)) return String(value)
		return value
	}

	const prepareData = useCallback(
		async (data: unknown) => {
			let hasError = false

			let d = convertToRealType(data)

			// NOTE - Validate Schema, if there is one
			if (!!schema) {
				try {
					schema.parse(d)
					if (!!getError(props.name)) removeError(props.name)
				} catch (err: any) {
					hasError = true
					if (err.name === "ZodError") {
						const { issues } = err as ZodError
						issues.forEach((issue) => {
							addError(props.name, issue.message)
						})
					}
				}
			}

			// NOTE - Do validation, if there is one
			if (!!addValidation && !hasError) {
				await addValidation({
					value: d,
					fields,
					onSuccess: () => {
						if (!!getError(props.name)) removeError(props.name)
					},
					onFail: (message: string) => {
						hasError = true
						addError(props.name, message)
					},
				})
			}

			return { data: d, hasError }
		},
		[addError, addValidation, fields, getError, props.name, removeError, schema]
	)

	useEffect(() => {
		if (!inputRef.current) return

		const input$ = fromEvent<ChangeEvent<HTMLInputElement>>(
			inputRef.current,
			"input"
		).pipe(map(async (e) => prepareData(e.target.value)))

		const ctxSub$ = input$.subscribe(async (input) => {
			const { data } = await input
			addInputValue(props.name, data)
		})

		const onInput$ = input$
			.pipe(
				debounceTime(400),
				filter(() => !!onInput)
			)
			.subscribe(async (input) => {
				// NOTE - Call onInput method, if used
				if (!!onInput) {
					const { data, hasError } = await input
					if (!hasError) onInput(data)
				}
			})

		return () => {
			ctxSub$.unsubscribe()
			onInput$.unsubscribe()
		}
	}, [addInputValue, onInput, prepareData, props.name])

	return (
		<input
			ref={inputRef}
			defaultValue={(getInputValue(props.name) as any) || undefined}
			className={`disabled:grayscale ${className}`}
			{...props}
		/>
	)
}

export default Field
