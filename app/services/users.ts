import { DeepPartial } from 'utils';

import { getRepository, FindManyOptions, FindConditions, Repository } from 'typeorm';
import { User } from '../models/user';

const userRepository = (): Repository<User> => getRepository(User);

export function findUser(options?: FindConditions<User>): Promise<User | undefined> {
  return userRepository().findOne(options);
}

export function createAndSave(user: User): Promise<User> {
  return userRepository().save(user);
}

export function findAll(options?: FindManyOptions): Promise<User[]> {
  return userRepository().find(options);
}

export function createMany(users: DeepPartial<User>[]): Promise<User[]> {
  return userRepository().save(users);
}

export default {
  findAll,
  createMany,
  findUser,
  createAndSave
};
