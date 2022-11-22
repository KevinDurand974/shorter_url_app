import { getDataSource } from '@libs/typeorm';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUserEmail,
  updateUserPassword,
  updateUserPseudo,
  updateUserUrlName,
  updateUserVip,
} from '@models';
import {
  deleteUserSchema,
  getUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserPseudoSchema,
  updateUserUrlNameSchema,
  updateUserVIPSchema,
} from '@shorter/validators';

import { publicProcedure, authProcedure, router } from '../configuration';

export const userRouter = router({
  deleteUser: publicProcedure.input(deleteUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return deleteUser(datasource, input);
  }),
  getUser: publicProcedure.input(getUserSchema).query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return getUser(datasource, input);
  }),
  getUsers: publicProcedure.query(async () => {
    const datasource = await getDataSource();
    return getUsers(datasource);
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
  // FIX: Use authProcedure to get UUID
  updateUserPseudo: publicProcedure.input(updateUserPseudoSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserPseudo(datasource, { ...input, uuid: process.env.UUID_TESTING! });
  }),
  // FIX: Use authProcedure to get UUID
  updateUserUrlName: publicProcedure.input(updateUserUrlNameSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserUrlName(datasource, { ...input, uuid: process.env.UUID_TESTING! });
  }),
});
