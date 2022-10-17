import "reflect-metadata";
import { DataSource } from "typeorm";
import { Profile, ShortUrl, User } from "./entities";

let DataSourceInstance: DataSource;

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST!,
	port: +process.env.DB_PORT!,
	username: process.env.DB_USERNAME!,
	password: process.env.DB_PASSWORD!,
	database: process.env.DB_DATABASE!,
	schema: process.env.DB_SCHEMA!,
	entities: [Profile, User, ShortUrl],
	synchronize: true,
	logging: false,
});

export const getDataSource = async () => {
	if (DataSourceInstance?.isInitialized) return DataSourceInstance;
	DataSourceInstance = await AppDataSource.initialize();
	return DataSourceInstance;
};
