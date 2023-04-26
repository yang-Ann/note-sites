---
title: React-Native
date: 2023-1-28
categories:
 - 混合开发
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

## 核心组件

[核心组件和API](https://reactnative.cn/docs/next/components-and-apis)

-   文本必须放到[`Text`](https://reactnative.cn/docs/next/text)组件中, 相当于是WEB里的`span`

-   文本输入使用[`TextInput`](https://reactnative.cn/docs/next/textinput)([`secureTextEntry`](https://reactnative.cn/docs/next/textinput#securetextentry)属性设置是否隐藏输入内容)

-   布局使用[`View`](https://reactnative.cn/docs/next/view)组件, 相当于是WEB里的`div`

-   图片使用[`Image`](https://reactnative.cn/docs/next/image)组件, `resizeMode`属性设置填充模式

-   [`ScrollView`](https://reactnative.cn/docs/next/using-a-scrollview)元素用于滚动视图

-   [长列表](https://reactnative.cn/docs/next/using-a-listview)使用[`FlatList`](https://reactnative.cn/docs/next/flatlist)和[`SectionList`](https://reactnative.cn/docs/next/sectionlist)

-   loading使用[`ActivityIndicator`](https://reactnative.cn/docs/next/activityindicator)组件

-   组件的点击事件不能只能绑定给`View`组件, 要使任何元素触发触摸/单击事件, 必须使用[`TouchableOpacity`](https://reactnative.cn/docs/next/touchableopacity), [`TouchableWithoutFeedback`](https://reactnative.cn/docs/next/touchablewithoutfeedback), [`TouchableNativeFeedback`](https://reactnative.cn/docs/touchablenativefeedback#background)或[`TouchableHighlight`](https://reactnative.cn/docs/next/touchablehighlight)其中一个组件, 进行包裹(点击时会有对应的触摸反馈), 然后绑定`onPress`事件即可:

    ```tsx
    import { View, Text, TouchableOpacity } from "react-native";
    <TouchableOpacity onPress={() => console.log("onPress")}>
      <View>View</View>
      <Text>Text</Text>
    </TouchableOpacity>
    ```

## 样式

定义样式只能使用内联样式`style`, 可以直接写到内联或者使用`StyleSheet.create()`去创建

```tsx
import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Button } from "react-native";

const CompNamp = () => {

  const [count, setCount] = useState(0);

  return (
    <ScrollView>
      <View>
        <Text style={styles.highlight}>count: {count}</Text>
        <Button title="加1" onPress={() => setCount(count + 1)}></Button>
        <Button title="减1" onPress={() => setCount(count - 1)}></Button>
      </View>
    </ScrollView>
  );
};

// 声明样式
const styles = StyleSheet.create({
  highlight: {
    fontWeight: "700",
    color: "red",
    backgroundColor: "blue",
    textAlign: "center",
  }
});

export default CompNamp;
```

### 不支持简写

React Native中是只行实现了一个比较小的CSS的, 里面不支持WEB里面属性简写的用法, 除了`flex: 1`是支持的, 其他比如: `padding: 10px`, `margin: 10px`都是不支持的

## 高度和宽度

React Native中的尺寸都是无单位的, 表示的是与设备像素密度无关的逻辑像素点, 如果是需要百分比可以使用字符串, 比如`"100%"`

```tsx
const styles = StyleSheet.create({
  box: {
    width: 20, // 这个 20 的大小, 是会根据设备的逻辑像素点
    height: "50%" // 这个表示高度占父容器的 50%
  }
});
```

### 弹性(Flex)宽高

在React Native中可以使用`flex`布局来让**子组件**动态地扩张或收缩, 一般而言我们会使用`flex: 1`来指定某个组件扩张以撑满所有剩余的空间, 子组件也可以指定`flex: n`来根据比例的平分**父容器**的大小

## 布局

React Native 只提供了[FlexBox](https://reactnative.cn/docs/next/flexbox)布局, **不支持浮动, 网格布局**, 定位只支持绝对定位和相对定位

>   React Native 中的 Flexbox 的工作原理和 WEB上的 CSS 基本一致，当然也存在少许差异。首先是默认值不同：`flexDirection`的默认值为`column`(而不是`row`)，`alignContent`默认值为 `flex-start`(而不是 `stretch`), `flexShrink` 默认值为`0` (而不是`1`), 而`flex`只能指定一个数字值

## 调试

启动项目后会出现一个cmd窗口, 如下: 

![image-20230311162500424](./images/image-20230311162500424.png) 

-   输入`r`重新加载app
-   输入`d`会在手机或者模拟器上面打开开发菜单, 选择`Debugging`则可以打开一个chrome浏览器, 使用这个浏览器的控制台可以进行查看和调试的log, 但是不能查看网络请求
-   输入`i`运行到IOS
-   输入`a`运行到Android

>   使用 Chrome 调试目前无法观测到 React Native 中的网络请求, 推荐使用[flipper](https://fbflipper.com/)或者使用第三方的[react-native-debugger](https://github.com/jhen0409/react-native-debugger)

## flipper

[flipper](https://fbflipper.com/)是官方的移动端调试工具, 可以查看网络请求, reducx, sqlint数据库, Shared Preferences很强大

## 网络请求

[网络请求](https://reactnative.cn/docs/next/network)

React Native内置提供了和WEB一模一样的[Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)标准, React Native同样也内置支持[AJAX](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)(XMLHttpRequest)所以可以直接使用如[`axios`](https://axios-http.com/zh/docs/intro)等一些第三方封装AJAX的库

## 权限操作

[PermissionsAndroid](https://reactnative.cn/docs/permissionsandroid)

```ts
import { PermissionsAndroid, Linking, ToastAndroid } from "react-native";
import type { Permission } from "react-native";

// 获取权限封装
const getPermissions = async (per: Permission, msg = "请设置权限") => {
  // 判断是否有权限
  const isFlog = await PermissionsAndroid.check(per);
  if (!isFlog) {
    const res = await PermissionsAndroid.request(per);
    // 没有权限直接跳转到应用设置界面
    if ([PermissionsAndroid.RESULTS.DENIED, PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN].includes(res)) {
      ToastAndroid.show(msg, ToastAndroid.LONG);
      await Linking.openSettings();
    }
  }
};
```

## 常用API

[所有的API](https://reactnative.cn/docs/accessibilityinfo)

-   获取设备屏幕的尺寸

    ```ts
    import { Dimensions } from 'react-native';
    
    const dimensions = Dimensions.get('window');
    const window = Dimensions.get("window");
    console.log("window: ", window);
    /* 结果类似
    {
      "width": 411.42857142857144,
      "height": 683.4285714285714,
      "scale": 3.5,
      "fontScale": 1
    }
    */
    ```

-   原生toast: 使用`ToastAndroid`模块即可

-   动画: 使用`Animated`即可

-   自定义后退逻辑使用`BackHandler`模块:

    ```ts
    import { BackHandler, ToastAndroid } from "react-native";
    
    let clickExitDelay = Date.now();
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (Date.now() - clickExitDelay < 2000) {
        // 退出
        return false;
      } else {
        clickExitDelay = Date.now();
        // TODO Toast 无法隐藏, 会导致应用已经退出了, Toast 还存在一段时间
        ToastAndroid.show("再按一次退出", ToastAndroid.SHORT);
        return true;
      }
    });
    ```

-   打开一个抽屉页面使用`DrawerLayoutAndroid`组件

-   状态栏操作使用`StatusBar`组件

-   安全区域使用`SafeAreaView`组件

## 第三方库

汇总的第三方库可以从[awesome-react-native](https://www.awesome-react-native.com/)这个仓库获取, 下面是一些常用的库: 

| 名称         | 说明                                      |
| ------------ | ----------------------------------------- |
| 组件库       | react-native-paper                        |
| 图标库       | react-native-vector-icons                 |
| 导航         | React-Navigation                          |
| SQLine       | react-native-sqlite-storage               |
| 文件操作     | react-native-fs                           |
| 文件上传下载 | rn-fetch-blob                             |
| 设备信息     | react-native-device-info                  |
| 本地存储     | @react-native-async-storage/async-storage |
| 截图操作     | react-native-view-shot                    |
| 视频播放     | react-native-video                        |
| 图库控制     | react-native-cameraroll                   |

## 原生模块

[原生模块](https://reactnative.cn/docs/next/native-modules-android)

### 上下文获取

Android中的上下文可以直接通过`this`或者是`类名.this`而在React Native中是通过`getReactApplicationContext().getBaseContext()`获取的, 比如: 启动一个toast

```java
Context context = getReactApplicationContext().getBaseContext();
Toast.makeText(context, "hello world", Toast.LENGTH_SHORT).show();
```

如果是在一个`ReactContextBaseJavaModule`里面可以直接如下获取： 

```java
Context context = getCurrentActivity().getApplication().getApplicationContext();
```

如果是获取`ReactApplicationContext`则可以在`ReactContextBaseJavaModule`里的构造函数中获取： 

```java
public class Module extends ReactContextBaseJavaModule {
  
  	public static ReactApplicationContext ctx;

    public Module(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
      
        // 保存上下文的引用
        ctx = getReactApplicationContext();
    }
}
```

### 与原生端通信

#### 通过原生 Module 进行交互

分如下三步:

1.   原生端定义一个 Module 类实现`ReactContextBaseJavaModule`类, 如下: 

```java
// android/app/src/main/java/com/[项目名]/modules/Module.java

package com.rn_todo.modules; // 对应项目的包名

import android.content.Context;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nonnull;

// 这个类必须实现 ReactContextBaseJavaModule
public class Module extends ReactContextBaseJavaModule {

    public Module(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        // 暴露给RN的模块名, 在JS端通过 NativeModules.Module 即可访问到本模块
        return "Module";
    }

    //////////////////// 上面是固定写法
    private Toast mToast;

    @Nullable
    @Override
    // 当前模块还可以预定义一些常量值(可以给到JS端使用)
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("KEY", "Module 模块常量");
        return constants;
    }

    // Toast 封装
    // 添加 @ReactMethod 注解, 然后方法的返回值必须是 void 才可以给到 JS端 使用(静态方法也可以)
    @ReactMethod
    public void showToast(String msg) {
        if (mToast == null) {
            // 注意这里的上下文的获取和原生Android是不一样的
            Context context = getReactApplicationContext().getBaseContext();
            mToast = Toast.makeText(context, msg, Toast.LENGTH_SHORT);
        } else {
            mToast.setText(msg);
        }
        mToast.show();
    }
}
```

2.   创建自定义 Package 类(实现`ReactPackage`接口)注册上面定义的 Module类, 如下:

```java
// android/app/src/main/java/com/[项目名]/modules/Module.java

package com.rn_todo.reactPackages;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rn_todo.modules.Module;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 实现 ReactPackage 接口
public class MyReactPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        // 将新建的 module 实例加入到 List 中完成注册
        modules.add(new Module(reactApplicationContext));
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
```

3.   将自定义的 Package 注册到`MainApplication.java`, 如下:

```java
package com.rn_todo; // 包名需要改
import com.rn_todo.reactPackages.MyReactPackage; // 对应的 Package 类

// ...

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // 将自定义的 Package 类进行注册
          packages.add(new MyReactPackage());
          return packages;
        }

        // ...
      };

  // ...
}
```

4.   React Native端使用`NativeModules`模块即可获取到原生端的模块, 如下: 

```tsx
import { useEffect } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View, NativeModules } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button } from "@rneui/base";

import Test from "./test";

// 此处引用的自定义 Module 名必须与自定义 Module 中 getName() 方法返回的字符串一致
const Module = NativeModules.Module;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  useEffect(() => {
    // 查看 Module 里面的值
    console.log("Module: ", Module);
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={backgroundStyle}>
          <Text>App</Text>
          <Button title="调用原生端方法" onPress={() => {
            // 可以直接调用原生端的方法
            Module.showToast("React 前端触发的 Toast");
          }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
```

参数类型对应如下: 

| JavaScript | Java                                                 |
| ---------- | ---------------------------------------------------- |
| Bool       | Boolean                                              |
| Number     | Integer                                              |
| Number     | Double                                               |
| Number     | Float                                                |
| String     | String                                               |
| Function   | Callback                                             |
| Object     | ReadableMap, 可以通过`Arguments.createMap()`获得     |
| Array      | ReadableArray, 可以通过`Arguments.createArray()`获得 |

##### 原生端通过 Callback 回调函数返回数据给 JS 端

因为`@ReactMethod`注解的要求必须是`public void`的所以是不能有返回值, 如果需要原生端处理结果后返回对应的值给JS端则需要传递回调函数作为参数给到原生端, 如下:

```java
// 导入对应的类
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;

// ...

@ReactMethod
public void AndroidCallbackFunc(String str, Callback success, Callback error) {
    Toast.makeText(getReactApplicationContext().getBaseContext(),
            "AndroidCallbackFunc 的参数是: " + str,Toast.LENGTH_SHORT).show();

    if (str.equals("")) {
        // 回调失败, 返回错误信息
        error.invoke("不能传递空字符串哦");
    } else {
        // 回调成功, 返回结果信息
        success.invoke(str.length(), "这是从原生返回数据");
      
      	// 可以回调对象
      	WritableMap map = Arguments.createMap();
        map.putInt("age", 18);
        map.putString("name", "张三");
        success.invoke(map);

      	// 也可以回调数组
        WritableArray array = Arguments.createArray();
        array.pushInt(18);
        array.pushString("hello");
      	success.invoke(array);
    }
}
```

JS端在调用方法时, 传递对应的回调函数即可如下:

```tsx
// 参数必须要和原生端一一对应
Module.AndroidCallbackFunc(
  "hello world", 
  (len: number, str: string) => {
    console.log("JS端回调成功: ", len, str);
  },
  (msg: string) => {
    console.log("JS端回调失败: ", msg);
  }
);
```

##### 原生端通过 Promise 函数返回数据给 JS 端

原生端除了可以使用回调函数的形式返回数据, 也可以使用Promise函数进行回调如下: 

```java
// 导入对应的类
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;

// ...

@ReactMethod
public void AndroidPromiseFunc(String str, Promise promise) {
    Toast.makeText(getReactApplicationContext().getBaseContext(),
            "AndroidPromiseFunc 的参数是: " + str,Toast.LENGTH_SHORT).show();

    if (str.equals("")) {
        // 失败回调
        promise.reject("不能传递空字符串哦");
    } else {
        // 成功回调
        promise.resolve("这是从原生返回数据");
      
      	// 可以回调对象
      	WritableMap map = Arguments.createMap();
        map.putInt("age", 18);
        map.putString("name", "张三");
        promise.resolve(map);

      	// 也可以回调数组
        WritableArray array = Arguments.createArray();
        array.pushInt(18);
        array.pushString("hello");
      	promise.resolve(array);
    }
}
```

JS端在调用方法时可以直接使用`then/catch`或者`async`+`await`, 如下: 

```tsx
Module.AndroidPromiseFunc("hello world")
  .then((res: string) => {
    console.log("JS端Promise成功: ", res);
  }).catch((err: string) => {
    console.log("JS端Promise失败: ", err);
  }).finally(() => {
    console.log("finally");
  });
```

#### 通过自定义事件进行交互

在原生端通过 `RCTDeviceEventEmitter` 即可发送事件, 如下是一个简单的封装: 

```java
package com.rn_pda.utils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;


// 原生端 和 RN 之间的事件通信
public class Event {
    //定义向 RN 发送事件的函数
    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    // 发送消息
    // eventName 事件名
    // event 事件对象, 使用Arguments.createMap() 创建, 使用putxxx 添加对应的数据
     public static void emit(ReactContext reactContext, String eventName, WritableMap event) {
         sendEvent(reactContext, eventName, event);
     }
}
```

原生端发送消息操作如下: 

```java
import com.facebook.react.bridge.WritableMap;
import com.rn_pda.utils.Event; // 这里导入封装的类

// 新增事件对象
WritableMap event = Arguments.createMap();
event.putString("数据", msg);
// 发送给事件JS端
Event.emit(getReactApplicationContext(), "事件名称", event);
```

>   原生端可以在任何时候发送事件, 只要能获取到 `ReactContext` 上下文对象(`getReactApplicationContext()`)

在JS端注册监听器, 并在合适的时机移除监听器如下: 

```TSX
import { useEffect } from "react";
import { DeviceEventEmitter, EmitterSubscription } from "react-native";

// JAVA端事件监听实例
let scanLinstener: EmitterSubscription;

useEffect(() => {
  // 监听事件, 事件名必须对应 JAVA端的事件名
  scanLinstener = DeviceEventEmitter.addListener("事件名", (msg: any) => {
    console.log("事件名 data: ", msg);
  });

  () => {
    // 停止监听
    if (scanLinstener) scanLinstener.remove();
  };
}, []);
```

>   注意: `RCTDeviceEventEmitter`这种方式通信在IOS端是不行的, 还需要添加一个自定义的 Module, 见[这里](https://juejin.cn/post/6844903866341801998#heading-20)

### 与原生UI交互

通过自定义 `Module` 进行交互可以解决大部分开发需求, 有的时候，基于性能和开发工作量的角度考虑，我们可以将原生的组件或布局封装好，并为这个原生 `View` 建立一个继承自 `SimpleViewManager` 或 `ViewGroupManager` 的 `ViewManager` 类。通过这个 `ViewManager` 可以注册一系列原生端和 JS 端的参数及事件映射，达到交互的目的

#### 创建原生View

以封装一个简单的`Button`为例, 如下: 

```java
package com.szzc_pda.ui.NaiveButton;

import android.content.Context;

// 封装原生按钮供JS端使用
public class NaiveButton extends androidx.appcompat.widget.AppCompatButton {
    public NaiveButton(Context context) {
        super(context);
    }
}
```

#### 创建对应的ViewManager类

简单的 `View` 可以创建 `ViewManager` 类继承 `SimpleViewManager` ，而通过布局生成的复杂 `View` 可以继承自 `ViewGroupManager` 类:

```java
// ... 省略导入

// 创建对应的 SimpleViewManager 子类
public class NativeButtonSimpleViewManager extends SimpleViewManager<NaiveButton> {
    static NaiveButton mBtn;

    @NonNull
    @Override
    public String getName() {
        return "NativeButton"; // 此处的名称对应 JS 的引用, 通过 requireNativeComponent("xxx"); 获取对应的组件
    }

    // 创建 view 实例
    @NonNull
    @Override
    protected NaiveButton createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        mBtn = new NaiveButton(themedReactContext);
        return mBtn;
    }
}
```

#### 注册ViewManager类

在上面的[与原生端通信](# 与原生端通信)中, 在`reactPackages`类中使用了`createNativeModules()`方法里注册 `Module` 的, 注册原生端则需要在`createViewManagers()`方法中注册刚刚创建的`NaiveButton`实例：

```java
package com.szzc_pda.reactPackages;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import com.szzc_pda.modules.Module;
import com.szzc_pda.ui.NaiveButton.NativeButtonSimpleViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class MyReactPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        // 将新建的 module 实例加入到 List 中完成注册
        modules.add(new Module(reactContext));
        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        // 创建 NativeButtonSimpleViewManager 实例并注册到 ViewManager List 中
        views.add(new NativeButtonSimpleViewManager());
        return views;
    }
}
```

#### 在JS端使用组件

通过`requireNativeComponent<T>("组件名称")`即可解析出原生端注册的组件(注意名称一定要对应元素端`getName()`返回的名称): 

```tsx
import { requireNativeComponent } from "react-native";

// 解析组件
const NativeButton = requireNativeComponent<{}>("NativeButton");
```

#### 原生端通过@ReactProps接收JS端传递的组件值

原生端通过`@ReactProps`注解即可接收JS端传递的组件值

```java
public class MyReactPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        // 将新建的 module 实例加入到 List 中完成注册
        modules.add(new Module(reactContext));
        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        List<ViewManager> views = new ArrayList<>();
        // 创建 NativeButtonSimpleViewManager 实例并注册到 ViewManager List 中
        views.add(new NativeButtonSimpleViewManager());
        return views;
    }

    // 暴露给 JS 的参数(text="xxx"), 给定值以后触发这个方法就可以设置按钮的文本了
    @ReactProp(name = "text")
    public void setText(NaiveButton view, String text) {
        view.setText(text);
    }
}
```

JS端可以正常的传递值

```jsx
import { requireNativeComponent } from "react-native";

// 原生UI控件接收值类型
export type NativeButtonProps = {
  text: string; // 按钮文本
};

// 解析组件
const NativeButton = requireNativeComponent<NativeButtonProps>("NativeButton");

// 页面使用
<NativeButton text="按钮文本" />
```

>   JS端传递给原生端的数据, 如上面的`text`如果在运行时改变了, 原生端同样会触发**更新**

#### 原生端通过注册事件与 JS 端的映射与 JS 端使用

```java
public class NativeButtonSimpleViewManager extends SimpleViewManager<NaiveButton> {
    static NaiveButton mBtn;
    private String btnText;

    @NonNull
    @Override
    public String getName() {
        return "NativeButton";
    }

    // 创建 view 实例
    @SuppressLint("ClickableViewAccessibility") // 触摸和监听同时监听
    @NonNull
    @Override
    protected NaiveButton createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        mBtn = new NaiveButton(themedReactContext);

        // 触摸事件
        mBtn.setOnTouchListener((view, event) -> {
            int iAction = event.getAction();
            // 事件对象(可以传递数据)
            WritableMap map = Arguments.createMap();
            if (iAction == MotionEvent.ACTION_DOWN) { // 按下
                map.putString("msg", "原生按下事件");
                // 与下面注册的要发送的事件名称必须相同
                themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mBtn.getId(), "onNativeMousedown", map);
                mBtn.setText("按下了");
            } else if (iAction == MotionEvent.ACTION_UP) { // 弹起
                map.putString("msg", "原生弹起事件");
                // 与下面注册的要发送的事件名称必须相同
                themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mBtn.getId(), "onNativeMouseup", map);
                mBtn.setText("弹起了");
            }
            return false; // false 表示系统会继续处理, true 取消冒泡
        });

        // 绑定点击事件
        mBtn.setOnClickListener(view -> {
            WritableMap map = Arguments.createMap();
            map.putString("msg", "原生click事件");
            // 与下面注册的要发送的事件名称必须相同
            themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mBtn.getId(),"onNativeClick", map);
        });
        return mBtn;
    }

    public Map getExportedCustomDirectEventTypeConstants() {
        // onNativeClick 是原生要发送的 event 名称, onReactClick 是 JS 端组件中注册的属性方法名称, 中间的 registrationName 不可更改
        Map<String, Map<String, String>> map = MapBuilder.of();
        map.put("onNativeClick", MapBuilder.of("registrationName", "onReactClick"));
        map.put("onNativeMousedown", MapBuilder.of("registrationName", "onNativeMousedown"));
        map.put("onNativeMouseup", MapBuilder.of("registrationName", "onNativeMouseup"));
        return map;
    }
}
```

##### JS端就可以直接监听对应的事件

```tsx
import { requireNativeComponent } from "react-native";

// 原生UI控件接收值类型
export type NativeButtonProps = {
  text: string; // 按钮文本
  onReactClick?: (event: any) => void; // 原生点击事件
  onNativeMousedown?: (event: any) => void; // 原生按下事件
  onNativeMouseup?: (event: any) => void; // 原生弹起事件
};

// 解析组件
const NativeButton = requireNativeComponent<NativeButtonProps>("NativeButton");

// 页面使用
<NativeButton
  text="按钮文本"
  onReactClick={data => {
    console.log("点击事件: ", data, data.nativeEvent);
  }}
  onNativeMousedown={data => {
    console.log("按下事件: ", data, data.nativeEvent);
  }}
  onNativeMouseup={data => {
    console.log("弹起事件: ", data, data.nativeEvent);
  }}
/>
```

## 环境或构建问题

[maven](https://mvnrepository.com/)仓库很慢, 可以使用[阿里云镜像](https://developer.aliyun.com/mvn/guide)

### gradle下载很慢

gradle下载依赖很慢, 可以配置国内镜像, 

#### 全局配置

新建`[user]/.gradle/init.gradle`文件, 如下:

```groovy
allprojects{
    repositories {
        def ALIYUN_REPOSITORY_URL = 'https://maven.aliyun.com/repository/public'
        def ALIYUN_JCENTER_URL = 'https://maven.aliyun.com/repository/public'
        def ALIYUN_GOOGLE_URL = 'https://maven.aliyun.com/repository/google'
        def ALIYUN_GRADLE_PLUGIN_URL = 'https://maven.aliyun.com/repository/gradle-plugin'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_REPOSITORY_URL."
                    remove repo
                }
                if (url.startsWith('https://jcenter.bintray.com/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_JCENTER_URL."
                    remove repo
                }
                if (url.startsWith('https://dl.google.com/dl/android/maven2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GOOGLE_URL."
                    remove repo
                }
                if (url.startsWith('https://plugins.gradle.org/m2/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_GRADLE_PLUGIN_URL."
                    remove repo
                }
            }
        }
        maven { url ALIYUN_REPOSITORY_URL }
        maven { url ALIYUN_JCENTER_URL }
        maven { url ALIYUN_GOOGLE_URL }
        maven { url ALIYUN_GRADLE_PLUGIN_URL }
    }
}
```

#### 项目内配置

修改项目中的`build.gradle`文件

```groovy
buildscript {
    repositories {
        maven{ url 'https://maven.aliyun.com/repository/public'}
        maven{ url 'https://maven.aliyun.com/repository/google'}
    }
}

allprojects {
    repositories {
        maven{ url 'https://maven.aliyun.com/repository/public'}
        maven{ url 'https://maven.aliyun.com/repository/google'}
    }
}
```

### kotlin-compiler-embeddable 下载很慢

自己手动下载[kotlin-compiler-embeddable](https://repo1.maven.org/maven2/org/jetbrains/kotlin/kotlin-compiler-embeddable)然后放到`[user]/.gradle/caches/modules-2/files-2.1/org.jetbrains.kotlin/kotlin-compiler-embeddable/[版本号]/[pom.sha1文件内容]`下面
