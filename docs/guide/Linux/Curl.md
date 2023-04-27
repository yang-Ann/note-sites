# Curl

[curl](https://curl.se/)是一个可以通过命令行发送网络请求的库

## 使用

下载源代码解压, 设置环境变量`安装目录/bin`到`PATH`中即可使用, 如下: 

```sh
# 默认发送 GET 请求, 会自动把响应输出
curl http://localhost:8100

# 指定请求类型
curl -X POST http://localhost:8100/post

# 输出保存到文件中
curl -o out.txt http://localhost:8100

# 指定请求头
curl -H "Content-Type:application/json" http://localhost:8100

# 显示请求头信息和请求体
curl -i http://localhost:8100

# 只显示请求头信息
curl -I http://localhost:8100

# 显示一次http通信的整个过程, 方便调试
curl -v http://localhost:8100

# 更详细的信息(必须要输出到文件中)
curl --trace out.txt http://localhost:8100
curl --trace-ascii out.txt http://localhost:8100

# 拼接 get 参数
curl "http://localhost:8100/get?name=张三&age=18"
# -G 表示构造URL的查询字符串, 等价于上面
curl -G -d name=张三 -d age=18 http://localhost:8100/get -v
# --data-urlencode 用于指定 URL 编码
curl -G --data-urlencode name=张三 http://localhost:8100/get -v

# 使用 -d 参数为发送 json 数据, HTTP 请求会自动加上标头 Content-Type:application/x-www-form-urlencoded
#  并且会自动将请求转为 POST方法, 所以也可以省略 -X POST
curl -d "name=张三&age=18" http://localhost:8100/post -v
curl -d name=张三 -d age=18 http://localhost:8100/post -v

# 指定表单参数, 同 -d
curl -F name=张三 -F age=18 http://localhost:8100/post -v
# 上传表单文件(formData形式), 注意使用 @表示值是一个文件, 可以指定多个 -F
curl -F fileName=@data.txt http://localhost:8100/uploadFile -v

# 上传文件, 请求体(body) 就是文件二进制数据
curl -X POST -T data.json http://localhost:8100/post -v

# 将 name=zhangsan&age=18 上传到 body 中
curl -X POST "localhost:8100/post" -H "Content-Type:application/json" -d name=zhangsan -d age=18

# 将 data.json 文件的内容作为请求体解析上传
curl -X POST "localhost:8100/post" -H "Content-Type:application/json" -d "@data.json"

# 设置请求头 referer, 简写 -e
curl --referer http://www.baidu.com http://localhost:8100/get -v

# 设设置请求头 User-Agent, 简写 -A
curl --user-agent "自定义的标识" http://localhost:8100/get -v

# 控制网速为 200k
curl --limit-rate 200k http://localhost:8100/get

# 设置 cookie, 简写 -b
curl --cookie "name=张三" http://localhost:8100/get -v
# 保存网页返回的 cookie
curl -c cookies 网址
# 使用保存的 cookie 发送请求
curl -b cookies 网址

# http认证
curl -u 用户名:密码 网址

# 跳过 ssl证书校验
curl -k 网址

# HTTP 请求跟随服务器的重定向, curl 默认不跟随重定向
curl -L 网址
```

> 更多参数通过`curl -h`获取

