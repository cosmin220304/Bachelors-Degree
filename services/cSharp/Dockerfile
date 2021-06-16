FROM microsoft/aspnetcore-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8810
EXPOSE 8810
CMD [ "npm", "start"]