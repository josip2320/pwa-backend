import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { registerInputInterface } from './dto/user.register.dto';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

interface UserFound {
  username: string;
  errorCode: 'USER_EXIST';
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async registerUser(
    @Body()
    inputData: registerInputInterface,
  ): Promise<UserFound | User> {
    return this.userService.registerUser(inputData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req: Express.Request) {
    return req.user;
  }
}
