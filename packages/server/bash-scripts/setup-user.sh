droplet_ip="192.168.xxx.xxx"
private_key_file_name=thumb_do
path_to_private_key="~/.ssh/$private_key_file_name"
path_to_public_key="~/.ssh/$private_key_file_name.pub"

username = "shane"

# On my computer ------------------------------------------------------------------------------------
# Add a private key to SSH client (SSH authentication agent)
ssh-add $path_to_private_key # Otherwise will get Permission denied (public key) because the newly created private key is not accesible to the SSH client (my computer) yet

# Copy a public key which will be placed inside digital ocean server
pbcopy < $path_to_public_key

# On a Droplet --------------------------------------------------------------------------------------
#Update the packages list (sudo apt update)
# Actually upgrade the programs according to the list (sudo apt upgrade)
# Create a new user and give the privilege
ssh root@$droplet_ip << EOF
    sudo apt update
    sudo apt upgrade
    adduser $username
    usermod -aG sudo $username
EOF

# Add the ssh public key for this user (Otherwise public access denied)
# Paste public key into authorized_keys file on remote host
ssh "$root@$droplet_ip" << EOF
    cd /home/$username
    mkdir .ssh
    cd .ssh
    touch authorized_keys
    echo -n "$(pbpaste)" >> authorized_keys
    cat authorized_keys
EOF

# Disable the root login
ssh "$username@$droplet_ip" << EOF
    sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
    sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sudo systemctl reload sshd
    ls -la
    sudo chown -R $username:$username /home/$username
    ls -la
EOF