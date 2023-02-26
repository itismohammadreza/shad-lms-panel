#!/bin/bash

cd shad-lms/
git pull origin main
docker build -t lms-front:v1 .
docker rm -f lms-front
./docker_run.sh
