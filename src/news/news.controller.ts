import { ObjectId } from '@mikro-orm/mongodb';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NewsService } from './news.service';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { AuthenticationGuard } from 'src/auth/authenticated.guard';
interface NewsData {
  title: string;
  description: string;
  text: string;
  category: string;
  saveToArchive: boolean;
  fileURL: string;
}

interface data {
  article: NewsData;
}
@Controller('news')
export class NewsController {
  constructor(private newService: NewsService) {}

  @Get('/all')
  async() {
    return this.newService.findAll();
  }

  @Post('/upload/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, done) => {
          done(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return this.newService.uploadPhoto(file);
  }

  @Post('/upload')
  async uploadArticle(@Body() body: NewsData) {
    return this.newService.uploadArticle(body);
  }

  @Get('/articles/:id')
  findOne(@Param('id') id: ObjectId) {
    return this.newService.findOne(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('/delete/:id')
  deleteArticle(@Param('id') id: ObjectId) {
    return this.newService.deleteArticle(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post('/update/:id')
  updateArticle(@Param('id') id: ObjectId, @Body() body: NewsData) {
    this.newService.updateArticle(id, body);
  }
}
