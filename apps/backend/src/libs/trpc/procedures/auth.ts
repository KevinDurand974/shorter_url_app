import { loginSchema } from '@shorter/validators';
import { getDataSource } from '@libs/typeorm';

import { publicProcedure, router } from '../configuration';
import { auth, login, logout, refreshToken } from '@models';

// FIX: Use authProcedure to get UUID
export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return login(datasource, input, ctx);
  }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const datasource = await getDataSource();
    await logout(datasource, ctx);
  }),
  refresh: publicProcedure.mutation(async ({ ctx }) => {
    const datasource = await getDataSource();
    return refreshToken(datasource, ctx);
  }),
  me: publicProcedure.mutation(async ({ ctx }) => {
    const datasource = await getDataSource();
    return auth(datasource, ctx);
  }),
  // TODO: Forgot Password ?
});
