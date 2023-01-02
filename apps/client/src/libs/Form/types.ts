export type AddValidation = {
	value: string
	onSuccess: () => void
	onFail: (message: string) => void
}

export type FormValues = {
	[key: string]: string | null
}

export type ErrorValues = {
	[key: string]: string
}
