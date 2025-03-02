FROM node:alpine

WORKDIR /node/test

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install --production=false

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:sender"]
