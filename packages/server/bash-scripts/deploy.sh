#!/bin/bash

echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD

docker build -t kittishane/cookknow:$VERSION .
docker push kittishane/cookknow:$VERSION     

# ssh shane@128.199.205.119 "docker pull kittishane/cookknow:$VERSION && docker tag kittishane/cookknow:$VERSION dokku/server:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy server $VERSION"

ssh root@139.59.110.114 "docker pull kittishane/cookknow:$VERSION && docker tag kittishane/jocky:$VERSION dokku/api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy api $VERSION"

