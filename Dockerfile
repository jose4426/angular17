FROM node:18.13.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY  . .
RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/angula17 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
