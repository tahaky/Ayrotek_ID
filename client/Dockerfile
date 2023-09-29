FROM ubuntu:18.04 as base


RUN apt-get update -y 
RUN apt-get install -y \
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
RUN npm install -g yarn

RUN chmod g+rwx /root

COPY ./ /www
WORKDIR /www
RUN yarn install

RUN chmod -R g+rwx /root/.npm

EXPOSE 3000
ENTRYPOINT ["yarn", "client:start"]
