---
title: uniapp
date: 2022-3-5
categories:
 - 小程序
 - web开发框架
tags:
 - 小程序
---
# uniapp

[官网教程](https://ask.dcloud.net.cn/article/35657)

[uni-app](https://uniapp.dcloud.io/) 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台

## 常用功能

- 微信小程序的api只需要将`wx`改成`uni`即可, 其他常见api将[官方api](https://uniapp.dcloud.io/api/)文档

- 生命周期
	- [应用生命周期](https://uniapp.dcloud.io/collocation/App.html)
	
- 常用配置
	- [page.json](https://uniapp.dcloud.io/collocation/pages.html): 页面配置
	- [manifest.json](https://uniapp.dcloud.io/collocation/manifest-app.html): 打包相关配置
	- [uni.scss](https://uniapp.dcloud.io/collocation/uni-scss.html): uniapp内置的scss文件, 该文件自动引入, 如需要使用其他组件的scss样式需在这个文件中引入该组件的scss
	
- 路由与页面跳转
	- [编程跳转](https://uniapp.dcloud.io/api/router.html)
	- [组件跳转](https://uniapp.dcloud.io/component/navigator.html)

- [条件编译](https://uniapp.dcloud.io/tutorial/compiler.html)

  ```
  条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，
  将注释里面的代码编译到不同平台
  ```

- [页面通讯](https://uniapp.dcloud.io/api/window/communication.html#emit)

  ```
  uni是使用全局的自定义事件
  ```

- [easycom](https://uniapp.dcloud.io/collocation/pages.html#easycom)

	```
	组件自动引入
	```

- [subpackages](https://uniapp.dcloud.io/collocation/pages.html#subpackages)

	```
	分包加载配置, 此配置为小程序的分包加载机制
	```

	分包的基本使用: `pages`目录默认为主包, 对应`page.json`中的`pages`属性, 分包就是普通的目录, 这个目录里面放需要分包的页面(组件), 在`page.json`中配置`subPackages`属性即可, 该属性是一个数组(可以有多个分包)存放对象属性, 其中`root`属性对应的是分包的目录名, `pages`属性同主包的`pages`属性一模一样

- uniapp内置vuex

- 获取`openId`

    ```ts
    uni.login({
    	provider: "weixin",
    	success: (wxLoginRes) => {
    		if (wxLoginRes.code) {
    			getOpenid(uni.getSystemInfoSync().appId, "小程序密钥", wxLoginRes.code)
    				.then(openRes => {
    					if (openRes.openid) {
    						console.log("openid: ", openRes.openid);
    					} else {
    						uni.showToast({ title: "openid获取失败", icon: "none" });
    						return Promise.reject("openid获取失败");
    					}
    				}).catch(err => {
    					console.log("err: ", err);
    				});
    		}
    	},
    	fail(err) {
    		console.log("fail: ", err);
    	}
    });
    
    
    export const getOpenid = (
    	appId: string,
    	secret: string,
    	code: string
    ): Promise<{
    	openid: string;
    	session_key: string;
    }> => {
    	return request({
    		url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
    		method: "GET",
    		skipProxy: true
    	});
    };
    ```

    

- 生成Android证书相关命令:

  ```sh
  # 查看 xxx 证书的信息
  keytool -list -v -keystore [文件名].keystore
  
  # 证书生成
  keytool -genkey -alias [别名] -keyalg RSA -keysize 2048 -validity 36500 -keystore [文件名].keystore
  ```


