import {
  deleteUserSchema,
  getUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserPseudoSchema,
  updateUserUrlNameSchema,
  updateUserVIPSchema,
} from '@shorter/validators';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUserEmail,
  updateUserPassword,
  updateUserPseudo,
  updateUserUrlName,
  updateUserVip,
} from '../../../models';
import { getDataSource } from '../../typeorm';
import { publicProcedure, authProcedure, router } from '../configuration';

export const userRouter = router({
  // NOTE: Public Procedures
  getUser: publicProcedure.input(getUserSchema).query(async ({ input }) => {
    const datasource = await getDataSource();
    return getUser(datasource, input);
  }),
  getUsers: publicProcedure.query(async () => {
    const datasource = await getDataSource();
    return getUsers(datasource);
  }),
  // NOTE: Auth Procedures
  deleteUser: authProcedure.input(deleteUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return deleteUser(datasource, input, ctx);
  }),
  updateUserEmail: authProcedure.input(updateUserEmailSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserEmail(datasource, input, ctx);
  }),
  updateUserPassword: authProcedure.input(updateUserPasswordSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserPassword(datasource, input, ctx);
  }),
  updateUserVip: authProcedure.input(updateUserVIPSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserVip(datasource, input, ctx);
  }),
  updateUserPseudo: authProcedure.input(updateUserPseudoSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserPseudo(datasource, input, ctx);
  }),
  updateUserUrlName: authProcedure.input(updateUserUrlNameSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserUrlName(datasource, input, ctx);
  }),
});
