import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { ObjectId } from '@mikro-orm/mongodb';

const argon2Options: argon2.Options & { raw: false } = {
  type: argon2.argon2id,
  raw: false,
};

type Result = { _id: ObjectId; username: string; role: string };

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<Result> {
    const user = await this.userService.findUser(username);
    if (!user || !(await argon2.verify(user.password, pass, argon2Options)))
      return null;

    return { _id: user._id, username: user.username, role: user.role };
  }
}
