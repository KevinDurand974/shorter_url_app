import { Profile, ShortUrl, User } from "@ORM/entities";
import {
	comparePassword,
	findOneProfileByUuid,
	hashPassword,
} from "@ORM/helpers";
import {
	parseZodError,
	validateNewUser,
	ValidateNewUserSchema,
	validateNewUserEmail,
	ValidateNewUserEmailSchema,
	validateNewUserPassword,
	ValidateNewUserPasswordSchema,
	validateNewUserUrlName,
	ValidateNewUserUrlNameSchema,
	ValidateUserUrlActiveSchema,
	validateUserUrlActive,
	validateUserVip,
	ValidateUserVipSchema,
	ValidateUserPseudoSchema,
	validateUserPseudo,
	ValidateUserDeletingSchema,
	validateUserDeleting,
	ValidateUserGetSchema,
	validateUserGet,
} from "@ORM/validators";
import { DataSource } from "typeorm";

export const createUser = async (
	datasource: DataSource,
	data: ValidateNewUserSchema
) => {
	try {
		const ProfileRep = datasource.getRepository(Profile);
		const UserRep = datasource.getRepository(User);

		const emailUser = await UserRep.findOne({
			where: {
				email: data.email,
			},
		});

		if (emailUser)
			throw {
				statusCode: 400,
				message: "Email already exists",
			};

		if (!data.vip) delete data.urlName;

		const valideData = await validateNewUser(data);
		if (!valideData.success)
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};

		const validatedData = valideData.data;

		const user = new User();
		user.email = validatedData.email;
		user.pseudo = validatedData.pseudo;
		user.password = await hashPassword(validatedData.password);

		const profile = new Profile();
		profile.vip = validatedData.vip;

		if (validatedData.vip) {
			if (validatedData.urlName) {
				const count = await ProfileRep.count({
					where: {
						urlName: validatedData.urlName,
					},
				});
				if (count > 0) {
					throw {
						statusCode: 400,
						message: "UrlName already exists",
					};
				}
				profile.urlName = validatedData.urlName;
				profile.maxUrls = 250;
				profile.availableUrls = 250;
			} else {
				throw {
					statusCode: 400,
					message: "UrlName is required",
				};
			}
		} else {
			profile.urlName = "";
		}

		profile.user = user;

		await ProfileRep.save(profile);

		const thisUser = await UserRep.findOne({
			where: { email: user.email },
			relations: ["profile"],
		});

		if (!thisUser)
			throw {
				statusCode: 404,
				message: "User has not been saved!",
			};

		const returnUser = {
			uuid: thisUser.profile.uuid,
			vip: thisUser.profile.vip,
			pseudo: thisUser.pseudo,
			email: thisUser.email,
		};

		return returnUser;
	} catch (err) {
		throw err;
	}
};

export const updateUserEmail = async (
	datasource: DataSource,
	data: ValidateNewUserEmailSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateNewUserEmail(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user email
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};
		const { email } = profile.user;

		// Check if current email == email
		if (email !== validedData.currentEmail) {
			throw {
				statusCode: 400,
				message: "Entered current email is not correct",
			};
		}

		// Check if new email is not already used
		const userRep = datasource.getRepository(User);
		const user = await userRep.findOne({
			where: {
				email: validedData.newEmail,
			},
		});
		if (user)
			throw {
				statusCode: 400,
				message: "Email already exists",
			};

		// Update email
		profile.user.email = validedData.newEmail;
		profile.verified = false;
		await userRep.save(profile.user);
		await profileRep.save(profile);

		// Return new user profile
		const returnUser = {
			uuid: profile.uuid,
			vip: profile.vip,
			pseudo: profile.user.pseudo,
			email: validedData.newEmail,
		};

		return returnUser;
	} catch (err) {
		throw err;
	}
};

export const updateUserPassword = async (
	datasource: DataSource,
	data: ValidateNewUserPasswordSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateNewUserPassword(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user email
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};
		const { password } = profile.user;

		// Check if current and new password are not the same
		if (validedData.currentPassword === validedData.newPassword) {
			throw {
				statusCode: 400,
				message: "Current and new password are the same",
			};
		}

		// Compare current password and db password
		const isPasswordMatch = await comparePassword(
			password,
			validedData.currentPassword
		);
		if (!isPasswordMatch) {
			throw {
				statusCode: 400,
				message: "Entered current password is not correct",
			};
		}

		// Hash new password
		const hashedPassword = await hashPassword(validedData.newPassword);

		// Update password
		profile.user.password = hashedPassword;
		await profileRep.save(profile);

		// Return new user profile
		const returnUser = {
			uuid: profile.uuid,
			vip: profile.vip,
			pseudo: profile.user.pseudo,
			email: profile.user.email,
		};

		return returnUser;
	} catch (err) {
		throw err;
	}
};

