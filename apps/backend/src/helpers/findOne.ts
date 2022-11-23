import { Repository } from 'typeorm';
import { Profile } from '../entities';

export const findOneProfileByUuid = async (repository: Repository<Profile>, uuid: string) => {
  return repository.findOne({
    where: { uuid },
    relations: ['user', 'urls'],
  });
};
