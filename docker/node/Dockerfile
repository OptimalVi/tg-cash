FROM node:latest

WORKDIR /usr/src/app

RUN mkdir /var/logs/telegram
COPY telegram/package.json .

RUN npm install --quiet

CMD [ "node", "main.js" ]