import { loginSchema } from '@shorter/validators';
import { getDataSource } from '@libs/typeorm';

import { publicProcedure, router } from '../configuration';

// FIX: Use authProcedure to get UUID
export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const datasource = await getDataSource();
    return true;
  }),
  logout: publicProcedure.mutation(async ({ input }) => {
    const datasource = await getDataSource();
    return true;
  }),
  // TODO: Forgot Password ?
});
