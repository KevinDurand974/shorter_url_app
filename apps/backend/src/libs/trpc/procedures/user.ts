import { getDataSource } from '@libs/typeorm';

import { publicProcedure, router } from '../configuration';

export const userRouter = router({
  createUser: publicProcedure.input().mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
});
