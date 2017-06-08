#
# Node Base Dockerfile
#
# VERSION Current

FROM node:7.6.0

# onbuild with nodeenv
# ONBUILD ARG NODE_ENV
# ONBUILD ENV NODE_ENV $NODE_ENV

# Set workdir
WORKDIR /app/

# install global npm libs
RUN yarn global add pm2@2.4.6
# install npm libs
ONBUILD COPY package.json yarn.lock /app/
ONBUILD RUN yarn install --production && yarn cache clean

# Copy project to $container/app
ONBUILD COPY . /app

EXPOSE 6006

CMD ["stapm2-dockerrt", "index.js"]