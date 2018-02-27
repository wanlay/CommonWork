## 开启复制粘贴 
以 root 用户身份登录到 ESX/ESXi 主机。
创建 `/etc/vmware/config` 文件的备份。
使用文本编辑器打开 `/etc/vmware/config` 文件。
将以下条目添加到文件中：

```conf
vmx.fullpath = "/bin/vmx"
isolation.tools.copy.disable="FALSE"
isolation.tools.paste.disable="FALSE"

```

## ESXi开启cpu虚拟机
安装vcenter，通过vSphere web client访问，虚拟机，编辑配置，点开CPU，将“硬件虚拟化”里的“向客户机操作系统公开硬件辅助的虚拟机”勾上就行。

## Vsphere web client中英文切换
https://hostname:9443/vsphere-client/?locale=en_US 即可将本来是中文的登陆界面改为英文。

## 磁盘问题
 无法打开磁盘 scsi0:0: 磁盘类型 不受支持或无效。请确保磁盘已导入
解决方法：
ssh连接到ESX主机
```bash
vmkfstools -i <HostedVirtualDisk>  <ESXVirtualDisk>
# 比如
cd /vmfs/volumes/51dc3538-bbdf69dc-6e61-782bcb765b0f/zenoss_core-4.2.5-1998-x86_64/
vmkfstools -i zenoss_core-4.2.5-1998-x86_64.vmdk  zenoss_core-4.2.5-1998-x86_64-new.vmdk -d thin
# zenoss_core-4.2.5-1998-x86_64-new.vmdk就是转换后的磁盘名字。  -d选项为：使用精简置备模式。节省空间。
# 旧文件可以删除。
```
