## file server

nginx conf

将/vueindex换为/.vueindex包括目录名以及index.html中的所有
```
server {
    listen       8080;
    server_name  localhost;

    root /Volumes/Storage;
    index ..............;
    
    autoindex on;
    autoindex_format jsonp;
    autoindex_localtime on;
    
    set $is_json 0;
    if ($args = "j") {
        set $is_json 1;
    }

    location ~ /$ {
        if ($is_json = 0) {
            rewrite / /.vueindex/index.html break;
        }
    }
}
```

```s
#bower安装
npm install -g bower

https://github.com/sarim/nginx-vue-index
```