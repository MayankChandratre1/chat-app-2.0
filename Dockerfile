FROM node:20.16.0-alpine3.20

#Initialise Folder
WORKDIR /usr/app

#Copy files
COPY package*.json  turbo.json entrypoint.sh ./
COPY ./packages ./packages
COPY ./apps ./apps
#Install dependencies
RUN npm install
ENV DATABASE_URL=postgresql://postgres:secret@db:5432/postgres

#installing prisma
WORKDIR /usr/app/packages/db
RUN npm install

WORKDIR /usr/app

EXPOSE 3000 3001

CMD [ "sh","/usr/app/entrypoint.sh" ]
