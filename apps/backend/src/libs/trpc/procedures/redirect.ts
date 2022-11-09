import { getDataSource } from '@libs/typeorm';
import { getRedirectUrl } from '@models';
import { getRedirectUrlSchema } from '@shorter/validators';

import { publicProcedure, router } from '../configuration';

export const redirectRouter = router({
  redirect: publicProcedure.input(getRedirectUrlSchema).mutation(async ({ input }) => {
    const datasource = await getDataSource();
    return getRedirectUrl(datasource, input);
  }),
});
