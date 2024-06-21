FROM node:16

WORKDIR /app

#RUN apt-get update && \
    #apt-get install -y build-essential python

COPY package*.json ./

RUN npm install

COPY . .

#RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD [ "npm", "start" ]