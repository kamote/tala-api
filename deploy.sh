#!/bin/bash
set -e

npm run test
docker build -t davidblurton/tala-api .
docker push davidblurton/tala-api
