import { getDataSource } from '@libs/typeorm';
import { createUrl, deleteUrl, getUrl, getUrls, updateUrl } from '@models';
import { createUrlSchema, deleteUrlSchema, getUrlSchema, updateUrlSchema } from '@shorter/validators';

import { publicProcedure, router } from '../configuration';

// FIX: use authProcedure - It's User based only
// FIX: use Context to get User UUID
export const urlRouter = router({
  createUrl: publicProcedure.input(createUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return createUrl(datasource, {
      ...input,
      uuid: process.env.UUID_TESTING!, // FIX:
    });
  }),
  deleteUrl: publicProcedure.input(deleteUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return deleteUrl(datasource, {
      ...input,
      uuid: process.env.UUID_TESTING!, // FIX:
    });
  }),
  updateUrl: publicProcedure.input(updateUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUrl(datasource, {
      ...input,
      uuid: process.env.UUID_TESTING!, // FIX:
    });
  }),
  getUrls: publicProcedure.input(getUrlSchema).query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return getUrl(datasource, {
      ...input,
      uuid: process.env.UUID_TESTING!, // FIX:
    });
  }),
  getUrl: publicProcedure.query(async ({ ctx }) => {
    const datasource = await getDataSource();
    return getUrls(datasource, {
      uuid: process.env.UUID_TESTING!, // FIX:
    });
  }),
});
