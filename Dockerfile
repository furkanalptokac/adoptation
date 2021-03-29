FROM node:14.16.0-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 5000
CMD [ "yarn", "server" ]