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
