FROM node:fermium as base

WORKDIR /app
COPY . .
RUN yarn install


EXPOSE 5000
EXPOSE 3000

ENTRYPOINT [ "yarn", "dev"]
