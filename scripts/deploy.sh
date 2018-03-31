#!/usr/bin/env bash

base_dir=$(dirname $BASH_SOURCE)
deploy_file=$base_dir/../deploy_config

# Issue warning about deployment
echo 'WARNING! Deployment is not meant to be used to test active development builds.'
echo 'Use "npm run serve" to use a local web server with hot-reloading.'

# Find ssh config for the deployment. If not found, build a new one from
# a template
if [[ ! -f $deploy_file ]]; then
  echo "No deployment configuration found. Making one now."

  read -er -p "Enter UQ username: " username
  username=${username//[$'\t\r\n']}

  eval "cat > $deploy_file <<EOF
# This configuration uses a proxy jump to get through when the computer
# isn't in the UQ network
Host accountable
  HostName deco3800-accountable.zones.eait.uq.edu.au
  User ${username}
  ProxyJump ${username}@remote.labs.eait.uq.edu.au
EOF"

  echo "Configuration created at $deploy_file"
fi

# Trigger a build
npm run build &>/dev/null || { exit 1; }

# SCP the build into the server
scp -r -F $deploy_file $base_dir/../dist/. accountable:/var/www/htdocs
