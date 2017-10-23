import KoaRouter from 'koa-router';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import highlightjs from 'highlight.js';
import nunjucks from 'nunjucks';
import  marked, { Renderer } from 'marked';

nunjucks.configure('views', { autoescape: true });
Promise.promisifyAll(fs);
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
const renderer = new Renderer();
renderer.code = (code, language) => {
  const validLang = !!(language && highlightjs.getLanguage(language));
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};
const api = KoaRouter();
const accessPwd=process.env.secrect || '123456';
api.get('/:username/:mkname', async (ctx, next) => {
  const {
    username,
    mkname
  } = ctx.params;

  if (username=='admin') {
    const secrect = ctx.request.query.pwd;
    if (secrect!=accessPwd) {
      return ctx.throw(401);
    }
  }

  let mdRootPath=process.env.mdRootPath || path.join(__dirname, '../../markdowns/');
  if (username=='public') {
    mdRootPath = path.join(__dirname, '../');
  }

  const val = await fs.readFileAsync(path.join(mdRootPath, username, mkname));
  ctx.body = nunjucks.render('index.html', { foo: marked(val.toString()) });
});

export default api;
