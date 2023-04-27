(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{616:function(a,s,t){"use strict";t.r(s);var n=t(2),e=Object(n.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"curl"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#curl"}},[a._v("#")]),a._v(" Curl")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://curl.se/",target:"_blank",rel:"noopener noreferrer"}},[a._v("curl"),s("OutboundLink")],1),a._v("是一个可以通过命令行发送网络请求的库")]),a._v(" "),s("h2",{attrs:{id:"使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[a._v("#")]),a._v(" 使用")]),a._v(" "),s("p",[a._v("下载源代码解压, 设置环境变量"),s("code",[a._v("安装目录/bin")]),a._v("到"),s("code",[a._v("PATH")]),a._v("中即可使用, 如下:")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 默认发送 GET 请求, 会自动把响应输出")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定请求类型")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-X")]),a._v(" POST http://localhost:8100/post\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 输出保存到文件中")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-o")]),a._v(" out.txt http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定请求头")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-H")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Content-Type:application/json"')]),a._v(" http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 显示请求头信息和请求体")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-i")]),a._v(" http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 只显示请求头信息")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-I")]),a._v(" http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 显示一次http通信的整个过程, 方便调试")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 更详细的信息(必须要输出到文件中)")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--trace")]),a._v(" out.txt http://localhost:8100\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" --trace-ascii out.txt http://localhost:8100\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 拼接 get 参数")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"http://localhost:8100/get?name=张三&age=18"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# -G 表示构造URL的查询字符串, 等价于上面")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-G")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("张三 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18")]),a._v(" http://localhost:8100/get "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# --data-urlencode 用于指定 URL 编码")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-G")]),a._v(" --data-urlencode "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("张三 http://localhost:8100/get "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 使用 -d 参数为发送 json 数据, HTTP 请求会自动加上标头 Content-Type:application/x-www-form-urlencoded")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#  并且会自动将请求转为 POST方法, 所以也可以省略 -X POST")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"name=张三&age=18"')]),a._v(" http://localhost:8100/post "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("张三 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18")]),a._v(" http://localhost:8100/post "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 指定表单参数, 同 -d")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-F")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("张三 "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-F")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18")]),a._v(" http://localhost:8100/post "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 上传表单文件(formData形式), 注意使用 @表示值是一个文件, 可以指定多个 -F")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-F")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("fileName")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("@data.txt http://localhost:8100/uploadFile "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 上传文件, 请求体(body) 就是文件二进制数据")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-X")]),a._v(" POST "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-T")]),a._v(" data.json http://localhost:8100/post "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 将 name=zhangsan&age=18 上传到 body 中")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-X")]),a._v(" POST "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"localhost:8100/post"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-H")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Content-Type:application/json"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("zhangsan "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("age")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("18")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 将 data.json 文件的内容作为请求体解析上传")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-X")]),a._v(" POST "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"localhost:8100/post"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-H")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Content-Type:application/json"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"@data.json"')]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 设置请求头 referer, 简写 -e")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--referer")]),a._v(" http://www.baidu.com http://localhost:8100/get "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 设设置请求头 User-Agent, 简写 -A")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" --user-agent "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"自定义的标识"')]),a._v(" http://localhost:8100/get "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 控制网速为 200k")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" --limit-rate 200k http://localhost:8100/get\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 设置 cookie, 简写 -b")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--cookie")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"name=张三"')]),a._v(" http://localhost:8100/get "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 保存网页返回的 cookie")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-c")]),a._v(" cookies 网址\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 使用保存的 cookie 发送请求")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-b")]),a._v(" cookies 网址\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# http认证")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-u")]),a._v(" 用户名:密码 网址\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 跳过 ssl证书校验")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-k")]),a._v(" 网址\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# HTTP 请求跟随服务器的重定向, curl 默认不跟随重定向")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-L")]),a._v(" 网址\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br"),s("span",{staticClass:"line-number"},[a._v("21")]),s("br"),s("span",{staticClass:"line-number"},[a._v("22")]),s("br"),s("span",{staticClass:"line-number"},[a._v("23")]),s("br"),s("span",{staticClass:"line-number"},[a._v("24")]),s("br"),s("span",{staticClass:"line-number"},[a._v("25")]),s("br"),s("span",{staticClass:"line-number"},[a._v("26")]),s("br"),s("span",{staticClass:"line-number"},[a._v("27")]),s("br"),s("span",{staticClass:"line-number"},[a._v("28")]),s("br"),s("span",{staticClass:"line-number"},[a._v("29")]),s("br"),s("span",{staticClass:"line-number"},[a._v("30")]),s("br"),s("span",{staticClass:"line-number"},[a._v("31")]),s("br"),s("span",{staticClass:"line-number"},[a._v("32")]),s("br"),s("span",{staticClass:"line-number"},[a._v("33")]),s("br"),s("span",{staticClass:"line-number"},[a._v("34")]),s("br"),s("span",{staticClass:"line-number"},[a._v("35")]),s("br"),s("span",{staticClass:"line-number"},[a._v("36")]),s("br"),s("span",{staticClass:"line-number"},[a._v("37")]),s("br"),s("span",{staticClass:"line-number"},[a._v("38")]),s("br"),s("span",{staticClass:"line-number"},[a._v("39")]),s("br"),s("span",{staticClass:"line-number"},[a._v("40")]),s("br"),s("span",{staticClass:"line-number"},[a._v("41")]),s("br"),s("span",{staticClass:"line-number"},[a._v("42")]),s("br"),s("span",{staticClass:"line-number"},[a._v("43")]),s("br"),s("span",{staticClass:"line-number"},[a._v("44")]),s("br"),s("span",{staticClass:"line-number"},[a._v("45")]),s("br"),s("span",{staticClass:"line-number"},[a._v("46")]),s("br"),s("span",{staticClass:"line-number"},[a._v("47")]),s("br"),s("span",{staticClass:"line-number"},[a._v("48")]),s("br"),s("span",{staticClass:"line-number"},[a._v("49")]),s("br"),s("span",{staticClass:"line-number"},[a._v("50")]),s("br"),s("span",{staticClass:"line-number"},[a._v("51")]),s("br"),s("span",{staticClass:"line-number"},[a._v("52")]),s("br"),s("span",{staticClass:"line-number"},[a._v("53")]),s("br"),s("span",{staticClass:"line-number"},[a._v("54")]),s("br"),s("span",{staticClass:"line-number"},[a._v("55")]),s("br"),s("span",{staticClass:"line-number"},[a._v("56")]),s("br"),s("span",{staticClass:"line-number"},[a._v("57")]),s("br"),s("span",{staticClass:"line-number"},[a._v("58")]),s("br"),s("span",{staticClass:"line-number"},[a._v("59")]),s("br"),s("span",{staticClass:"line-number"},[a._v("60")]),s("br"),s("span",{staticClass:"line-number"},[a._v("61")]),s("br"),s("span",{staticClass:"line-number"},[a._v("62")]),s("br"),s("span",{staticClass:"line-number"},[a._v("63")]),s("br"),s("span",{staticClass:"line-number"},[a._v("64")]),s("br"),s("span",{staticClass:"line-number"},[a._v("65")]),s("br"),s("span",{staticClass:"line-number"},[a._v("66")]),s("br"),s("span",{staticClass:"line-number"},[a._v("67")]),s("br"),s("span",{staticClass:"line-number"},[a._v("68")]),s("br"),s("span",{staticClass:"line-number"},[a._v("69")]),s("br"),s("span",{staticClass:"line-number"},[a._v("70")]),s("br"),s("span",{staticClass:"line-number"},[a._v("71")]),s("br"),s("span",{staticClass:"line-number"},[a._v("72")]),s("br"),s("span",{staticClass:"line-number"},[a._v("73")]),s("br"),s("span",{staticClass:"line-number"},[a._v("74")]),s("br"),s("span",{staticClass:"line-number"},[a._v("75")]),s("br")])]),s("blockquote",[s("p",[a._v("更多参数通过"),s("code",[a._v("curl -h")]),a._v("获取")])])])}),[],!1,null,null,null);s.default=e.exports}}]);