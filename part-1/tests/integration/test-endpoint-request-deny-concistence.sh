#!/bin/bash
# while true
# do
# done

runtime="10 minute"
endtime=$(date -ud "$runtime" +%s)

while [[ $(date -u +%s) -le $endtime ]]
do
    echo "Time Now: `date +%H:%M:%S`"
    curl -XPOST -H "Content-Type: application/json" http://localhost/products --data '[{"id": "123", "name": "mesaa"},{"id": "1888", "name": "masg"}]' && echo ""
done
