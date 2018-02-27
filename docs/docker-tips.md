## 连接到容器命令行
```shell
docker exec -it mysql-master bash
```
## Dns问题

1.临时  
 修改 `/etc/resolv.conf`  为10.19.8.15
2.永久
启动容器时指定`–dns  10.19.8.15`  
或者修改宿主机的/etc/resolv.conf

## DockerFile更换源
### 若为Debian 

```dockerfile
 RUN   echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib"> /etc/apt/sources.list

```
### 若为alpine
```dockerfile
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
```
制作镜像From alpine时，默认用的是sh，没有bash。
```sh
apk add --no-cache bash
# 安装bash
```
结合上面替换源
```dockerfile
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk update && apk add --no-cache bash
```

## Docker registery问题
Q:  
http: server gave HTTP response to HTTPS client  
A:  
```shell
sudo echo '{ "insecure-registries":["10.190.23.246:8088"] }' > /etc/docker/daemon.json
sudo systemctl restart docker

```
## 设置时区
```dockerfile
RUN echo "Asia/shanghai" > /etc/timezone;
```

## docker中限制jvm
```dockerfile
ENV JAVA_OPTS="-Xmx512m
```

## swarm问题
```
Error response from daemon: context deadline exceeded
```
```
sudo rm -rf var/lib/docker/swarm/*
sudo systemctl restart docker
```

## pipework
```sh
cd /usr/src
wget  -O pipework-master.zip https://codeload.github.com/jpetazzo/pipework/zip/master
# 若没有unzip命令，安装 yum install -y unzip zip
unzip pipework-master.zip 
cp -p pipework-master/pipework /usr/local/bin/
```
pipework固定物理网段容器IP地址
```sh
pipework br0 cbb1 10.190.23.10/24@10.190.23.1
```

## docker pull 镜像时配置代理
```shell
mkdir -p /etc/systemd/system/docker.service.d

/etc/systemd/system/docker.service.d/http-proxy.conf
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80/"

/etc/systemd/system/docker.service.d/https-proxy.conf
[Service]
Environment="HTTPS_PROXY=https://proxy.example.com:443/"

## 不走代理
Environment="HTTP_PROXY=http://proxy.example.com:80/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"
```

重启服务
```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

验证
```
systemctl show --property=Environment docker
```


