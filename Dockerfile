FROM node:22.14.0-slim

WORKDIR /app 

ARG DEFAULT_PORT=3000

COPY package*.json .

RUN npm install 

COPY . . 

RUN  npm run build 

EXPOSE ${DEFAULT_PORT}

CMD sh -c  "npm run migration:run_prod && npm run start:prod"