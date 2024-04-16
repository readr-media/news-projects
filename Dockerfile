FROM node:12.10.0-alpine

ENV APP_DIR /app 
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js

COPY . .

RUN apk update \
	&& apk upgrade --no-cache \
	&& apk add --no-cache --virtual .build-deps python build-base make 

COPY package.json .
COPY yarn.lock .
RUN yarn install

RUN apk update && apk add --update redis

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

EXPOSE $NUXT_PORT
# CMD [ "yarn", "start" ]

COPY . $APP_DIR
RUN chmod +x /app/run.sh
RUN ls /app

RUN yarn build \
    && apk add --no-cache ca-certificates \
    && apk del .build-deps

CMD [ "/app/run.sh"] 
