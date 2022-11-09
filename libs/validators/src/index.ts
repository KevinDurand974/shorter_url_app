export * from "./user";
export * from "./redirect";
export * from "./url";
export * from "./auth";

export const parseZodError = (errors: any[]) => {
	return errors.map((e) => {
		return {
			key: e.path.join(", "),
			message: e.message,
		};
	});
};
