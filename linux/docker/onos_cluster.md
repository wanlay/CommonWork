
<pre>
安装docker
配置加速器
下载onosproject/onos镜像
<b>docker pull onosproject/onos</b>
将onos代码打包（onos-package）tar.gz 格式
解压，进入目录编写Dockerfile
<b>FROM onosproject/onos:latest
MAINTAINER wanlay

# Change to /root directory
WORKDIR /root

# Copy in the source
RUN rm -rf onos/ && \ 
    mkdir onos

COPY . /root/onos/

EXPOSE 6653 6640 8181 8101 9876

WORKDIR /root/onos
ENTRYPOINT ["./bin/onos-service"]</b>
制作docker镜像
<b>sudo docker build -t wanlay/cbb .</b>
下载onos-form-cluster
<b>wget https://raw.githubusercontent.com/opennetworkinglab/onos/master/tools/package/bin/onos-form-cluster 
chmod u+x onos-form-cluster</b>
将下面代码加入.bashrc
<b>docker-ip() {
  sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$@"
}</b>
运行onos镜像
<b>sudo docker run  -t -d --name cbb1 wanlay/cbb</b>
将多个onos实例形成集群
<b>./onos-form-cluster -u onos -p rocks `docker-ip cbb1` `docker-ip cbb2` `docker-ip cbb3`</b>
ssh连接到onos命令行
<b>ssh -p 8101 onos@`docker-ip cbb1`  #密码是rocks</b>
</pre>