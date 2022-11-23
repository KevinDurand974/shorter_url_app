import { createUserSchema, loginSchema } from '@shorter/validators';
import { login, logout, refreshToken, register } from '../../../models';
import { getDataSource } from '../../typeorm';
import { publicProcedure, authProcedure, router } from '../configuration';

export const authRouter = router({
  // NOTE: Public Procedures
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return login(datasource, input, ctx);
  }),
  register: publicProcedure.input(createUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return register(datasource, input, ctx);
  }),
  // NOTE: Auth Procedures
  logout: authProcedure.mutation(async ({ ctx }) => {
    const datasource = await getDataSource();
    await logout(datasource, ctx);
  }),
  refresh: authProcedure.mutation(async ({ ctx }) => {
    const datasource = await getDataSource();
    return refreshToken(datasource, ctx);
  }),

  // TODO: Forgot Password ?
});
