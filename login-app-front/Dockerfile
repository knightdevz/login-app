FROM node:18-alpine as build-stage

WORKDIR /login-app-front
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN yarn build

FROM nginx:1.17.0-alpine

COPY --from=build-stage /login-app-front/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'