# nginx
## 安装
### centos
添加源  
vim /etc/yum.repo.d/nginx.repo

```conf
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```
``` bash
# 安装
yum install nginx 
```
## onos集群的nginx配置  
>http下添加或/etc/nginx/conf.d/onos.conf

```nginx
upstream myCluster {
    server 10.190.23.201:8181;      ##集群
    server 10.190.23.202:8181;
    server 10.190.23.203:8181;
} 

server {
    listen 8181;
    server_name ~^\\S*restconf\\S*$;
    location / {
    proxy_pass http://myCluster;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;   ##websocket
    proxy_set_header Connection "Upgrade";
    }
}
```

## 文件服务器
> /etc/nginx/conf.d/onos.conf 

```nginx
location / {
    charset utf-8; 
    root /home/ubuntu/share;  #更改为代理的文件目录
    autoindex on; 
    autoindex_exact_size on; 
    autoindex_localtime on; 
}
```

**有主题**  
项目地址 https://github.com/sarim/nginx-vue-index
```bash
# bower安装
npm install -g bower
```
将`/vueindex`换为`/.vueindex`包括目录名以及`index.html`中的所有
```nginx
server {
    listen       8080;
    server_name  localhost;

    root /Volumes/Storage;
    index ..............;
    
    autoindex on;
    autoindex_format jsonp;
    autoindex_localtime on;
    
    set $is_json 0;
    if ($args = "j") {
        set $is_json 1;
    }

    location ~ /$ {
        if ($is_json = 0) {
            rewrite / /.vueindex/index.html break;
        }
    }
}
```

## 使用stream模块
可以使用监听tcp、udp，默认tcp
```bash
# 修改`nginx.conf`，在末尾添加
stream{
    include /etc/nginx/conf.d/*.conf;
}
```
```bash
# example
stream {                                                           
  upstream cluster4 {                                                        
  server 172.17.0.2:8101;                                        
  server 172.17.0.3:8101;                   
  }                                                                          
  server {                                                       
    listen       8101;                                             
    proxy_pass cluster4; 
  }                                             
}
```