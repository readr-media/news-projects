FROM node:12.10.0-alpine

ENV APP_DIR /app 
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js

RUN apk update \
	&& apk upgrade --no-cache \
	&& apk add --no-cache --virtual .build-deps python build-base make 

COPY package.json .
COPY yarn.lock .
RUN yarn install

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# CMD [ "yarn", "start" ]

COPY . $APP_DIR

RUN yarn build \
    && apk add --no-cache ca-certificates \
    && apk del .build-deps

EXPOSE $NUXT_PORT
CMD [ "yarn", "start" ] 
