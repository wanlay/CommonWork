## 在 Linux上 安装 Docker

```shell  
sudo curl -sSL https://get.daocloud.io/docker | sh
#安装Docker-compose
curl -L https://get.daocloud.io/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 配置加速器
<ul>

```shell   
sudo curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://165eec11.m.daocloud.io
sudo systemctl restart docker.service
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