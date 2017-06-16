FROM node:7.6.0
ENV NODE_ENV $NODE_ENV
WORKDIR /app/
RUN yarn global add pm2@2.4.6
ADD package.json yarn.lock /app/
RUN yarn && yarn cache clean
ADD . /app
EXPOSE 6006
CMD ["pm2-docker", "build/server.js"]