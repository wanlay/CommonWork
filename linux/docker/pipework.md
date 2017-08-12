下载pipework
cd /usr/src
wget  -O pipework-master.zip https://codeload.github.com/jpetazzo/pipework/zip/master
# 若没有unzip命令，安装 yum install -y unzip zip
unzip pipework-master.zip 
cp -p pipework-master/pipework /usr/local/bin/

pipework固定物理网段容器IP地址
pipework br0 cbb1 10.190.23.10/24@10.190.23.1