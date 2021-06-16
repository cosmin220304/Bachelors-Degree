FROM nikolaik/python-nodejs:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8082
EXPOSE 8082
CMD [ "npm", "start"]