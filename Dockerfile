FROM node:14-alpine

RUN mkdir /web

# Create app directory
WORKDIR /web

COPY ./package*.json ./

RUN npm install

# Bundle app source
COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]