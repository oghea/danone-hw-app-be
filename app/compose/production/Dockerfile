FROM node:lts-alpine

RUN apk add --no-cache curl
RUN apk add bash
# Init On PID 1 https://github.com/krallin/tini#using-tini available at /sbin/tini
RUN apk add --no-cache tini
# Change NODE_ENV to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Bundle APP files
COPY app/ app/

WORKDIR /app

RUN chmod 755 wait-for-db.sh

RUN npm config set unsafe-perm true

# Install app dependencies
RUN npm cache clear --force
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install --silent --progress=false

# Expose the listening port of your app
EXPOSE 3001
ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "npm", "run", "start:prod" ]
