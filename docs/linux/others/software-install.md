# 常用应用安装
## nodejs
### ubuntu
安装
```bash
v=8   # set to 4, 5, 6, ... as needed
curl -sL https://deb.nodesource.com/setup_$v.x | sudo -E bash -
```
```sh
sudo apt-get install -y nodejs
```
### centos
```bash
curl -sL https://rpm.nodesource.com/setup | bash -
curl -sL https://deb.nodesource.com/setup | bash -
```
>通过nvm安装nodejs

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash  
```

```bash 
# 列出本机node版本
nvm ls  
# 安装
nvm install 4.2
```

::: tip
[更换源](/others/source.md#npm)
:::

## jdk8 安装
### 二进制包安装
解压
mkdir -p /usr/lib/jvm
tar zxvf *.tar.gz
mv jdk/ /usr/lib/jvm/java-8-oracle

/etc/profile.d/jdk.sh

export J2SDKDIR=/usr/lib/jvm/java-8-oracle
export J2REDIR=/usr/lib/jvm/java-8-oracle/jre
export PATH=$PATH:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin
export JAVA_HOME=/usr/lib/jvm/java-8-oracle
export DERBY_HOME=/usr/lib/jvm/java-8-oracle/db

update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8-oracle/bin/java 300
update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-8-oracle/bin/javac 300
update-alternatives --install /usr/bin/javap javap /usr/lib/jvm/java-8-oracle/bin/javap 300
update-alternatives --install /usr/bin/javadoc javadoc /usr/lib/jvm/java-8-oracle/bin/javadoc 300

 update-alternatives --config java



 /opt/elasticsearch/config/elasticsearch.yml
 /opt/elasticsearch/config/jvm.options

 cat /opt/elasticsearch/config/elasticsearch.yml | grep -v '#'
cluster.name: vrviu-log-server
node.name: node-1
path.data: /opt/elasticsearch/data
path.logs: /opt/elasticsearch/es/logs
network.host: 172.18.199.191
http.port: 9200
discovery.zen.ping.unicast.hosts: ["172.18.199.191", "172.18.199.192","172.18.199.193"]


[program:elasticsearch]
command=/opt/elasticsearch/bin/elasticsearch
autorestart=true
autostart=true
stderr_logfile=/var/log/supervisor/elasticsearch_err.log
stdout_logfile=/var/log/supervisor/elasticsearch_out.log
user=es
stopsignal=INT
startsecs=10
minfds=65536
minprocs=32768

useradd es
chown -R es /opt/elasticsearch
su es -c '/opt/elasticsearch/bin/elasticsearch -d'