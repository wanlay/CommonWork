## 安装

```bash  
# daocloud
sudo curl -sSL https://get.daocloud.io/docker | sh

# aliyun
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
```
## Docker-compose
```
sudo -s
curl -L https://get.daocloud.io/docker/compose/releases/download/1.17.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 配置加速器

```bash
#  daocloud
sudo curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://165eec11.m.daocloud.io
sudo systemctl restart docker.service
```
> 编辑/etc/docker/daemon.json

```
{
  "registry-mirrors": ["https://01cg06cz.mirror.aliyuncs.com"]
}

https://registry.docker-cn.com
http://hub-mirror.c.163.com
https://01cg06cz.mirror.aliyuncs.com
https://docker.mirrors.ustc.edu.cn/
```


```bash	
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://01cg06cz.mirror.aliyuncs.com"]，
  "insecure-registries":["10.190.23.246:8088"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 私服
若使用私服，如下配置，否则报`http: server gave HTTP response to HTTPS client  `
```bash
sudo echo '{ "insecure-registries":["10.190.23.246:8088"] }' > /etc/docker/daemon.json
sudo systemctl restart docker
```

## 设置代理
```bash
mkdir -p /etc/systemd/system/docker.service.d
```
>/etc/systemd/system/docker.service.d/http-proxy.conf

```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80/"
```
>/etc/systemd/system/docker.service.d/https-proxy.conf

```
[Service]
Environment="HTTPS_PROXY=https://proxy.example.com:443/"
```
>不走代理

```
Environment="HTTP_PROXY=http://proxy.example.com:80/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"
```
>重启服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```
>验证

```
systemctl show --property=Environment docker
```

## dokcer-machine
```bash
curl -L https://github.com/docker/machine/releases/download/v0.12.2/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
    chmod +x /tmp/docker-machine &&
    sudo cp /tmp/docker-machine /usr/local/bin/docker-machine
```