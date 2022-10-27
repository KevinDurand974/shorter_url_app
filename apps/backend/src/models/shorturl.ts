import { Profile, ShortUrl } from '@entities';
import { findOneProfileByUuid } from '@helpers';
import { createError400, createError404, createValidationError } from '@shorter/errors';
import {
  validateCreateShortUrl,
  validateDeleteShortUrl,
  validateGetShortUrl,
  CreateShortUrlSchema,
  DeleteShortUrlSchema,
  GetShortUrlSchema,
} from '@shorter/validators';
import { add, isAfter } from 'date-fns';
import { DataSource } from 'typeorm';

export const createShortUrl = async (datasource: DataSource, data: CreateShortUrlSchema) => {
  try {
    // Validating Data
    const validatingData = await validateCreateShortUrl(data);
    if (!validatingData.success) {
      throw createValidationError(validatingData.error.issues);
    }
    const validatedData = validatingData.data;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, validatedData.uuid);
    if (!profile) {
      throw createError404('Profile not found');
    }

    // Check if the user has available urls
    if (+profile.availableUrls <= 0) {
      throw createError400('You have no urls remaining');
    }

    // No VIP cant use urlName
    if (!profile.vip && validatedData.useUrlName) {
      throw createError400("You are not a VIP user, you can't use urlName for your url");
    }

    // VIP can use custom url
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&';
    const length = 12;
    const { customAlphabet } = await import('nanoid');
    const nanoid = customAlphabet(alphabet, length);
    let customUrl = '';
    if (profile.vip) {
      if (validatedData.custom) {
        customUrl = validatedData.custom;
      } else {
        customUrl = nanoid();
      }
    } else {
      if (validatedData.custom) {
        throw createError400("You are not a VIP user, you can't use custom url");
      } else {
        customUrl = nanoid();
      }
    }

    // Check if the custom url is already in use
    const shortUrls = profile.shortUrls;
    const vipUrlSkeleton = profile.urlName + '/' + customUrl;
    if (profile.vip && validatedData.custom) {
      if (shortUrls.find((s) => s.generatedUrl === vipUrlSkeleton)) {
        throw createError400('This custom url is already in use');
      }
    }
    let generatedUrl = '';
    if (profile.vip && validatedData.useUrlName) {
      generatedUrl = vipUrlSkeleton;
    } else {
      generatedUrl = customUrl;
    }

    // Create the short url
    const ShortUrlRep = datasource.getRepository(ShortUrl);
    const shortUrl = new ShortUrl();
    shortUrl.generatedUrl = generatedUrl;
    shortUrl.redirect = validatedData.to;
    shortUrl.ephemeral = validatedData.ephemeral;
    shortUrl.duration = validatedData.duration;
    shortUrl.useUrlName = validatedData.useUrlName;
    shortUrl.profile = profile;

    // Decreament the available urls by 1
    profile.availableUrls = +profile.availableUrls - 1;

    // Save the short url and profile
    await ProfileRep.save(profile);
    const savedShortUrl = await ShortUrlRep.save(shortUrl);

    return {
      generatedUrl: savedShortUrl.generatedUrl,
    };
  } catch (err) {
    throw err;
  }
};

export const deleteShortUrl = async (datasource: DataSource, data: DeleteShortUrlSchema) => {
  try {
    // Validating Data
    const validatingData = await validateDeleteShortUrl(data);
    if (!validatingData.success) {
      throw createValidationError(validatingData.error.issues);
    }
    const validatedData = validatingData.data;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, validatedData.userUuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // Check if the short url exist
    const ShortUrlRep = datasource.getRepository(ShortUrl);
    const shortUrl = await ShortUrlRep.findOne({
      where: {
        uuid: validatedData.shortUrlUuid,
      },
      relations: ['profile'],
    });
    if (!shortUrl) {
      throw createError404('Cannot found the url to remove');
    }

    // Check if the short url belong to the user
    if (shortUrl.profile.uuid !== validatedData.userUuid) {
      throw createError400('This url does not belong to you');
    }

    // Increment the available urls by 1
    profile.availableUrls = +profile.availableUrls + 1;

    // Save the profile
    await ProfileRep.save(profile);
    // Delete the short url
    await ShortUrlRep.remove(shortUrl);
  } catch (err) {
    throw err;
  }
};

export const getShortUrl = async (datasource: DataSource, data: GetShortUrlSchema) => {
  try {
    // Validating Data
    const validatingData = await validateGetShortUrl(data);
    if (!validatingData.success) {
      throw createValidationError(validatingData.error.issues);
    }
    const validatedData = validatingData.data;

    // Check if the short url exist
    const ShortUrlRep = datasource.getRepository(ShortUrl);
    const shortUrl = await ShortUrlRep.findOneBy({
      generatedUrl: validatedData.url,
    });

    // Cancel if the short url doesn't exist
    if (!shortUrl) return null;

    // Check if the short url is ephemeral
    if (shortUrl.ephemeral) {
      // Check if the short url is expired
      const maxDate = add(new Date(shortUrl.createdAt), {
        seconds: +shortUrl.duration,
      });
      const now = new Date();
      if (isAfter(now, maxDate)) return null;
    }

    // Increment the number of clicks
    shortUrl.useCount = +shortUrl.useCount + 1;

    // Save the short url
    await ShortUrlRep.save(shortUrl);

    // Return the redirect url
    return shortUrl.redirect;
  } catch (err) {
    throw err;
  }
};
