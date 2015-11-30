FROM debian:8

MAINTAINER Patrick van Marsbergen <patrick@mimbee.nl>

RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.9.7-1~jessie

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -

RUN apt-get update && apt-get install -y --no-install-recommends \
    autoconf \
    curl \
    ca-certificates \
    wget \
    git \
    apt-utils \
    nodejs \
    build-essential \
    nginx=${NGINX_VERSION} && \
    rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME ["/var/cache/nginx"]

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

RUN if [ ! -f /usr/bin/node ]; then ln -s `which nodejs` /usr/bin/node; fi

RUN curl https://www.npmjs.com/install.sh | sh

RUN npm i -g n

RUN n stable

RUN npm i -g gulp

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY src/ src/
COPY app/ app/
COPY package.json package.json
COPY gulpfile.js gulpfile.js

RUN npm run setup
RUN npm run build

