# Stage 1  -- build

FROM node as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --legacy-peer-deps

RUN npm install -g @angular/cli@15.2.2

COPY . /app

#RUN npm run build --prod
RUN ng build



# Stage 2  -- Run in nginx

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/orium-task-front /usr/share/nginx/html
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf
