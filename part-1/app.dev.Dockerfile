FROM node:alpine

WORKDIR /node

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn add --dev

COPY . .

EXPOSE 8080

CMD ["yarn", "start:dev"]
