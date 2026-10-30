FROM node:24.22.1-slim

ENV NODE_OPTIONS --openssl-legacy-provider

WORKDIR /usr/src

# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js

COPY . .

RUN apt-get update \
	&& apt-get install -y --no-install-recommends python3 build-essential make ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json .
COPY yarn.lock .
RUN yarn install

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

EXPOSE $NUXT_PORT
CMD [ "yarn", "start" ]

COPY . .

RUN yarn build

