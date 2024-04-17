FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --pure-lockfile --allow-root

COPY .env.example .env

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "npm", "run","start:dev" ]