export const updateUserUrlName = async (
	datasource: DataSource,
	data: ValidateNewUserUrlNameSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateNewUserUrlName(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user email
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};
		const { urlName } = profile;

		// Check if new urlName is not already used
		const isUrlNameUsed = await profileRep.count({
			where: {
				urlName: validedData.urlName,
			},
		});
		if (isUrlNameUsed > 0) {
			throw {
				statusCode: 400,
				message: "Url name already exists",
			};
		}

		// Check if urlName and new urlName are not the same
		if (urlName === validedData.urlName) {
			throw {
				statusCode: 400,
				message: "Current and new url name are the same",
			};
		}

		// Update urlName
		profile.urlName = validedData.urlName;
		await profileRep.save(profile);
	} catch (err) {
		throw err;
	}
};

export const updateUserUrlActive = async (
	datasource: DataSource,
	data: ValidateUserUrlActiveSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateUserUrlActive(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};

		// Check password
		const { password } = profile.user;
		const isPasswordMatch = await comparePassword(
			password,
			validedData.password
		);
		if (!isPasswordMatch) {
			throw {
				statusCode: 400,
				message: "Entered password is not correct",
			};
		}

		// Check if urlActive not equal to current urlActive, set and save if not
		if (profile.urlActive === validedData.urlActive) {
			throw {
				statusCode: 400,
				message: "An error is occured, please try again",
			};
		}
		profile.urlActive = validedData.urlActive;
		await profileRep.save(profile);
	} catch (err) {
		throw err;
	}
};

export const updateUserVip = async (
	datasource: DataSource,
	data: ValidateUserVipSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateUserVip(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};

		// Check if vip not equal to current vip, set and save if not
		if (profile.vip === validedData.vip) {
			throw {
				statusCode: 400,
				message: "An error is occured, please try again",
			};
		}
		profile.vip = validedData.vip;
		if (validedData.vip) {
			profile.maxUrls = 250;
			profile.availableUrls = 250 - profile.availableUrls;
		} else {
			profile.maxUrls = 25;
			profile.availableUrls = 25 - profile.availableUrls;
		}
		await profileRep.save(profile);
	} catch (err) {
		throw err;
	}
};

export const updateUserPseudo = async (
	datasource: DataSource,
	data: ValidateUserPseudoSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateUserPseudo(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user
		const profileRep = datasource.getRepository(Profile);
		const userRep = datasource.getRepository(User);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};

		// Check if pseudo not equal to current pseudo, set and save if not
		if (profile.user.pseudo === validedData.pseudo) {
			throw {
				statusCode: 400,
				message: "An error is occured, please try again",
			};
		}

		// Save
		profile.user.pseudo = validedData.pseudo;
		await userRep.save(profile.user);
		await profileRep.save(profile);

		// Get updated user
		const thisUser = await userRep.findOne({
			where: { email: profile.user.email },
			relations: ["profile"],
		});

		if (!thisUser)
			throw {
				statusCode: 404,
				message: "User not found!",
			};

		const returnUser = {
			uuid: thisUser.profile.uuid,
			vip: thisUser.profile.vip,
			pseudo: thisUser.pseudo,
			email: thisUser.email,
		};

		return returnUser;
	} catch (err) {
		throw err;
	}
};

export const removeUserByUuid = async (
	datasource: DataSource,
	data: ValidateUserDeletingSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateUserDeleting(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Check if uuid exist and get user
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);
		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};

		// Check password
		const { password } = profile.user;
		const isPasswordMatch = await comparePassword(
			password,
			validedData.password
		);
		if (!isPasswordMatch) {
			throw {
				statusCode: 400,
				message: "Entered password is not correct",
			};
		}

		// Remove user
		const userRep = datasource.getRepository(User);
		const shortUrlRep = datasource.getRepository(ShortUrl);
		await userRep.remove(profile.user);
		await shortUrlRep.remove(profile.shortUrls);
		await profileRep.remove(profile);
	} catch (err) {
		throw err;
	}
};

export const getUserByUuid = async (
	datasource: DataSource,
	data: ValidateUserGetSchema
) => {
	try {
		// Verif all user values
		const valideData = await validateUserGet(data);
		if (!valideData.success) {
			throw {
				statusCode: 400,
				message: parseZodError(valideData.error.issues),
			};
		}
		const validedData = valideData.data;

		// Get user by uuid
		const profileRep = datasource.getRepository(Profile);
		const profile = await findOneProfileByUuid(profileRep, validedData.uuid);

		if (!profile)
			throw {
				statusCode: 404,
				message: "User not found",
			};

		const returnUser = {
			...profile,
			user: {
				...profile.user,
				password: undefined,
				id: undefined,
			},
			shortUrls: profile.shortUrls.map((url) => ({
				...url,
				profile: undefined,
				id: undefined,
			})),
			id: undefined,
		};

		return returnUser;
	} catch (err) {
		throw err;
	}
};
