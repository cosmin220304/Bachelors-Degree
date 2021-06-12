FROM php:7.4-cli
RUN apt-get update; apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8086
EXPOSE 8086
CMD [ "npm", "start"]