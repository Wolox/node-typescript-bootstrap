import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User } from '../models/user';

// eslint-disable-next-line new-cap
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByName(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }

  public createAndSave(user: User): Promise<User> {
    return this.save(user);
  }
}

export default (): UserRepository => getCustomRepository(UserRepository);
