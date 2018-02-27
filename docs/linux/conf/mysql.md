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