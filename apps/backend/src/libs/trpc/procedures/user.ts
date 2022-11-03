import { getDataSource } from '@libs/typeorm';
import { createUser, deleteUser, getUser, getUsers } from '@models';
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
  // TODO:
  updateUserEmail: publicProcedure.input(updateUserEmailSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  // TODO:
  updateUserPassword: publicProcedure.input(updateUserPasswordSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  // TODO:
  updateUserVIp: publicProcedure.input(updateUserVIPSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  // TODO:
  updateUserPseudo: publicProcedure.input(updateUserPseudoSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  // TODO:
  updateUserUrlName: publicProcedure.input(updateUserUrlNameSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
});
