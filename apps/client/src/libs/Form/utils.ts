import { ZodError } from "zod"

export const getFirstZodErrors = ({ issues }: ZodError) => {
	const errorByPath = {} as { [key: string]: string }

	if (!issues) return

	issues.forEach((issue) => {
		const pathName = issue.path[0].toString()
		if (!errorByPath[pathName]) {
			errorByPath[pathName] = issue.message
		}
	})

	return errorByPath
}

type ObjParam = {
	[key: string]: unknown
}

export const isSameValueFromInitial = (obj1: ObjParam, obj2: ObjParam) => {
	// NOTE - If keys not the same
	if (!Object.keys(obj1).every((v) => Object.keys(obj2).includes(v)))
		return false

	// NOTE - If Values not the same
	if (!Object.values(obj1).every((v) => Object.values(obj2).includes(v)))
		return false

	return true
}
