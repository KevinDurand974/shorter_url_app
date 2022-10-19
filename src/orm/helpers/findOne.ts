import { Repository } from "typeorm";
import { Profile } from "@ORM/entities";

export const findOneProfileByUuid = async (
	repository: Repository<Profile>,
	uuid: string
) => {
	return repository.findOne({
		where: { uuid },
		relations: ["user", "shortUrls"],
		cache: 60000,
	});
};
