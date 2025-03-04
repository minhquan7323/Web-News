FROM node:18.20.4 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN node --max-old-space-size=4096 /usr/local/bin/npm run build


FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
