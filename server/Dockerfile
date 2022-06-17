FROM node:16-alpine

WORKDIR /home/pollapp

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY ./package.json .

RUN yarn install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

ADD run.sh /run.sh
RUN ["chmod", "+x", "/run.sh"]

CMD /wait && /run.sh