## lvm 删除swap 分给 root
```
sudo swapoff -a

lvm lvremove /dev/mapper/ubuntu--vg-swap
#删除/etc/fstab中swap
vgextend /dev/mapper/ubuntu--vg-root /dev/sda
resize2fs /dev/mapper/ubuntu--vg-root
```