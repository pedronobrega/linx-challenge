#!/bin/bash
docker build -t nginx-balancer -f nginx.Dockerfile .
docker build -t node-balanced -f node.Dockerfile .
