# 1. Aşama: Build (Node 20 Alpine - Çok Hızlıdır)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Bağımlılıkları yükle
RUN npm ci
COPY . .
# Projeyi derle (dist klasörü oluşur)
RUN npm run build

# 2. Aşama: Sunucu (Nginx Alpine - Sadece 20MB)
FROM nginx:alpine
# Build aşamasından çıkan dosyaları Nginx'e kopyala
COPY --from=builder /app/dist /usr/share/nginx/html
# React Router için gerekli Nginx ayarı (Sayfa yenilendiğinde 404 vermemesi için)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]