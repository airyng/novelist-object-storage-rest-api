FROM node:14-alpine3.15

WORKDIR /app

COPY . .

EXPOSE 5000

RUN npm install

CMD ["npm", "start"]