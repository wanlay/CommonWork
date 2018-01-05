>安装docker  
配置加速器

## 下载onosproject/onos镜像
docker pull onosproject/onos
将onos代码打包（onos-package）tar.gz 格式
解压，进入目录编写Dockerfile
```dockerfile
FROM java:8-jre-alpine
MAINTAINER wanlay

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk update && apk add --no-cache bash curl openssh

COPY . /root/onos/

RUN   mkdir -p /root/onos/apache-karaf-3.0.5/data/log && \
touch /root/onos/apache-karaf-3.0.5/data/log/karaf.log && \
ln -sf /dev/stdout /root/onos/apache-karaf-3.0.5/data/log/karaf.log

EXPOSE 6653 6640 8181 8101 9876

WORKDIR /root/onos

CMD ["./bin/onos-service"]
```
## 制作docker镜像
sudo docker build -t wanlay/cbb .
下载onos-form-cluster
```bash
wget https://raw.githubusercontent.com/opennetworkinglab/onos/master/tools/package/bin/onos-form-cluster 

chmod u+x onos-form-cluster
```
将下面代码加入.bashrc
```sh
docker-ip() {
  sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$@"
}
```
## 运行onos镜像
```
sudo docker run  -t -d --name cbb1 wanlay/cbb
```
将多个onos实例形成集群
```sh
./onos-form-cluster -u onos -p rocks `docker-ip cbb1` `docker-ip cbb2` `docker-ip cbb3`
```
ssh连接到onos命令行
```sh
ssh -p 8101 onos@`docker-ip cbb1`  
#密码是rocks
```
