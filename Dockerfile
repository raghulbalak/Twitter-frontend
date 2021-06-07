
FROM node:12.18.1 as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

FROM nginx:1.17.1-alpine

COPY --from=build ./dist/tweet-app /usr/share/nginx/html
