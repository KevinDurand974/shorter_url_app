import { getDataSource } from '@libs/typeorm';

import { publicProcedure, router } from '../configuration';

export const redirectRouter = router({
  redirect: publicProcedure
    .input((a) => a)
    .mutation(async ({ input, ctx }) => {
      const datasource = await getDataSource();
      return true;
    }),
});
