export * from "./user";
export * from "./shorturl";
export * from "./url";

export const parseZodError = (errors: any[]) => {
	return errors.map((e) => {
		return {
			key: e.path.join(", "),
			message: e.message,
		};
	});
};
