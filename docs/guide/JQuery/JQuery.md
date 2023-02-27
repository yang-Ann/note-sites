---
title: jQuery
date: 2022-3-5
categories:
 - 第三方库
tags:
 - jQuery
---
:::v-pre



# jQuery



[[toc]]


## 入口函数 和 顶级对象

    // 入口函数 在DOM完成加载后, 调用函数类似 window.onload
    $(function(){
        语句...
    });
    
    // 顶级对象
    $ 是jQuery的别称, $同时也是jQuery的 顶级对象相当于元素js中的window

### jQuery对象 和 DOM对象

1. DOM 对象: 用原生js获取过来的对象就是DOM对象

2. jQuery对象: 用jquery方式获取过来的对象是jQuery对象(伪数组)  本质：通过$把DOM元素进行了包装
3. jQuery 对象只能使用 jQuery 方法, DOM 对象则使用原生的 JavaScirpt 属性和方法

4. jQuery对象 和 DOM对象之间是可以相互转换的

    - DOM对象  转换为   jQuery对象 ---> `$(DOM对象)`

    - jQuery对象  转换为    DOM对象  ---> `$(jQuery对象)[索引号]`

## jQuery常用Api

### jQ选择器

1. 常用选择器

        $('css选择器') 相当于原生js的 querySelect
        $(this) 相当于原生js中的this
        $(this).index() 获取当前事件元素的索引号(兄弟关系)
        
        :checked 选择器 查找被选中的表单元素

2. 筛选选择器

        $('li:first') 获取第一个li元素
        $('li:last') 获取最后一个li元素
        $('li:eq(2)') 获取li元素中,索引号为2的元素
        $('li:odd') 获取li元素中,索引号为奇数的元素
        $('li:even') 获取li元素中,索引号为偶数的元素

3. jQuery筛选方法

    | 语法                  | 描述                                                 |
    | --------------------- | ---------------------------------------------------- |
    | parent('css选择器')   | 查找父级 *                                           |
    | parents('css选择器')  | 查找指定祖先元素 *                                   |
    | siblings('css选择器') | 查找兄弟节点,不包括自己本身 *                        |
    | eq(索引)              | 按照索引查找元素 *                                   |
    | children('css选择器') | 相当于s(ul>1i”),最近一级(亲儿子) *                   |
    | find('css选择器')     | 相当于ul li后代选择器 *                              |
    | nextAll('css选择器')  | 查找当前元素之后所有的同辈元素                       |
    | prevtAll('css选择器') | 查找当前元素之前所有的同辈元素                       |
    | hasclass('class类名') | 检查当前的元素是否含有某个特定的类,如果有,则返回true |

### jQ基本方法
    jq方法都会有隐式迭代, 就是会把匹配的所有元素内部进行遍历循环然后执行相应的方法

- jq链式编程

    ```javascript
    $(function(){
        $('ul li').mousemove(function(){
            // 链式编程   我的颜色为红色, 我的兄弟'button' 的颜色为空
            $(this).css('background','red').siblings('button').css('background','');
        });
    });
    ```

### 操作css样式

| 方法                                                         | 描述                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| css('样式', '属性值')                                        | 修改样式(不写属性值就会读取到对应的属性值)              |
| css({'属性名':'属性值','属性名':'属性值','属性名':'属性值'}) | 对象的形式设置多个属性                                  |
| addClass('class')                                          | 添加指定的class类不影响原先的类名                       |
| removeClass('class')                                       | 移除指定的class类不影响原先的类名                       |
| toggleClass('class')                                       | 切换指定的class类不影响原先的类名(有则删除, 没有则添加) |

### jQuery增删改查

- 创建元素

  ```
  const li = $('<li>我是新添加的小li</li>');
  ```

- 添加元素
  - 内部添加(生成以后是父子关系)

      ```
      append()    把内容放到目标元素内部最后面,类似于原生的 appendChild
      prepend()   把内容放到目标元素内部最前面
      ```

  - 外部添加(生成以后是兄弟关系)

      ```
      before()    把内容放到目标元素前面
      after()     把内容放到目标元素后面
      ```

- 删除元素

        remove()    删除匹配的元素(删除自身)
        empty()     删除匹配的元素集合下的所有子节点(删除后代)
        html('')    等价于empty()方法

