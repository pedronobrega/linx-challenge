#!/bin/bash
# Setting up REDIS
docker-compose up -d redis

# Setting up POSTGRES
docker-compose up -d postgres

# Setting up NODE
docker-compose up -d node

# Setting up NGINX
docker-compose up -d nginx

# Running Node Package Manager
docker exec pedronobrega-node yarn

# Running Migrations
docker exec pedronobrega-node yarn sequelize db:migrate

docker-compose up
