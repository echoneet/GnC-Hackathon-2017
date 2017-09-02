FROM node:8.4.0

# Create app directory
WORKDIR /service-room-manage

# Install app dependencies
COPY package.json ./
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8096

CMD [ "npm", "start" ]


