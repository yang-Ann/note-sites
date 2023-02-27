---
title: React-Native
date: 2023-1-28
categories:
 - web开发框架
tags:
 - React
 - React-Native
---

[[toc]]

# React-Native

[React Native](https://reactnative.dev/)

[React-Native(中)](https://reactnative.cn/)

```sh
# 初始化项目
npx react-native init projectName

# ts 模板
npx react-native init projectName --template react-native-template-typescript
```

注意点: 

-   npm报错问题: 

    ```sh
    # 设置淘宝镜像
    npm config set registry https://registry.npm.taobao.org
    npm config set disturl https://npm.taobao.org/dist
    
    npm config edit # 打开配置文件
    # 注意, 需要把配置中的 npmjs 相关配置的都注释掉, 比如:
    # registryhttps://registry.npm.org=true
    # //registry.npmjs.org/:_authToken=xxx
    ```

-   Android Studio 模拟器的API版本需要和`react-native`保持一致

-   android 配置文件: `/android/build.gradle`



