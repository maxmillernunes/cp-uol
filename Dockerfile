FROM node:14

WORKDIR /usr/app

COPY package*.json  yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma generate

EXPOSE ${API_PORT}

CMD ["yarn", "dev"]
