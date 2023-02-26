# During setting up the Droplet in Digital Ocean, it will as to add ssh key

# 1. Run this command to generate one
# 2. Run the setup-user (Don't forget to change private_key_file_name=thumb_do)

private_key_file_name="thumb_do" # do for Digital Ocean
path_to_private_key="~/.ssh/$private_key_file_name"
path_to_public_key="~/.ssh/$private_key_file_name.pub"

ssh-keygen -t rsa -f $private_key_file_name # generate thumb_do and thumb_do.pub
echo Copy the below public key and paste to Digital Ocean
echo This will enable you to ssh into the server with your private key
cat $path_to_public_key

echo After pasting, finish setting up the Droplet and get the IP address of your server.
echo Then, "continue" to the next step setup-user.sh and paste the private key to "do" ssh root@"$"droplet_ip
