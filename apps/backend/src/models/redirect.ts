import { addHours, isAfter } from 'date-fns';
import { DataSource } from 'typeorm';

import { GetRedirectUrlSchema } from '@shorter/validators';
import { createError400, createError404 } from '@shorter/errors';
import { Url } from '../entities';

export const getRedirectUrl = async (datasource: DataSource, data: GetRedirectUrlSchema) => {
  try {
    // Get url from database
    const UrlRep = datasource.getRepository(Url);
    const url = await UrlRep.findOne({ where: { generatedUrl: data.path } });
    if (!url) throw createError404('Url not found');

    // If restricted
    if (url.restricted) throw createError400('Error, this url is restricted');

    // If disabled
    if (!url.enabled) throw createError400('Error, this url is disabled by its owner');

    // If the url is ephemeral, check if it has expired
    if (url.ephemeral) {
      const maxDate = addHours(url.updatedAt, url.duration);
      const now = new Date();
      if (isAfter(now, maxDate)) throw createError400('This url has expired');
    }

    // Add increment count to this url
    url.useCount = +url.useCount + 1;

    // Save url
    await UrlRep.save(url);

    // Return the redirect url
    return url.redirect;
  } catch (err) {
    throw err;
  }
};
