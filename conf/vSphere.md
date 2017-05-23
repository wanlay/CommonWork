以 root 用户身份登录到 ESX/ESXi 主机。
创建 `/etc/vmware/config` 文件的备份。
使用文本编辑器打开 `/etc/vmware/config` 文件。
将以下条目添加到文件中：

```shell
vmx.fullpath = "/bin/vmx"
isolation.tools.copy.disable="FALSE"
isolation.tools.paste.disable="FALSE"

```