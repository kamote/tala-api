FROM node:6

ENV HOME=/code
ENV NPM_CONFIG_LOGLEVEL info

COPY npm-shrinkwrap.json $HOME/

WORKDIR $HOME

RUN npm install

COPY . $HOME/

EXPOSE 8000

CMD ["npm", "start"]
