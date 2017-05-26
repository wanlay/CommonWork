# 常用的cmd
## 设置ssh免密登录
user `ssh` 到root，免密
```shell
cat /home/user/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
```
## 关闭SELinux  
1. 临时关闭（不用重启机器）
```shell
setenforce 0                  ##设置SELinux 成为permissive模式
                              ##setenforce 1 设置SELinux 成为enforcing模式
```
2.  修改配置文件（需要重启机器）  
修改`/etc/selinux/config`文件，
将`SELINUX=enforcing`改为`SELINUX=disabled`

```shell
sudo setenforce 0
sudo sed -i 's/enforcing/disabled/g' /etc/selinux/config
```

## 建立stack免密用户
```shell
sudo useradd -s /bin/bash -d /opt/stack -m stack    ##stack用户目录为/opt/stack
echo "stack ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/stack
```
## 设置时区同步时间
```shell
zdump Asia/Shanghai   
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime ##设置时区
ntpdate cn.ntp.org.cn   ##同步时间
```
国内ntp服务器IP：[58.220.207.226],[202.112.29.82],[202.108.6.95],[120.25.108.11],[182.92.12.11],[115.28.122.198]

## 查看端口占用
```shell
sudo fuser -n tcp 8182  ##查看端口
##或者
netstat -aon|findstr "8080"
```
## 查看服务
```shell
sudo service --status-all   #所有服务
sudo netstat -ap | grep 8080   #端口
ps –ef | grep ..   #端口
sudo update-rc.d -f apache2 remove  #删除启动项
sudo update-rc.d   apache2 defaults #添加
```