# Development

# Option 1.

## Docker Machine
To get hot-reloading to work with Docker Machine and VirtualBox you’ll need to enable a polling mechanism via [chokidar](https://github.com/paulmillr/chokidar) (which wraps fs.watch, fs.watchFile, and fsevents).

### Create a new Machine:
```
$ docker-machine create -d virtualbox react-frontend
$ docker-machine env react-frontend
$ eval $(docker-machine env react-frontend)
```

## Start
```
$ docker-compose -f docker-compose-dev.yml up -d --build
```

## Stop
```
$ docker-compose down
```

## Ip Address
```
$ docker inspect $(docker ps -q) | grep IPA
```

## docker-machine list
```
$ docker-machine ls
```

## docker-machine ip
```
$ docker-machine ip react-frontend
```

## Listening
[http://DOCKER_MACHINE_IP:3000](http://DOCKER_MACHINE_IP:3000)

# Option 2.
To get hot-reload working, we need to add an environment variable:
```
$ docker run -it \
  -v ${PWD}:/usr/src/react-web \
  -v /usr/src/react-web/node_modules \
  -p 3000:3000 \
  -e CHOKIDAR_USEPOLLING=true \
  --rm react-frontend
```

# Production

## Start
```
$ docker-compose up -d --build
```

## Stop
```
$ docker-compose down
```

> Test it out once more in your browser. Then, if you’re done, go ahead and destroy the Machine:
```
$ eval $(docker-machine env -u)
$ docker-machine rm react-frontend
```

## Listening
[http://DOCKER_MACHINE_IP](http://DOCKER_MACHINE_IP)

## React Router and Nginx
If you are using React Router, then you’ll need to change the default Nginx config at build time:
```
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
```

Add the changes to Dockerfile-prod:
```
# build environment
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create the following two folders along with a `default.conf` file:
```
└── conf
    └── conf.d
        └── default.conf
```

default.conf:
```
server {
  listen 80;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
    root   /usr/share/nginx/html;
  }
}
```

Creadit:
[http://mherman.org/blog/2017/12/07/dockerizing-a-react-app/#.WuvP0tOFPOQ](http://mherman.org/blog/2017/12/07/dockerizing-a-react-app/#.WuvP0tOFPOQ)