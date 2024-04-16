FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --pure-lockfile --allow-root

COPY . .

RUN yarn build

EXPOSE 4000
CMD [ "npm", "run","start:dev" ]