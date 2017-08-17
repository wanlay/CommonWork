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
