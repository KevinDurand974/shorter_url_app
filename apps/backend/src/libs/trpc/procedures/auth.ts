import { createUserSchema, loginSchema } from '@shorter/validators';
import { login, logout, refreshToken, register } from '../../../models';
import { getDataSource } from '../../typeorm';
import { publicProcedure, refreshProcedure, router } from '../configuration';

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
  refresh: publicProcedure.query(async ({ ctx }) => {
    const datasource = await getDataSource();
    return refreshToken(datasource, ctx);
  }),
  // NOTE: Refresh Procedures
  verifyToken: refreshProcedure.query(({ ctx }) => ctx.tokenValid),

  // TODO: Forgot Password ?
});
