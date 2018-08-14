# Dockerfile
## DockerFile更换源
### 若为Debian 

```docker
 RUN   echo "deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib"> /etc/apt/sources.list

```
### 若为alpine
```docker
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
```
>制作镜像From alpine时，默认用的是sh，没有bash

```bash
apk add --no-cache bash
# 安装bash
```
结合上面替换源
```docker
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk update && apk add --no-cache bash
```
## 设置时区
```docker
RUN echo "Asia/shanghai" > /etc/timezone;
```

## 限制jvm
```docker
ENV JAVA_OPTS="-Xmx512m
```