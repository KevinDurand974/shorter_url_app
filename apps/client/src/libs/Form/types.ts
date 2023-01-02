export type AddValidation = {
	value: unknown
	onSuccess: () => void
	onFail: (message: string) => void
}

export type FormValues = {
	[key: string]: unknown | null
}

export type ErrorValues = {
	[key: string]: string
}
