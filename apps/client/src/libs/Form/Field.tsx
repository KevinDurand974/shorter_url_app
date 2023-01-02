import { ChangeEvent, useCallback, useEffect, useRef } from "react"
import { debounceTime, fromEvent, map } from "rxjs"
import { ZodError, ZodSchema } from "zod"
import { AddValidation } from "./types"
import useForm from "./useForm"

type Props = Omit<JSX.IntrinsicElements["input"], "onInput"> & {
	name: string
	schema?: ZodSchema
	addValidation?: (v: AddValidation) => Promise<void>
	onInput?: (v: unknown | null) => void
}

const Field = ({ onInput, schema, addValidation, ...props }: Props) => {
	const { getInputValue, addError, removeError, getError, addInputValue } =
		useForm()

	const inputRef = useRef<HTMLInputElement>(null)

	const convertToRealType = (value: unknown) => {
		if (Boolean(value)) return Boolean(value)
		if (value === "true") return true
		if (value === "false") return false
		if (Number(value)) return Number(value)
		return value
	}

	const handleOnInput = useCallback(
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
					onSuccess: () => {
						if (!!getError(props.name)) removeError(props.name)
					},
					onFail: (message: string) => {
						addError(props.name, message)
					},
				})
			}

			addInputValue(props.name, d)

			// NOTE - Call onInput method, if used
			if (!!onInput) onInput(d)
		},
		[
			addError,
			addInputValue,
			addValidation,
			getError,
			onInput,
			props.name,
			removeError,
			schema,
		]
	)

	useEffect(() => {
		if (!inputRef.current) return

		const sub$ = fromEvent<ChangeEvent<HTMLInputElement>>(
			inputRef.current,
			"input"
		)
			.pipe(
				debounceTime(400),
				map((e) => {
					if (props.type && ["checkbox", "radio"].includes(props.type)) {
						return e.target.checked
					}
					return e.target.value
				})
			)
			.subscribe(handleOnInput)

		return () => {
			sub$.unsubscribe()
		}
	}, [addError, handleOnInput, props.type])

	return (
		<input
			ref={inputRef}
			defaultValue={(getInputValue(props.name) as any) || undefined}
			{...props}
		/>
	)
}

export default Field
