FROM node:12.10.0-alpine

ENV NODE_SOURCE /usr/src
WORKDIR $NODE_SOURCE

ADD . $NODE_SOURCE/
# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js
RUN apk update
RUN apk add --no-cache python build-base make 
RUN yarn install
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
