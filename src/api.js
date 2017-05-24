import KoaRouter from 'koa-router';
import fs from 'fs';
Promise.promisifyAll(fs);

import path from 'path';
import Promise from 'bluebird';

import  marked from 'marked';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

const api = KoaRouter();

const validateCollection = async (ctx, next) => {
  const { collection } = ctx.params;
  if (!(collection in ctx.state.collections)) {
    return ctx.throw(404);
  }
  await next();
}

const validateKey = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (authorization !== ctx.state.authorizationHeader) {
    return ctx.throw(401);
  }
  await next();
}

api.get('/mk/:mkname', async (ctx, next) => {
  const {
    mkname
  } = ctx.params;
  const val = await fs.readFileAsync(path.join(__dirname, '../markdowns/'+mkname));
  ctx.body = marked(val.toString());
});

export default api;
