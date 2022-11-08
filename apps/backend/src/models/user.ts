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

// NOTE: Update User Email
export const updateUserEmail = async (datasource: DataSource, data: UpdateEmailInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // If this user has this email
    if (profile.user.email !== data.currentEmail) throw createError400('User has not this email');

    // if new email is the same as current email
    if (profile.user.email === data.newEmail) throw createError400('Same email, nothing to update');

    // If new email exist
    const UserRep = datasource.getRepository(User);
    const userExist = !!(await UserRep.count({
      where: { email: data.newEmail },
    }));
    if (userExist) throw createError400('Email already assigned to an account');

    // Update User
    profile.user.email = data.newEmail;

    // Save User
    await UserRep.save(profile.user);
  } catch (err) {
    throw err;
  }
};

// NOTE: Update User Password
export const updateUserPassword = async (datasource: DataSource, data: UpdatePasswordInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // If same password
    if (data.currentPassword === data.newPassword) throw createError400('Same password, nothing to update');

    // Verify password
    const hashedPassword = profile.user.password;
    const isPasswordValid = await comparePassword(hashedPassword, data.currentPassword);
    if (!isPasswordValid) throw createError400('Wrong password');

    // Update User
    profile.user.password = await hashPassword(data.newPassword);

    // Save User
    await ProfileRep.save(profile);
  } catch (err) {
    throw err;
  }
};

// NOTE: Update User Url Name
export const updateUserUrlName = async (datasource: DataSource, data: UpdateUrlNameInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // If same UrlName
    if (profile.urlName === data.urlName) throw createError400('Same Url name, nothing to update');

    // If UrlName exist
    const profileExist = !!(await ProfileRep.count({
      where: { urlName: data.urlName },
    }));
    if (profileExist) throw createError400('Url name already assigned to an account');

    // Update User
    profile.urlName = data.urlName;

    // Save User
    await ProfileRep.save(profile);
  } catch (err) {
    throw err;
  }
};

// NOTE: Update User Pseudo
export const updateUserPseudo = async (datasource: DataSource, data: UpdatePseudoInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // If same Pseudo
    if (profile.user.pseudo === data.pseudo) throw createError400('Same Pseudo, nothing to update');

    // Update User
    profile.user.pseudo = data.pseudo;

    // Save User
    await ProfileRep.save(profile);
  } catch (err) {
    throw err;
  }
};

// NOTE: Update User VIP
export const updateUserVip = async (datasource: DataSource, data: UpdateVipInput) => {
  try {
    // If User exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, data.uuid);
    if (!profile) throw createError404("This User doesn't exist");

    // Update User
    const vip = data.vip;
    profile.vip = vip;

    // User is VIP
    if (vip) {
      profile.maxUrls = 250;
      profile.availableUrls += 225;

      // Disable restricted ones if user has old VIP urls
      const oldVipUrls = profile.urls.filter((url) => url.restricted);
      const updatedVipUrls = oldVipUrls.map((url) => ({ ...url, restricted: false }));
      profile.urls = [...profile.urls.filter((url) => !url.restricted), ...updatedVipUrls];
    }
    // User is not VIP
    else {
      profile.maxUrls = 25;
      profile.availableUrls -= 225;

      // Restrict old urls to match new maxUrls
      const oldUrls = profile.urls.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      const restrictingUrls = oldUrls.slice(25).map((url) => ({ ...url, restricted: true }));
      profile.urls = [...oldUrls.slice(0, 25), ...restrictingUrls];
    }

    // Update Urls
    const UrlRep = datasource.getRepository(Url);
    await UrlRep.save(profile.urls);

    // Save User
    await ProfileRep.save(profile);
  } catch (err) {
    throw err;
  }
};
