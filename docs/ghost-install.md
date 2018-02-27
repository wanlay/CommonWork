# 安装ghsot
!>基于Centos
## 安装nginx

>添加源  
>vim /etc/yum.repo.d/nginx.repo

```conf
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1

# 安装
yum install nginx 
```
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
```bash
curl -sL https://rpm.nodesource.com/setup | bash -
curl -sL https://deb.nodesource.com/setup | bash -
```
>通过nvm安装nodejs

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash  
```
>更换源  
>.bashrc中添加

```bash
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
```
```bash
# 使文件生效
source .bashrc  
# 列出本机node版本
nvm ls  
# 安装
nvm install 4.2
```

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