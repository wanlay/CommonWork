# lvm扩展硬盘容量
## 查看硬盘系统分区状态
```bash
# fdisk -l 
Disk /dev/sda: 500 GiB, 536870912000 bytes, 1048576000 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x1eb6677b

Device     Boot   Start       End   Sectors  Size Id Type
/dev/sda1  *       2048    999423    997376  487M 83 Linux
/dev/sda2       1001470 167770111 166768642 79.5G  5 Extended
/dev/sda5       1001472 167770111 166768640 79.5G 8e Linux LVM
```
可以看到在vsphere中已经给虚机硬盘扩容的500G已经成功，但是我们还需要给LVM的volume group扩容。

## 给新加的硬盘空间建立LVM类型分区
>分区

```bash
# fdisk /dev/sda

 Welcome to fdisk (util-linux 2.27.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p
Disk /dev/sda: 500 GiB, 536870912000 bytes, 1048576000 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x1eb6677b

Device     Boot   Start       End   Sectors  Size Id Type
/dev/sda1  *       2048    999423    997376  487M 83 Linux
/dev/sda2       1001470 167770111 166768642 79.5G  5 Extended
/dev/sda5       1001472 167770111 166768640 79.5G 8e Linux LVM

Command (m for help): n                   
Partition type
   p   primary (1 primary, 1 extended, 2 free)
  l   logical (numbered from 5)
Select (default p): p
Partition number (3,4, default 3): 3
First sector (999424-1048575999, default 999424): 167770112
Last sector, +sectors or +size{K,M,G,T,P} (167770112-1048575999, default 1048575999): 

Created a new partition 3 of type 'Linux' and of size 420 GiB.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Re-reading the partition table failed.: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot or after you run partprobe(8) or kpartx(8).
```

>执行以root用户执行，刷新内核中的分区表

```bash
# partprobe
```
>为新分区建立physical volume

```bash
# pvcreate /dev/sda3
```
>将新pv加入到lvm的VG组

```bash
# vgdisplay
```
在示例环境中，vg_name为ubuntu-vg
```bash
# vgextend ubuntu-vg /dev/sda3
```
>刷新pv列表

```bash
# pvscan 
```
此时可以看到新的pv已经加入到了ubuntu-vg下
```
PV /dev/sda5   VG ubuntu-vg       lvm2 [79.52 GiB / 0    free]
PV /dev/sda3   VG ubuntu-vg       lvm2 [420.00 GiB / 420.00 GiB free]
Total: 2 [499.52 GiB] / in use: 2 [499.52 GiB] / in no VG: 0 [0   ]
```
## 将PV /dev/sda3划分到root LV下

>查看root LV的dev path

```bash
# lvdisplay
#lvextend /dev/ubuntu-vg/root /dev/sda3
Size of logical volume ubuntu-vg/root changed from 75.52 GiB (19333 extents) to 495.52 GiB (126853 extents).
Logical volume root successfully resized.
```
>重新加载LV到文件系统

```bash
# resize2fs /dev/ubuntu-vg/root
或者 #  btrfs filesystem resize max /
resize2fs 1.42.13 (17-May-2015)
Filesystem at /dev/ubuntu-vg/root is mounted on /; on-line resizing required
old_desc_blocks = 5, new_desc_blocks = 31
The filesystem on /dev/ubuntu-vg/root is now 129897472 (4k) blocks long.
```
>查看硬盘使用情况，验证结果

```bash
# df -h
Filesystem                   Size  Used Avail Use% Mounted on
udev                         3.9G     0  3.9G   0% /dev
tmpfs                        799M  9.4M  789M   2% /run
/dev/mapper/ubuntu--vg-root  488G   55G  413G  12% /
tmpfs                        3.9G  300K  3.9G   1% /dev/shm
tmpfs                        5.0M     0  5.0M   0% /run/lock
tmpfs                        3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/sda1                    472M  170M  278M  39% /boot
```
可以看到/dev/mapper/ubuntu--vg-root已经扩容到了488G