export type AddValidation = {
	value: unknown
	fields: FormValues
	onSuccess: () => void
	onFail: (message: string) => void
}

export type FormValues = {
	[key: string]: unknown | null
}

export type ErrorValues = {
	[key: string]: string
}

export type FormOnChange = {
	values: FormValues
	addError: (name: string, message: string) => void
	removeErrors: () => void
}
