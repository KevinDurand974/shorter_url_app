import "reflect-metadata";
import { DataSource } from "typeorm";
import { Profile, ShortUrl, User } from "./entities";

let DataSourceInstance: DataSource;

const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "root",
	database: "shorterurl",
	schema: "public",
	entities: [Profile, User, ShortUrl],
	synchronize: true,
	logging: false,
});

export const getDataSource = async () => {
	if (DataSourceInstance?.isInitialized) return DataSourceInstance;
	DataSourceInstance = await AppDataSource.initialize();
	return DataSourceInstance;
};
