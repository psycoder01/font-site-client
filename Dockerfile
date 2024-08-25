FROM node:16.19.1-slim

WORKDIR /app
COPY package.json .

RUN yarn install
COPY . .

RUN yarn build
CMD ["yarn", "serve", "-s", "build"]
