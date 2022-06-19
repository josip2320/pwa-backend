// custom repository for user

import { EntityRepository } from '@mikro-orm/mongodb';
import { User } from 'src/entities/user.entity';

export class UserRepository extends EntityRepository<User> {}
