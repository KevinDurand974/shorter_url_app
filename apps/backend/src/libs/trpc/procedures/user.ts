import { getDataSource } from '@libs/typeorm';
import {
  createUserSchema,
  deleteUserSchema,
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
    return true;
  }),
  deleteUser: publicProcedure.input(deleteUserSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  getUser: publicProcedure.query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  getUsers: publicProcedure.query(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  updateUserEmail: publicProcedure.input(updateUserEmailSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  updateUserPassword: publicProcedure.input(updateUserPasswordSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  updateUserVIp: publicProcedure.input(updateUserVIPSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  updateUserPseudo: publicProcedure.input(updateUserPseudoSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
  updateUserUrlName: publicProcedure.input(updateUserUrlNameSchema).mutation(async ({ input, ctx }) => {
    const datasource = await getDataSource();
    return true;
  }),
});
