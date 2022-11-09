import { getDataSource } from '@libs/typeorm';

import { publicProcedure, router } from '../configuration';

export const authRouter = router({
  login: publicProcedure
    .input((a) => a)
    .mutation(async ({ input }) => {
      const datasource = await getDataSource();
      return true;
    }),
  logout: publicProcedure
    .input((a) => a)
    .mutation(async ({ input }) => {
      const datasource = await getDataSource();
      return true;
    }),
  register: publicProcedure
    .input((a) => a)
    .mutation(async ({ input }) => {
      const datasource = await getDataSource();
      return true;
    }),
  // TODO: Forgot Password ?
});
