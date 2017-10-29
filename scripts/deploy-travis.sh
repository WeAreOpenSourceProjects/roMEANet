#!/bin/bash

eval "$(ssh-agent -s)" # Start ssh-agent cache
chmod 600 .travis/deploy_key # Allow read access to the private key
ssh-add .travis/deploy_key # Add the private key to SSH

ssh -p $SSH_PORT $SSH_USER@$SSH_SERVER -o StrictHostKeyChecking=no "$( cat <<'EOT'
  cd $DEPLOY_PATH
  echo "This logs to where I want, but using echo" >> ./deploy.log
  node -v >> ./deploy.log
EOT
)"
