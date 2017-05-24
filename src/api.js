import KoaRouter from 'koa-router';
import fs from 'fs';
Promise.promisifyAll(fs);

import path from 'path';
import Promise from 'bluebird';
import highlightjs from 'highlight.js';
import nunjucks from 'nunjucks';
nunjucks.configure('views', { autoescape: true });
import  marked, { Renderer } from 'marked';
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

// Create your custom renderer.
const renderer = new Renderer();
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};


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

api.get('/md/:mkname', async (ctx, next) => {
  const {
    mkname
  } = ctx.params;

  const val = await fs.readFileAsync(path.join(__dirname, '../markdowns/'+mkname));
  ctx.body = nunjucks.render('index.html', { foo: marked(val.toString()) });
});

export default api;
