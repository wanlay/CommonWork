# 源设置
## gem(ruby)
```bash
gem source -r https://rubygems.org/
gem source -a http://mirrors.aliyun.com/rubygems/
##或者
gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
```
## npm
```bash
#获取设置
npm config get registry
#设置
npm config set registry https://registry.npm.taobao.org 
#登录
npm login --registry=http://10.190.49.56:8081/repository/npm-group/
#上传
npm publish --registry http://10.190.49.56:8081/repository/npm-group/
```
## yarn
```bash
# 安装
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# 查看yarn源
yarn config get registry
# 更换为淘宝源
yarn config set registry https://registry.npm.taobao.org
```