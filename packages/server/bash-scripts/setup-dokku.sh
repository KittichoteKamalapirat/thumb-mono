#!/bin/bash

# Define variables for your DigitalOcean droplet
droplet_ip="YOUR_DROPLET_IP_ADDRESS"
droplet_ssh_key="PATH/TO/YOUR/SSH/KEY"

# Define variables for the new user account
new_user="shane"
new_user_password="YOUR_PASSWORD_HERE"

# Define variables for Dokku setup
app_name="server"
postgres_name="pizza"
redis_name="pasta"

# SSH into the droplet as root and create a new user account
ssh -i $droplet_ssh_key root@$droplet_ip << EOF
adduser $new_user --gecos "Shane,,," --disabled-password
echo "$new_user:$new_user_password" | chpasswd
usermod -aG sudo $new_user
EOF

# SSH into the droplet as the new user and run the Dokku setup commands
ssh -i $droplet_ssh_key $new_user@$droplet_ip << EOF

# Create the app
dokku apps:create $app_name

# Install and set up PostgreSQL
dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create $postgres_name
dokku postgres:link $postgres_name $app_name

# Install and set up Redis
dokku plugin:install https://github.com/dokku/dokku-redis.git redis
dokku redis:create $redis_name
dokku redis:link $redis_name $app_name

EOF
