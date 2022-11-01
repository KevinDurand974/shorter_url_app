import { DataSource } from 'typeorm';
import { add, isAfter } from 'date-fns';
import { ShortUrl } from '@entities';
import { createValidationError } from '@shorter/errors';
import { GetShortUrlSchema, validateGetShortUrl } from '@shorter/validators';

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