- `html() ` 

  ```
  相当于原生js中的 innerHTML
  html()          获取元素的内容
  html('内容')     设置元素的内容(可以往里面加字符串标签内容)
  ```

- `text()`

  ```
  相当于原生js中的 innerTEXT
  text()          获取元素的文本内容
  text('内容')    设置元素的文本内容
  ```

- `val()`

  ```
  相当于原生js中的 value
  val()          获取表单元素的内容
  val('内容')    设置表单元素的内容
  ```
  
- 设置或获取元素的指定属性

  ```
  prop("属性名")             获取元素固有的属性值
  
  attr('属性名')             获取元素的自定义属性 
  attr('属性名','属性值)      修改元素的自定义属性 
  
  data('属性名')             向元素附加数据
  data('属性名','属性值)      取回元素的附加数据
  ```

## jQuery效果方法

### 显示隐藏效果

| 方法          | 描述             |
| ------------- | ---------------- |
| show()        | 显示元素         |
| hide()        | 隐藏元素         |
| toggle()      | 切换显示隐藏     |
| slideDown()   | 下滑动动画       |
| slideUp()     | 上滑动动画       |
| slideToggle() | 上下切换滑动动画 |

```
上面的方法都有三个参数(可选)
    speed   参数规定隐藏/显示的速度
    easing  参数规定切换效果
    fn      参数回调函数
```

### 淡入淡出效果

| 方法         | 描述                                                |
| ------------ | --------------------------------------------------- |
| fadeIn()     | 淡入效果                                            |
| fadeOut()    | 淡出效果                                            |
| fadeToggle() | 淡入淡出切换效果(也是有显示隐藏效果一样的三个参数 ) |
| fadeTo()     | 修改透明度 (速度和透明度要必须写)                   |

```
fadeTo() 有四个参数 透明度 速度 动画类型 回调函数(速度和透明度要必须写)
```

### 自定义动画 animate

    用于创建自定义动画的方法(给元素设置)
    语法: 
        DOM.animate({params},[speed],[easing],[callback]);
    
    必需的 params 参数定义形成动画的 CSS 属性 (以对象的形式设置)
    可选的 speed 参数规定效果的时长
    可选的 easing 参数规定效果切换
    可选的 callback 参数是回调函数

- 动画队列

  ```
  jq的动画一旦触发就会执行, 如果多次触发, 就会造成多个动画效果同时执行的问题
  使用.stop()可以停止当前排队的动画(这个方法必须写在动画前面)
  ```

## jQuery尺寸,位置操作

### jQuery尺寸

- `width()` 和 `height()`

  ```
  取得匹配元素宽度和高度值 只算 widyh / heigth
  ```
- `innerWidth()` 和 `innerHeight()`

  ```
  取得匹配元素的宽度和高度值，包括 padding
  ```
- `outerWidth()` 和 `outerHeight()`

  ```
  取得匹配元素宽度和高度值(只读), 包括 padding 和 border
  ```
- `outerWidth(true)` 和 `outerHeight(true)`

  ```
  取得匹配元素宽度和高度值(只读), 包括 padding border 和 margin
  ```

### jQuery 位置

- `offset() `

  ```
  设置或获取元素的偏移值
  返回一个对象是被选元素相对于文档的偏移坐标(top, left), 修改也是通过对象的形式去修改
  ```

- `position() `

  ```
  获取元素的偏移值(只读)
  返回的是被选元素相对于开启了定位的祖先元素的偏移坐标, 同样是一个对象
  ```

- `scrollTop()` 和 `scrollLeft()`

  ```
  设置或获取元素被卷去的头部和左侧(滚动条距离)
  返回的是被选元素被滚动条卷去的top值或者left的值也是对象, 可以修改
  ```


## jQuery事件

### 绑定事件

- 单个事件注册

  ```
  element.事件(function(){....})
  ```

- on()绑定事件

  - 绑定多个事件

    ```
    可以绑定一个或多个事件的事件处理函数, 如果事件处理程序相同则可以使用空格分隔事件类型
    ```

    ```js
    绑定多个事件处理程序用对象的形式
    element.on(evemts,[selector],fn)
    
    有3个参数:
        evemts:一个或多个事件类型用空格分隔
        selector:元素的字元素选择器(可不写)
        fn:回调函数, 即侦听函数
    ```

  - 事件委派

    ```
    可以事件委派, 把原来加给子元素的事件绑定在共同的父元素身上,就是把事件委派给父元素
    ```

    ```js
    element.on(evemts,'子元素',fn)
    
    
    // click 是绑定在 ul 身上的, 但是可以委派给 ul 里面的li
    $('ul').on('click', 'li', function(){
        alert('hello Word');
    });
    ```

  - `one()`

    ```
    也可以绑定事件, 用法和on()一样, 但是它只能触发事件一次
    ```

