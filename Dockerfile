FROM node:8.1.4

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV


ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 5858 9229

HEALTHCHECK CMD curl -fs http://localhost:$PORT/api/health || exit 1

RUN npm install -g -s --no-progress yarn

WORKDIR /opt/app
COPY package.json /opt/app
RUN npm install && npm cache clean --force
ENV PATH /opt/app/node_modules/.bin:$PATH


WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "server/index.js" ]
