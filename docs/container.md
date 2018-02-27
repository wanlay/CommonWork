## ELK
使用sebp/elk镜像  
运行时，日志报
```
max virtual memory areas vm.max_map_count [65530] likely too low, increase to at least [262144]
```
需增加宿主机的内存,至少需要2G
```bash
# 设置
sudo sysctl -w vm.max_map_count=262144
# 查看
sysctl vm.max_map_count
```
>docker-compose.yml  

```yaml
version: '2'  
services:  
     elk:  
       image: sebp/elk:520
       volumes:  
        - elk-volume:/var/lib/elasticsearch
        #映射目录
        - ./karaf.conf:/etc/logstash/conf.d/karaf.conf             
       ports:  
        - "5044:5044" 
        - "5601:5601" 
        - "9200:9200"  
        - "9300:9300"  
volumes:
     elk-volume:
```

### karaf日志输出到elk
删除容器目录/etc/logstash/conf.d/下的文件
新建karaf.conf
```conf
input {
 log4j {
 mode => "server"
 port => 5044
 }
}
output {
    stdout {
      codec => rubydebug
    }
    elasticsearch{
        hosts => ["localhost:9200"]
        index => "karaf-%{+YYYY.MM.dd}"
        document_type => "log4j_type"
    }
}
```
重启容器服务
修改`karaf的etc/org.ops4j.pax.logging.cfg` (对应`ONOS_ROOT/tools/package/etc`)
```conf
# Root logger
log4j.rootLogger=DEBUG, out, logstash,syslog, sift, osgi:*
...
#logstash
log4j.appender.logstash=org.apache.log4j.net.SocketAppender
log4j.appender.logstash.port=5044
log4j.appender.logstash.remoteHost=10.190.23.244  
```

### filebeat输出到elk
>Dockerfile

```docker
From prima/filebeat
ADD filebeat.yml /filebeat.yml
RUN chmod go-w /filebeat.yml
```
>filebeat.yml

```yaml
filebeat:
    prospectors:
        -
            paths:
                - "/var/onos/log/*.log"
output:
    elasticsearch:
        hosts: ["10.190.23.244:9200"]
```

>docker-compose.yml

```yaml
version: '2'  
services:  
     cbb:  
       image: cbb
       volumes:  
        - cbb-volume:/root/onos/apache-karaf-3.0.5/data/log/
     filebeat:
       image: olinicola/filebeat:1.2.3
       volumes:  
        - cbb-volume:/var/onos/log/
        - ./filebeat.yml:/etc/filebeat/filebeat.yml
       depends_on:
        - cbb
volumes:
     cbb-volume:

```

## nexus3
>docker-compose.yml

```yaml
version: '2'
networks:
  neuxs-network:
services:
  nexus3:
    image: sonatype/nexus3:latest
    restart: unless-stopped
    logging:
      driver: "journald"
    networks:
     - neuxs-network
    ports:
     - "8088:8088"
     - "8081:8081"
     - "5000:5000"
    volumes:
      - "nexus-data:/nexus-data"
  
volumes:
  nexus-data: {}
```

## ONOS
下载`onosproject/onos`镜像
```
docker pull onosproject/onos
```
自定义Dockerfile
```
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
制作docker镜像
```
sudo docker build -t wanlay/cbb .
```
下载onos-form-cluster
```bash
wget https://raw.githubusercontent.com/opennetworkinglab/onos/master/tools/package/bin/onos-form-cluster 

chmod u+x onos-form-cluster
```
将下面代码加入.bashrc
```bash
docker-ip() {
  sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' "$@"
}
```
运行onos镜像
```
sudo docker run  -t -d --name cbb1 wanlay/cbb
```
将多个onos实例形成集群
```bash
./onos-form-cluster -u onos -p rocks `docker-ip cbb1` `docker-ip cbb2` `docker-ip cbb3`
```
ssh连接到onos命令行
```bash
ssh -p 8101 onos@`docker-ip cbb1`  
#密码是rocks
```

## rancher
>docker-compose

```yaml
version: '2'
services:
  mysqldb:
    image: mysql
    restart: on-failure:10
    logging:
      driver: "journald"
    ports: 
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=rancher
      - MYSQL_USER=rancher
      - MYSQL_PASSWORD=rancher 
      
  rancher-server:
    image: rancher/server
    restart: on-failure:10
    logging:
      driver: "journald"
    ports: 
      - "5555:8080"
    links:
      - mysqldb:rancher
    environment:
      - db-user=rancher
      - db-pass=rancher
      - db-name=rancher
      - advertise-address=10.190.23.245   
```   
!>添加主机时，agent所在的主机的docker版本要与server端的一样

## portainer
创建集群
```
docker swarm init --advertise-addr 10.190.23.241
```
运行portainer
```
docker service create \
--name portainer \
--publish 9000:9000 \
--constraint 'node.role == manager' \
--mount type=bind,src=//var/run/docker.sock,dst=/var/run/docker.sock \
portainer/portainer \
-H unix:///var/run/docker.sock
```


## sonarqube
>docker-compose.yml

```yaml
version: "2"

services:
  sonarqube:
    image: sonarqube
    restart: on-failure:10
    ports:
      - "9000:9000"
    networks:
      - sonarnet
    environment:
      - SONARQUBE_JDBC_URL=jdbc:postgresql://pg-sonarqube:5432/sonar
    volumes:
      - sonarqube_volume:/opt/sonarqube
  pg-sonarqube:
    image: postgres
    restart: on-failure:10
    networks:
      - sonarnet
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
    volumes:
      - pg_sonarqube_volume:/var/lib/postgresql/data

networks:
  sonarnet:
    driver: bridge

volumes:
  sonarqube_volume:
  pg_sonarqube_volume:
```
>配置LADP

sonarqube 界面上安装LDAP插件 ，或者把插件拷贝到`{sonarqube_volume}/extensions/plugins`  
添加以下字段到`{sonarqube_volume}/conf/sonar.properties`
```conf
# LDAP configuration
# General Configuration
sonar.security.realm=LDAP
ldap.url=ldap://10.190.23.240
ldap.bindDn=cn=cbbadmin,ou=accounts,dc=fiberhome,dc=com
ldap.bindPassword=cbb2017
 
# User Configuration
ldap.user.baseDn=ou=accounts,dc=fiberhome,dc=com
ldap.user.request=(&(objectClass=inetOrgPerson)(uid={login}))
ldap.user.realNameAttribute=cn
ldap.user.emailAttribute=mail
 
# Group Configuration
ldap.group.baseDn=ou=groups,dc=fiberhome,dc=com
ldap.group.request=(&(objectClass=posixGroup)(memberUid={uid}))
```
