# 安装ghsot
## 安装nginx
```shell
vim /etc/yum.repo.d/nginx.repo
##
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1

##
yum install nginx 
```
### 配置nginx
```shell
vim /etc/nginx/conf.d/ghost.conf
##
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

curl -sL https://rpm.nodesource.com/setup | bash -


通过nvm安装nodejs
```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash  
（.bashrc中添加）
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
source .bashrc  
nvm ls  
nvm install 4.2
```

## 安装 ghost
```shell
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
```shell
npm install -g pm2  
NODE_ENV=production pm2 start index.js --name "ghost"  
pm2 startup centos  
pm2 save
systemctl restart nginx
```