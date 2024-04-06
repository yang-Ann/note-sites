---
title: nginx
date: 2023-11-04
categories:
 - 代理服务器
tags:
 - nginx
---

[[toc]]

# Nginx

[官网](https://nginx.org/en/index.html)

`nginx`是一款轻量级的Web服务器/反向代理服务器, 其特点是占有内存少, 并发能力强

## 安装

以`Windows`为例从官网上下载[windows压缩包](https://nginx.org/download/nginx-1.24.0.zip), 解压缩, 然后双击运行`nginx.exe`或者使用`start nginx`命令启动

>   将`nginx`的安装目录设置到环境变量中则可以在任何地方启动

![image-20231230174400622](./images/image-20231230174226818.png) 

然后打开浏览器访问`localhost:80`会看到默认的`nginx`欢迎页面, 如下则表示`nginx`已经安装成功了

![image-20231230174335619](./images/image-20231230174335619.png) 

## 常用命令

```sh
nginx -h # 显示帮助
nginx -v # 显示版本
nginx -V # 显示更多的信息
start nginx # 启动 nginx
nginx -t # 测试配置
nginx -T # 测试配置并将验证后的配置打印到屏幕上



nginx -s [信号]
# -s 标记向 nginx master 进程发送信号, 可以发送 stop, quit, reload 和 reopen 等信号
# stop 信号可立即停止 nginx 进程
# quit 信号会在完成当前正在处理的请求后停止 nginx 进程
# reload 信号可重新加载配置
# reopen 信号指示 nginx 重新打开日志文件
```

## 文件目录

以`window`为例

```sh
├─conf # 所有配置文件的目录
├─contrib
├─docs # 文档
├─html # 默认欢迎页面
├─logs # nginx 每次的访问这里会保存相关的日志
└─temp # 临时文件
```

## 默认配置

`nginx`的默认配置在`conf/nginx.conf`下面, 具体功能如下: 

```nginx
worker_processes  1;  # 定义工作进程数量为1, 即单进程模式
  
events {  # 定义事件循环的配置
    worker_connections  1024;  # 每个工作进程允许的最大连接数为1024
}  
  
http {  # 开始定义HTTP服务器的配置
    include       mime.types;  # 引入mime.types文件, 该配置就是用于定义文件类型和相应的MIME类型
    default_type  application/octet-stream;  # 默认的MIME类型, 如果未定义则为"application/octet-stream"
    sendfile        on;  # 开启sendfile功能, 用于快速传输文件
    keepalive_timeout  65;  # 保持连接的超时时间为65秒
  
    server {  # 开始定义一个服务器块
        listen       8080;  # 服务器监听的端口号为8080
        server_name  localhost;  # 服务器的名字或域名, 此处为localhost
  
        location / {  # 定义一个位置块, 匹配根路径"/"
            root   html;  # 设置根目录为"html"
            index  index.html index.htm;  # 设置默认的索引文件为"index.html"和"index.htm"
        }  
  
        error_page   500 502 503 504  /50x.html;  # 定义错误页面, 当出现500、502、503、504错误时, 返回"/50x.html"页面
        location = /50x.html {  # 定义一个位置块, 匹配路径"/50x.html"
            root   html;  # 设置该位置的根目录为"html"
        }  
    }  
}
```

## location

###  root 与 alias

`root`和`alias`在替换url时是有点不同的, 当`location`命中后

-   如果是`root`, 会把请求`url`的 `[IP|域名]+端口`替换为`root`指定的目录, 然后拼接`index`访问资源

-   如果是`alias`, 会把请求`url`的`[IP|域名]+端口+匹配到的路径`替换为`alias`指定的目录, 然后拼接`index`访问资源

```nginx
worker_processes  1;
  
events {
    worker_connections  1024;
}  
  
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
  
    server {  # 开始定义一个服务器块
        listen       8080;  # 服务器监听的端口号为8080
        server_name  localhost;  # 服务器的名字或域名, 此处为localhost
  
    		# 访问 localhost:8080/ 就等于访问 ./html/index.html
        location / {
            root   html; # 表示当前的 html 目录
            index  index.html index.htm;
        }  
  
        # 访问 localhost:8080/test 就等于访问 C:/Users/33153/Desktop/test-html/index.html
        location /test {
            alias   C:/Users/33153/Desktop/test-html; # 注意: 这里用的是 alias
            index  index.html;
        }
  
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }  
    }  
}
```

#### root

以请求`http://localhost:8080/test-html`为例, `location`配置如下:

```nginx
location /test-html {
    root   C:/Users/33153/Desktop;
    index  index.html;
}  
```

匹配到`/test-html`, `[IP|域名]+端口`替换为`root`指定的目录, 即`url`中的`http://localhost:8080`被替换为了`C:/Users/33153/Desktop`, 然后拼接上`index`指定的文件地址, 所以实际访问的路径为`C:/Users/33153/Desktop/test-html/index.html`

如果是以下的配置

```nginx
location /test-html/foo {
    root   C:/Users/33153/Desktop;
    index  index.html;
}
```

访问`http://localhost:8080/test-html`则相当于访问`C:/Users/33153/Desktop/test-html/foo/index.html`

#### alias

以请求`http://localhost:8080/test-html`为例, `location`配置如下:

```nginx
location /test-html {
    alias   C:/Users/33153/Desktop/test-html/nginx-test;
    index  index.html;
}
```

匹配到`/test-html`, `[IP|域名]+端口+匹配到的路径`替换为`alias`指定的目录, 即`url`中的`http://localhost:8080/test-html`被替换为了`C:/Users/33153/Desktop/test-html/nginx-test`, 然后拼接上`index`指定的文件地址, 所以实际访问的路径为`C:/Users/33153/Desktop/test-html/nginx-test/index.html`

##### alias指定文件

如下配置

```nginx
location /test-html/index.html {
    alias   C:/Users/33153/Desktop/test-html/nginx-test/index.html;
}
```

访问`http://localhost:8080/test-html/index.html`则相当于访问`C:/Users/33153/Desktop/test-html/nginx-test/index.html`

### location的最左匹配原则

`location`会从`url`最左边的路径匹配, 如果一致则命中该`location`, 只有**中间匹配到不会命中**

```nginx
location /foo/bar {
    root   html;
    index  index.html;
}
```

上面的规则只会匹配 `/foo` 或者 `/foo/bar`, 如果输入`/bar`也不算匹配

### 末尾/用法

#### location url 末尾/

`localhost/foo/bar` 表示把`bar`当成一个**文件**,想要访问`bar`文件

`localhost/foo/bar`表示把`bar`当成一个**目录**, 想要访问`bar`目录下`index`指定的文件

```nginx
# 能 /foo 也能匹配 /foo/
location /foo {
    root html;
    index index.html;
}

# 只能匹配 /foo/
location /foo/ {
    root html;
    index index.html;
}
```

#### root 指定目录末尾/

```nginx
location /foo {
    root /home/bar; # 表示把 bar 当成目录或者文件
    index index.html;
}

location /foo {
    root /home/bar/; # 表示只把 bar 当成目录
    index index.html;
}
```

>   `root`后面指定的都应该是目录 (`alias`有种特殊情况除外)

#### 总结

-   `url`末尾不加`/`, 如果需要带`/`时依靠`nginx`自动重定向加`/`

-   `location` 路径不加`/`, 这样末尾有无`/`的`url`都能匹配到

-   `root`或者`alias`指定的目录后面加`/`, 明确表示`root`指定的是目录, 增强配置的可读性

## 压缩

在`Nginx`也提供了三个支持资源压缩的模块`ngx_http_gzip_module`,`ngx_http_gzip_static_module`,`ngx_http_gunzip_module`, 其中`ngx_http_gzip_module`属于内置模块:

```nginx
http{
    # 开启压缩机制
    gzip on;
    # 指定会被压缩的文件类型(也可自己配置其他类型)
    gzip_types text/plain application/javascript text/css application/xml text/javascript image/jpeg image/gif image/png;
    # 设置压缩级别, 越高资源消耗越大, 但压缩效果越好
    gzip_comp_level 5;
    # 在头部中添加Vary: Accept-Encoding（建议开启）
    gzip_vary on;
    # 处理压缩请求的缓冲区数量和大小
    gzip_buffers 16 8k;
    # 对于不支持压缩功能的客户端请求不开启压缩机制
    gzip_disable "MSIE [1-6]\."; # 低版本的IE浏览器不支持压缩
    # 设置压缩响应所支持的HTTP最低版本
    gzip_http_version 1.1;
    # 设置触发压缩的最小阈值
    gzip_min_length 2k;
    # 关闭对后端服务器的响应结果进行压缩
    gzip_proxied off;
}
```

最后的`gzip_proxied`选项包括如下的配置: 

-   `off`: 关闭`Nginx`对后台服务器的响应结果进行压缩
-   `expired`: 如果响应头中包含`Expires`信息, 则开启压缩
-   `no-cache`: 如果响应头中包含`Cache-Control:no-cache`信息, 则开启压缩
-   `no-store`: 如果响应头中包含`Cache-Control:no-store`信息, 则开启压缩
-   `private`: 如果响应头中包含`Cache-Control:private`信息, 则开启压缩
-   `no_last_modified`: 如果响应头中不包含`Last-Modified`信息, 则开启压缩
-   `no_etag`: 如果响应头中不包含`ETag`信息, 则开启压缩
-   `auth`: 如果响应头中包含`Authorization`信息, 则开启压缩
-   `any`: 无条件对后端的响应结果开启压缩机制

## nginx变量

`nginx`中的变量大全如下: 

```nginx
$args                    # 请求中的参数值
$query_string            # 同 $args
$arg_NAME                # GET请求中NAME的值
$is_args                 # 如果请求中有参数, 值为"?", 否则为空字符串
$uri                     # 请求中的当前URI(不带请求参数, 参数位于$args), 可以不同于浏览器传递的$request_uri的值, 它可以通过内部重定向, 或者使用index指令进行修改, $uri不包含主机名, 如"/foo/bar.html"
$document_uri            # 同 $uri
$document_root           # 当前请求的文档根目录或别名
$host                    # 优先级: HTTP请求行的主机名>"HOST"请求头字段>符合请求的服务器名.请求中的主机头字段, 如果请求中的主机头不可用, 则为服务器处理请求的服务器名称
$hostname                # 主机名
$https                   # 如果开启了SSL安全模式, 值为"on", 否则为空字符串
$binary_remote_addr      # 客户端地址的二进制形式, 固定长度为4个字节
$body_bytes_sent         # 传输给客户端的字节数, 响应头不计算在内；这个变量和Apache的mod_log_config模块中的"%B"参数保持兼容
$bytes_sent              # 传输给客户端的字节数
$connection              # TCP连接的序列号
$connection_requests     # TCP连接当前的请求数量
$content_length          # "Content-Length" 请求头字段
$content_type            # "Content-Type" 请求头字段
$cookie_name             # cookie名称
$limit_rate              # 用于设置响应的速度限制
$msec                    # 当前的Unix时间戳
$nginx_version           # nginx版本
$pid                     # 工作进程的PID
$pipe                    # 如果请求来自管道通信, 值为"p", 否则为"."
$proxy_protocol_addr     # 获取代理访问服务器的客户端地址, 如果是直接访问, 该值为空字符串
$realpath_root           # 当前请求的文档根目录或别名的真实路径, 会将所有符号连接转换为真实路径
$remote_addr             # 客户端地址
$remote_port             # 客户端端口
$remote_user             # 用于HTTP基础认证服务的用户名
$request                 # 代表客户端的请求地址
$request_body            # 客户端的请求主体: 此变量可在location中使用, 将请求主体通过proxy_pass, fastcgi_pass, uwsgi_pass和scgi_pass传递给下一级的代理服务器
$request_body_file       # 将客户端请求主体保存在临时文件中文件处理结束后, 此文件需删除如果需要之一开启此功能, 需要设置client_body_in_file_only如果将次文件传 递给后端的代理服务器, 需要禁用request body, 即设置proxy_pass_request_body off, fastcgi_pass_request_body off, uwsgi_pass_request_body off, or scgi_pass_request_body off
$request_completion      # 如果请求成功, 值为"OK", 如果请求未完成或者请求不是一个范围请求的最后一部分, 则为空
$request_filename        # 当前连接请求的文件路径, 由root或alias指令与URI请求生成
$request_length          # 请求的长度 (包括请求的地址, http请求头和请求主体)
$request_method          # HTTP请求方法, 通常为"GET"或"POST"
$request_time            # 处理客户端请求使用的时间,单位为秒, 精度毫秒； 从读入客户端的第一个字节开始, 直到把最后一个字符发送给客户端后进行日志写入为止
$request_uri             # 这个变量等于包含一些客户端请求参数的原始URI, 它无法修改, 请查看$uri更改或重写URI, 不包含主机名, 例如: "/cnphp/test.php?arg=freemouse"
$scheme                  # 请求使用的Web协议, "http" 或 "https"
$server_addr             # 服务器端地址, 需要注意的是: 为了避免访问linux系统内核, 应将ip地址提前设置在配置文件中
$server_name             # 服务器名
$server_port             # 服务器端口
$server_protocol         # 服务器的HTTP版本, 通常为 "HTTP/1.0" 或 "HTTP/1.1"
$status                  # HTTP响应代码
$time_iso8601            # 服务器时间的ISO 8610格式
$time_local              # 服务器时间（LOG Format 格式）
$cookie_NAME             # 客户端请求Header头中的cookie变量, 前缀"$cookie_"加上cookie名称的变量, 该变量的值即为cookie名称的值
$http_NAME               # 匹配任意请求头字段；变量名中的后半部分NAME可以替换成任意请求头字段, 如在配置文件中需要获取http请求头: "Accept-Language", $http_accept_language即可
$http_cookie
$http_host               # 请求地址, 即浏览器中你输入的地址（IP或域名）
$http_referer            # url跳转来源,用来记录从那个页面链接访问过来的
$http_user_agent         # 用户终端浏览器等信息
$http_x_forwarded_for
$sent_http_NAME          # 可以设置任意http响应头字段；变量名中的后半部分NAME可以替换成任意响应头字段, 如需要设置响应头Content-length, $sent_http_content_length即可
# $sent_http_cache_control
# $sent_http_connection
# $sent_http_content_type
# $sent_http_keep_alive
# $sent_http_last_modified
# $sent_http_location
# $sent_http_transfer_encoding
```

## 文件服务器

在浏览器实现查看图片或者下载文件的功能

```nginx
server {  
    # 使用SSL加密进行通信  
    # listen 8888 ssl;
    listen 8888;
  
    server_name localhost;  
  
    # 指定SSL证书的路径, 用于SSL/TLS加密通信  
    # ssl_certificate "/ssl/test.pem";  
      
    # 指定SSL证书的私钥的路径, 用于解密SSL/TLS通信  
    # ssl_certificate_key "/ssl/test.pem.key";  
  
    location /images {  
        root C:/Users/33153/Desktop; 
    }  
  
  	location /images-alias {
        alias C:/Users/33153/Desktop/images;
    }
}
```

### 通过参数是否下载文件

```nginx
location ~* \.(png|jpg|jpeg|gif)$ {
    add_header Access-Control-Allow-Origin "*"; # 解决跨域调用问题
    if ($args = "down") { # nginx的if语句
        add_header Access-Control-Allow-Origin "*"; # 不加这一行前面的 add_header 莫名奇妙会消失
        add_header content-disposition "attachment";
    }
}
```

正常访问图片会正常显示, 当加上`?down`会弹出下载框

## 动静分离

以淘宝为例, 打开一个控制台`Netword`, 选择`All`, 会发现每次打开或者刷新页面都会发送很多的请求, 其中大部分都是一些静态资源(`html`,`css`,`js`或者图片), 其中很多都是一些静态资源, 长时间都不和会变的, 可以指定

```nginx
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css){  
    root   /homg/static_resources;  
    expires 7d;  
}
```

匹配规则如下: 

-   `~`代表匹配时区分大小写
-   `.*`代表任意字符都可以出现零次或多次, 即资源名不限制
-   `\.`代表匹配后缀分隔符`.`
-   `(html|htm|...)`代表匹配括号里所有静态资源类型

## 黑白名单

`nginx`的黑白名单机制， 主要是通过`allow`,`deny`配置项来实现:

```nginx
allow xxx.xxx.xxx.xxx; # 允许指定的IP访问(白名单)
deny xxx.xxx.xxx.xxx; # 禁止指定的IP访问(黑名单)
```

一般是将黑名单和白名单都单独写成一个文件, 然后通过`include`引入

```nginx
# blocks_ip.conf
deny 192.177.12.222; # 屏蔽192.177.12.222访问  
deny 192.177.44.201; # 屏蔽192.177.44.201访问  
deny 127.0.0.0/8; # 屏蔽127.0.0.1 到 127.255.255.254网段中的所有IP访问  
  
# white_ip.conf
allow 192.177.12.222; # 允许192.177.12.222访问  
allow 192.177.44.201; # 允许192.177.44.201访问  
allow 127.45.0.0/16; # 允许127.45.0.1 到 127.45.255.254网段中的所有IP访问  
deny all; # 除开上述IP外, 其他IP全部禁止访问  
```

再将这两个文件在`nginx.conf`中导入

```nginx
http {
    # 屏蔽该文件中的所有ip
    include /home/blocks_ip.conf;
    server {
        location /myApi {
            # 某一系列接口只开放给白名单中的ip
            include /home/white_ip.conf;
        }
    }
}
```

## 日志

`nginx`的每次代理访问都会产生日志, 默认的日志位置在`/var/log/nginx/`目录下面, `access.log`为访问日志, `error.log`为错误日志, 日志配置如下:

```nginx
http {
  # 定义日志格式
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent"';

  # 配置访问日志
  access_log G:/nginx-1.22.0/access.log main;
  # 配置错误日志
  error_log G:/nginx-1.22.0/error.log  error;
}
```

日志可以使用的变量可以参考[nginx变量](#nginx变量)

## 跨域

```nginx
location / {  
    # 允许跨域的请求，可以自定义变量$http_origin，*表示所有  
    add_header 'Access-Control-Allow-Origin' *;  
    # 允许携带cookie请求  
    add_header 'Access-Control-Allow-Credentials' 'true';  
    # 允许跨域请求的方法：GET,POST,OPTIONS,PUT  
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';  
    # 允许请求时携带的头部信息，*表示所有  
    add_header 'Access-Control-Allow-Headers' *;  
    # 允许发送按段获取资源的请求  
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';  
    # 一定要有！！！否则Post请求无法进行跨域！  
    # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求  
    if ($request_method = 'OPTIONS') {  
        add_header 'Access-Control-Max-Age' 1728000;  
        add_header 'Content-Type' 'text/plain; charset=utf-8';  
        add_header 'Content-Length' 0;  
        # 对于Options方式的请求返回204，表示接受跨域请求  
        return 204;  
    }  
}  
```

## 防盗链设计

盗链即是指外部网站引入当前网站的资源对外展示, `Nginx`的防盗链机制实现，跟一个头部字段：`Referer`有关，该字段主要描述了当前请求是从哪儿发出的，那么在`Nginx`中就可获取该值，然后判断是否为本站的资源引用请求，如果不是则不允许访问。`Nginx`中存在一个配置项为`valid_referers`, 语法如下: 

```nginx
valid_referers none | blocked | server_names | string ...;
```

-   `none`：表示接受没有`Referer`字段的`HTTP`请求访问
-   `blocked`：表示允许`http://`或`https//`以外的请求访问
-   `server_names`：资源的白名单，这里可以指定允许访问的域名
-   `string`：可自定义字符串，支配通配符、正则表达式写法

```nginx
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css){  
    # 配置可允许的域名地址
    valid_referers blocked 192.168.12.129;
    if ($invalid_referer) {
        # 可以配置成返回一张禁止盗取的图片
        # rewrite   ^/ http://xxx.com/NO.jpg;
        # 也可直接返回403
        return   403;
    } 
      
    root   /homg/static_resources;  
    expires 7d;  
} 
```

## 重定向

1.   把`HTTP`请求重定向到`HTTPS`

     ```nginx
     server {
         listen 80;
         server_name www.example.com;
         return 301 https://$host$request_uri;
     }
     ```

2.   根据不同的路径或条件进行重定向

     ```nginx
     location /old-path {
         rewrite ^/old-path(.*)$ http://www.xxx.com/$1 permanent;
     }
     ```

3.   根据查询参数进行重定向

     ```nginx
     location /old-path {
         # 当查询参数为 name=test 时重定向
         if ($arg_name = "test") {
             return 301 http://www.example.com/?other=parameter;
         }
       
       root /home/old-path;
     }
     ```

     
