FROM keymetrics/pm2:latest-alpine

RUN apk add --no-cache curl
RUN apk add bash

# Bundle APP files
COPY app/ app/

WORKDIR /app

RUN chmod 777 wait-for-db.sh

# Install app dependencies
RUN npm cache clear --force
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --silent --progress=false

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
# RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

