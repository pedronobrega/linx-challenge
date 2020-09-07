#!/bin/bash
docker build -t node-server -f app.server.Dockerfile .
docker build -t node-worker -f app.worker.Dockerfile .
