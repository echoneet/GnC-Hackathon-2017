FROM node:8.4.0

WORKDIR /frontend
COPY package.json ./
COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]