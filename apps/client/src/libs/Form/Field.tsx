import { ChangeEvent, useCallback, useEffect, useRef } from "react"
import { debounceTime, fromEvent, map } from "rxjs"
import { ZodError, ZodSchema } from "zod"
import { AddValidation } from "./types"
import useForm from "./useForm"

type Props = JSX.IntrinsicElements["input"] & {
	name: string
	schema?: ZodSchema
	addValidation?: (v: AddValidation) => Promise<void>
	onInput?: (v: string | null) => void
}

const Field = ({ onInput, schema, addValidation, ...props }: Props) => {
	const { getInputValue, addError, removeError, getError } = useForm()

	const inputRef = useRef<HTMLInputElement>(null)

	const handleOnInput = useCallback(
		async (data: string) => {
			let hasError = false

			// NOTE - Validate Schema, if there is one
			if (!!schema) {
				try {
					schema.parse(data)
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
					value: data,
					onSuccess: () => {
						if (!!getError(props.name)) removeError(props.name)
					},
					onFail: (message: string) => {
						addError(props.name, message)
					},
				})
			}

			// NOTE - Call onInput method, if used
			if (!!onInput) onInput(data)
		},
		[
			addError,
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
				map((e) => e.target.value)
			)
			.subscribe(handleOnInput)

		return () => {
			sub$.unsubscribe()
		}
	}, [addError, handleOnInput])

	return (
		<input
			ref={inputRef}
			defaultValue={getInputValue(props.name) || undefined}
			{...props}
		/>
	)
}

export default Field
