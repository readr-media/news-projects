FROM node:12.10.0-alpine AS build

WORKDIR /app

# ADD default/news-projects/config.js $NODE_SOURCE/api/config.js

COPY . .

RUN apk update \
	&& apk upgrade \
	&& apk add python build-base make 

FROM node:12.16.2-alpine

WORKDIR /app

COPY --from=build /app .

RUN yarn install
RUN yarn run build

EXPOSE 3000
CMD ["yarn", "start"]
