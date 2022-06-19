import {
  BaseEntity,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { NewsRepository } from 'src/repositories/news.repository';

interface NewsData {
  title: string;
  description: string;
  text: string;
  category: string;
  saveToArchive: boolean;
  fileURL: string;
}
@Entity({ customRepository: () => NewsRepository })
export class News extends BaseEntity<News, '_id'> {
  [EntityRepositoryType]?: NewsRepository;
  @PrimaryKey()
  _id: ObjectId;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  text: string;

  @Property()
  category: string;

  @Property()
  fileUrl: string;

  @Property()
  saveToArchive: boolean;

  @Property()
  createdAt = new Date();

  constructor(data: NewsData) {
    super();
    this.title = data.title;
    this.description = data.description;
    this.text = data.text;
    this.category = data.category;
    this.saveToArchive = data.saveToArchive;
    this.fileUrl = data.fileURL;
  }
}
