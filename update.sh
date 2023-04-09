#!/bin/bash

cd /root/shad-lms-panel-master/
docker build -t lms-panel-front:v1 .
./docker_run.sh
