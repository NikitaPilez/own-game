#!/bin/bash
tmp=/dev/shm/own-game
rm -rf ${tmp} && \
git clone -l -s . ${tmp} -b master && \
cd ${tmp} && \
echo "Building..." && \
npm i && \
npm run build && \
rm -rf .gitignore deploy.sh .git* README.md && \
echo "Deploying..." && \
rsync -av --delete ./dist/ user@142.93.102.201:frontend/ && \
echo "Done in ${SECONDS} sec."