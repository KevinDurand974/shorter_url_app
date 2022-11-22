import { DataSource } from 'typeorm';
import { Profile, Url } from '@entities';
import { findOneProfileByUuid, generateUUID, Payload } from '@helpers';
import { createError400, createError404 } from '@shorter/errors';
import type {
  CreateUrlSchema,
  DeleteUrlSchema,
  UpdateUrlSchema,
  GetUrlSchema,
  UpdateUrlActiveStatusSchema,
} from '@shorter/validators';
import { Context } from '@libs/trpc';

type ContextWithPayload = Context & { payload: Payload };

// FIX: Check if email verified on authProcedure and not here

// NOTE: Create Url
export const createUrl = async (datasource: DataSource, data: CreateUrlSchema, ctx: ContextWithPayload) => {
  try {
    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // If the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('Profile not found');
    }

    // If Email is verified
    if (!profile.verified) throw createError400('Email is not verified');

    // If the user has available urls
    if (+profile.availableUrls <= 0) throw createError400('You have no urls remaining');

    // If no-VIP and use custom url
    if (!profile.vip && data.custom) throw createError400('You are not a VIP user');

    // If VIP and use custom url
    if (profile.vip && data.custom) {
      const possibleUrl = data.useUrlName ? `${profile.urlName}/${data.custom}` : data.custom;
      const isTaken = profile.urls.some((url) => url.generatedUrl === possibleUrl);
      if (isTaken) throw createError400('Custom url is already taken');
    }

    // Generate URL
    let generatedUrl = `${data.useUrlName ? profile.urlName + '/' : ''}${generateUUID()}`;
    if (profile.vip && data.custom) {
      generatedUrl = `${data.useUrlName ? profile.urlName + '/' : ''}${data.custom}`;
    }

    // Create the short url
    const UrlRep = datasource.getRepository(Url);
    const url = new Url();
    url.generatedUrl = generatedUrl;
    url.redirect = data.to;
    url.ephemeral = data.ephemeral;
    url.duration = data.duration;
    url.useUrlName = data.useUrlName;
    url.profile = profile;

    // Decreament the available urls by 1
    profile.availableUrls = +profile.availableUrls - 1;

    // Save the url and profile
    await ProfileRep.save(profile);
    const savedShortUrl = await UrlRep.save(url);

    return {
      url: savedShortUrl.generatedUrl,
    };
  } catch (err) {
    throw err;
  }
};

// NOTE: Delete Url
export const deleteUrl = async (datasource: DataSource, data: DeleteUrlSchema, ctx: ContextWithPayload) => {
  try {
    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // If Email is verified
    if (!profile.verified) throw createError400('Email is not verified');

    // If the url exist and belong to the user
    const url = profile.urls.find((url) => url.uuid === data.urlUuid);
    if (!url) throw createError404('Url not found');

    // Increment the available urls by 1
    profile.availableUrls = +profile.availableUrls + 1;

    // Save the profile
    await ProfileRep.save(profile);
    // Delete the short url
    const UrlRep = datasource.getRepository(Url);
    await UrlRep.remove(url);
  } catch (err) {
    throw err;
  }
};

// NOTE: Update Url
export const updateUrl = async (datasource: DataSource, data: UpdateUrlSchema, ctx: ContextWithPayload) => {
  try {
    let updated = false;

    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // If Email is verified
    if (!profile.verified) throw createError400('Email is not verified');

    // If the url exist and belong to the user
    const url = profile.urls.find((url) => url.uuid === data.urlUuid);
    if (!url) throw createError404('Url not found');

    // Compare Redirect URL
    if (url.redirect !== data.to) {
      url.redirect = data.to;
      updated = true;
    }

    // Compare Ephemeral + Duration
    if (url.ephemeral !== data.ephemeral) {
      if (data.ephemeral) {
        url.ephemeral = true;
      } else {
        url.ephemeral = false;
      }
      updated = true;
    }

    // Compare Duration if Ephemeral is true
    if (url.ephemeral && url.duration !== data.duration) {
      url.duration = data.duration;
      updated = true;
    }

    // Throw error if no change
    if (!updated) throw createError400('No changes made');

    // Reset all counters if not the same redirect url
    if (url.redirect !== data.to) url.useCount = 0;

    // Save the URL
    const UrlRep = datasource.getRepository(Url);
    const updatedUrl = await UrlRep.save(url);

    // Return the new URL
    return updatedUrl;
  } catch (err) {
    throw err;
  }
};

// NOTE: Update Url - Change active status
export const updateUrlActiveStatus = async (
  datasource: DataSource,
  data: UpdateUrlActiveStatusSchema,
  ctx: ContextWithPayload
) => {
  try {
    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // If the url exist and belong to the user
    const url = profile.urls.find((url) => url.uuid === data.urlUuid);
    if (!url) throw createError404('Url not found');

    // If status is the same
    if (url.enabled === data.active) throw createError400('No changes made');

    // Change the active status
    url.enabled = data.active;

    // Save the URL
    const UrlRep = datasource.getRepository(Url);
    await UrlRep.save(url);
  } catch (err) {
    throw err;
  }
};

// NOTE: Get One Url
export const getUrl = async (datasource: DataSource, data: GetUrlSchema, ctx: ContextWithPayload) => {
  try {
    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // If Email is verified
    if (!profile.verified) throw createError400('Email is not verified');

    // Get and Check if the url exist
    const url = profile.urls.find((url) => url.uuid === data.urlUuid);
    if (!url) throw createError404('Url not found');

    // Return the url
    return url;
  } catch (err) {
    throw err;
  }
};

// NOTE: Get All Urls
export const getUrls = async (datasource: DataSource, ctx: ContextWithPayload) => {
  try {
    // Get Uuid from the context
    const { uuid } = ctx.payload;

    // Check if the user exist
    const ProfileRep = datasource.getRepository(Profile);
    const profile = await findOneProfileByUuid(ProfileRep, uuid);
    if (!profile) {
      throw createError404('User not found');
    }

    // If Email is verified
    if (!profile.verified) throw createError400('Email is not verified');

    // Return the urls
    return profile.urls;
  } catch (err) {
    throw err;
  }
};
