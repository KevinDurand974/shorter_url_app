import { getDataSource } from '@libs/typeorm';
import { createUrl, deleteUrl, getUrl, getUrls, updateUrl, updateUrlActiveStatus } from '@models';
import {
  createUrlSchema,
  deleteUrlSchema,
  getUrlSchema,
  updateUrlActiveStatusSchema,
  updateUrlSchema,
} from '@shorter/validators';

import { authProcedure, router, verifiedEmailProcedure } from '../configuration';

export const urlRouter = router({
  createUrl: authProcedure.input(createUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return createUrl(datasource, input, ctx);
  }),
  deleteUrl: authProcedure.input(deleteUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return deleteUrl(datasource, input, ctx);
  }),
  updateUrl: authProcedure.input(updateUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUrl(datasource, input, ctx);
  }),
  updateUrlActiveStatus: authProcedure.input(updateUrlActiveStatusSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUrlActiveStatus(datasource, input, ctx);
  }),
  getUrl: authProcedure.input(getUrlSchema).query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return getUrl(datasource, input, ctx);
  }),
  getUrls: verifiedEmailProcedure.query(async ({ ctx }) => {
    const datasource = await getDataSource();
    return getUrls(datasource, ctx);
  }),
});
