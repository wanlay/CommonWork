## elk的安装
sebp/elk 的镜像

运行时，日志报
max virtual memory areas vm.max_map_count [65530] likely too low, increase to at least [262144]
需增加宿主机的内存,至少需要2G
```shell
sudo sysctl -w vm.max_map_count=262144
sysctl vm.max_map_count  #查看
```

docker-compose.yml
```yaml
version: '2'  
services:  
     elk:  
       image: sebp/elk
       volumes:  
        - elk-volume:/var/lib/elasticsearch
                        
       ports:  
        - "5044:5044" 
        - "5601:5601" 
        - "9200:9200"  
        - "9300:9300"  
volumes:
     elk-volume:
```

## karaf日志输出到elk
删除容器目录/etc/logstash/conf.d/下的文件
新建karaf.conf
```conf
input {
 log4j {
 mode => "server"
 port => 5044
 }
}
output {
    stdout {
      codec => rubydebug
    }
    elasticsearch{
        hosts => ["localhost:9200"]
        index => "karaf-%{+YYYY.MM.dd}"
        document_type => "log4j_type"
    }
}
```
重启容器服务
修改karaf的etc/org.ops4j.pax.logging.cfg (对应ONOS_ROOT/tools/package/etc)
```conf
# Root logger
log4j.rootLogger=DEBUG, out, logstash,syslog, sift, osgi:*
...
#logstash
log4j.appender.logstash=org.apache.log4j.net.SocketAppender
log4j.appender.logstash.port=5044
log4j.appender.logstash.remoteHost=10.190.23.244  
```