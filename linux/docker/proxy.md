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
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

验证
```
systemctl show --property=Environment docker
```