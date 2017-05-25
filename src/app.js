import Koa from 'koa';
import api from './api';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import log from './log'

const env = process.env.NODE_ENV || 'development';
log.info(env)
const app = new Koa()
  .use(cors())
  .use(async (ctx, next) => {
    await next();
  })
  .use(bodyParser())
  .use(api.routes())
  .use(api.allowedMethods());

if (env=='development') {
	app.use(logger());
}

export default app;