#!/bin/bash

start=$(date +"%s")

DOCKER_IMAGE_TAG=$IMAGE_TAG

ssh -p ${SPORT} ${SUSER}@${SNAME} -i key.txt -t -t -o StrictHostKeyChecking=no << ENDSSH
cd sharingan

docker pull $DOCKER_IMAGE_TAG

API_CONTAINER_NAME=sharingan-core
if [ "$(docker ps -qa -f name=\$API_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -q -f name=\$API_CONTAINER_NAME)" ]; then
        echo "[API] Container is running -> stopping it..."
        docker stop \$API_CONTAINER_NAME;
    fi
    docker rm \$API_CONTAINER_NAME;
fi

docker run -d -p 7501:7501  -v $(pwd)/logs:/app/logs --name sharingan-core --rm --env-file .env $DOCKER_IMAGE_TAG

exit
ENDSSH

end=$(date +"%s")

diff=$(($end - $start))

echo "Deployed in : ${diff}s"
