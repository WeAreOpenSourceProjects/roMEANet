#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy_key # Allow read access to the private key
ssh-add .travis/deploy_key # Add the private key to SSH

ssh -p $SSH_PORT $SSH_USER@$SSH_SERVER -o StrictHostKeyChecking=no "$( cat <<EOT
  zsh
  cd '${DEPLOY_PATH}'
  pm2 stop '${PROJECT}'
  pm2 delete '${PROJECT}'
  pm2 flush
  npm install
  gulp WeaosProd
  NODE_ENV=production pm2 start server.js --name '${PROJECT}'
  echo "End Deploy '${PROJECT}'"  >> ../deploy.log
EOT
)"
