FROM ubuntu:18.04 as base

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && apt-get install -y \
    software-properties-common \
    apt-transport-https \
    curl \
    # Only needed to build indy-sdk
    build-essential 

# libindy
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic stable"

# nodejs
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash


# install depdencies
RUN apt-get update -y && apt-get install -y --allow-unauthenticated \
    libindy \
    libnullpay \
    libvcx \
    nodejs

# AFJ specifc setup

RUN chmod g+rwx /root


WORKDIR /app
COPY . .
RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g yarn
RUN yarn install

WORKDIR /app/server
RUN yarn install


EXPOSE 5000 5001

ENTRYPOINT [ "ts-node", "src/index.ts"]
