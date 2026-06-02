# Docker 部署

## 部署目标

Astro 构建后的产物是静态文件，因此部署目标很简单：

```text
Build Astro project
  -> generate dist/
  -> serve dist/ with Nginx
```

线上不需要运行 Astro 开发服务器，也不需要数据库。

## 推荐 Dockerfile

```dockerfile
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
```

这个 Dockerfile 分为两阶段：

1. `node:24-alpine` 构建阶段：安装依赖并执行 `npm run build`。
2. `nginx:alpine` 运行阶段：只复制 `dist/` 静态文件并由 Nginx 托管。

## 本地构建验证

在项目初始化完成后，可以使用：

```bash
npm ci
npm run build
npm run preview
```

如果使用 Docker：

```bash
docker build -t liyihan-net .
docker run --rm -p 8080:80 liyihan-net
```

然后访问：

```text
http://localhost:8080
```

## 可选 Nginx 配置

如果需要更精细的缓存和 SPA fallback，可以加入自定义 Nginx 配置。但对 Astro 静态站点来说，通常默认配置已经足够。

一个可选配置示例：

```nginx
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2)$ {
    expires 30d;
    add_header Cache-Control "public";
  }
}
```

如果网站全部是 Astro 静态页面，`try_files $uri $uri/ /index.html` 不是必须项；是否保留取决于后续路由方式。

## docker-compose 示例

```yaml
services:
  liyihan-net:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## 生产部署思路

GitHub Actions 会发布镜像：

```text
ghcr.io/hy-liyihan/liyihan.net
```

服务器可以直接拉取默认分支的最新镜像：

```bash
docker pull ghcr.io/hy-liyihan/liyihan.net:latest
docker run -d --name liyihan-net --restart unless-stopped -p 8080:80 ghcr.io/hy-liyihan/liyihan.net:latest
```

如果服务器使用 `compose.yaml`，可以把镜像改为远端镜像：

```yaml
services:
  liyihan-net:
    image: ghcr.io/hy-liyihan/liyihan.net:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

如果在服务器上从源码部署，则流程是：

```text
git pull
docker compose build
docker compose up -d
```

如果后续接入 GitHub Actions，可以把流程改为：

```text
push to GitHub
  -> GitHub Actions builds image
  -> push image to registry
  -> server pulls image
  -> docker compose up -d
```

## 域名与 HTTPS

生产环境中，`liyihan.net` 可以通过以下方式接入 HTTPS：

- 使用服务器上的反向代理，例如 Nginx Proxy Manager、Caddy、Traefik。
- 使用 Certbot 为 Nginx 申请证书。
- 如果部署在 Cloudflare 后方，也可以使用 Cloudflare 的 HTTPS 和缓存能力。

推荐的简洁方案是：容器内只跑静态 Nginx，HTTPS 和域名由服务器级反向代理统一处理。
