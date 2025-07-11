FROM node:22.14.0-slim

WORKDIR /app 


COPY package*.json .

RUN npm install 

COPY . . 

RUN  npm run build 

EXPOSE 3000

CMD sh -c  "npm run migration:run_prod && npm run start:prod"