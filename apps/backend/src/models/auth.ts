import { DataSource } from 'typeorm';
import { createError400, createError404 } from '@shorter/errors';
import { LoginSchema } from '@shorter/validators';
import { Profile, User } from '@entities';

type Uuid = { uuid: string };
type LoginInput = LoginSchema & Uuid;

export const login = async (datasource: DataSource, data: LoginInput) => {
  try {
  } catch (err) {
    throw err;
  }
};

export const logout = async (datasource: DataSource, data: Uuid) => {
  try {
  } catch (err) {
    throw err;
  }
};
