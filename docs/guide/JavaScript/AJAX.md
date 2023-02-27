---
title: AJAX
date: 2022-3-17
categories:
 - 前端基础
tags:
 - AJAX
---
[[toc]]

# AJAX

## AJAX的介绍和特点

```
Ajax 全称为 Asynchronous Javascript And XML(异步JavaScript和XML), 
使用AJAX可以在浏览器中向服务器发送异步请求, 最大优势: 不用刷新页面来获取数据
AJAX 不是新的编程语言, 而是一种将现有的标准组合到一起使用的新方式
```

- 优点:
  - 可以无需刷新页面与服务器端进行通信
  - 允许你根据用户事件来更新部分页面内容

- 缺点
  - 没有浏览历史, 不能回退
  - 存在`跨度问题`(同源策略) 
  - `SEO` 不友好, 爬虫程序爬取不到对应的数据

## 同步和异步

- 同步

  ```
  同步就是后一个任务等待前一个任务执行完毕后, 再执行, 执行顺序和代码的书写顺序一致
  ```

- 异步

  ```
  异步是非阻塞的, 异步逻辑与主逻辑相互独立, 主逻辑不需要等待异步逻辑完成, 而是可以继续的往下执行
  执行完毕, 通过回调函数来通知主线程
  ```

### 阻塞与线程

- 阻塞

  ```
  线程在执行中如果遇到磁盘读写或者网络通信(统称为I/O操作), 通常要耗费较长的时间, 
  这是操作系统会剥夺这个线程的CPU控制权, 使其暂停执行, 
  同时将资源让给其他的工作线程, 这种线程的调度方式称为阻塞
  
  当I/O操作结束, 操作系统将这个线程的阻塞状态解除, 恢复其对CPU的控制权, 令其继续执行, 这种I/O模式就是常说的同步式I/O
  ```

  ```
  相应地, 异步式I/O是针对上述的I/O操作, 不采用阻塞模式, 
  当线程遇到I/O操作时, 不会以阻塞的方式等待I/O操作的结束, 
  而只是将I/O操作请求发送给操作系统, 然后继续执行下一条语句.
  
  当操作系统完成I/O操作, 以事件的形式通知执行I/O操作的线程, 
  线程会在特定的时间处理这个事件, 可以使用异步式I/O, 单线程即可胜任.
  异步式I/O里的一个重要的概念: 事件！
  ```

### 消息队列和事件循环

- JS单线程

  ```
  我们常说“JavaScript是一门单线程的语言”, 所以JavaScript是采用异步式I/O+事件循环模式的
  所谓的单线程, 是指在JS引擎中负责解释和执行JavaScript代码的线程只有一个, 我们称它为: 主线程
  
  实际上还存在其他的线程, 例如: 处理AJAX请求的线程、处理DOM事件的线程、定时器线程、读写文件的线程(在Nodo.js中)等等, 我们称它们为: 工作线程
  
  单线程也就意味着, 所有任务需要排队, 前一个任务结束, 才会执行后一个任务.
  如果前一个任务耗时很长, 后一个任务就不得不一直等着.
  
  我们可以采用异步式I/O+事件循环模式时, 当耗时的I/O的操作结束后, 
  会以事件的形式通知主线程, 这样就可以避免阻塞, 那么这个通知机制就是利用消息队列和事件循环.
  ```

#### 消息队列

```
当采用异步式I/O+事件循环后, 所有任务可以分成两种:
一种是同步任务, 另一种是异步任务(先只分为同步任务和异步任务, 后面再细分)

同步任务指的是, 在主线程上排队执行的任务, 只有前一个任务执行完毕, 才能执行后一个任务;
异步任务指的是, 暂时不进入主线程而是进入消息队列的任务, 只有主线程的同步任务全部结束后该任务才会进入主线程执行;

一句话概括: 工作线程将消息(异步任务)放到消息队列, 主线程通过事件循环去取消息
```

1. 所有同步任务都在`主线程`上执行, 形成一个`执行栈`(execution context stack)
2. `主线程`之外, 还存在一个`消息队列`; 只要异步任务有了运行结果, 就在`消息队列`之中放置一个`事件`
3. 一旦`执行栈`中的所有同步任务执行完毕, 系统就会读取`消息队列`, 看看里面有哪些`事件`, 然后将`事件`放入`执行栈`, 开始执行
4. `主线程`只会做一件事情, 就是从`消息队列`里面取消息(一次只取一条消息)、放入执行栈执行消息, 再取消息、再执行, 不断重复上面的流程

