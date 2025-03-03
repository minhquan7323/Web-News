# Sử dụng Node.js phiên bản 18.20.4
FROM node:18.20.4 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json để cài đặt dependencies trước
COPY package*.json ./

# Cài đặt các dependencies (bao gồm devDependencies)
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build dự án với vite
RUN npm run build

# --- Phase 2: Dùng Nginx để chạy frontend ---
FROM nginx:alpine AS production

# Copy file cấu hình Nginx (nếu có)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy mã nguồn đã build từ bước trước vào thư mục Nginx phục vụ web
COPY --from=build /app/dist /usr/share/nginx/html

# Mở cổng 80 cho container
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
