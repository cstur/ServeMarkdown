## description
This project use to serve markdown file as html in the simplest way base on koa2 and marked, feel free to clone, fork, merge request and deploy to your own server

## online demo
- public user: [http://cms.xbearx.com/public/sample.md](http://cms.xbearx.com/public/sample.md)
- normal user:[http://cms.xbearx.com/stur/awesome.md](http://cms.xbearx.com/stur/awesome.md)
- protected admin user [http://cms.xbearx.com/admin/ops.md?pwd=123456](http://cms.xbearx.com/admin/ops.md?pwd=123456)

## api
- http://[host]/[username]/[filename]

username: folder name, username=='public' will serve public folder in the project, username =='admin' will verify the secrect in the query params 'pwd'

## development guide
```sh
# install dependency
yarn

# debug
npm run debug

# run
npm start
```

## deploy guide
```sh
yarn
npm run build

# mdRootPath: your md file root folder, your can place and edit your md file anywhere and spcificed the root path here
# you need to install pm2
# secrect: pwd for admin user
NODE_ENV=production mdRootPath=/data/files/ secrect=123456 pm2 start index.js --name="cms"
```

## features
- serve md as html
- password protected
- data file seperated

## [report QA and issues](https://github.com/cstur/ServeMarkdown/issues)