#### 事件循环

```
上文提到主线程从消息队列中读取执行消息, 这个过程是循环不断的; 
当消息队列为空时, 就会等待直到消息队列变成非空

而且主线程只有在将当前的消息执行完成后, 才会去取下一个消息
这种机制就叫做事件循环机制, 取一个消息并执行的过程叫做 一次事件循环

可见异步过程的回调函数, 一定不在当前这一轮事件循环中执行, 可不一定会在下一轮事件循环中进行(取决于异步任务结束往消息队列添加消息时, 队列中是否有其它消息)
```

### 异步任务的分类

- 宏任务(macrotask)

  ```
  宏任务就是将当前任务放在下一次任务列最顶部
  ```

  - 常见的宏任务
    - `setTimeout` `setInterval` `requestAnimationFrame` `ajax` `setimmediate` `读取文件`

- 微任务(microtask)

  ```
  微任务会将当前任务放入下一次任务列的底部(比宏任务先执行)
  ```

  - 常见的微任务
    - `Promise对象`的 `then` `catch` `finally` `process.nextTick`

#### js代码的执行顺序:
  1. 同步任务
  2. `process.nextTick`(node)
  3. 微任务
  4. 宏任务
  5. `setimmediate`(node)

> 真正的执行顺序和上面的有点区别的就是: js会先执行一个宏任务后在去执行当前的所有微任务, 然后继续等待其他任务, 其实 **script** 就是一个宏任务, 浏览器会先去执行 **script** 然后再去执行所有的微任务, 所以可以简单的理解为 **微任务比宏任务的优先级更高也没什么问题**

## 同源策略

同源策略(Same origin policy)是浏览器的一种安全策略, 同源: 协议 域名 端口号 必须完全相同, 
违背同源策略就是 跨域(CORS), 请求可以发送, 但是数据回不了

临时解决:

- 前端开发环境可以使用 代理服务器 ( 生产环境需要后端支持 )

