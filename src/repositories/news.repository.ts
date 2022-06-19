// custom repository for user

import { EntityRepository } from '@mikro-orm/mongodb';
import { News } from 'src/entities/news.entity';

export class NewsRepository extends EntityRepository<News> {}
