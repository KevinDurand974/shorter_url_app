import { DataSource, MoreThanOrEqual } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { add } from 'date-fns';

import { createError400, createError401, createError404 } from '@shorter/errors';
import { CreateUserSchema, LoginSchema } from '@shorter/validators';

import { Profile, User, Token } from '@entities';
import { comparePassword, createAccessToken, createRefreshToken, hashPassword, Payload, verifyToken } from '@helpers';
import { Context } from '@libs/trpc';

type ContextWithPayload = Context & { payload: Payload };

// NOTE: Login
export const login = async (datasource: DataSource, data: LoginSchema, ctx: Context) => {
  try {
    // If email exist
    const UserRep = datasource.getRepository(User);
    const user = await UserRep.findOne({
      where: { email: data.email },
      relations: ['profile'],
    });
    if (!user) throw createError400('Cannot login, please check your credentials');

    // If password is correct
    const valid = await comparePassword(user.password, data.password);
    if (!valid) throw createError400('Cannot login, please check your credentials');

    // Create refresh_token
    const refresh_token = createRefreshToken({
      uuid: user.profile.uuid,
      vip: user.profile.vip,
      pseudo: user.pseudo,
      emailChecked: user.profile.verified,
    });

    // Create cookie for refresh_token
    ctx.res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Create a token bind to the user in the database
    const TokenRep = datasource.getRepository(Token);
    const token = new Token();
    token.uuid = user.profile.uuid;
    token.token = refresh_token;
    token.expiredAt = add(new Date(), { days: 7 });
    await TokenRep.save(token);

    // Create access_token
    const access_token = createAccessToken({
      uuid: user.profile.uuid,
      vip: user.profile.vip,
      pseudo: user.pseudo,
      emailChecked: user.profile.verified,
    });

    // Return access_token
    return { access_token };
  } catch (err) {
    throw err;
  }
};

// NOTE: Logout
export const logout = async (datasource: DataSource, ctx: ContextWithPayload) => {
  // Get refresh_token from cookies
  const refresh_token = ctx.cookies.refresh_token;

  // Remove it from database
  if (refresh_token) {
    const TokenRep = datasource.getRepository(Token);
    await TokenRep.delete({ token: refresh_token });
  }

  // Remove it from cookies
  ctx.res.clearCookie('refresh_token');
};

// NOTE: Refresh Token
export const refreshToken = async (datasource: DataSource, ctx: ContextWithPayload) => {
  try {
    // Get Payload from context
    const payload = ctx.payload;

    // Check token in database
    const TokenRep = datasource.getRepository(Token);
    const token = await TokenRep.findOne({
      where: {
        expiredAt: MoreThanOrEqual(new Date()),
        uuid: payload.uuid,
      },
    });

    // If token bind to an user
    if (!token) throw createError401('Unauthenticated');

    // Recreate access_token
    const access_token = createAccessToken({
      uuid: payload.uuid,
      vip: payload.vip,
      pseudo: payload.pseudo,
      emailChecked: payload.emailChecked,
    });

    // Return access_token
    return { access_token };
  } catch (err) {
    // Global Error
    throw createError401('Unauthenticated');
  }
};

// NOTE: Register
export const register = async (datasource: DataSource, data: CreateUserSchema, ctx: Context) => {
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
    await UserRep.save(user);

    // Save Profile
    await ProfileRep.save(profile);

    // Create refresh_token
    const refresh_token = createRefreshToken({
      uuid: user.profile.uuid,
      vip: user.profile.vip,
      pseudo: user.pseudo,
      emailChecked: user.profile.verified,
    });

    // Create cookie for refresh_token
    ctx.res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // Create a token bind to the user in the database
    const TokenRep = datasource.getRepository(Token);
    const token = new Token();
    token.uuid = user.profile.uuid;
    token.token = refresh_token;
    token.expiredAt = add(new Date(), { days: 7 });
    await TokenRep.save(token);

    // Create access_token
    const access_token = createAccessToken({
      uuid: user.profile.uuid,
      vip: user.profile.vip,
      pseudo: user.pseudo,
      emailChecked: user.profile.verified,
    });

    // Return access_token
    return { access_token };
  } catch (err) {
    throw err;
  }
};
