#!/bin/bash

if [ ! -f ".env" ]; then
    cp .env.example .env
fi

npm install
npm run start:dev

# caso de erro na execucao 
# chmod +x entrypoint.sh