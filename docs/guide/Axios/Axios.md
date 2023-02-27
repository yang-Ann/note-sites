---
title: Axios
date: 2022-3-5
categories:
 - 第三方库
tags:
 - Axios
---
:::v-pre



# Axios



[[toc]]

## 介绍和基本使用

[官网](https://axios-http.com/)

- 基于 `xhr` + `promise` 的异步 ajax请求库
- 浏览器端 或 node端都可以使用
- 支持请求和响应拦截器
- 支持请求取消
- 请求和响应数据转换
- 批量发送多个请求

### 常用语法

- `axios(config)`: 通用/最本质的发任意类型请求的方式
- `axios(url[,config])`: 可以只指定url 发get 请求
- `axios.request(config)`: 等同于axios(config)
- `axios.get(url[,config])`: 发送 get 请求
- `axios.delete(url[,config])`: 发送 delete 请求
- `axios.post(url[,data, config])`: 发送 post 请求
- `axios.put(url[,data, config])`: 发送 put 请求

- `axios.defaults.xxx`: 设置请求的默认全局配置（method\baseURL\params\timeout...）
- `axios.interceptors.request.use(successBack,errorBack)`: 添加请求拦截器
- `axios.interceptors.response.use(successBack,errorBack)`: 添加响应拦截器

- `axios.create([config])`: 创建一个新的axios实例对象(它没有下面的功能)

- `axios.Cancel()`: 用于创建取消请求的错误对象
- `axios.CancelToken()`: 用于创建取消请求的 token 对象
- `axios.isCancel()`: 是否是一个取消请求的错误
- `axios.all(promises)`: 用于批量执行多个异步请求
- `axios.spread()`: 用来指定接收所有成功数据的回调函数的方法


### 高频常用参数罗列
	1：url       // 通过设置url参数, 决定请求到底发送给谁
	2：method    // 设置请求的类型, get/post/put/delete..
	3：baseURL   // 设置url的基础结构, 发送请求配置时只需要设置url即可, axios会自动将两者进行拼接
	4：headers   // 头信息：进行身份校验的时候, 可以在头信息中加入token, 来检验请求是否授权
	5：params    // 设置url参数的, 可以通过params直接添加url参数名和参数值(GET请求)
	6：data      // 设置请求体参数(POST请求)
	7：timeout   // 超时请求时间, 单位是ms 超过请求时间, 请求就会被取消
	8：其余的都是不经常使用的参数, 了解即可！

### 设置默认配置

```js
axios.defaults.method='GET'; //设置默认的请求类型是 GET
axios.defaults.baseURL='http://localhost:3000'; //设置基础URL
axios.defaults.params={id:100}; // 设置 url 参数
axios.defaults.timeout=3000; // 设置超时时间
```

## 发送请求

[参数](https://axios-http.com/docs/req_config)

  - `axios.get(url, config)`  GET请求

     ```js
    // 配置默认前缀 baseURL
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    
    // GET 请求
    axios.get(
        '/axios-server',  // url地址
          // 配置对象
          { 
            params: {a:100, b:200}, // params 参数
            headers: {name:'zhang san', age:18} // 请求头信息(不能写中文)
          }
        ).then(response => { 
        	// 成功回调 这个对象有很多信息
            console.log(response.config);     // 本次请求 axios 的配置对象
            console.log(response.data);       // 响应体数据
            console.log(response.headers);    // 响应头信息
            console.log(response.request);    // 本次请求的 XHMLHttpRequest对象
            console.log(response.status);     // 响应状态码
            console.log(response.statusText); // 响应状态字符串
        },error => { 
        	// 失败回调
            console.error(error.message);
        })
    ```

  - `axios.post(url, data, config)`  POST请求

     ```js
    axios.post('/axios-server', // url地址
      // 请求体
      {username:'admin', password:'admin'}, // 请求体参数 
      // 其他配置
      {
          params: {a: 200,b: 400}, // 参数
          headers: {name: 'li si',age: 20 // 请求头信息(不能写中文)
      }
    }).then(response => { // 成功回调 这个对象有很多信息
        console.log(response.data);
    },
        error => { // 失败回调
            console.error(error.message);
        })
    ```

  - `axios.({config})` 通用请求方式

    ```js
    axios({
      // 请求方法
      method: 'POST',
      // url
      url: '/axios-server',
      // url 参数
      params: {
          c: 200,
          b: 400
      },
      // 头信息
      headers: {
          e: 200,
          d: 400
      },
      // 请求体参数
      data: {
          username: 'adming',
          password: 'admin'
      },
      // 超时时间
      timeout: 2000,
      // 服务器响应的数据类型
      responseType: "json"
    }).then(response=>{ // 成功回调
        console.log(response.status); // 响应状态码
        console.log(response.statusText); // 响应状态字符串
        console.log(response.headers); // 响应头信息
        console.log(response.data); // 响应体
    },error=>{ // 失败回调
        console.error(error.message); // 失败状态字符串
        console.error(error.response); // 服务端返回的错误信息
    })
    ```

## 创建实例

- 什么时候使用:
  - 可以根据指定配置创建一个`axios`的实例对象, 也就是每个`axios`实例都有自己的配置
  - 使用: `axios` 的实例只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的
  - 作用: 当接口数据有多个服务器时分别需要不同的配置时就可以使用`axios`创建实例来分别进行不同的配置

    ```js
    //创建axios实例对象  test
    const test = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 3000
    });
    // console.log(test);
    //这里  test 与 axios 对象的功能几近是一样的
    test({
        url: '/comments',
    }).then(response => {
        console.log(response);
    });
    test.get('/comments').then(response => {
        console.log(response.data)
    })
    ```

## 拦截器
    拦截器分为 请求（request）拦截器 和 响应（response）拦截器


- `请求拦截器`会在请求之前调用, 参数是: `成功的回调函数`和`失败的回调函数`
  
  - 成功的回调会收到 `axios的配置对象` 里面可以对配置对象做一些逻辑修改或判断, 然后把配置对象 return 出去进入就进入下一阶段 
  
  - 失败的回调会收到 `error参数`, 一般都会 `return Promise.reject(error)`
  - 请求拦截器的执行顺序是`先进后执行的`
- `响应拦截器`会在响应之后调用, 参数是: `成功的回调函数`和`失败的回调函数`
  - 成功的回调会收到 `axios的默认响应体` 里面把响应体 return 出去进入就进入下一阶段 

  - 失败的回调会收到 `error参数`, 一般都会 `return Promise.reject(error)` 
  
  ```js
    // 设置请求拦截器  
    axios.interceptors.request.use(function (config) { // config就是配置对象
        console.log('请求拦截器 成功 - 1号'); // -----------2
        
        // 修改 config 中的参数
        config.params = {a:100};
    
        // throw '参数出了问题';
        return config;
    }, function (error) { // error 错误对象
        console.log('请求拦截器 失败 - 1号');
        return Promise.reject(error);
    });
    
    axios.interceptors.request.use(function (config) {
        console.log('请求拦截器 成功 - 2号'); // ----------1
    
        //修改 config 中的参数
        config.timeout = 2000;
    
        return config;
    }, function (error) {
        console.log('请求拦截器 失败 - 2号');
        return Promise.reject(error);
    });
    
    // 设置响应拦截器  
    axios.interceptors.response.use(function (response) { // response 就是 axios 返回的默认响应体
        console.log('响应拦截器 成功 1号'); // -----------3
        // 可以直接 return 响应体数据出去 
        return response.data;
        // return response;
    }, function (error) {
        console.log('响应拦截器 失败 1号')
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use(function (response) {
        console.log('响应拦截器 成功 2号') // -------------4
        return response;
    }, function (error) {
        console.log('响应拦截器 失败 2号')
        return Promise.reject(error);
    });
    
    //发送请求
    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts'
    }).then(response => {
        console.log('自定义回调处理成功的结果'); // ---------5
        console.log(response);
    }).catch(err=>{
        console.error(err);
    })
  ```


## 取消请求

- 先定义一个 cancel 变量用于保存取消请求的函数
- 需要在 axios配置对象 中配置 cancelToken 对象, 得到取消请求的函数(赋值给cancel)
- 在特定时机调用 cancel 函数取消请求

```js
//获取按钮
const btns = document.querySelectorAll('button');
// 2.声明全局变量 cancel
let cancel = null;
//发送请求
btns[0].onclick = function(){
    //检测上一次的请求是否已经完成
    if(cancel !== null){
        //取消上一次的请求
        cancel();
    }
    axios({
        method: 'GET',
        url: 'http://localhost:3000/posts',
        // 1. 添加配置对象的属性
        cancelToken: new axios.CancelToken(function(c){
            // 3. 将 c 的值赋值给 cancel
            cancel = c;
        })
    }).then(response => {
        console.log(response);
        // 将 cancel 的值初始化
        cancel = null;
    })
}

//绑定第二个事件取消请求
btns[1].onclick = function(){
    cancel();
}
```



:::