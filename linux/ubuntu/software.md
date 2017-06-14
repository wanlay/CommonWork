# uget 安装  (下载工具)
```shell
sudo add-apt-repository ppa:plushuang-tw/uget-stable
sudo apt-get update
sudo apt-get install uget
```

# vnc server 安装 (远程连接)
<pre>
安装x11vnc
<b>sudo apt-get update</b>
<b>sudo apt-get install -y x11vnc</b>
生成密码
<b>x11vnc -storepasswd</b>
设为开机启动
<b>sudo nano /lib/systemd/system/x11vnc.service</b>
<b>
[Unit]
Description=Start x11vnc at startup.
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/x11vnc -auth guess -once -loop -noxdamage -repeat -rfbauth /home/USERNAME/.vnc/passwd -rfbport 5900 -shared

[Install]
WantedBy=multi-user.target</b>
启动
<b>sudo systemctl daemon-reload
sudo systemctl enable x11vnc.service
sudo systemctl start x11vnc.service</b>
</pre>