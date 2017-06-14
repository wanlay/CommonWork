## openstack 打包介绍
<ul>tar.gz 格式：这个就是标准压缩格式，里面包含了项目元数据和代码，可以使用 python setup.py sdist 命令生成。</ul>
<ul>.egg 格式：这个本质上也是一个压缩文件，只是扩展名换了，里面也包含了项目元数据以及源代码。这个格式由setuptools项目引入。可以通过命令 python setup.py bdist_egg 命令生成。</ul>
<ul>.whl 格式：这个是Wheel包，也是一个压缩文件，只是扩展名换了，里面也包含了项目元数据和代码，还支持免安装直接运行。whl分发包内的元数据和egg包是有些不同的。这个格式是由PEP 427引入的。可以通过命令 python setup.py bdist_wheel 生成。</ul>  

## 遇到的问题
### Q
```text
Not enough random bytes available.  Please do some other work to give
the OS a chance to collect more entropy! (Need 187 more bytes)
```
### A
```shell
sudo find / -type f | xargs grep somerandomstring > /dev/null
```
### Q
```shell
执行gbp buildpackage -S时，报出dh: unable to load addon systemd
```
### A
```shell
sudo apt-get install dh-systemd
```