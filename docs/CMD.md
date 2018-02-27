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
## screen 常用用法
```shell
screen -li   #查看当前用户运行的screen实例
screen -X -S <pid> quit #删除指定screen实例

ctrl + a + p  #同一窗口中，上一个实例
ctrl + a + n  #下一个实例

ctrl + a + [  #进入编辑模式
ctrl + a + ]  #退出编辑模式
```
## 开放端口
```shell
iptables -I INPUT -p tcp --dport 3306 -j ACCEPT
```
## 设置root用户远程登录
```shell
#设置密码
sudo passwd root
#/etc/ssh/sshd_config文件中改为如下
# Authentication:
LoginGraceTime 120
PermitRootLogin yes  #yes
StrictModes yes
```
## popd 和 pushd
pushd和popd是对一个目录栈进行操作
```
ubuntu@ubuntu:~$ pushd /tmp/
/tmp ~
ubuntu@ubuntu:/tmp$ popd
~
ubuntu@ubuntu:~$ pushd /home/ubuntu/Downloads/
~/Downloads ~
ubuntu@ubuntu:~/Downloads$ pushd /home/ubuntu/Documents/
~/Documents ~/Downloads ~
ubuntu@ubuntu:~/Documents$ pushd -2
~/Documents ~/Downloads ~
ubuntu@ubuntu:~/Documents$ pushd +2
~ ~/Documents ~/Downloads
ubuntu@ubuntu:~$ pushd +1
~/Documents ~/Downloads ~
ubuntu@ubuntu:~/Documents$ pushd -h
bash: pushd: -h: invalid number
pushd: usage: pushd [-n] [+N | -N | dir]
ubuntu@ubuntu:~/Documents$ popd 
~/Downloads ~
ubuntu@ubuntu:~/Downloads$ popd 
~
```

## 清除buff/cache
```
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

## 定时命令
```
crontab
```

## 系统日志相关
### 清空日志
清空系统日志不使用`rm`，使用`cat /dev/null > /var/log/syslog `
### 限制系统日志大小
文件位于`/etc/logrotate.d/rsyslog`
```s
/var/log/testlog.log {
    # 限制文件大小
     size=100k
    # 轮替
     rotate 2
    #重启syslogd服务，这样轮替后创建的新的日志文件才能被正常写入
     postrotate
                    /usr/bin/killall -HUP syslogd
     endscript
}
```


### find
```s
#一个文件5556字节
find /root -size -5557c -size +5555c -exec ls -ld {} \;
#查找大于5555字节小于5557字节的文件，以上查找的是/root 目录
#查找 小于500K，大于50K的文件
find /root -size -500K -size +50K -exec ls -ld {} \;
```
```
find /email/v2_bak -mtime +92 -type f -name *.mail[12] -exec rm -rf {} \;

/email/v1_bak --设置查找的目录；
-mtime +92 --设置时间为91天前；
-type f --设置查找的类型为文件；
-name *.mail[12] --设置文件名称中包含mail1或者mail2；
-exec rm -f --查找完毕后执行删除操作；
```

## 筛选
```s
cat test | awk '{print $1}'  #输出第一行
```

## 字符串替换
```s
name=${i//\//-} 
#将i中 //全局替换 \/ （i中的/）/- 替换为-
```

## git下载所有分支
```
git branch -a | grep origin | grep -v HEAD | while read rb;do lb=$(echo ${rb} | cut -d/ -f 3-);git checkout -b $lb $rb;done
```
```
for branch in `git branch -a | sed -n '\=/HEAD$=d; \=/master$=d;s= remotes/==p'`; do 
git branch --track ${branch##*/} $branch 
done
```

## 特殊变量列表
变量 | 含义
---------|----------
$0 | 当前脚本的文件名
$n | 传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2。
$# | 传递给脚本或函数的参数个数。
$* | 传递给脚本或函数的所有参数。
$@ | 传递给脚本或函数的所有参数。被双引号(" ")包含时，与 $* 稍有不同，下面将会讲到。
$? | 上个命令的退出状态，或函数的返回值。
$$ | 当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID。