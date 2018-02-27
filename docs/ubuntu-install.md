## 安装 ubuntu 16.04
镜像地址：http://mirrors.opencas.org/ubuntu-releases/xenial/ubuntu-16.04.2-desktop-amd64.iso

## 安装jdk8
```bash
sudo apt-get install software-properties-common -y && \
sudo add-apt-repository ppa:webupd8team/java -y && \
sudo apt-get update && \
echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections && \
sudo apt-get install oracle-java8-installer oracle-java8-set-default -y
```

## 安装qemu
```bash
sudo apt-get install qemu-kvm qemu virt-manager virt-viewer libvirt-bin
```

## 安装ping
```
sudo apt-get install inetutils-ping
```

## lvm 删除swap 分给 root
```bash
sudo swapoff -a

lvm lvremove /dev/mapper/ubuntu--vg-swap
# 删除/etc/fstab中swap
vgextend /dev/mapper/ubuntu--vg-root /dev/sda
resize2fs /dev/mapper/ubuntu--vg-root
```

## uget 安装  (下载工具)
```bash
sudo add-apt-repository ppa:plushuang-tw/uget-stable
sudo apt-get update
sudo apt-get install uget
```

## vnc server 安装 (远程连接)
>安装x11vnc

```
sudo apt-get update
sudo apt-get install -y x11vnc
```
>生成密码

```
x11vnc -storepasswd
```
>设为开机启动  
sudo nano /lib/systemd/system/x11vnc.service

```
Description=Start x11vnc at startup.
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/x11vnc -auth guess -once -loop -noxdamage -repeat -rfbauth /home/ubuntu/.vnc/passwd -rfbport 5900 -shared

[Install]
WantedBy=multi-user.target
```
>启动

```
sudo systemctl daemon-reload
sudo systemctl enable x11vnc.service
sudo systemctl start x11vnc.service
```
>手动软链接

```
ln -s /lib/systemd/system/x11vnc.service /etc/systemd/system/multi-user.target.wants/x11vnc.service
```

## ss-qt5
安装
```
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install -y shadowsocks-qt5
```
全局代理
```
sudo apt-get install python-pip
sudo pip install --upgrade pip

sudo pip install genpac
genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --gfwlist-url=https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt --output="autoproxy.pac"
```
系统点击System settings > Network > Network Proxy，选择 Method 为 Automatic，设置 Configuration URL 为 autoproxy.pac 文件的路径，点击 Apply System Wide。

```
genpac -p "PROXY 127.0.0.1:1080" --gfwlist-proxy="PROXY 127.0.0.1:1080" --gfwlist-url=https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt --output="autoproxy.pac"
```