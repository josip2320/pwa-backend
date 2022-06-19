import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import { AuthenticationGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  login(@Request() req) {
    return req.user;
  }

  @Get('/auth/logout')
  logout(@Request() req) {
    req.session.destroy();
  }

  @Get('uploads/:id')
  getImage(@Param() params): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), join('uploads', params.id)),
    );
    return new StreamableFile(file);
  }
}
