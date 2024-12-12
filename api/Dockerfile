FROM node:22 AS build

WORKDIR /api

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["bash", "cmd.sh"]