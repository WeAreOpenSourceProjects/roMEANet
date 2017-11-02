#!/bin/bash

ssh -p $SSH_PORT $SSH_USER@$SSH_SERVER -o StrictHostKeyChecking=no "$( cat <<EOT
  echo "$(date -u) Start Deploy '${PROJECT}'"  >> ./deploy.log
  cd '${DEPLOY_PATH}'
  pm2 stop '${PROJECT}'
  pm2 delete '${PROJECT}'
  pm2 flush
  NODE_ENV=production pm2 start server.js --name '${PROJECT}'
  cd
  echo "$(date -u) End Deploy '${PROJECT}'"  >> ./deploy.log
  exit
EOT
)"
