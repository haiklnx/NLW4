import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';
@EntityRepository(User)
class UsersReporsitory extends Repository<User> {

}

export { UsersReporsitory };
