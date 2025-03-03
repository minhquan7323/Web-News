FROM node:18.20.4 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build
RUN node --max-old-space-size=4096 node_modules/.bin/npm run build
FROM nginx:alpine AS production

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
