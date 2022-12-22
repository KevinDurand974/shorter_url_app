import { createUserSchema, loginSchema } from '@shorter/validators';
import { login, logout, refreshToken, register } from '../../../models';
import { getDataSource } from '../../typeorm';
import { authProcedure, publicProcedure, router } from '../configuration';

export const authRouter = router({
  // NOTE: Public Procedures
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return login(datasource, input, ctx);
  }),
  register: publicProcedure.input(createUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    await register(datasource, input, ctx);
  }),
  logout: publicProcedure.query(async ({ ctx }) => {
    const datasource = await getDataSource();
    await logout(datasource, ctx);
  }),
  testAuth: authProcedure.query(async ({ ctx }) => ({ valid: true })),

  // TODO: Forgot Password ?
});
