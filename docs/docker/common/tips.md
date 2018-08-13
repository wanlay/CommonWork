## 连接到容器命令行
```shell
docker exec -it mysql-master bash
```
## Dns问题

1.临时  
 修改容器 `/etc/resolv.conf`  为10.19.8.15
2.永久
启动容器时指定`–dns  10.19.8.15`  
或者修改宿主机的[dns](network-config)

## swarm问题
```
Error response from daemon: context deadline exceeded
```
```
sudo rm -rf var/lib/docker/swarm/*
sudo systemctl restart docker
```
## pipework
```bash
cd /usr/src
wget  -O pipework-master.zip https://codeload.github.com/jpetazzo/pipework/zip/master
# 若没有unzip命令，安装 yum install -y unzip zip
unzip pipework-master.zip 
cp -p pipework-master/pipework /usr/local/bin/
```
pipework固定物理网段容器IP地址
```bash
pipework br0 cbb1 10.190.23.10/24@10.190.23.1
```