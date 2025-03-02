FROM node:alpine

WORKDIR /node/receiver

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn

COPY . .

RUN rm -rf tests

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:receiver"]
