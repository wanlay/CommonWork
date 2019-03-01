# ghsot安装
::: warning
基于Centos
:::
## 安装nginx
::: tip
[nginx 安装](/others/nginx.md#安装)
:::
### 配置nginx
>vim /etc/nginx/conf.d/ghost.conf

```nginx
server {  
    listen 80;
    server_name wanlay.cn;
    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://127.0.0.1:2368;
    }
}
```
## 安装Node.js
::: tip
[centos 安装 nodejs](/linux/others/software-install.md#centos)
:::

## 安装 ghost
```bash
curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip  
mkdir -p /var/www/html/ghost
unzip -uo  ghost.zip -d /var/www/html/ghost  
chown -R nginx:nginx /var/www/html/ghost/  
cd /var/www/html/ghost/  
npm install --production  
cp config.example.js config.js  
vim config.js
```

## 安装PM2  
后台运行ghost
```bash
npm install -g pm2  
NODE_ENV=production pm2 start index.js --name "ghost"  
pm2 startup centos  
pm2 save
systemctl restart nginx
```