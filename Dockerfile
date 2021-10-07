FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json  yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3339

CMD ["yarn", "dev"]
