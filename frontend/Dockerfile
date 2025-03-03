# Giai đoạn 1: Build ứng dụng frontend
FROM node:18.20.4 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Cài đặt mkcert (thêm apt-utils để tránh lỗi)
RUN apt-get update && apt-get install -y apt-utils libnss3 wget && \
    wget -q -O /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-linux-amd64 && \
    chmod +x /usr/local/bin/mkcert

# Tạo chứng chỉ SSL
RUN mkcert -install
RUN mkcert -key-file localhost-key.pem -cert-file localhost-cert.pem localhost

RUN npm run build

# Giai đoạn 2: Dùng Nginx để chạy frontend
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
