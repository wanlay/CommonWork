以 root 用户身份登录到 ESX/ESXi 主机。
创建 `/etc/vmware/config` 文件的备份。
使用文本编辑器打开 `/etc/vmware/config` 文件。
将以下条目添加到文件中：

```conf
vmx.fullpath = "/bin/vmx"
isolation.tools.copy.disable="FALSE"
isolation.tools.paste.disable="FALSE"

```

ESXi开启cpu虚拟机
安装vcenter，通过vSphere web client访问，虚拟机，编辑配置，点开CPU，将“硬件虚拟化”里的“向客户机操作系统公开硬件辅助的虚拟机”勾上就行。
