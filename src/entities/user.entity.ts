import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { UserRepository } from 'src/repositories/user.repository';
import { registerInputInterface } from 'src/user/dto/user.register.dto';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  //primay key
  @PrimaryKey()
  _id: ObjectId;

  //username field
  @Property()
  @Unique()
  username!: string;

  //password
  @Property()
  password!: string;

  //first name
  @Property()
  firstName!: string;

  //last name
  @Property()
  lastName!: string;

  //role
  @Property()
  role = 'user';

  //create time
  @Property()
  createdAt = new Date();

  //constructor
  constructor(userData: registerInputInterface) {
    const { username, password, firstName, lastName } = userData;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
