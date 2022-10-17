import bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt = 10) => {
	return bcrypt.hash(password, salt);
};

export const comparePassword = async (
	hashPassword: string,
	plainPassword: string
) => {
	return bcrypt.compare(plainPassword, hashPassword);
};
