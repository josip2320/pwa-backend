import { wrap } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { News } from 'src/entities/news.entity';

import { NewsRepository } from 'src/repositories/news.repository';

interface NewsData {
  title: string;
  description: string;
  text: string;
  category: string;
  saveToArchive: boolean;
  fileURL: string;
}

@Injectable()
export class NewsService {
  constructor(private newsRepository: NewsRepository) {}
  async uploadPhoto(file: Express.Multer.File) {
    return file.filename;
  }

  async findAll() {
    return await this.newsRepository.findAll();
  }

  async findOne(id: ObjectId) {
    return await this.newsRepository.findOne({ _id: id });
  }

  async uploadArticle(article: NewsData) {
    const articleToUpload = new News(article);
    return this.newsRepository.persistAndFlush(articleToUpload);
  }

  async deleteArticle(id: ObjectId) {
    const article = await this.newsRepository.findOne({ _id: id });
    return this.newsRepository.removeAndFlush(article);
  }

  async updateArticle(id: ObjectId, body: NewsData) {
    const article = await this.newsRepository.findOne({ _id: id });
    article.assign({
      title: body.title,
      description: body.description,
      category: body.category,
      text: body.text,
      saveToArchive: body.saveToArchive,
    });
    this.newsRepository.persistAndFlush(article);
  }
}
