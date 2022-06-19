import * as session from 'express-session';
import 'dotenv/config';
import { v4 as genuuid } from 'uuid';
import * as connectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);
import 'dotenv/config';

const secret = process.env.COOKIE_SECRET;
const resave = false;
const genId = () => {
  return genuuid();
};
const saveUnitialized = false;
const httpOnly = true;
const maxAge = 1000 * 60 * 60 * 24 * 30;
const secure = process.env.NODE_ENV === 'production';
const clientUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}`;
const store = new MongoDBStore({
  uri: clientUrl,
  collection: 'sessions',
});

const cookieOptions: session.CookieOptions = {
  maxAge: maxAge,
  secure: secure,
  httpOnly: httpOnly,
};

const sessionConfig: session.SessionOptions = {
  secret: secret,
  resave: resave,
  genid: genId,
  saveUninitialized: saveUnitialized,
  cookie: cookieOptions,
  store: store,
};

export { sessionConfig };
