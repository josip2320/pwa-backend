import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

type Result = Omit<User, 'password'>;
type SerializedUser = {
  _id: ObjectId;
  username: string;
};

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private userService: UserService,
    private readonly orm: MikroORM,
  ) {
    super();
  }
  serializeUser(
    user: Result,
    done: (err: Error, user: SerializedUser) => void,
  ) {
    done(null, { _id: user._id, username: user.username });
  }

  @UseRequestContext()
  async deserializeUser(
    payload: SerializedUser,
    done: (err: Error, user: any) => void,
  ) {
    const user = await this.userService.findUser(payload.username);
    done(null, user);
  }
}
