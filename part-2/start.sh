#!/bin/bash

# Setting up POSTGRES
docker-compose up -d postgres

# Setting up RABBIT
docker-compose up -d rabbit

# Setting up REDIS
docker-compose up -d redis

sleep 10

# Setting up NODE
docker-compose up -d server

# Running Migrations
docker exec pedronobrega-server yarn sequelize db:migrate

docker-compose up worker
