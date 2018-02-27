## ubuntu系统中出现的一些问题
### question
```shell
sudo: unable to resolve host username...
```
### answer
```shell
/etc/hosts中添加 127.0.0.1       localhost $username 
```
### question
appstreamcli
```shell
Error in `appstreamcli': double free or corruption (fasttop)
```
### answer
```shell
sudo pkill -KILL appstreamcli
wget -P /tmp https://launchpad.net/ubuntu/+archive/primary/+files/appstream_0.9.4-1ubuntu1_amd64.deb https://launchpad.net/ubuntu/+archive/primary/+files/libappstream3_0.9.4-1ubuntu1_amd64.deb
sudo dpkg -i /tmp/appstream_0.9.4-1ubuntu1_amd64.deb /tmp/libappstream3_0.9.4-1ubuntu1_amd64.deb
```
### dns
```shell
/etc/resolvconf/resolv.conf.d/tail
nameserver 10.19.8.15
#或者
echo nameserver 10.19.8.15 >> /etc/resolvconf/resolv.conf.d/tail


systemctl restart resolvconf.service
#或者
/etc/init.d/resolvconf restart
```

route add -net 10.18.3.0/24 gw 10.18.1.2 dev enp3s0f0
10.18.3.0 为设备所在的网段 
10.18.1.2为访问设备需要的网关
enp3s0f0为访问设备时用的网卡
route add -net 192.168.0.0 netmask 255.255.255.0 dev eth1

mtr 查看路由相关
