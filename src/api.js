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
const mdRootPath=process.env.mdRootPath || path.join(__dirname, '../../markdowns/');
api.get('/md/:mkname', async (ctx, next) => {
  const {
    mkname
  } = ctx.params;
  const val = await fs.readFileAsync(mdRootPath+mkname);
  ctx.body = nunjucks.render('index.html', { foo: marked(val.toString()) });
});

export default api;
