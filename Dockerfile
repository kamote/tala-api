FROM node:6.4

ENV NPM_CONFIG_LOGLEVEL warn
ENV HOME=/code/

WORKDIR $HOME

# Shrinkwrap bug in bundled version of npm. Fixed in 3.10.4
RUN curl -L https://npmjs.org/install.sh | sh

COPY npm-shrinkwrap.json $HOME
COPY node_shrinkwrap/ $HOME/node_shrinkwrap/

RUN npm install

COPY . $HOME

EXPOSE 8000

CMD ["npm", "start"]
