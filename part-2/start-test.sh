#!/bin/bash

# Setting up POSTGRES
docker-compose up -d postgres

# Setting up NODE
docker-compose up -d tester

# Running Migrations
docker exec pedronobrega-tester yarn sequelize db:migrate
