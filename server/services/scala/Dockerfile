FROM bigtruedata/scala:latest
RUN apt-get update; apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8088
EXPOSE 8088
CMD [ "npm", "start"]