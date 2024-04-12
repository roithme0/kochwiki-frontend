### Stage 1: compile and build angular ###
FROM node:20 as build

ARG CONFIGURATION

# add source code
WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN ./node_modules/.bin/ng build --configuration=${CONFIGURATION}

# # create user to avoid running as root <> must use root for node
# RUN useradd -m node
# USER node

### Stage 2: serve with nginx ###
FROM nginx:1.25

# copy build output to replace the default nginx content
COPY --from=build /usr/local/app/dist/angular/browser /usr/share/nginx/html

# # create user to avoid running as root <> must use root for nginx
# RUN useradd -m nginx
# USER nginx

EXPOSE 80

HEALTHCHECK --interval=5m --timeout=5s --start-period=1m --retries=3 CMD curl --fail http://localhost:80/