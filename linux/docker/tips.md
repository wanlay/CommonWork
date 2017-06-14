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
若为Debian 

```shell
 RUN   echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib"> /etc/apt/sources.list

```
##Docker registery问题
Q:  
http: server gave HTTP response to HTTPS client  
A:  
```shell
sudo echo '{ "insecure-registries":["192.168.80.130:5000"] }' > /etc/docker/daemon.json
sudo systemctl restart docker

```