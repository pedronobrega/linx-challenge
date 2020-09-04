FROM node

WORKDIR /node

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
