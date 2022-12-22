import { DataSource, MoreThanOrEqual } from 'typeorm';
import { add } from 'date-fns';

import { createError400, createError401 } from '@shorter/errors';
import { CreateUserSchema, LoginSchema } from '@shorter/validators';
import { Context } from '../libs/trpc';
import { comparePassword, createAccessToken, createRefreshToken, hashPassword, verifyToken } from '../helpers';
import { Profile, Token, User } from '../entities';

const fromNowToDate = (toDate: Date, ms = true) => {
  const start = new Date().getTime();
  const end = toDate.getTime();
  return ms ? end - start : Math.round((end - start) / 1000);
};

// NOTE: Login
// FIX: Implement No Cookie / Remember Me as false
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

    const cookieDatas = {
      uuid: user.profile.uuid,
      vip: user.profile.vip,
      pseudo: user.pseudo,
      emailVerified: user.profile.verified,
    };

    // Create refresh_token
    const refreshToken = createRefreshToken(cookieDatas);

    // Create access_token
    const accessToken = createAccessToken(cookieDatas);

    // Create duration in ms
    const day30 = fromNowToDate(add(new Date(), { days: 30 }));
    const sec30 = fromNowToDate(add(new Date(), { seconds: 30 }));

    // FIX: Make cookie secure on Prod
    // Create cookie for refresh token
    ctx.res.cookie('usrt', refreshToken, { httpOnly: true, maxAge: day30 });

    // Create cookie for access token
    ctx.res.cookie('usat', accessToken, { httpOnly: true, maxAge: sec30 });

    // Create cookie for logged in (same duration as access token)
    ctx.res.cookie('usli', 1, { maxAge: sec30 });

    // Create a token bind to the user in the database
    const TokenRep = datasource.getRepository(Token);
    const token = new Token();
    token.uuid = user.profile.uuid;
    token.token = refreshToken;
    token.expiredAt = add(new Date(), { days: 30 });
    await TokenRep.save(token);

    return { user: cookieDatas };
  } catch (err) {
    throw err;
  }
};

// NOTE: Logout
export const logout = async (datasource: DataSource, ctx: Context) => {
  // Get refresh_token from cookies
  const refreshToken = ctx.cookies.usrt;

  // Remove it from database
  if (refreshToken) {
    const TokenRep = datasource.getRepository(Token);
    await TokenRep.delete({ token: refreshToken });
  }

  // Remove it from cookies
  ctx.res.clearCookie('usrt');
  ctx.res.clearCookie('usat');
  ctx.res.clearCookie('usli');
};

// NOTE: Refresh Token
export const refreshToken = async (datasource: DataSource, ctx: Context) => {
  try {
    // Get token from context
    const currentRefreshToken = ctx.cookies.usrt;
    const payload = verifyToken(currentRefreshToken, 'refresh');

    // Check token in database
    const TokenRep = datasource.getRepository(Token);
    const token = await TokenRep.findOne({
      where: {
        expiredAt: MoreThanOrEqual(new Date()),
        token: currentRefreshToken,
      },
    });

    // If token not bind to an user
    if (!token) throw createError401('Unauthenticated');

    // Recreate accessToken
    const accessToken = createAccessToken({
      uuid: payload.uuid,
      vip: payload.vip,
      pseudo: payload.pseudo,
      emailVerified: payload.emailVerified,
    });

    // Create duration in ms
    const sec30 = fromNowToDate(add(new Date(), { seconds: 30 }));

    // Create cookie for access token
    ctx.res.cookie('usat', accessToken, { httpOnly: true, maxAge: sec30 });

    // Create cookie for logged in (same duration as access token)
    ctx.res.cookie('usli', 1, { maxAge: sec30 });

    // Return access_token
    return { accessToken };
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
      where: { urlName: data.urlname },
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
    profile.urlName = data.urlname;

    // Save User
    await UserRep.save(user);

    // Save Profile
    await ProfileRep.save(profile);
  } catch (err) {
    throw err;
  }
};
