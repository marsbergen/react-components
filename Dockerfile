FROM debian:8

MAINTAINER Patrick van Marsbergen <patrick@mimbee.nl>

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -

RUN apt-get update && apt-get install -y --no-install-recommends \
    autoconf \
    curl \
    ca-certificates \
    wget \
    git \
    apt-utils \
    nodejs \
    build-essential

RUN ln -s `which nodejs` /usr/bin/node

RUN curl https://www.npmjs.com/install.sh | sh

RUN npm i -g n

RUN n stable

RUN npm i -g gulp

ADD src /app/src
ADD app /app/app
ADD package.json /app/package.json
ADD gulpfile.js /app/gulpfile.js

WORKDIR /app

RUN npm run setup