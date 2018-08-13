## 一些问题
!>问题一

```bash
sudo: unable to resolve host username...
```
>解决

`/etc/hosts`中添加 
```bash
127.0.0.1       localhost $username 
```
!>问题二

appstreamcli
```bash
Error in `appstreamcli': double free or corruption (fasttop)
```
> 解决

```bash
sudo pkill -KILL appstreamcli
wget -P /tmp https://launchpad.net/ubuntu/+archive/primary/+files/appstream_0.9.4-1ubuntu1_amd64.deb https://launchpad.net/ubuntu/+archive/primary/+files/libappstream3_0.9.4-1ubuntu1_amd64.deb
sudo dpkg -i /tmp/appstream_0.9.4-1ubuntu1_amd64.deb /tmp/libappstream3_0.9.4-1ubuntu1_amd64.deb
```

## ubuntu默认pyhton
```
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 100
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 150
```