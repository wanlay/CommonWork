## server端
### 安装
```bash
sudo apt-get update
sudo apt-get install -y nfs-common nfs-kernel-server
```
### 配置
```bash
echo /home *(rw,sync,no_root_squash) >> /etc/exports
```

>参数说明  

```
/home   ：共享的目录
*       ：指定哪些用户可以访问
            *  所有可以ping同该主机的用户
            192.168.1.*  指定网段，在该网段中的用户可以挂载
            192.168.1.12 只有该用户能挂载
(ro,sync,no_root_squash)：  权限
        ro : 只读
        rw : 读写
        sync :  同步
        no_root_squash: 不降低root用户的权限
    其他选项man 5 exports 查看
```

### 重启
```
sudo systemctl restart nfs-kernel-server 
```

## client 端
### 安装
```
sudo apt-get install -y nfs-common
```
### 查看服务端的共享目录
```
showmount -e 192.168.1.93
```
### 挂载
```
mount 192.168.1.93:/home  /mnt 
```
umount
### 开机自动挂载
```
/etc/fstab
<server>:</remote/export> </local/directory> nfs < options> 0 0
10.190.16.240:/nfs /home/ubuntu/share nfs defaults 0 0
```