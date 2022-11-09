import { getDataSource } from '@libs/typeorm';
import {
  createUser,
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
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserEmailSchema,
  updateUserPasswordSchema,
  updateUserPseudoSchema,
  updateUserUrlNameSchema,
  updateUserVIPSchema,
} from '@shorter/validators';

import { publicProcedure, router } from '../configuration';

export const userRouter = router({
  createUser: publicProcedure.input(createUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return createUser(datasource, input);
  }),
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
  // FIX: Use authProcedure to get UUID
  updateUserEmail: publicProcedure.input(updateUserEmailSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserEmail(datasource, { ...input, uuid: process.env.UUID_TESTING! });
  }),
  // FIX: Use authProcedure to get UUID
  updateUserPassword: publicProcedure.input(updateUserPasswordSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserPassword(datasource, { ...input, uuid: process.env.UUID_TESTING! });
  }),
  // FIX: Use authProcedure to get UUID
  updateUserVip: publicProcedure.input(updateUserVIPSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return updateUserVip(datasource, { ...input, uuid: process.env.UUID_TESTING! });
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
