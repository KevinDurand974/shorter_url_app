import { z } from 'zod';
import isURL from 'validator/lib/isURL';

import { createShortUrl, deleteShortUrl, updateUserUrlActive, updateUserUrlName } from '@models';
import { getDataSource } from '@libs/typeorm';

import { router, publicProcedure } from '../configuration';

export const urlRouter = router({
  createShortUrl: publicProcedure
    .input(
      z.object({
        uuid: z.string().uuid(),
        useUrlName: z.boolean(),
        to: z.string().refine(
          (url) =>
            isURL(url, {
              allow_fragments: false,
            }),
          'Invalid URL, please check your url, fragments are not allowed'
        ),
        ephemeral: z.boolean(),
        custom: z.string().min(5).max(60).optional(),
        duration: z
          .number()
          .int()
          .positive('Duration must be a positive integer')
          .min(3600, 'Minimum duration is 1 hour')
          .max(5184000, 'Maximum duration is 60 days')
          .optional()
          .default(86400),
      })
    )
    .mutation(async (req) => {
      const datasource = await getDataSource();
      const validatedData = req.input;
      const newShortUrl = await createShortUrl(datasource, validatedData);
      return { status: 201, data: newShortUrl };
    }),
});
