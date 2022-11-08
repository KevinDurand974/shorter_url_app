import { DataSource } from 'typeorm';
import { Profile, Url, User } from '@entities';
import {
  comparePassword,
  findOneProfileByUuid,
  hashPassword,
  profileSelectors,
  urlSelectors,
  userSelectors,
} from '@helpers';
import { createError400, createError404, createValidationError } from '@shorter/errors';
import {
  CreateUserSchema,
  DeleteUserSchema,
  UpdateUserEmailSchema,
  UpdateUserPasswordSchema,
  UpdateUserPseudoSchema,
  UpdateUserUrlNameSchema,
  UpdateUserVIPSchema,
} from '@shorter/validators';

type Uuid = { uuid: string };
type CreateUserInput = CreateUserSchema;
type UpdateEmailInput = UpdateUserEmailSchema & Uuid;
type UpdatePasswordInput = UpdateUserPasswordSchema & Uuid;
type UpdateUrlNameInput = UpdateUserUrlNameSchema & Uuid;
type UpdateVipInput = UpdateUserVIPSchema & Uuid;
type UpdatePseudoInput = UpdateUserPseudoSchema & Uuid;
type DeleteUserInput = DeleteUserSchema & Uuid;

// NOTE: Create User
export const createUser = async (datasource: DataSource, data: CreateUserInput) => {
  try {
    // If email exist
    const UserRep = datasource.getRepository(User);
    const userExist = !!(await UserRep.count({
      where: { email: data.email },
    }));
    if (userExist) throw createError400('Email already assigned to an account');

    // If UrlName exist
    const ProfileRep = datasource.getRepository(Profile);
    const profileExist = !!(await ProfileRep.count({
      where: { urlName: data.urlName },
    }));
    if (profileExist) throw createError400('UrlName already assigned to an account');

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
    const newProfile = await ProfileRep.save(profile);

    // return
    return { uuid: newProfile.uuid, email: newUser.email, pseudo: newUser.pseudo, vip: newProfile.vip };
  } catch (err) {
    throw err;
  }
};

// NOTE: Delete User
export const deleteUser = async (datasource: DataSource, data: DeleteUserInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // Vefify password
    const hashedPassword = profile.user.password;
    const isPasswordValid = await comparePassword(hashedPassword, data.password);
    if (!isPasswordValid) throw createError400('Cannot delete this user');

    // Delete User
    const UserRep = datasource.getRepository(User);
    const UrlRep = datasource.getRepository(Url);
    await UserRep.remove(profile.user);
    await UrlRep.remove(profile.urls);
    await ProfileRep.remove(profile);
  } catch (err) {
    throw err;
  }
};

// NOTE: Get User
export const getUser = async (datasource: DataSource, data: Uuid) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await ProfileRep.findOne({
      where: { uuid: data.uuid },
      relations: ['user'],
      select: {
        id: true,
        ...profileSelectors,
        user: {
          ...userSelectors,
        },
      },
    });

    // Remove Id from Profile if exist
    delete (profile as any)?.id;

    // Return
    return profile;
  } catch (err) {
    throw err;
  }
};

// NOTE: Get All Users
export const getUsers = async (datasource: DataSource) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profiles = await ProfileRep.find({
      relations: ['user'],
      select: {
        id: true,
        ...profileSelectors,
        user: {
          ...userSelectors,
        },
      },
    });

    // Remove Id from Profiles if exist
    profiles.forEach((p: any) => delete p?.id);

    // Return
    return profiles;
  } catch (err) {
    throw err;
  }
};

// TODO: Update User Email

// TODO: Update User Password

// TODO: Update User Url Name

// TODO: Update User Pseudo

// TODO: Update User VIP
