## ubuntu系统中出现的一些问题
### question
```shell
sudo: unable to resolve host username...
```
### answer
```shell
/etc/hosts中添加 127.0.0.1       localhost $username 
```