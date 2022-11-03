import { DataSource } from 'typeorm';
import { Profile, Url, User } from '@entities';
import { comparePassword, findOneProfileByUuid, hashPassword } from '@helpers';
import { createError400, createError404, createValidationError } from '@shorter/errors';
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  UpdateUserEmailSchema,
  UpdateUserPasswordSchema,
  UpdateUserPseudo,
  UpdateUserUrlNameSchema,
  UpdateUserVIP,
} from '@shorter/validators';

type Uuid = { uuid: string };
type CreateUserInput = CreateUserSchema;
type UpdateEmailInput = UpdateUserEmailSchema & Uuid;
type UpdatePasswordInput = UpdateUserPasswordSchema & Uuid;
type UpdateUrlNameInput = UpdateUserUrlNameSchema & Uuid;
type UpdateVipInput = UpdateUserVIP & Uuid;
type UpdatePseudoInput = UpdateUserPseudo & Uuid;
type DeleteUserInput = DeleteUserSchema & Uuid;
type GetUserInput = GetUserSchema & Uuid;

// NOTE: Create User
export const createUser = async (datasource: DataSource, data: CreateUserInput) => {
  try {
    // If email exist
    const UserRep = datasource.getRepository(User);
    const userExist = !!(await UserRep.count({
      where: { email: data.email },
    }));
    if (!userExist) throw createError400('Email already assigned to an account');

    // Create User
    const user = new User();
    user.email = data.email;
    user.password = await hashPassword(data.password);
    user.pseudo = data.pseudo;

    // Create Profile
    const profile = new Profile();
    profile.user = user;
    profile.urlName = data.urlName;

    // Save User
    const newUser = await UserRep.save(user);

    // Save Profile
    const ProfileRep = datasource.getRepository(Profile);
    const newProfile = await ProfileRep.save(profile);

    // return
    return { uuid: newProfile.uuid, email: newUser.email, pseudo: newUser.pseudo, vip: newProfile.vip };
  } catch (err) {
    throw err;
  }
};

// NOTE: Delete User

// NOTE: Get User

// NOTE: Get All Users

// NOTE: Update User Email

// NOTE: Update User Password

// NOTE: Update User Url Name

// NOTE: Update User Pseudo

// NOTE: Update User VIP
