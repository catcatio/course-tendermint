FROM node:8.11.3-alpine
ENV NODE_ENV develop

RUN mkdir -p /usr/app
ADD package.json /usr/app/package.json
ADD src /usr/app/src


WORKDIR /usr/app
RUN npm install

VOLUME ["/usr/app"]
