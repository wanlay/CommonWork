## 安装 ubuntu 16.04
镜像地址：http://mirrors.opencas.org/ubuntu-releases/xenial/ubuntu-16.04.2-desktop-amd64.iso

## 安装jdk8
```
sudo apt-get install software-properties-common -y && \
sudo add-apt-repository ppa:webupd8team/java -y && \
sudo apt-get update && \
echo "oracle-java8-installer shared/accepted-oracle-license-v1-1 select true" | sudo debconf-set-selections && \
sudo apt-get install oracle-java8-installer oracle-java8-set-default -y
```