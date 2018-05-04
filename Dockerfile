FROM node:9.5.0-alpine as builder

RUN mkdir -p /usr/src/react-web
WORKDIR /usr/src/react-web

ENV PATH /usr/src/react-web/node_modules/.bin:$PATH
ADD ./frontend/package.json /usr/src/react-web/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.0 -g --silent
ADD ./frontend /usr/src/react-web
RUN npm run build

# production environment
FROM nginx:1.13.5-alpine
COPY --from=builder /usr/src/react-web/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]