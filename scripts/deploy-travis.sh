#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy_key # Allow read access to the private key
ssh-add .travis/deploy_key # Add the private key to SSH

# git config --global push.default matching
# GIT_SSH_COMMAND="ssh -p $SSH_PORT -o StrictHostKeyChecking=no" git remote add deploy ssh://git@$SSH_SERVER:$DEPLOY_PATH
# git push deploy dev

# Skip this command if you don't need to execute any additional commands after deploying.
ssh -p $SSH_PORT $SSH_USER@$SSH_SERVER -o StrictHostKeyChecking=no "$( cat <<'EOT'
  zsh
  cd $DEPLOY_PATH
  pm2 stop $PROJECT
  pm2 delete $PROJECT
  pm2 flush
  npm install
  gulp WeaosProd
  NODE_ENV=production pm2 start server.js --name $PROJECT
EOT
)"
