# windows相关

## WSL开启ssh
卸载原有的ssh
```
sudo apt-get purge openssh-server -y
sudo apt-get install openssh-server -y
```
`/etc/ssh/sshd_config`
```conf
Port 2222    # mod  与win10的22端口冲突
PermitRootLogin no  # mod
AllowUsers wanlay  # add 
PasswordAuthentication yes  # mod
UsePrivilegeSeparation no  # add
```
重启服务
```
sudo service ssh --full-restart
```

