#!/bin/bash

if [ ! -f .env ]; then
  JWT_SECRET=$(openssl rand -base64 32)
  cat > .env << EOF
PORT="8000"
JWT_SECRET="$JWT_SECRET"
EOF
  echo ".env created."
else
  echo ".env already exists. Skipping."
fi
