## 在 ubuntu 上安装 rancher
### 安装docker和docker-compose
参考install.md
### 通过docker-compose安装rancher-server和mysql
```yaml
version: '2'
services:
  mysqldb:
    image: mysql
    restart: on-failure:10
    logging:
      driver: "journald"
    ports: 
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=rancher
      - MYSQL_USER=rancher
      - MYSQL_PASSWORD=rancher 
      
  rancher-server:
    image: rancher/server
    restart: on-failure:10
    logging:
      driver: "journald"
    ports: 
      - "5555:8080"
    links:
      - mysqldb:rancher
    environment:
      - db-user=rancher
      - db-pass=rancher
      - db-name=rancher
      - advertise-address=10.190.23.245   
```   
### 运行
`docker-compose up -d`


## tips
添加主机时，agent所在的主机的docker版本要与server端的一样