> [CORS](https://www.ruanyifeng.com/blog/2016/04/cors.html)

## HTTP

```
HTTP 也叫 超文本传输协议, 全称(Hypertext Transfer Protocol, HTTP), 
协议详细规定了浏览器和万维网服务器之间互相通信的规则
```

### 请求报文

```
浏览器向服务器发送的内容叫 请求(request)

重点是格式与参数
	请求行(3部分)   URL路径 / 请求类型: GET POST / HTTP请求版本
	请求头         可以携带 token, 设置表单数据提交数据的编码类型content-type
	空行 (必须得有)
	请求体          GET请求的请求体是空的, 而POST请求请求体可以不为空
```

### 响应报文

```
服务器返回给浏览器的结果叫 响应(response)

    响应行(3部分)   协议版本 / 响应状态码 / 响应状态字符串
                                         200 表示 ok
                                         400 表示 字段对应不上
                                         404 表示 找不到
                                         403 表示 访问被禁止
                                         405 表示 请求方式不一致
                                         401 表示 未授权
                                         500 表示 内部错误
    响应头
    空行 (必须得有)
    响应体           服务器返回的数据
```

> [HTTP状态码](https://www.runoob.com/http/http-status-codes.html), [content-type](https://www.runoob.com/http/http-content-type.html)

- 请求头和响应头包含的内容

  - 请求(request)   客户端  ---> 服务端

    ```http
    GET(请求的方式) /newcoder/hello.html(请求的目标资源) HTTP/1.1(请求采用的协议和版本号) 
    Accept: */*(客户端能接收的资源类型) 
    Accept-Language: en-us(客户端接收的语言类型) 
    Connection: Keep-Alive(维护客户端和服务端的连接关系) 
    Host: localhost:8080(连接的目标主机和端口号) 
    Referer: http://localhost/links.asp(告诉服务器我来自于哪里) 
    User-Agent: Mozilla/4.0(客户端版本号的名字) 
    Accept-Encoding: gzip, deflate(客户端能接收的压缩数据的类型) 
    If-Modified-Since: Tue, 11 Jul 2000 18:23:51 GMT(缓存时间)  
    Cookie(客户端暂存服务端的信息) 
    Date: Tue, 11 Jul 2000 18:23:51 GMT(客户端请求服务端的时间)
    ```

  - 响应(response)     服务端 ---> 客户端

    ```http
    HTTP/1.1(响应采用的协议和版本号) 200(状态码) OK(描述信息)
    Location: http://www.baidu.com(服务端需要客户端访问的页面路径) 
    Server: apache tomcat(服务端的Web服务端名)
    Content-Encoding: gzip(服务端能够发送压缩编码类型) 
    Content-Length: 80(服务端发送的压缩数据的长度) 
    Content-Language: zh-cn(服务端发送的语言类型) 
    Content-Type: text/html; charset=GB2312(服务端发送的类型及采用的编码方式)
    Last-Modified: Tue, 11 Jul 2000 18:23:51 GMT(服务端对该资源最后修改的时间)
    Refresh: 1;url=http://www.it315.org(服务端要求客户端1秒钟后, 刷新, 然后访问指定的页面路径)
    Content-Disposition: attachment; filename=aaa.zip(服务端要求客户端以下载文件的方式打开该文件)
    Transfer-Encoding: chunked(分块传递数据到客户端）  
    Set-Cookie: SS=Q0=5Lb_nQ; path=/search(服务端发送到客户端的暂存数据)
    Expires: -1//3种(服务端禁止客户端缓存页面数据)
    Cache-Control: no-cache(服务端禁止客户端缓存页面数据)  
    Pragma: no-cache(服务端禁止客户端缓存页面数据)   
    Connection: close(1.0)/(1.1)Keep-Alive(维护客户端和服务端的连接关系)  
    Date: Tue, 11 Jul 2000 18:23:51 GMT(服务端响应客户端的时间)
    Access-Control-Allow-Origin: http:www.baidu.com (指定允许其他域名访问)
    Access-Control-Allow-Credentials: true (是否允许后续请求携带认证信息(cookies),该值只能是true,否则不返回)
    ```

## 原生JS发送ajax请求

### [XMLHttpRequest](https://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html) 对象

```
XMLHttpRequest对象 用于在后台与服务器交换数据
直接new XMLHttpRequest()就可以创建
```

### open() 

```
创建请求
语法: open(method,url,async)

参数:
    method: 请求的类型: GET 或 POST
    url:    服务器url地址
    async:  true（异步）或 false（同步）

请求类型是 GET 的可以在url里设置params参数, 而POST则需要使用send()方法传递参数
xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300');
```

### send()

```
发送请求
语法: send(body)
    参数:
    body: POST 请求携带的请求体参数
    xhr.send('a=100&b=200&c=300');
```

-  GET 和 POST 的区别:

  ```
  与 POST 相比, GET 更简单也更快, 并且在大部分情况下都能用
  	然而, 在以下情况中, 请使用 POST 请求
  ```

  - 无法使用缓存文件（更新服务器上的文件或数据库）
  - 向服务器发送大量数据（`POST` 没有数据量限制）
  - 发送包含未知字符的用户输入时, `POST` 比 `GET` 更稳定也更可靠

### XMLHttpRequest 对象的事件或方法

- `setRequestHeader()`

  ```
  设置请求头信息, 参数是名值对结构的字符串(不能写中文)
  ```

- `getAllResponseHeaders()`

  ```
  获取响应头信息
  ```

- `abort()`

  ```
  终止ajax请求
  ```

#### ontimeout事件

  ```
  请求超时事件, 当指定超时时间, 请求超时后触发
  ```

#### onerror事件

  ```
  网络异常事件, 网络异常后触发
  ```

#### onreadystatechange 事件

```
请求被发送到服务器时, 我们需要执行一些基于响应的任务

当请求被发送到服务器时, 我们需要执行一些基于响应的任务
每当 readyState 改变时, 就会触发 onreadystatechange 事件

readyState 属性存有 XMLHttpRequest 的状态信息, 从 0 到 4 发生变化
    0: 请求未初始化
    1: 服务器连接已建立
    2: 请求已接收
    3: 请求处理中
    4: 请求已完成, 且响应已就绪

status(响应状态码)属性, 响应状态码 2开头 的都是表示成功      	
    200 表示 "OK"
    404 表示 找不到
    403 表示 访问被禁止
    401 表示 未授权
    500 表示 内部错误
    
所以在处理服务器响应时是要先进行判断是否 获取了所有的请求 请求状态是否成功
```

- `statusText属性 `

  ```
  响应状态字符串, 如: 200表示OK
  ```

- `responseText属性`

  ```
  永远获取的是字符串形式的响应体, 如果响应体不是字符串则会乱码
  ```

- `response属性`

  ```
  获取响应体信息(服务器返回的数据), 指定了responseType的类型时, 会直接获取到转换后的对象
  ```

- `responseType属性`

  ```
  设置响应体数据类型, 可以设置为 'json' 这样响应体数据会自动进行json数据类型转换
  ```

- `timeout属性`

  ```
  设置请求超时时间(毫秒)
  ```

- 原生`ajax`请求示例:

  ```js
  // 创建 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();
  // 是否正在发送AJAX请求的标识变量
  // let isSending = false; 
  // 超时设置 2s
  xhr.timeout = 2000;
  // 超时回调
  xhr.ontimeout = () => {
      alert('网络超时, 请稍后重试!');
  };
  // 网络错误回调
  xhr.onerror = () => {
      alert('你的网络似乎出现了一些问题!');
  };
  // 判断标识变量
  if (isSending) {
      // 如果正在发送, 则取消该请求
      xhr.abort();
  }
  // 创建 GET 请求, url为 data.json
  xhr.open('GET', 'data.json');
  // 发送请求
  xhr.send();
  // 修改标识变量的值
  isSending = true;
  // onreadystatechange 事件
  xhr.onreadystatechange = () => {
      
      // 已获取了所有的请求把标识变量重置
      // if (xhr.readyState === 4) {
      //    // 修改标识变量
      //    isSending = false;
      // }
      
      // 已获取了所有的请求
      if (xhr.readyState === 4) {
          // 请求状态成功
          if(xhr.status === 200){
              console.log(xhr.response);      // 响应体
              console.log(xhr.status);        // 状态码
              console.log(xhr.statusText);    // 响应状态字符串
              console.log(xhr.getAllResponseHeaders()); // 所有的响应头
           }
      }
  };
  ```

#### progress 事件

请求发送时触发

### formData对象

```
formData对象的主要用途有两个: 
  - 将form表单元素的name与value进行组合, 实现表单数据的序列化, 从而减少表单元素的拼接, 提高效率
  - 异步上传文件
```

- 通过`get(key)`与`getAll(key)`来获取相对应的值

- 通过`append(key,value)`在数据末尾追加数据

- 通过`set(key, value)`来设置修改数据 

      key 的值不存在, 会添加一条数据
      key 的值存在, 会修改对应的 value 值

- 通过`has(key)`来判断是否存在对应的`key`值

- 通过`delete(key)`可以删除对应`key`的数据

```js
//通过formData构造函数创建一个空对象
const formData = new FormData();

//可以通过append()方法来追加数据
formData.append("name","zhangsan");

//通过set方法对值进行设置
formData.set("name","zhangsan");

//通过get方法对值进行读取
console.log(formData.get("name")); // zhangsan

// 获取key为age的第一个值
formData.get("age"); 

// 获取key为age的所有值, 返回值为数组类型
formData.getAll("age");

//通过append() 方法在末尾追加 key 为 name 值为 zhangsan 的数据
formData.append("name","zhangsan");

//判断是否包含 key 为 name 的数据
console.log(formData.has("name")); //true

//删除 key 为 name 的值
formData.delete("name");    

// 遍历 formData 里的每个值
for(var [key, value] of formData.entries()) {
	console.log("key:", key);
	console.log("value:", value);
    console.log("------------------");
}
```

前端文件上传简单示例: 

```js
<input type="file" id="file">
<br />
<br />
<button id="btn">上传</button>
<script>
const file = document.getElementById('file');
const btn = document.getElementById('btn');

const http = async (url, options) => {
    const opt = Object.assign({
        method: 'GET'
    }, options)
    console.log(opt);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opt);
            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

let formData = null;
file.addEventListener('change', e => {
    // input元素(type="file") 添加文件会触发 change 事件
    // 该元素的 files数组属性里会添加对应的文件对象
    console.log(file.files);

    // 创建 formData数据类型
    formData = new FormData();
    // 添加文件数据
    formData.append("file", file.files[0]);
    console.log(formData);
})

btn.addEventListener('click', () => {
    if (!formData) return;
    http('http://localhost:8888/test/fileUpload', {
        method: 'post',
        // 指定数据类型是二进制
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: {
            formData
        }
    }).then(res => {
        console.log(res);
    })
})

</script>
```

> 可以将 `formData` 对象作为`POST`请求`body`参数上传文件(请求头需要指定为`"Content-Type": "multipart/form-data"`)

> 还可以直接通过 `new formData(表单DOM)`直接创建也是有效的

### JQuery 发送 AJAX请求

`$.get()`

 ```js
  // $.get(
  $.post(
      'http://127.0.0.1:8000/jquery-server', // url地址
      {a:100,b:200}, // 携带的参数
      function(data){ // 回调
          console.log(data);
      },
      'json' // 响应体结果自动转换
  )
 ```

  > `$.get()` 和 `$.post()` 使用方法一模一样

 `$.ajax()` 通用发送请求

  ```js
  $.ajax({
      // 请求地址
      url: 'http://127.0.0.1:8000/jquery-server',
      // 参数
      data: { a: 100, b: 200 },
      // 请求方法
      type: 'GET',
      // 响应体结果自动转换
      dataType: 'json',
      // 成功的回调
      success: function(data){
          console.log(data);
      },
      // 超时时间
      timeout: 2000,
      // 失败的回调
      error: function(){
          console.error('出错了');
      },
      // 请求头信息
      headers:{
          c: 300,
          d: 400
      }
  })
  ```

### [fetch](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html) 发送 AJAX请求

`fetch`: 原生js函数, 不再使用 `XmlHttpRequest` 对象发送 `ajax` 请求

`fetch`请求成功以后, 得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response), 它对应服务器的 HTTP 回应

> 也就是说`fetch` 请求返回的响应体包着两层 `Promise` 对象, 需要`then`或者`await`两次才能拿到数据

完整写法

```js
// 请求控制器
const controller = new AbortController();

fetch('http://127.0.0.1:8000/fetch-server?a=100&b=200', { // fetch 的 get/head请求 需要需要将参数拼接到 url 后面
    // 请求方法
    method: 'POST',
    // 请求头
    headers: {
        name: 'zhang san',
        age: 18
    },
    // 请求体
    // body: 'username=admin&password=admin'
    body: JSON.stringify({username: 'admin'}),
    // 设置 signal 属性后, controller.abort(); 将会中断请求
    signal: controller.signal 
}).then(response=>{
    console.log('联系服务器成功了', response);
    
    return response.json();  // 将响应体转换为 JSON 格式
    // return response.text(); // 将响应体转换为文本格式
    // return response.arrayBuffer(); // 将响应体转换为 arrayBuffer 格式
    // return response.blob(); // 将响应体转换为 blob 格式
    // return response.formData(); // 将响应体转换为 formData 格式
}).then(response=>{
    console.log('获取数据成功了', response);
}).catch(error=>{
    console.log('请求出错', error);
})
```

#### fetch 的标头属性:

**Response.ok**

`Response.ok`属性返回一个布尔值, 表示请求是否成功, `true`对应 HTTP 请求的状态码 200 到 299, `false`对应其他的状态码

**Response.status**

`Response.status`属性返回一个数字, 表示 HTTP 回应的状态码（例如200, 表示成功请求）

**Response.statusText**

`Response.statusText`属性返回一个字符串, 表示 HTTP 回应的状态信息（例如请求成功以后, 服务器返回"OK"）

**Response.url**

`Response.url`属性返回请求的 URL, 如果 URL 存在跳转, 该属性返回的是最终 URL

**Response.type**

`Response.type`属性返回请求的类型可能的值如下: 

- `basic`: 普通请求, 即同源请求
- `cors`: 跨域请求
- `error`: 网络错误, 主要用于 Service Worker
- `opaque`: 如果`fetch()`请求的`type`属性设为`no-cors`, 就会返回这个值, 详见请求部分表示发出的是简单的跨域请求, 类似`<form>`表单的那种跨域请求
- `opaqueredirect`: 如果`fetch()`请求的`redirect`属性设为`manual`, 就会返回这个值, 详见请求部分

**Response.redirected**

`Response.redirected`属性返回一个布尔值, 表示请求是否发生过跳转

#### 通过标头属性判断请求是否成功

```js
async function fetchText() {
    const response = await fetch('/readme.txt');
    if (response.status >= 200 && response.status < 300) {
        return await response.text();
    } else {
        throw new Error(response.statusText);
    }
}
```

使用 `async` + `await`

```js
const http = async (url, options) => {
    const opt = Object.assign({
        method: 'GET',
        headers:{
            "content-type": "application/json"
        }
    }, options)
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opt);
            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

// 发送请求
http('http://127.0.0.1:8000/fetch-server')
  .then(data=>{
    console.log(data);
}).catch(err=>{
    console.error(err);
})
```
