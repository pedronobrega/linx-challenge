FROM node:alpine

WORKDIR /node/sender

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn

COPY . .

RUN rm -rf tests

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:sender"]
