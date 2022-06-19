import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import 'dotenv/config';

const entities = ['dist/entities'];
const entitiesTs = ['/src/entities'];
const clientUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}`;
const type = 'mongo';
const ensureIndexes = true;

const mikroOrmConfig: MikroOrmModuleSyncOptions = {
  entities: entities,
  entitiesTs: entitiesTs,
  clientUrl: clientUrl,
  type: type,
  ensureIndexes: ensureIndexes,
};

export { mikroOrmConfig };
