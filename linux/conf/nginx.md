## onos集群的nginx配置         
```sh
#http下添加或/etc/nginx/conf.d/onos.conf 
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
```sh
# /etc/nginx/conf.d/onos.conf 
        location / {
            charset utf-8; 
            root /home/ubuntu/share;  #更改为代理的文件目录
            autoindex on; 
            autoindex_exact_size on; 
            autoindex_localtime on; 
        }
```