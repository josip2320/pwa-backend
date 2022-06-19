import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { registerInputInterface } from './dto/user.register.dto';
import * as argon2 from 'argon2';
import { User } from 'src/entities/user.entity';

interface UserFound {
  username: string;
  errorCode: 'USER_EXIST';
}

const argon2Options: argon2.Options & { raw: false } = {
  type: argon2.argon2id,
  raw: false,
};

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //register user
  async registerUser(
    userRegisterData: registerInputInterface,
  ): Promise<User | UserFound> {
    const { username } = userRegisterData;

    //check if user exist in database
    try {
      if ((await this.userRepository.count({ username: username })) > 0) {
        const response: UserFound = {
          username: username,
          errorCode: 'USER_EXIST',
        };
        return response;
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }

    const { password, firstName, lastName } = userRegisterData;

    try {
      //hash plain text password
      const hashedPassword = await argon2.hash(password, argon2Options);

      const user = new User({
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      });

      //save user in db
      await this.userRepository.persistAndFlush(user);
      return user;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  //finc User
  async findUser(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ username: username });
      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
