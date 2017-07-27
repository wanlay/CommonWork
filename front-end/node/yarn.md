## yarn 配置国内源
<pre>
  查看yarn源
<b>yarn config get registry</b>
  更换为淘宝源
<b>yarn config set registry https://registry.npm.taobao.org</b>
</pre>

## yarn安装
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```