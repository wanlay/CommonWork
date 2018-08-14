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