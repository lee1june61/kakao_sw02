FROM node:14.17.4

WORKDIR /usr/src/app

COPY package.json package-lock*.json  ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]