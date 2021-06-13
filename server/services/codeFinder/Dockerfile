FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8079
EXPOSE 8079
CMD [ "npm", "start" ]