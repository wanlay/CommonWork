## 在 Linux上 安装 Docker

```shell  
sudo curl -sSL https://get.daocloud.io/docker | sh

curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
#安装Docker-compose
(root) curl -L https://get.daocloud.io/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 配置加速器
<ul>

```shell   
sudo curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://165eec11.m.daocloud.io
sudo systemctl restart docker.service
```
```
# /etc/docker/daemon.json
https://registry.docker-cn.com
http://hub-mirror.c.163.com
https://01cg06cz.mirror.aliyuncs.com
https://docker.mirrors.ustc.edu.cn/
```

</ul><ul>

```shell	
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://01cg06cz.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
</ul>

## dokcer-machine
```sh
curl -L https://github.com/docker/machine/releases/download/v0.12.2/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine
```


## k8s
http://dockone.io/article/2501 