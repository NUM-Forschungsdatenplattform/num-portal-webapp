### STAGE 1: Build ###
FROM node:14.13.1-alpine3.12 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm install
ARG ENVIRONMENT=deploy
RUN npm run build -- --configuration=${ENVIRONMENT}

### STAGE 2: Run ###
FROM nginx:1.19.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/num-portal-webapp /usr/share/nginx/html
