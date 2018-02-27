## ubuntu配置ssh免密钥
```bash
# 本地生成公钥和私钥
ssh-keygen
# 把生成的公钥发送到对方的主机上去
ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.1.160 
```
## centos配置ssh免密钥

先进行上面两步，然后修改`/etc/ssh/sshd_config`
将配置前#号去掉
```bash
#禁用root账户登录，如果是用root用户登录请开启
PermitRootLogin yes

# 是否让 sshd 去检查用户家目录或相关档案的权限数据，
# 这是为了担心使用者将某些重要档案的权限设错，可能会导致一些问题所致。
# 例如使用者的 ~.ssh/ 权限设错时，某些特殊情况下会不许用户登入
StrictModes no

# 是否允许用户自行使用成对的密钥系统进行登入行为，仅针对 version 2。
# 至于自制的公钥数据就放置于用户家目录下的 .ssh/authorized_keys 内
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys

# 有了证书登录了，就禁用密码登录吧，安全要紧
PasswordAuthentication no

```
重启服务
```
service sshd start
```

## 设置root用户远程登录
```bash
#设置密码
sudo passwd root
```
>/etc/ssh/sshd_config文件中改为如下

```bash
# Authentication:
LoginGraceTime 120
PermitRootLogin yes  #yes
StrictModes yes
```