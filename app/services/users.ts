import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User, UserDTO } from '../models/user';

// eslint-disable-next-line new-cap
@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByName(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }

  public createAndSave(userData: UserDTO): Promise<User> {
    const user = new User(userData);
    return this.save(user);
  }
}

export default (): UserRepository => getCustomRepository(UserRepository);
