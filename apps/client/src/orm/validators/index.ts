export * from "./user";
export * from "./shorturl";

export const parseZodError = (errors: any[]) => {
	return errors.map((e) => {
		return {
			key: e.path.join(", "),
			problem: e.message,
		};
	});
};
