FROM node:8.4.0

# Create app directory
WORKDIR /service-google

# Install app dependencies
COPY package.json ./
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8097

CMD [ "npm", "start" ]


