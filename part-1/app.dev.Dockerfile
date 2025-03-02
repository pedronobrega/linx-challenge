FROM node:alpine

WORKDIR /node

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install --production=false

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]
