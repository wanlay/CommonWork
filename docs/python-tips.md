## Python执行系统命令的方法 
```
os.system()，os.popen()，commands
os.system(cmd)的返回值只会有0(成功),1,2
os.popen(cmd)会吧执行的cmd的输出作为值返回。
commands可以获得到返回值和输出
```
## pip
>~/.pip/pip.conf

```conf
## pip的配置文件，默认pip从国外源下载，更改为国内源
[global]
index-url = https://mirrors.aliyun.com/pypi/simple/
```
