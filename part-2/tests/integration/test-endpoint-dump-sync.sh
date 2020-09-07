#!/bin/bash

echo "Time Now: `date +%H:%M:%S`"

curl -XPOST -H "Content-Type: application/json" http://localhost:8080/products --data '@input-dump' && echo ""

echo "Time Finished: `date +%H:%M:%S`"
