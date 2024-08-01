FROM node:20.16.0-alpine3.20

#Initialise Folder
WORKDIR /usr/app

#Copy files
COPY package*.json  turbo.json entrypoint.sh ./
COPY ./packages ./packages
COPY ./apps ./apps
COPY . .
#Install dependencies
RUN npm install

#installing prisma
WORKDIR /usr/app/packages/db
RUN npm install

WORKDIR /usr/app
CMD [ "sh","/usr/app/entrypoint.sh" ]
