## Q
Cannot find module '../node_sqlite3.node'
## A
```
npm uninstall sqlite3 && npm install sqlite3
```
## 源
```sh
npm config get registry   #获取设置
npm config set registry https://registry.npm.taobao.org #设置
```


npm config set registry http://10.190.49.56:8081/repository/npm-group/
npm login --registry=http://10.190.49.56:8081/repository/npm-group/
npm publish --registry http://10.190.49.56:8081/repository/npm-group/

