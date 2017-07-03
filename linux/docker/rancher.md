## 在 ubuntu 上安装 rancher
<pre>
安装docker和docker-compose
<b>参考install.md</b>
通过docker-compose安装rancher-server和mysql
<b>
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
      - advertise-address=10.190.23.245</b>
运行
<b>docker-compose up -d</b>
</pre>

## tips
添加主机时，agent所在的主机的docker版本要与server端的一样