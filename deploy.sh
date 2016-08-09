#!/bin/bash
set -e

docker build -t davidblurton/tala-api .
docker run davidblurton/tala-api npm run test
docker push davidblurton/tala-api
