FROM node:20-alpine

RUN apk update

COPY ./ /usr/src/app
WORKDIR /usr/src/app/client
RUN npm install
RUN npm run build
WORKDIR /usr/src/app
RUN npm install

EXPOSE 8082

CMD ["node", "main.js"]