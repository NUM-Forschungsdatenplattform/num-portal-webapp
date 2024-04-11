### STAGE 1: Build ###
FROM node:16.20-alpine AS build
WORKDIR /usr/src/app

# Install gettext for envsubst
RUN apk add -i gettext

COPY . .
RUN npm install
ARG ENVIRONMENT=deploy
RUN npm run build -- num-portal-webapp --configuration=${ENVIRONMENT}

### STAGE 2: Run ###
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/num-portal-webapp /usr/share/nginx/html
