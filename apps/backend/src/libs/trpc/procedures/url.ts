import {
  checkCustomUrlSchema,
  createUrlSchema,
  deleteUrlSchema,
  getUrlSchema,
  updateUrlActiveStatusSchema,
  updateUrlSchema,
} from '@shorter/validators';
import {
  checkUserCustomUrl,
  createUrl,
  deleteUrl,
  getUrl,
  getUrls,
  updateUrl,
  updateUrlActiveStatus,
} from '../../../models';
import { getDataSource } from '../../typeorm';
import { router, verifiedEmailProcedure, authProcedure } from '../configuration';

export const urlRouter = router({
  createUrl: verifiedEmailProcedure.input(createUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return createUrl(datasource, input, ctx);
  }),
  deleteUrl: verifiedEmailProcedure.input(deleteUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return deleteUrl(datasource, input, ctx);
  }),
  updateUrl: verifiedEmailProcedure.input(updateUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUrl(datasource, input, ctx);
  }),
  updateUrlActiveStatus: verifiedEmailProcedure.input(updateUrlActiveStatusSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUrlActiveStatus(datasource, input, ctx);
  }),
  getUrl: verifiedEmailProcedure.input(getUrlSchema).query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return getUrl(datasource, input, ctx);
  }),
  getUrls: verifiedEmailProcedure.query(async ({ ctx }) => {
    const datasource = await getDataSource();
    return getUrls(datasource, ctx);
  }),
  checkUserCustomUrl: authProcedure.input(checkCustomUrlSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return checkUserCustomUrl(datasource, input, ctx);
  }),
});
