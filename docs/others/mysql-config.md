# mysql
## 查看编码
```sql
show variables like 'character%';
# 或者
show variables like 'collation%';
```
## 查看模式 sql_mode
```sql
select @@sql_mode;
```

## mysql.cnf
位于`/etc/mysql/mysql.conf.d/mysql.cnf`
```conf
# sql模式，默认为以下加上ONLY_FULL_GROUP_BY 
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

# 事务的隔离级别
# 读取提交内容
transaction-isolation=READ-COMMITTED

wait_timeout=2073600

## 设置远程可连接
bind-address = 0.0.0.0

# 大小写敏感，1：不区分大小写
# windows默认为 1
lower_case_table_names = 1
```

## example conf
```conf
[client]
port = 3306
socket = /tmp/mysql.sock
default-character-set = utf8

[mysql]
prompt="MySQL [\d]> "
no-auto-rehash

[mysqld]
port = 3306
socket = /tmp/mysql.sock
lower_case_table_names = 1     ## ++
basedir = /usr/local/mysql
datadir = /data/mysql
pid-file = /data/mysql/mysql.pid
user = mysql
bind-address = 0.0.0.0         
server-id = 1

init-connect = 'SET NAMES utf8'  ##++
character-set-server = utf8      ##++
skip-name-resolve
#skip-networking
back_log = 300

max_connections = 85
max_connect_errors = 6000
open_files_limit = 65535
table_open_cache = 128
max_allowed_packet = 500M
binlog_cache_size = 1M
max_heap_table_size = 8M
tmp_table_size = 16M

read_buffer_size = 2M
read_rnd_buffer_size = 8M

```