### 解绑事件 

    off()           括号为空会解绑指定元素的所有事件
    
    off('click')    括号里指定事件类型就会解绑指定的事件类型
    
    ul.off('click', 'li')    解除ul上li的事件

### 自动触发事件

1. `click()`

2. `trigger('click')`

3. `triggerHandler('click') `不会触发元素的默认行为

### 事件对象
    跟原生js用法一模一样
    阻止默认行为: event.preventDefault() 或者 return false
    阻止冒泡行为: event.stopPropagation();

### 事件切换
    element.hover([over],out)
    参数是两个函数
    
    over:鼠标移入元素要触发的函数(相当于mouseente)
    out:鼠标移出元素要触发的函数(相当于mouseleave)

- 事件切换 `hover() ` 如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数


## jQuery的迭代方法

    jQuery隐式迭代是对同一类元素做了相同的操作, 如果想给同一类元素做不同的操作, 就需要用到遍历(迭代)

1. `each()`

        可以遍历元素
        语法:
        	element.each(function(index, demEle) {...})
        
        参数详解:
        	element  jq对象
            index    代表每个元素的索引号, 
            demEle   是获取过来的DOM元素对象

2.  `$.each()`

        用于遍历对象或数组，处理数据
        
        $.each(obj/arr,function(index,item) {...})  
        参数详解:
        obj/arr   被遍历对象或数组
        index     代表每个项的索引或key, 
        item      数组或对象的每一项
    

## jQuery对象拷贝
    将某个对象拷贝给另一个对象使用，可以使用$.extend()
    语法:
    	$.extend([deep,]target,oriObj1[,oriObjN...])
    	
    参数详解:
        deep 默认为false, 表示浅拷贝, 当设置为 true 时表示深拷贝
        target 表示要拷贝的目标对象
        oriObjN 表示待拷贝的对象

### 浅拷贝
    当$.extend方法的 deep 设置为 false, 则表示浅拷贝
    
    浅拷贝如果目标对象里有和被拷贝对象冲突的属性时, 会被被拷贝对象直接覆盖掉
    浅拷贝把原来对象里面的复杂数据的类型内存地址拷贝给目标对象(只拷贝了引用)

### 深拷贝
    当$.extend方法的 deep 设置为 true, 则表示深拷贝,完全克隆
    
    深拷贝把里面的数据完全复制一份给目标对象 如果里面有冲突的属性名但属性值不冲突, 会合并到一起

## jQuery多库共存
    jQuery使用$作为标识符, 随着jQuery的流行, 其他的js库也会使用$作为标识符, 这样一起使用就会引起冲突,
    此时就需要一个解决方案, 让jQuery和其他的js库不冲突, 可以同时存在, 这就叫多库共存
    
    jQuery解决方案:
    
        1.把jQuery库里面的$统一改为jQuery, 比如jQuery('div')
    
        2.jQuery变量规定新的名称, 让 jQuery 释放对 $ 控制权 我们自己决定
            $.noConflict()           const xxx = $.noConflict();
            jQuery.noConflict()      const xxx = jQuery.noConflict();

## jQuery插件

### jQuery插件常用网站:

1. jQuery插件库     https://www.jq22.com/
2. jQuery之家       http://www.htmleaf.com/

### jQuery插件使用步骤:

1. 引入相关文件 (jQquery文件 和 插件文件)
2. 复制相关html css js (调用插件)

-  图片的懒加载

        当我们的页面滑动到可视区域, 再显示图片
        图片使用延迟加载在可提高网页的下载速度, 它也能帮助减轻服务器的负载
        
        当我们使用 jQuery插件库 EasyLazyload, 注意, 此时的js引入文件和调用必须写到DOM元素(图片)最后面

## bootstrap 框架
    使用 bootstrap插件有个要求就是需要使用 container类名的父级包裹


:::