import { DataSource } from 'typeorm';
import { Profile, Token, Url, User } from '../../entities';

let DataSourceInstance: DataSource;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  schema: process.env.DB_SCHEMA!,
  entities: [Profile, User, Url, Token],
  synchronize: true, // FIX: Remove this in production
  logging: false,
});

export const getDataSource = async () => {
  if (DataSourceInstance?.isInitialized) return DataSourceInstance;
  DataSourceInstance = await AppDataSource.initialize();
  return DataSourceInstance;
};
