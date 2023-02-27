---
title: Vue2
date: 2022-3-14
categories:
 - web开发框架
tags:
 - Vue
---
:::v-pre

# Vue2



[[toc]]

## 初识vue
  - 想让 Vue 工作, 必须先创建一个 Vue 实例, 且要传入一个配置对象
    ```html
    <div id="app">{{message}}</div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    </script> 
    ```

  - root 容器里的代码依然符合`html 规范`, 只不过混入了一些特殊的 Vue 语法
    - 指定`el`的元素就是 root 容器
  - root 容器里的代码被称为 `Vue模板`
  - Vue 实例和容器是一 一对应的
  - `{{xxx}}` 中的xxx要写 `JS表达式`, 且xxx可以自动读取到 data 里中的所有属性
  - 一旦 data 中的数据发生改变, 那么页面中用到该数据的地方也会自动更新

```
  注意区分 JS表达式 和 JS代码(语句)
      1.表达式: 一个表达式会产生一个值, 可以放在任何一个需要值的地方:
          (1). a
          (2). a+b
          (3). demo(1)
          (4). x === y ? teue : false

      2.JS代码(语句)
          (1). if(){}
          (2). for(){}
```

### 模板语法
- 插值语法:
    - 功能: 用于**解析(绑定)标签体内容**
    - 写法: `{{xxx}}`, `xxx是JS表达式`, 且可以直接读取到 data 中有属性
- 指令语法:
    - 功能: 用于**解析标签(包括: 标签属性 标签体内容 绑定事件)**
    - 举例:`v-bind:href="xxx"` 或 简写为 `:href="xxx"`, `xxx`同样要写 `JS表达式`, 且可以直接读取到 data 中的所有属性.
    - 备注: Vue中有很多的指令, 且形式都是: `v-???`, 此处拿`v-bind`举例


### data 与 el 的2种写法
  - `el` 的2种写法:
    - `new Vue`的时候配置 el 属性
    - 先创建 Vue实例, 随后通过`$mount('css选择器')` 指定 `el`
  - `data` 的2种写法:
    - `对象式`
    - `函数式`
    - **需要封装成组件时, data 必须使用函数式定义, 否则就会报错**
  - 一个重要的原则:
    - **由 Vue管理大部分的函数, 一定一定不要写箭头函数, 写了箭头函数, this就不再是 Vue实例**


## MVVM模型
  - M:  模型(Model): 数据模型, 就是 `data` 中的数据

  - V:  视图(View): 组件视图，负责将数据模型转化成UI展现出来, 就是模板代码 `el`

  - VM: 视图模型(ViewModel): 是一个同步 View 和 Model 的对象（双向绑定）, 就是`Vue实例`
    - `data` 里的`所有的属性`, 最后都出现在vm上(Vue实例)
    
    - `vm上所有的属性`, 以及`Vue原型上所有的属性`, 在`Vue模板`中都可以直接使用
    
  - 在MVVM中, `View`和`Model`之间并没有直接的联系，而是通过`ViewModel`进行交互

  - `Model`和`ViewModel`之间的交互是双向的，因此 通过视图操作数据，也能通过数据操作视图

    > [渲染函数 & JSX](https://cn.vuejs.org/v2/guide/render-function.html)

## 数据代理

通过一个对象代理对另一个对象中的属性操作(读/写)

  ```js
   // 模拟vue2 的响应式
   // 源数据
   const person = {
       name: '张三',
       age: 18
   }
   // 代理对象
   const p = {};    
   // 可以使用循环添加属性更加的便捷...  
   Object.defineProperty(p, 'name', {
       // 读取时调用
       get(){
           return person.name
       },
       // 设置时调用 参数就是修改的值 
       set(val){
           console.log('有人修改了name属性, 我要去更新页面....');
           person.name = val;
       }
   })
   Object.defineProperty(p, 'age', {
       get(){
           return person.age
       },
       set(val){
           console.log('有人修改了age属性, 我要去更新页面....');
           person.age = val;
       }
   })
  ```
### Vue中的数据代理:
  通过 Vue实例对象来处理 data对象中属性的操作(读/写)
  可以更加方便的操作`data`中的数据
  - 基本原理:
    - 通过`Object.defineProperty()`把data对象中所有属性添加到`Vue实例`上
    - 为每一个添加到 Vue实例的属性, 都指定一个 `getter/setter`
    - 在添加 getter/setter 内部去操作(读/写)data中对应的属性

## [事件基本使用](https://cn.vuejs.org/v2/guide/events.html)

  - 使用`v-on:xxx`或`@xxx`绑定事件, 其中 xxx 是事件名
  - 事件的回调需要配置在`methods对象`中, 最终会在 Vue实例上
  - methods中配置的函数, `不要用箭头函数`, 否则this就不是 Vue实例
   
  - `methods`中配置的函数, 都是被 Vue所管理的函数, this的指向是 Vue实例 或 组件实例对象
  - `@click="demo"`和`@click="demo($event)"`在事件回调中加不加括号效果一样, 但后者可以传参 ($event是事件对象占位符)

### [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

  - `prevent`: 阻止默认事件(常用)
  - `stop`: 阻止事件冒泡(常用)
  - `once`: 事件只触发一次(常用)
  - `capture`: 使用事件的捕获模式
  - `self`: 只有`event.target`是当前操作的元素时才触发事件
  - `passive`: 事件的默认行为立即执行, 无需等待事件回调执行完毕
  - 使用方式:   `@click.stop="xxx"` `@click.stop.once.capture="xxx"` `@click.prevent`

  - Vue中的`键盘事件`
      - Vue中常用的按键别名:
        - 回车 => enter
        - 删除 => delete (捕获"删除"和"退格"键)
        - 退出 => esc
        - 空格 => space
        - 换行 => tab (`特殊, 必须配合 keydown 去使用`)
        - 上  => up
        - 下  => down
        - 左  => left
        - 右  => right         
      - Vue未提供别名的按键, 可以使用原生按键的`event.key`值去得到并绑定给事件, 但注意要**转为小写并且短横线命名**, 如: kebab-case caps-lock
      - `系统修饰键(用法特殊)`: `ctrl` `alt` `shift` `meta`(`windows键`)
        - 配合 `keyup` 使用: 按下修饰键的同时, 再按下其他键, 随后释放其他键, 事件才被触发
        - 配合 `keydown` 使用: 正常触发事件
        - 可以连着写`ctrl.y` `alt.y`
        
      - 也可以使用 `keyCode` 去指定具体的按键(`不推荐`)

      - `Vue.config.KeyCodes.自定义键名 = 键码`, 可以去定制按键别名
        - `Vue.config.keyCodes.huiche = 13`

      - 举例使用: `@keydown.huiche="xxx"` `@keydown.enter="xxx"` `@keydown.13="xxx"`


## 计算属性 computed
  - 定义: 计算属性需要配置在`computed对象`里配置, 要用的属性不存在, 通过已有的属性计算(加工)得来
  - 原理: 底层借助了 `Object.defineproperty` 提供的 getter 和 setter 
  - `get函数`什么时候执行?
      - 初次读取时会执行一次
      - 当依赖的数据`发生改变`时会被再次调用
  - 优势: 与`methods`实现相比, **内部有缓存机制(复用), 效率更高, 调试方便**
  - 备注:
      - 计算属性最终会出现在 Vue实例上, 直接`读写使用`即可
      - 如果计算属性要被修改, **就必须写 set函数 去响应修改**, 且 set 中要引起计算时所依赖的数据发生改变

        ```js
        ... 略
        computed: {
          // 完整写法
          fullName: {
                get(){
                  // 当有人读取 fullName 时, get就会被调用, 且返回值就作为 fullName 的值
                  // 1.初次读取 fullName时调用get  2.所依赖的数据发生变化时调用get
                  console.log("get被调用了");
                  return this.firstName + '-'+this.lastName; //此处的 this 是 Vue实例
                },
                set(value){
                  // 当 fullName 被修改时被调用set
                  console.log('set', value);
                  const arr = value.split('-');
                  this.firstName = arr[0];
                  this.lastName = arr[1];
                }
            }
                                                       
          // 简写写法
          // 只考虑读取不考虑修改才可以使用简写方式
          // fullName: function(){
          fullName(){
              console.log('get被调用了');
              return this.firstName + '-' + this.lastName;
          }
        }
        ```



## [watch](https://cn.vuejs.org/v2/api/#watch)

  - 当被监视的属性变化时, **回调函数 handler 会自动调用**, 进行相关操作
  - 监视的属性`必须存在`, 才能进行监视(监视不存在的值也不会报错)
  - 监视的两种写法:
    - `new Vue`时传入`watch`配置

        ```js
        ...
        watch:{
          // 监视的属性名 isHot
          isHot:{
              immediate: true, // 初始化时 handler 会调用一次
                                                                                                                       
              // handler会在 isHot 属性发生改变时调用
              handler(newValue, oldValue){ // 参数就是 新值 和 旧值
                  console.log(newValue, oldValue);
                  console.log('isHot 被修改了');
              }
          }
        }
        ```
    - 通过`Vue实例.$watch`监视, 用法一模一样
      ```js
      vm.$watch('isHot', {
        immediate: true,
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
          console.log('isHot 被修改了');
          }
        })
      ```

### 深度监视
  - Vue中的`watch`**默认不监视对象**内部值的改变(一层)
  - 配置`deep:true`可以监视对象内部值的改变(多层)
  - 备注:
    - Vue自身可以监视对象内部值的改变, 但Vue提供的`watch默认不监视`
    - 使用`watch`时根据数据的具体结构, 决定是否采用深度监视
    
  - ```js
    watch:{
      // 监视多级结构中某个属性的变化
      'numbers.a':{
        handler(){
          console.log('numbers里的a被修改了');
        }
      },
      numbers:{
        // 开启深度监视, 监视多级结构中所有属性的变化
        deep: true, 
        handler(){
            console.log('numbers改变了');
        }
      }
    }
    ```

### 监视属性简写
  - 简写写法, 配置项只有一个`handler`时可以简写

     ```js
      // 别用箭头函数
      isHot(newValue, oldValue){
          console.log('isHot 被修改了',newValue, oldValue);
      }
      // ----------
      vm.$watch('isHot',function(newValue, oldValue){ 
          console.log('isHot 被修改了',newValue, oldValue);
      });
     ```

### computed 和 watch 之间的区别:
  - `computed`能完成的功能,`watch`都可以完成
    - `watch`能完成的功能, `computed` 不一定能完成, 例如: **watch 可以进行异步操作**

  - 两个重要的小原则:
    - 所有`被Vue所管理的函数`, 最好写成`普通函数`, 这样 this 的指向才是 Vue实例 或 组件实例对象
    - 所有`不被Vue所管理的函数(定时器 ajax Promise等)`, 最好写成`箭头函数`,
      
      - 这样 `this` 的指向才是 Vue实例 或 组件实例对象


## Vue监视数据的原理(数据劫持)
  - Vue会监视`data`中所有层次的数据

  - 如何监视对象中的数据 ?
    - 通过 `setter` 实现监视, 且要在 `new Vue`时传入需要监视的数据
      - **对象中后添加的数据, Vue默认不做响应式处理**
      - 如需给`后添加的属性做响应式`, 请使用如下 API:

        - `Vue.set(target, propertyName/index, value)` 或
        - `Vue实例.$set(target, propertyName/index, value)`
      - **对象中直接删除响应式属性的数据, Vue也是监测不到的**
      - 如需`删除的响应式`数据的属性, 请使用如下 API:
        - `Vue.delete(target, propertyName/index)` 或
        - `Vue实例.$delete(target, propertyName/index)`
  - 在 Vue修改数组中的某个元素一定要使用如下方法:
    - 使用这些 API: `push` `pop` `shift` `unshift` `splice` `sort` `reverse`
    - `Vue.set()` 或 `Vue实例.$set()` 

> `Vue.set()` 和 `Vue实例.$set()` 不能给 `Vue实例` 或 `Vue实例对象的根数据对象` 添加属性!

## [绑定样式](https://cn.vuejs.org/v2/guide/class-and-style.html)

###  class样式

  - 写法: `class="xxx"` `xxx`可以是`字符串` `对象` `数组`
   
      - 字符串写法适用于: 类名不确定, 要动态绑定
      - 对象写法适用月: 要绑定多个样式, 个数不确定, 名字也不确定
      - 数组写法适用于: 要绑定多个样式, 个数确定, 名字确定, 但不确定用不用

###  style样式

  - `:style="{FontSize: xxx}"` 其中xxx值是`动态值`
  - `:style="[a, b]"`其中a, b是`样式对象`

    ```html
    <!-- 字符串写法, 适用于: 样式的类名不确定, 需要动态指定 -->
    <div class="basic" :class="mood" @click="changeMood">{{name}}</div><br> 
    <!-- 数组写法, 适用于: 要绑定的样式个数不确定, 名字不确定 -->
    <div class="basic" :class="classArr" >{{name}}</div><br>
    <!-- 对象写法, 适用于: 要绑定的样式个数确定, 名字确定, 但要动态决定用不用 -->
    <div class="basic" :class="classObj" >{{name}}</div><br>
                                                                               
    <!-- 内联对象写法(比较少用) -->
    <div class="basic" :style="styleObj">{{name}}</div><br>
    <!-- 内联数组写法(比较少用) -->
    <div class="basic" :style="styleArr">{{name}}</div>
    ```

### scoped 属性
  - 作用: 样式在局部生效, 防止命名冲突
  - 写法: `<style scoped>...</style>`
  - 备注: 在组件中一般都会使用`scoped属性`防止命名冲突, 但是在`App`组件中一般不用(可以写一些公共样式)

## [过滤器](https://cn.vuejs.org/v2/guide/filters.html)

  - 定义: 对要显示的数据进行特定的格式化后再显示, (适用于一些`简单逻辑的处理`)
    - 语法:
        - 注册过滤器: 
           - 全局过滤器: `Vue.filter(name, callback)` 
           - 局部过滤器:  `new Vue({filters:{}})`
        - 使用过滤器: `{{ xxx | 过滤器名 }}` 或 `v-bind:属性="xxx | 过滤器名`"
    - 备注: 
        - `过滤器`会自动将 | 前的变量作为参数传递进过滤器函数中,过滤器里面 return 出去的值就是过滤后的值
        - `过滤器`也可以接受`额外参数`, `多个过滤器也可以串联使用`
        - 过滤器并没有改变原本的数据, 是产生新的对应的数据
        
          ```js
          // 需求: 定义一个截取前四位字符串的过滤器 
              new Vue({
                el: '#root',
                data(){
                  return {
                    ...
                  }
                },
                // 局部的过滤器
                filters:{
                  mySlice(value){
                      return value.slice(0,4);
                  },
                }
              });
                                                          
          // 全局的过滤器
          Vue.filter('mySlice',function(value){
              return value.slice(0,4);
          });
          ```

## [生命周期](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

  - 又名: 生命周期回调函数, 生命周期函数, 生命周期钩子
  - 是什么: <b style="color:#DD5145" id="">Vue在关键时刻帮我们调用的一些特殊名称的函数</b>
  - 生命周期函数的`名字不可更改`, 但函数的具体内容时程序员根据需求编写的
  - 生命周期函数中的`this`指向是`Vue实例`或`组件实例对象`

### beforeCreate
   - Vue初始化 `生命周期` `事件`, `但数据代理`还未开始, 调用 `beforeCreate`
   - 此时:<b style="color:#DD5145" id="">无法</b>通过`Vue实例`访问到`data`中的数据和`methods`中的方法

### created
   - Vue初始化 `数据监视` `数据代理`, 调用 `created`
   - 此时:<b style="color:#DD5145" id="">可以</b>通过`Vue实例`访问到`data`中的数据和`methods`中的方法

### beforeMount
   - 页面呈现的是<b style="color:#DD5145" id="">未经Vue编译</b>的DOM结构
   - 所有对DOM的操作, 最终都<b style="color:#DD5145" id="">不会奏效</b>

### mounted
   - 页面呈现的是<b style="color:#DD5145" id="">经过Vue编译</b>的DOM结构
   - 此时对DOM的操作均有效 (即可能避免)
   - 至此初始化过程结束了, 一般在此运行: `开启定时器` `发送网络请求` `订阅消息` `绑定自定义事件`等<b style="color:#DD5145" id="">初始化操作</b>

### beforeUpdate
   - 此时: 数据是新的, 但页面还是<b style="color:#DD5145" id="">旧的</b>, 即: 页面<b style="color:#DD5145" id="">尚未</b>和数据保持同步

### updated
   - 此时: 数据是新的, 但页面也是<b style="color:#DD5145" id="">新的</b>, 即: 页面和数据<b style="color:#DD5145" id="">保持同步</b>

### beforeDestroy
   - 当组件实例对象调用了`$destroy()`方法, 就会进入此生命周期钩子中
   - 此时: `Vue实例中`所有的: `data` `methods` `指令`等等, 都处于可用状态, 马上要执行销毁过程, 此时修改数据也不会触发更新了, 一般在此阶段操作: `关闭定时器` `取消订阅消息` `解绑自定义事件`等<b style="color:#DD5145" id="">收尾操作</b>

### destroyed

   - 此时: Vue实例已经销毁了

### [$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)

   - 语法: `this.$nextTick(回调函数)`
   - 作用: 在<b style="color:#DD5145" id="">下一次</b>事件循环中更新结束后执行其指定的回调(Vue 在更新 DOM 时是**异步**执行的)
   - 什么时候用: <b style="color:#DD5145" id="">当改变数据后, 要基于更新后的新DOM进行某些操作时</b>, 要在`$ntxtTick`方法所指定的回调函数中执行

除了回调的形式还可以使用`async`+`await`的形式, 因为`$nextTick`在用户没有指定回调并且当前用户环境支持`Promise`时会返回一个 promise 对象

```js
<div ref="text">{{ message }}</div>

methods: {
    updateMessage: async function () {
      this.message = 'updated';
      console.log(this.$refs.text.textContent); // => DOM还没更新, 拿不到最新的数据
      await this.$nextTick();
      console.log(this.$refs.text.textContent); // => 'updated'
    }
}
```

### 常用的生命周期钩子:

  - **mounted**: `发送ajax请求` `启动定时器` `绑定自定义事件` `订阅消息`等初始化操作
  - **beforeDestroy**: `清除定时器` `解绑自定义事件` `取消订阅`等收尾工作

### 关于销毁 Vue实例
  - 销毁后借助`Vue开发工具`看不到任何信息
  - 销毁后<b style="color:#DD5145" id="">自定义事件会失效</b>, <b style="color:#DD5145" id="">但原生DOM事件依然有效</b>
  - 一般<b style="color:#DD5145" id="">不会</b>在 `beforeDestroy` 操作数据, 因为即使操作数据, 也<b style="color:#DD5145" id="">不会触发更新流程</b>

## Vue组件化
  - 模块
    - 理解: 向外提供特定功能的 `JS程序`, 一般就是一个 `JS文件`
    - 为什么: `JS` 文件很多很复杂
    - 作用: 复用JS, 简化 JS 的编写, 提高 JS运行效率

  - 组件
    - 理解: 用来实现**局部(特定)功能**效果的代码集合(html/css/js/image...)
    - 为什么: 一个界面的功能很复杂
    - 作用: **复用编码, 简化项目编码, 提高运行效率**

  - 模块化
    - 当应用中的 JS 都以模块来编写的, 那这个应用就是一个模块化的应用

  - 组件化
    - 当应用中的功能都是多组件的方式来编写的, 那这个应用就是一个组件化的应用

  - 非单文件组件
    - 后缀名为 .html 一个文件里面可以包含n个组件

  - 单文件组件
    - 后缀名为 `.vue` 一个文件里面只包含1个组件

### Vue中使用组件的三大步骤:
     定义组件 ---> 注册组件  ---> 使用组件
  - 定义组件
    - 使用`vue.extend(options)`创建,其中`options`和`new Vue(options)`时传入的那个`options`几乎一样,但也有点区别如下:
      - `不要写el`
        - 最终所有的组件都要经过一个vm的管理,由vm中的el决定于服务哪个容器
      - `data必须写成函数`
          - 避兔组件被复用时,数据存在引用关系
    > 使用`template`可以配置组件结构, 注意, 必须有一个父容器包裹
  - 注册组件
    - 局部注册:使用 `new Vue`的时候传入`components`选项
    - 全局注册:使用 `Vue.component('组件名', 组件)`
  - 使用组件标签
    - 直接在`html`中编写组件标签 **<组件名></组件名>** 就可以直接使用该组件了

### 非单文件组件的完整写法(嵌套):

```js
// 定义 student 组件
const student = {
  name: 'student',
  data() {
      return {
          name: '张三',
          age: 18
      }
  },
  // 模板结构
  template: `
      <div>
          <h2>学生姓名: {{name}}</h2>
          <h2>学生年龄: {{age}}</h2>
      </div>`
};
// 定义 school 组件
const school = Vue.extend({
  name: 'school',
  data() {
      return {
          name: '尚硅谷',
          address: '广东'
      }
  },
  // 模板结构
  template: `
      <div>
          <h2>学校名称: {{name}}</h2>
          <h2>学校地址: {{address}}</h2>
          <student></student>
      </div>`,
  // 注册组件 (局部) 
  components: {
      student
  }
});
// 定义 hello 组件
const hello = {
  // 模板结构
  template: `<h2>{{msg}}</h2>`,
  data() {
      return {
          msg: '欢迎来到尚硅谷学习!'
      }
  }
}
// 全局注册组件
// Vue.component('hello', hello);
// 定义 app 组件
const app = Vue.extend({
  name: 'app',
  // 模板结构
  template: `
          <div>
              <school></school>
              <hello></hello>
          </div>`,
   // 注册组件 (局部) 
  components: {
      school,
      hello
  }
});
new Vue({
  el: '#root',
  template:`<strongpp></app>`,
  // 注册组件 (局部) 
  components: {
      app
  }
});
```

### 组件的几个注意点:
  - 关于组件名:
    - 一个单词组成:
      - 第一种写法 (首字母小写): school
      - 第二种写法 (首字母大写): School
    - 多个单词组成:
      - 第一种写法<b style="color:#DD5145" id="">短横线命名</b> `kebab-case`: my-school
      - 第二种写法<b style="color:#DD5145" id="">大驼峰命名</b> `CamelCase`: MySchool (需要vue脚手架支持)

    - 备注:
      - 组件名尽可能回避 HTML中已有的元素名称, 例如: h1、H1都不行
      - 可以在组件配置时, 使用`name`配置项指定组件在**开发者工具**中呈现的名字

  - 关于组件标签:
      - 第一种写法:`<school></school>`
      - 第二种写法:`<school/>`
      - 备注: 不使用脚手架时,`<school/>`会导致<b style="color:#DD5145" id="">后续组件不能渲染</b>

  - 一个简写方式
      - `const school = Vue.extend(options)`可简写为: `const school = options` Vue底层会自动判断帮你调用 `Vue.extend`

### 关于VueComponent

  - 组件本质是一个名为`VueComponent的构造函数`, 且不是程序员定义的, 是`Vue.extend`生成的
  - 我们只需要写`<组件名/>`或`<组件名></组件名>`,Vue解析时就会会帮我们创建 对应的组件名实例
   
    - 即vue帮我们执行的: new Vuecomponent(options)
  - 特别注意: 每次调用`vue.extend`, 返回的都是一个全新的`VueComponent`!
  - 关于`this`指向:
  - 组件配置中:
     - `data函数`  `methods中的函数` `watch中的函数` `computed中的函数`它们的`this`均是**VueComponent实例对象**
### new Vue(options) 配置中:
  - `data函数`  `methods中的函数` `watch中的函数`  `computed中的函数`它们的`this`均是**Vue实例对象**
  - `VueComponent的实例对象`, 以后简称`vc` (也可称之为: `组件实例对象`)
  - `Vue的实例对象`, 以后简称 `vm`

> - 一个重要的内置关系: <b style="color:#DD5145" id="">VueComponent.prototype.__propto__ === Vue.prototype</b>
> - 有这个关系就可以 **让组件实例对象 (vc) 可以访问到 Vue原型上的属性和方法**

### 组件化编码规范流程
 - 组件化编码流程
     - 拆分静态组件: 组件要按照**功能点拆分**, 命名不要与html元素冲突
     
     - 实现动态组件: 考虑好数据的存放位置, 数据是一个组件在用, 还是一些组件在用:
       - 一个组件在用: 放在**组件自身即可**
       - 一些组件在用: 放在他们**共同的父组件上( 状态提升)**
     - 实现交互: 从绑定事件开始
 - `props`适用于:
     - 父组件 ===> 子组件通信
     - 子组件 ===> 父组件通信(要求父先给子一个函数)
 - 使用`v-model`时要切记: `v-model`绑定的值**不能是`props`传过来的值** 因为`props`是不可以修改的!
  
 - `props`传过来的若是`引用数据类型`的值, 修改对象中的属性时`Vue不会报错`, 但`不推荐`这样做

## [Vue-cli](https://cli.vuejs.org/zh/)

### 初始化脚手架
  - 全局安装`@vue/cli`
      - `npm install -g @vue/cli` 
    - 命令行切换到你要创建项目的目录，然后使用命令创建项目
      - `vue create 文件名`
    - 安装完成以后, 启动项目
      - `npm run serve`

      - 如下是脚手架的默认文件

            ├── node_modules: 存放第三方包
            ├── public
            │ ├── favicon.ico: 页签图标
            │ └── index.html: 主页面
            ├── src
            │ ├── assets: 存放静态资源
            │ │ └── logo.png
            │ │── component: 存放组件
            │ │ └── HelloWorld.vue
            │ │── App.vue: 汇总所有组件
            │ │── main.js: 入口文件
            ├── .gitignore: git 版本管制忽略的配置
            ├── babel.config.js: babel 的配置文件
            ├── package.json: 应用包配置文件
            ├── README.md: 应用描述文件
            ├── package-lock.json：包版本控制文件

    - 如下载速度比较慢可以配置淘宝镜像: 
       - `npm config set registry http://registry.cnpmjs.org/`
       - `npm config set registry http://registry.npm.taobao.org/`
    - 配置好了以后安装 npm 包命令换成 cnpm 就行了

### [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)写法:

 ```js
 // 组件的结构
 <template>
      <div class="demo">
          <h2>学校名称: {{ name }}</h2>
          <h2>学校地址: {{ address }}</h2>
          <button @click="showName">点我提示学校名</button>
      </div>
  </template>
            
  // 组件交互相关的代码(数据 方法等等)
  <script>
      // 抛出组件
      export default {
          name: "School",
          data() {
              return {
                  name: "尚硅谷",
                  address: "广东",
              };
          },
          methods: {
              showName() {
                  alert(this.name);
              },
          },
      };
  </script>
            
  // 组件的样式
  <style>
      .demo{
          background-color: orange;
      }
  </style>
 ```
### App组件写法:

 ```js
 // 使用组件
 <template>
      <div>
         <img src="./assets/logo.png" alt="logo">
         <School></School>
         <Student></Student>
     </div>
  </template>
                                                    
  <script>
    // 引入组件
    import School from './components/School.vue';
    import Student from './components/Student.vue';
                                                    
    // 抛出组件
    export default {
        name: 'App',
        // 注册子组件
        components:{
            School,
            Student
        }
    }
  </script>
 ```

### 关于脚手架中不同版本的Vue:
  - `vue.js`与`vue.runtime.xxx.js`的区别:
      - `vue.js`是完整版的Vue, 包含: 核心功能+模板解析器
      - `vue.runtime.xxx.js`是运行版的vue, 只包含: 核心功能, 没有模板解析器
  - 脚手架默认引入的就是运行版的vue, 所以不能使用`template配置项`, 需要使用`render函数`接受到的`createElement函数`去指定具体的内容

       ```js
        /* 
          main.js 是整个项目的入口文件 
        */
        // 引入 Vue
        import Vue from 'vue/dist/vue.js'
        // 引入 App组件, 它是所有组件的父组件
        import App from './App.vue'
        // 关闭 vue生产提示
        Vue.config.productionTip = false
                                                                                                      
        // 创建Vue实例对象 --> vm
        new Vue({
          el: '#app',
          render: h => h(App), // 使用 render函数渲染模板
          // components:{App},
          // template:`<strongpp></App>`
        });
       ```

### Vue 脚手架的配置
   - `查看`脚手架的配置 
      - Vue 脚手架默认隐藏了所有 `webpack`相关的配置, 若想查看具体的`webpakc`配置，请执行：`vue inspect > output.js`
         - 此配置对象只是给你看的, 即使修改了配置项也**不会影响到脚手架的配置**
      - `自定义`修改脚手架的配置: 
      
         - 在 `package.json`文件<b style="color:#DD5145" id="">同级</b>下新建一个文件, 文件名必须是叫 `vue.config.js` 
         - 详细配置项请查看官网: https://cli.vuejs.org/zh/config/ 



## [props](https://cn.vuejs.org/v2/guide/components-props.html)

  让组件接受外部传进来的数据

  - 传递数据:

      ```js
      <Demo name="xx" sex="女" :age="18"/>
      ```
    - [接受数据](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81):
      
        - 第一种方式(只管接受):
        
            ```js
            props:['name','sex','age']
            ```
          - 如果不声明接受的 `props` 参数, 会被存放到`$attrs`里, 并且会被定义在子组件的HTML根节点上(可以利用这个特性来绑定根组件节点的原生DOM事件), 可以设置`inheritAttrs = false `取消来这个特性 
          
          - 使用`v-bind="$attrs"`可以把未声明的`props`以外接受到的参数原封不动的绑定到指定的元素上 
          
            ```js
            // 父组件传递 三个props
            <Childred test="1" title="title" content="centent"/>
            
            // 子组件 将接受到的 prop 全部都绑定到按钮上
            <button v-bind="$attrs">子组件按钮</button>
            export default {
                name: 'Childred',
                props: ['test'],
                inheritAttrs: false, //  声明的接受的 prop 不添加到 html 根节点上(默认是添加)
            }
            ```
            
            >  `class`和`style`不属于`$attrs`, 它们仍然会被应用到组件的根元素中
        - 第二种方式(限制类型):
            ```js
            props:{
              name: String,
              age: Number,
              sex: String
            }
            ```
        - 第三种方式(限制类型, 指定默认值, 限制必要性):
            ```js
              props:{
                name:{
                    type: String, // name 的类型是字符串
                    required: true // name 是必要的
                },
                age:{
                    type: Number,
                    default: 99 // 不传默认值 99
                },
                sex:{
                    type: String,
                    required: true
                }
              } 
            ```

> 备注: props是只读的 ( 非引用数据类型 ), Vue底层会监视你对`props`的修改, 如果进行了修改, 就会发出警告

组件传进来的参数会被保存在`this`(组件实例对象)下

若业务需求确实需要修改, 那么请复制`props`的内容到`data`下一份, 然后去修改`data`中的数据

```js
data() {
  return {
    myAge: this.age // 传进来的参数 age 会被保存在this下
  };
},
```

## [mixin](https://cn.vuejs.org/v2/guide/mixins.html)

可以把多个组件`公用的配置`提取成一个`混入对象`
  - 使用方式:
    - 先新建一个文件 `src/mixins/index.js` 定义一个需要混合的配置对象
        ```js
        export const xxx = {
            data(){...},
            methods:{...},
            ...
          }
        ```

    - 使用混入
      - 局部混入:
        - 在需要使用混合的文件下, 引入混合 `import {xxx} from 'xxx'`
        - 然后在配置项: `minxins:[xxx]` 应用混合
      - 全局混入
        - 需在入口文件`main.js`引入混合
        - 执行命令: `Vue.mixin(xxx)`
      >  混入里面的公用属性 方法如果冲突了, 是依组件实例对象上的为准, 但是如果是生命周期钩子, 则混入对象的钩子将在组件自身钩子**之前**调用


## [插件](https://cn.vuejs.org/v2/guide/plugins.html)
  - 本质: 包含 `install`方法的对象, `install`的第一个参数是`Vue`, 第二个以后的参数是插件使用者传递的数据
    - 定义插件:
        ```js
        // 第二个以后的参数是插件使用者传的参数
        对象.install = function(Vue, options){
            // 添加 全局过滤器, 全局指令, 全局混入, 添加实例方法等等
        }
        ```

    - 使用插件: 
        - 先引入需要使用的插件 `import {xxx} from 'xxx'`
        - 使用命令: `Vue.use(xxx, opsions)`
          - 它需要在调用 `new Vue()` 启动应用之前完成

## Vue脚手架配置代理服务器

  -  方法一
      - 在`vue.config.js`中添加如下配置:

          ```js
          devServer: {
              //此处的端口号需要改成请求的服务器端口号
              proxy: 'http://localhost:5000' 
          }
          ```
        - 说明:
           - 优点: 配置简单, 请求资源时直接发送给前端(8080)即可
           - 缺点: 不能配置多个代理, 不能灵活的控制请求是否走代理
           - 工作方式: 若按上述配置代理, 当请求了前端<b style="color:#DD5145" id="">不存在的资源</b>时, 那么该请求会转发给服务器<b style="color:#DD5145" id="">(本地有请求的同名文件就不走代理)</b>
  - 方法二
      - 编写 `vue.config.js` 配置具体代理规则:

          ```js
            module.exports = {
              devServer: {
                proxy: {
                  '/api1': { // 匹配所有以'/api'开头的请求路径
                    target: 'http://localhost:5000', // 代理目标的基础路径
                    pathRewrite: {'^/api1': ''}, // 在请求时, 将请求地址中的 '/api' 删除
                    ws: true, 
                    changeOrigin: true  // 是否使用真实的端口号访问服务器
                        },
                  '/api2': { 
                    target: 'http://localhost:5001', 
                    pathRewrite: {'^/api2': ''}, 
                    ws: true, 
                    changeOrigin: true  
                  }
                }   
              } 
            }
          ```
      - 说明: 
          - 优点: 可以配置多个代理, 且可以灵活的控制请求是否走代理(不带指定前缀就不走代理)
          - 缺点: 配置项略微繁琐, 请求资源时必须加前缀
      > 脚手架配置的代理, 只在开发环境下有效 

## [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

 - 作用: 让父组件可以向子组件指定位置插入html结构, 也是一种组件间通信的方式, 适用于 **父组件 ===> 子组件**
 - 父组件给子组件传递的插槽节点数据会被存在 `$slots` 里
 - 分类: `默认插槽`  `具名插槽`  `作用域插槽` 
    - 默认插槽
        - 子组件使用 `slot` 定义一个默认插槽
        - 父组件使用子组件标签的时候可以在子组件标签体里放指定的 `html` 结构
        
            ```html
            <!-- 父组件中: -->
                <Test>
                    <div>html结构</div>
                </Test>
            <!-- 子组件中: -->
                <template>
                    <div>
                        <!-- slot标签 定义插槽 -->
                        <slot>插槽默认内容...</slot>
                    </div>
                </template>
            ```

    - [具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%85%B7%E5%90%8D%E6%8F%92%E6%A7%BD)
      
      - 需要在子组件中设置 `name` 属性(插槽名)
      - 父组件中需要使用`template`标签包着子组件 使用 `slot` 或 `v-slot` 指定要插入到那个插槽中
      
        ```html
        <!-- 父组件中: slot 或 v-slot 指定插入的插槽名  -->
          <template slot="hello1">
              <Test> 
                  <div>html结构</div>
              </Test>
          </template>
          <template v-slot="hello2">
              <Test> 
                  <div>html结构</div>
              </Test>
          </template>
        
        <!-- 子组件中: name属性 定义插槽名 -->
          <template>
              <div>
                  <slot name="hello1">插槽默认内容1...</slot>
                  <slot name="hello2">插槽默认内容2...</slot>
              </div>
          </template>
        ```
      
    - [作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)
      
      - 需要在子组件中绑定: 要传输的数据 (可以绑定多个)
      - 父组件中需要使用`template`标签包着子组件 使用 `scope` 或 `slot-scope` 接收子组件插槽绑定的数据 (支持解构赋值)
      - 理解: 数据在组件的自身, 但根据数据生成的结构需要组件的使用者类决定 `games`数据再`Category`组件中, 但使用数据所遍历出来的结构有`App`组件决定
      
          ```js 
          <!-- 父组件中: scope 或 slot-scope 接受插槽绑定的数据(支持解构赋值) -->
           <Category> 
               <template scope="scopeData">
                   <!-- 生成的是ul列表 -->
                   <ul>
                       <li v-for="(g, index) in scopeData.games" :key="index">{{g}}</li>
                   </ul>
               </template>
           </Category>
                                                                        
           <Category> 
               <template slot-scope="{games}">
                   <!-- 生成的是h4列表 -->
                   <h4 v-for="(g, index) in games" :key="index">{{g}}</h4>
               </template>
           </Category>
                                                                        
          <!-- 子组件中:  绑定要传输的数据(可以绑定多个)-->
           <template>
               <div>
                   <slot :games="games">插槽默认内容...</slot>
               </div>
           </template>
                                                                        
            <script>
                export default {
                    name: "Category",
                    // 数据在子组件自身
                    data() {
                        return {
                            games: ["穿越火线", "地下城与勇士", "英雄联盟", "QQ飞车"]
                        }
                    },
                };
            </script>
          ```
          
          >  `slot` 和 `slot-scope` 在Vue3中不支持, 请使用 `v-slot` 简写 `#`

## [Vuex](https://vuex.vuejs.org/zh/)

  - 概念
      - 在Vue中实现集中式状态(数据)管理的一个Vue插件, 
      - 对vue应用多个组件的共享状态并进行集中式的管理(读/写), 也是一种组件间通信方式, 且适用于任意组件间通信
      
  - 什么时候使用Vuex
    - 多个组件需要共享数据时
  - 搭建vuex环境
    - 安装vuex: `npm install vuex -S` 
    - 创建文件: `src/store/index.js`

         ```js
          // 引入Vue核心库    
          import Vue from 'vue';
          // 引入vuex
          import vuex from 'vuex'
          // 应用vuex插件
          Vue.use(vuex);
                                                                 
          // 准备actions---用于响应组件中的动作
          const actions = {}
          // 准备mutations---用于操作state中的数据
          const mutations = {}
          // 准备state---用于存储具体的数据
          const state = {}
                                                                 
          // 创建并暴露store
          export default new vuex.Store({
              actions,
              mutations,
              state
          });
         ```
    - 在 `main.js` 中创建Vue实例时传入 `store` 配置项
         ```js
          ...
          // 引入 store
          import store from './store/index'
          ...
                                                                         
          // 创建 vm
          new Vue({
              el: '#app',
              render: (h)=> h(App),
              store, // 将 store 传进Vue配置对象中 
          })
        ```

### vuex基本使用

   - 在 `store.js` 文件下, 初始化 `state` 对象里的数据,  配置 `actions`对象里的函数,  配置 `mutations`对象里的函数
     
     ```js
      const actions = {
          // 响应组件中添加 jia函数(动作)
          // context 上下文对象 
          // value  值
          jia(context, value){
              // console.log('actions中的jia被调用了');
              context.commit('JIA', value)
          }
      }
      const mutations = {
          // mutations 添加 JIA函数(操作数据)
          JIA(state, value){
              // state 最终存储数据的对象
              // value 具体值
              // console.log('mutations中的JIA被调用了');
              state.sum += value;
          }
      }
      // 初始化数据
      const state = {
          sum: 0
      }
                                 
      // 创建并暴露store
      export default new vuex.Store({
          actions,
          mutations,
          state
      });
     ```
     - 组件中读取 `vuex` 中的数据: `$store.state.xxx` 看情况是否在前面加 `this`
     - 组件中修改 `vuex` 中的数据: `$store.dispatch('actions中的方法名', 数据)` 或 `$store.commit('mutations中的方法名', 数据)`
     - 备注: 若没有网络请求或其他业务逻辑, 组件中可以越过 `actions` , 直接编写 `commit` 
### getters的使用

   - 概念: 当 `state` 中的数据需要经过加工后再使用时, 可以使用 `getters` 加工(类似`vue计算属性`)
   - 在 `store.js` 中追加 `getters` 配置项
   
       ```js
        ...
        // 准备getters--用于将state中的数据进行加工
        const getters = {
            // 参数就是 state 对象
            bigSum(state){ 
                // 和计算属性一样需要 return 加工好的数据
                return state.sum * 10;
            }
       }
                                                               
        // 创建并暴露store
        export default new vuex.Store({
            ...
            getters
       });
       ```
   - 组件中读取数据: `$store.getters.bigSum` 


### vuex中四个map方法

 - 需先引入四个map方法: `import { mapState, mapGetters, mapMutations, mapActions } from "vuex"`
   - mapState方法: 用于帮助我们映射 `state` 中的数据为计算属性

       ```js
       ...       
       computed:{
           // 程序员亲手写的计算属性 重复读取 this.$store.state 里的属性
           // sum() {
           //   return this.$store.state.sum;
           // },
           // school() {
           //   return this.$store.state.school;
           // },
           // subject() {
           //   return this.$store.state.subject;
           // },
                                 
           // 借助 mapState 生成计算属性: sum, school, subject (对象写法)
           ...mapState({sum:'sum', school:'school', subject: 'subject'}),
                                 
           // 借助 mapState 生成计算属性: sum, school, subject (数组写法 属性名必须和方法名一样)
           ...mapState(["sum", "school", "school", "subject"]),
       }
       ```

   - mapGetters方法: 用于帮助我们映射 `getters` 中的数据为计算属性

       ```js
       ... 
       computed:{
           // 程序员亲手写的计算属性 重复读取 this.$store.getters 里的属性
           // bigSum() {
           //   return this.$store.getters.bigSum;
           // }
                                 
           // 借助 mapGetters 生成计算属性: bigSum (对象写法)
           ...mapGetters({bigSum: 'bigSum'})
                                 
           // 借助 mapGetters 生成计算属性: bigSum (数组写法 属性名必须和方法名一样)
           ...mapGetters(['bigSum'])
       }
       ```

   - mapActions方法: 用于帮助我们生成与 `actions` 联系的方法, 即 `$sore.dispatch(xxx)的函数` 

       ```js
       ... 
       computed:{
           // 程序员自己亲手写方法 重复调用 dispatch 方法去联系 actions
           // incrementOdd() {
           //   this.$store.dispatch("jiaOdd", this.n);
           // },
           // incrementWait() {
           //   this.$store.dispatch("jiaWait", this.n);
           // },
                                 
           // 借助 mapActions 生成: incrementOdd incrementOdd (对象的写法)
           ...mapActions({incrementOdd: 'jiaOdd', incrementWait: 'jiaWait'}),
                                 
           // 借助 mapActions 生成: jiaOdd jiaOdd (数组的写法 属性名必须和方法名一样)
           // ...mapActions(['jiaOdd','jiaWait']) // 绑定事件时传递好参数
       }
       ```

   - mapMutations方法: 用于帮助我们生成与 `mutations` 联系的方法, 即 `$sore.commit(xxx)的函数` 

       ```js
       ... 
       computed:{
           // 程序员自己亲手写方法 重复调用 commit 方法去联系 mutations
           // increment() {
           //   this.$store.commit("JIA", this.n);
           // },
           // decrement() {
           //   this.$store.commit("JIAN", this.n);
           // },
                                                 
           // 借助 mapmutations 生成: increment decrement (对象的写法)
           ...mapMutations({increment: "JIA", decrement: "JIAN"}),
                                                 
           // 借助 mapmutations 生成: JIA JIA (数组的写法 属性名必须和方法名一样)
           ...mapMutations(["JIA", "JIAN"]) // 绑定事件时需要传递好参数
       }
       ```
   >  `mapActions` 与 `mapMutations` 使用时, 若需要传递参数: 在模板中绑定事件时传递好参数, 否则参数就是`事件对象`




## vuex模块化+命名空间

  - 目的: 一种配置单独一个文件, 让代码更好维护, 让多种数据分类更加明确

  - 命名空间:  在 `new vue.Store`里使用 `modules` 配置模块分类以后, 如果想要使用map方法自动调用或读取对应模块里的内容时, 就必须在对应的模块配置文件中 `namespaced: true` , 来开启命名空间

  - 修改 `store.js` 根据功能划分不同的文件夹

       ```js
        //-------------------------- 计算配置文件
        const countOptions = {
            namespaced: true, //开启命名空间
            state:{sum:1},
            mutations:{...},
            actions:{...},
            getters:{
                bigSum(state){
                    return state.sum * 10
                }
            }
        }
        export default countAbout
                  
        //-------------------------- 人员配置文件
        const personOptions = {
            namespaced: true, //开启命名空间
            state:{...},
            mutations:{...},
            actions:{...},
            getters:{
                xxx(state){
                    return xxx
                }
            }
        }
        export default personAbout;
                  
        //---------------------------- 核心文件 stroe.js
        // 引入配置对象
        import countAbout from './countAbout'
        import personAbout from './personAbout'
                  
        const store = new vue.Store({
            modules: { // 使用 modules 配置模块分类
                countAbout: countOptions,
                personAbout: personOptions
            }
        })
       ```

   - 开启命名空间后, 在组件中读取 `state` 数据:
        ```js
         // 方式一: 自己直接读取
         this.$store.personAbout.list
                                                          
         // 方式二, 借助 `mapState` 读取 personAbout模块里的state的 sum school student
        ...mapState('personAbout',['sum','school','student'])
        ```
      
   - 开启命名空间后, 组件中读取 `getters` 数据:
        ```js
         // 方式一: 自己直接读取 使用[]特殊读取 
         this.$store.getters['personAbout/firstPersonName']
                                                          
         // 方式二, 借助 `mapGetters` 读取 personAbout模块里的getters的 bigSum
        ...mapGetters('countAbout',['bigSum'])
        ```
      
   - 开启命名空间后, 组件中调用 `dispatch` :
        ```js
         // 方式一: 自己直接 dispatch
         this.$store.dispatch('personAbout/addPersonWang', person)
                                                          
         // 方式二, 借助 `mapActions` 读取 countAbout模块的actions的 jiaOdd, jiaWait 
          	// 第一个参数 'jiaOdd', 'jiaWait' 另外的参数需要在模板中绑定事件时传递好(多个参数使用对象的形式传递)
        ...mapActions('countAbout',{得到的方法名: 'jiaOdd', 得到的方法名: 'jiaWait'})
        // or
      ...mapActions('countAbout',["jiaOdd"])
      ```
      
   - 开启命名空间后, 组件中调用 `commit` :
        ```js
         // 方式一: 自己直接 commit
         this.$store.commit('personAbout/ADD_PERSON', person)
                                                          
         // 方式二, 借助 `mapMutations` 调用 countAbout模块的mutations的 JIA JIAN
          	// 第一个参数 'JIA', 'JIAN' 另外的参数需要在模板中绑定事件时传递好(多个参数使用对象的形式传递)
        ...mapMutations('countAbout',{xxx: "JIA", xxx: "JIAN"})
        // or
        ...mapMutations('countAbout',["JIA"])
        ```



## [Vue-Router](https://router.vuejs.org/zh-cn/)

vue-router 是vue的一个插件库，专门用来实现 SPA 应用

   - SPA 应用的理解:
     - 单页 Web 应用（single page web application，SPA）
     - 整个应用只有**一个完整的页面**
     - 点击页面中的导航链接不会刷新页面，只会做页面的**局部更新**
     - 数据需要通过 ajax 请求获取
   - 路由的理解:
     - 什么是路由?
       - 一个路由就是一组映射关系（key - value）
       - key 为路径, value 可能是 function 或 component</b>
     - 路由分类
       -  前端路由:
          - 理解：**value 是 component，用于展示页面内容**
          - 工作过程：当浏览器的路径改变时, 对应的组件就会显示
       -  后端路由:
          - 理解：**value 是 function, 用于处理客户端提交的请求**
          - 工作过程：服务器接收到一个请求时, 根据 请求路径 找到匹配的 函数来处理请求, 返回响应数据

### 路由的基本使用
  - 安装 vue-router: `npm install vue-router -S`
  - 在 `main.js` 文件里引入插件: `import VueRouter from 'vue-router'`
  - 在 `main.js` 文件里应用插件: `Vue.use(VueRouter)`

  -  新建文件夹 `router/index.js` 编写 `router` 配置项文件    
     - `routes` 一定不要写空对象不然会报错
     
        ```js
         // 引入Vue
         import Vue from 'vue' 
         // 引入VueRouter
         import VueRouter from 'vue-router'
         // 应用插件
         Vue.use(VueRouter);
         // 引入组件 -- 正常加载
         import About from '@/components/About'
         import Home from '@/components/Home'
         // const Home = () => import('@/components/Home')  路由懒加载1
                    
         // 创建 router 实例对象, 去管理一组一组的路由规则
         const router = new VueRouter({
             routes: [ // routes配置项是一个数组, 每一组路由规则就是一个对象
                 {
                     path: '/',           // 监视根路径
                     redirect: '/home'    // 默认跳转到 /home
                 }
                 ,
                 {
                     path: '/about',  // 监视浏览器路径 /about
                     component: About // 显示的组件名 About
                 },
                 {
                     path: '/home',
                     component: Home   
                     // component: resolve => require(['@/components/Home'], resolve)   路由懒加载2             
                 },
                {
                    path: '*',
                    name: '404',
                    component: Notfound
                }
            ]
         })
                   
        // 暴露 router
        export default router
        ```
     
  -  在 `main.js` 中创建Vue实例时传入 `store` 配置项
      ```js
      ...
        // 引入 vue-router
        //import VueRouter from 'vue-router'
        // 应用插件
        //Vue.use(VueRouter);
        // 引入路由器配置对象
        import router from '@/router/index'
        ...
                                                      
        // 创建 vm
        new Vue({
            el: '#app',
            render: (h)=> h(App),
            router //  将 router 配置对象 传进Vue配置对象中 
        });
      ```
      
  -  实现切换
        - `html` 结构中使用 `router-link` 来作为跳转项 (会自动转换为a标签)
        - `active-class` 属性可配置高亮样式
        - `to` 属性配置改变的`路径地址`(路由规则里的匹配的地址), 格式`必须是/开头`, 例: /xxx 
          
            ```html
            <router-link active-calass="active" to="/about">About....</router-link>
            ```
        
  -  指定展示位置(默认)
        - `html` 结构中使用 `router-view` 标签指定组件要展示在个位置
          
          ```html
           <router-view></router-view>
          ```
  
- 路由的几个注意点
   - 路由组件通常存放在 `pages` 文件夹, 一般组件通常存放在 `components` 文件夹
   - 通过切换, "隐藏" 了的路由组件, 默认是被销毁的, 需要的时候会自动挂载
   - 每个组件都有自己的 `$route` 属性, 里面存储着自己的路由信息
   - 整个应用只有一个 router(路由器)属性, 可以通过组件的 `$router` 属性获取到 


### 多级路由(嵌套路由)
  - 配置路由规则, 在 `父路由` 里使用 `children` 配置子级路由
  - 注意: 多级路由地址一定<b style="color:#DD5145" id="">不要加 /</b>

      ```js
       const router = new VueRouter({
           routes: [
               {
                   path: '/about',
                   component: About
               },
               {
                   path: '/home', 
                   component: Home, 
                   children:[  // 通过 children 配置子级路由
                       {
                           path: 'news', // 此处, 多级路由一定不要加 /
                           component: News
                       },
                       {
                           path: 'message',  // 此处, 多级路由一定不要加 /
                           component: Message
                       }
                   ]
               }
           ]
       });
      ```
  - 跳转, `to`属性里需要填写<b style="color:#DD5145" id="">完整路径</b>
      ```html
      <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
      ```


### 命名路由

   - 作用: 可以简化路由的跳转
   - 在 `router.index.js`路由配置文件中, 给路由命名:  

        ```js
        ...略 
          {
              name: 'hello',  // 给路由命名
              path: '/about',
              component: About
          }
        ```
   - 简化跳转:
     ```html
      // 简化前
      <router-link to="/demo/test/hello">跳转</router-link>  
                                                     
      // 简化后, 直接通过名字跳转
      <router-link :to="{name: 'hello'}">跳转</router-link>  
                                                     
      // 简化写法配合传递参数
      <router-link 
      :to="{
          name: 'hello',
          query: {
                  id: m.id,
                  title: m.title,
                  ...
              }
      }">
          跳转
      </router-link>
     ```

### 路由的参数


#### 路由的 query 参数
  - 传递参数:

    ```html
     // 跳转路由并携带 query 参数, to 的字符串写法
     <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`"></router-link> // 带变量
     <router-link to="/home/message/detail?id=666&title=你好啊!"></router-link>  // 不带变量
                                
     // 跳转路由并携带 query 参数, to 的对象写法
     <router-link 
     :to="{
         path: '/home/message/detail',
         query: {
                 id: m.id,
                 title: m.title,
                 ...
             }
     }">
         跳转
     </router-link>
    ```
  - 接受参数, 视情况加 `this`:
    ```js
    $route.query.id
    $route.query.title
    $route.query.xxx
    ```

#### 路由的 params 参数

  - 在 `router.index.js`路由配置文件中, 声明接受的 `params` 参数:        
      ```js
      ...略 
        {
            name: 'hello', 
            path: '/detail/:id/:title', // 携带 params 参数写法, 声明占位符
            component: Detail
        }
      ```
  
  - 传递参数:
     ```html
      // 跳转路由并携带 params 参数, to 的字符串写法
      <router-link :to="`/home/message/detail/${m.id}/${m.title}`">跳转</router-link>  // 带变量
      <router-link to="/home/message/detail/id数据/标题数据">跳转</router-link>  // 不带变量
                                              
      // 跳转路由并携带 params 参数, to 的对象写法
      <router-link 
       :to="{
           // 路由携带 params 参数必须使用 name 的跳转方式, 使用 path 不行
           name: 'xiangqing', 
           params: {
                   id: m.id,
                   title: m.title,
                   ...
               }
       }">
           跳转
      </router-link>
     ```
    > 路由携带 `params` 参数时, 若使用to的对象写法, 则不能使用 `path` , 必须使用 `name` 来指定跳转
  - 接受参数, 视情况加 `this`:
      ```js
      $route.params.id
      $route.params.title
      $route.params.xxx
      ```

#### 路由的 props 配置
   - 在 `router.index.js`路由配置文件中, 配置 `props` 配置项 
   - 作用: 让路由组件更加方便的接收到参数
     - props 的值为**对象**, 该对象中所有的`key-value`都会以 `porps` 的形式传给Detail组件(静态数据)
     - props 的值为**布尔值**, 若布尔值为真, 就会把该路由组件收到的所有 `params` 参数 以 `porps` 的形式传给组件
     - props 的值为**函数**, 就会把该路由组件收到的所有 `query` 参数 以 `porps` 的形式传给组件

       ```js
       {
        name: 'xiangqing',
        path: 'detail',
        // path: 'detail/:id/:title', 
        component: Detail,
                                           
        // props 的第一种写法, 值为对象, 该对象中所有的key-value都会以porps的形式传给Detail组件
        // props:{a:1,b:'hello'} // 静态数据
                                           
        // props 的第二种写法, 值为布尔值, 若布尔值为真, 就会把该路由组件收到的所有 params 参数以 porps 的形式传给 Detail 组件
        // props:true
                                           
        // props 的第三种写法, 值为函数, 该函数返回的对象中每一组 key-value 都会通过 props 传给 Detail 组件(query参数)
        props($route){
            return {
                id: $route.query.id, 
                title: $route.query.title
           }
         }
       }
                                           
       //-------- Detail 组件里使用 props 接受参数即可使用
       ```

- `<router-link>`标签的 replace 属性
  - 作用: 控制路由跳转时操作浏览器历史记录的模式
  - 浏览器的历史记录有两种写入方式: 分别为 `push` 和 `replace` , `push`是追加历史记录, `replace` 是替换当前的记录, 路由跳转默认为 `push`
  - 开启 `replace` 模式: `<router-link replace ...>跳转</router-link>`

### 编程式路由跳转
  - 作用: 不借助 `<router-link>` 实现路由跳转, 让路由跳转更加灵活
  - `this.$router` 里的常用方法:
       - `push` 以push方式跳转, 参数和路由携带参数对象写法一样

           ```js
            this.$router.push({
              name: 'hello', // 跳转的路由名
              query: { // 携带参数
                id: xxx, 
                title:  xxx 
              }
            })
           ```
       - `replace` 以replace方式跳转, 参数和路由携带参数对象写法一样
           ```js
            this.$router.replace({
              name: 'hello',
              query: {
                id: xxx,
                title:  xxx 
              }
            })
           ```
       - `this.$router.forward()` 前进
       - `this.$router.back()` 后退
       - `this.$router.go(参数)`  正数表示: 前进几步, 负数表示: 后退几步

### [缓存路由组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)
  - 作用: 让不展示的路由保存挂载, 不被销毁
    - `<keep-alive>`标签是Vue的内置组件, 能在组件切换过程中将状态保留在内存中, 防止重复渲染DOM
      - `<keep-alive>` 包裹路由组件标签或路由视图标签时, 会缓存不活动的组件实例, 而不是销毁它们
    
    - `<keep-alive>`里的属性
      - `include`属性: 字符串组件名, 数组 或   正则表达式   只有匹配的组件会被缓存
      
      - `exclude`属性: 字符串组件名, 数组 或 正则表达式  任何匹配的组件都不会被缓存 
    ```html
     <!-- 缓存一个写法 include 里写的是组件名称 -->
     <keep-alive include="News"> 
                                  
     <!-- 缓存多个写法  数组写法-->
     <keep-alive :include="['News','hello'...]">  
         <router-view></router-view>
     </keep-alive>
    ```

### 路由独有的生命周期钩子
  - 作用: 路由组件所独有的两个钩子, 用于捕获路由组件的激活状态
       - `activated` 路由组件被激活时调用
       - `deactivated` 路由组件失活时调用,<b style="color:#DD5145" id="">失活不是销毁</b>, 是路由组件被缓存下来而页面<b style="color:#DD5145" id="">切走了</b> 

### 路由守卫
 - 作用: 对路由进行权限控制
 - 分类: `全局守卫`, `独享守卫`, `组件内守卫`

#### 全局守卫
   - 有三个参数: `to` 要去的路由的信息, `from` 来自那一个路由的信息, `next方法` 路由跳转(全局后置路由没有) 
   - 在 `router/index.js` 路由配置里有一个 `meta` 配置对象可以配置一些路由元数据(程序员自定义的)
   - 在 `router/index.js` 文件如下配置:
   ```js
   const router = new VueRouter({...})
                                       
   // 全局前置路由守卫: 初始化时被调用, 每一次路由切换之前被调用
   router.beforeEach((to, from, next) => {
       console.log('beforeEach', to, from);
       // 需先在 `router配置对象` 里的 `meta` 配置对象里先写好对应的 isAuth属性
       if(to.meta.isAuth){  // 判断当前路由是否需要进行权限控制
           if (localStorage.getItem('name') === '张三') { // 权限控制的具体规则
               next(); // 放行
           }else{
               alert('姓名不对, 无权限查看');
               // next('/path') 可以实现路由重定向
           }
       }else{
           next(); // 放行
       }
   })

   // 全局后置路由守卫: 初始化时被调用, 每一次路由切换之后被调用
   router.afterEach((to, from) => {
       console.log('afterEach', to, from);
       // 需先在 `router配置对象` 里的 `meta` 配置对象里先写好对应的 title标题属性
       if(to.meta.title){  
           document.title = to.meta.title; // 修改网页的标题
       }else{
           document.title = '默认标题';
       }
   })
   ```


#### 独享守卫
  - 作用: 独享路由守卫就是单独对**某一条路由规则**起作用的守卫
  - 使用: 在对应的路由规则里添加 `beforeEnter`(注意名字) 配置, 使用方式和全局守卫 `beforeEach` 一模一样 , 只不过没有后置而已

      ```js
       ...略 
       {
           name: 'xinwen',
           path: 'news', // 多级路由一定不要加 /
           component: News,
           meta: {isAuth: true,title: '新闻'}, // 自定义一些信息
                  
           // 配置项叫 beforeEnter 别弄混了
           beforeEnter: (to, from, next) => { 
               console.log('beforeEach', to, from);
               if(to.meta.isAuth){  // 判断是否有权限
                   if (localStorage.getItem('name') === '张三') {
                       next();
                   }else{
                       alert('姓名不对, 无权限查看');
                   }
               }else{
                   next();
               }
           }
       }
      ```

#### 组件内守卫

  - 作用: 组件内路由守卫就是单独对**某一个组件**起作用的守卫
  - 使用方式和 `beforeEach` 或 `beforeEnter` 一模一样: 
    - 在对应的组件里添加 `beforeRouteEnter` 配置, 通过路由规则, 进入该组件时被调用
    - 在对应的组件里添加 `beforeRouteLeave` 配置, 通过路由规则, 离开该组件时被调用

      ```js
      export default {
          name: 'About',
          // 通过路由规则, 进入该组件时被调用
          beforeRouteEnter (to, from, next) {
            console.log('About--beforeRouteEnter', to, from);
            if(to.meta.isAuth){  // 判断是否有权限
              if (localStorage.getItem('name') === '张三') {
                  next();
              }else{
                  alert('姓名不对, 无权限查看');
              }
            }else{
                next();
            }
          },
                                  
          // 通过路由规则, 离开该组件时被调用
          beforeRouteLeave (to, from, next) {
            console.log('About--afterRouteLeave', to, from);
            next();
          }
      }
      ```

### 路由器的两种工作模式
  - 对于一个 url 来说, 什么是 hash 值? ---浏览器地址栏里#及其后面的内容就是 hash 值
  - hash 值不会包含在 HTTP 请求中, 即: hash值不会通过请求被带到服务器
  - 在 `router/index.js` 路由配置中可以使用 `mode` 配置项配置, 前端路由器的工作模式值分别为 `hash` `history` 默认值为 `hash`
  - <b>hash模式</b>
     - 地址栏中永远带有 #号, 不美观
     - 若以后将地址通过第三方手机app分享, 若app校验严格, 则地址会被标记为不合法
     - 兼容性较好
  - <b>history模式</b>
     - 地址干净 美观
     - 兼容性和`hash`模式相比略差
     - 应用部署上线时需要后端人员支持, 解决刷新页面服务端404的问题
  > 注意: 路由使用 `history`模式会在页面刷新时 404, 需要配置兼容

## [指令](https://cn.vuejs.org/v2/api/#%E6%8C%87%E4%BB%A4)


### v-bind
  - 用于解析标签(包括: 标签属性 标签体内容 绑定事件)

  - <b style="color: #DD5145">单向数据绑定</b>, 数据只能从 data 流向页面

  - 举例: `v-bind:href="xxx"` 或 简写为 `:href="xxx"`, `xxx`要写 `JS表达式`

  - 如果想要将一个对象的所有属性都作为 prop 传入，可以使用不带参数的 `v-bind`, 如:

    ```js
    // 数据
    post: {
      id: 1,
      title: '我是标题'
    }
    
    // 模板
    <blog-post v-bind="post"></blog-post>
    
    // 等价于
    <blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
    ```

### v-on

同事件的[基本使用](#事件基本使用)


### v-model
  - <b style="color: #DD5145">双向数据绑定</b>, 数据不仅能从 data 流向页面, 还可以从页面流向 data
  - 双向数据绑定一般应用在`表单类元素`上
       - `v-model:value="name"` 可以简写为 `v-model="name"` 默认收集的就是`value`值
  - 举例: `v-model:value="name"` 或 简写为 `v-model="name"`, `name`是`data`里的数据

#### v-model 收集 表单数据

  - 若是`文本框`, 则 v-model 收集的是 value值, 用户输入的就是 value值
  - 若是`单选框`, 则 v-model 收集的是value值, 且要给标签配置 value值
   
  - 若是`多选框`:
      - 没有配置 input 的 value 属性, 那么收集的就是 checked(是否勾选 布尔值)
      
      - 配置了 input 的 value属性:
        - `v-model` 的初始值是`非数组`, 那么收集的就是checked(布尔值)
        
        - `v-model` 的初始值是`数组`, 那么收集的就是value组成的数组
  - 备注: `v-model` 的三个修饰符
    - `lazy`: `失去焦点`再收集数据
    
    - `number`: 输入字符串转为`有效数字`
    - `trim`: 输入`首尾空格自动过滤`


### v-if
  1. `v-if="表达式"` 
   
  2. `v-else-if="表达式"`
  3. `v-else="表达式"`
     - 表达式为 **true 显示, false 隐藏**

- 适用于: 切换频率较低的场景

- 特点: `不展示的DOM直接被移除`

- 注意: `v-if` 可以和 `v-else-if`  `v-else` 一起使用, 但要求是 `v-else` 元素必须<b style="color: #DD5145">紧跟</b>在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别

    ```html
    <!-- 使用 v-if 实现条件渲染 -->
    <h2 v-if="false">欢迎来到{{name}}</h2> -->
    <h2 v-if="1 === 1">欢迎来到{{name}}</h2>
                            
    <!-- v-else-if 和 v-else  -->
    <div v-if="n === 1">Angular</div>
    <div v-else-if="n === 2">React</div>
    <div v-else-if="n === 3">Vue</div>
    <div v-else>除了1,2,3都显示</div>
                            
    <!-- v-if 与 template 配合使用不会破坏html结构 -->
    <template v-if="n === 1">
        <h2>你好</h2>
        <h2>尚硅谷</h2>
        <h2>广东</h2>
    </template>
    ```
  >  `v-if` 可以使用 ` <template>` 元素当做不可见的包裹元素(隐藏多个组件时), 并在上面使用 `v-if` 最后渲染出来时 ` <template>`  将不会被展示

### v-show
- 写法: `v-show="表达式"`

- 适用于: 切换的频率较高的场景

- 注意: `v-show` 不支持 `<template>` 元素，也不支持 `v-else`

- 特点: `不展示的DOM不被移除`, 仅仅是使用样式隐藏掉 

  ```html
  <!-- 使用 v-show 实现条件渲染 -->
  <h2 v-show="false">我不会显示, 会被设置 display:none </h2> 
  <h2 v-show="1 === 1">欢迎来到{{name}}</h2>
  ```


### v-for
  - 用于展示列表数据

  - 语法: `v-for="(item,index) in xxx" :key="yyy"` 其中 xxx 表示需要`遍历的数据`, 能拿到两个参数
    - 备注: 使用`v-for`一定要指定一个唯一的 `key属性`, 不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`, 请用**字符串或数值类型的值**
    
  - 可遍历: `数组`, `对象`, 字符串(用的少), 指定次数(用的少)

      ```html
      <!-- 遍历数组 -->
      <h2>人员列表(遍历数组)</h2>
      <ul>
          <li v-for="(p,index) in persons" :key="p.id">
              {{p.name}}---{{p.age}}
          </li>
      </ul>
                                                                                                
      <!-- 遍历对象 -->
      <h2>汽车信息(遍历对象)</h2>
      <ul>
          <li v-for="(value,key) in car" :key='key'>
              {{key}}---{{value}}
          </li>
      </ul>
                                                                                                
      <!-- 遍历字符串 -->
      <h2>测试遍历字符串(用的少)</h2>
      <ul>
          <li v-for="(char,index) in str" :key='index'>
              {{char}}---{{index}}
          </li>
      </ul>
                                                                                                
      <!-- 遍历指定次数 -->
      <h2>遍历指定次数(用的很少)</h2>
      <ul>
          <li v-for="(num,inex) in 5" :key="inex">
              {{num}}---{{inex}}
          </li>
      </ul>
      ```
      
      也可以用 `of` 替代 `in` 作为分隔符, 因为它更接近 JavaScript 迭代器的语法：
      
      ```html
      <div v-for="item of items"></div>
      ```


#### v-for 里key的内部原理
  - `虚拟DOM`中`key`的作用:
   
    - `key`是虚拟DOM对象的标识, 当数据发生变化时, Vue会根据 `新数据` 生成 `新的虚拟DOM`
    
    - 随后 Vue 进行`新虚拟DOM`与`旧虚拟DOM`的差异比较, 比较规则如下:
  - 对比规则:
      - `旧虚拟DOM`中找到了与`新虚拟DOM`相同的`key`:
      
        - 若虚拟DOM`对比一致`, 直接使用之前的真实DOM
        - 若虚拟DOM中`对比不一致`, 则生成新的真实DOM, 随后替换掉页面中之前的真实DOM
      - `旧虚拟DOM`中`未找到`与`新虚拟DOM`相同的`key`
        - 创建新的真实D0M, 随后渲染到到页面
  - 用`index`作为`key`可能会引发的问题:
      - 若对数据进行: 逆序添加 逆序删除等`破坏顺序`操作
        - 会产生`没有必要的真实DOM更新` ==> 界面效果没问题, 但效率低
      - 如果`HTML结构`中还包含输入类的DOM:
        - 会产生错误的DOM更新 ==> 界面就有问题
  - 如何选择`key`
      - 最好使用每条数据的唯一标识作为key, 比如`id` `手机号` `身份证号`等唯一值
      - 如果不存在对数据进行`破坏顺序操作`, 仅用于渲染列表用于展示
        - 使用`index`作为key是没有问题的

### v-text
  - 作用: 向指定节点中渲染`文本内容`
  - 与插值语法的区别:`x-text`会替换掉节点中的内容, `插值语法则不会`

### v-html
  - 作用: 向指定节点渲染包括HTML结构的内容
  - 与插值语法的区别:
    - v-html 会`替换掉`节点中`所有的内容`, 插值语法则不会
    - v-html 可以识别 字符串中的html结构
>  - **严重注意: v-html有安全性问题!!!**
>    - 在网站上动态渲染任意HTML都是非常危险的, 容易导致 XSS攻击
>    - 一定要在可信的内容上使用 v-html, 永远不要使用用户提交的内容


### v-cloak
  - 本质是一个`特殊的属性`, Vue实例创建完毕并接管容器后, 会删除掉v-cloak属性
  - 使用css配合 v-cloak可以解决网速慢时网页展示出 `{{xxx}}` 的问题

      ```css
        /* Vue实例接管容器前不显示有 v-cloak属性的DOM */
        [v-cloak]{
          display: none;
        }
      ```

### v-once

  - `v-once`所在的节点在初次动态渲染后, 就视为静态资源
  - 以后数据的改变`不会引起v-once`所在结构的更新, 可以用于优化性能

### v-pre
  - 跳过其所在节点的编译过程
  - 可利用它跳过: 没有使用指令语法 没有使用插值语法的节点, 会加快编译

### v-slot

- 从 2.6.0 起具名插槽和作用域插槽引入了一个新的统一的语法 (即 `v-slot` 指令)
- 它取代了 `slot` 和 `slot-scope`

### ref属性

   - 被用来给元素或子组件注册引用信息(id的替代者)
   - 应用在HTML标签上获取的是`真实DOM元素`, 应用在组件标签上获取的是`组件实例对象`
   - 使用方式:
     - 打标识: `<h1 ref="xxx">我是标题</h1>` 或 `<School ref="xxx"></School>`
     - 获取: `this.$refs.xxx`

## [自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)

 - 定义语法:
     - 局部指令:
       - `directives:{指令名:配置对象}` 或 `{directives:{指令名:回调函数}`
     - 全局指令:
       - `Vue.directive(指令名, 配置对象)` 或 `Vue.directive(指令名, 回调函数)`
     - 都会有四个参数: 
       - `element`: 指令所在的`DOM元素`
       - `binding `: 指令收集到的`信息对象`
       - `vnode`：Vue 编译生成的虚拟节点
       - `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用
     
 - 配置对象中的`回调`(都可以拿到上述的`参数`):
     - `bind`: 指令与元素成功绑定时调用
     - `inserted`: 指令所在的元素被插入到页面时调用
     - `update`: 指令所在的模板结构被重新解析时调用
     - `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
    - `unbind`：只调用一次，指令与元素解绑时调用。
     >  上面的钩子函数里的`this`都是`windows`
    
 - 备注:
     - 指令定义时`不加 v-`, 但使用时必须要`加 v-`
     - 指令名如果是`多个单词组成`, 要使用`短横线(kebab-case)命名`, 不要使用`驼峰命名(camelCase)`

        ```js 
         // 需求1: 定义一个 v-big 指令, 和 v-text 功能类似, 但会把元素方法十倍
         // 需求2: 定义一个 v-fbind 指令, 和 v-bind 功能类似, 但可以把让其所绑定的input元素默认获取焦点
                       
        // 自定义指令(局部)
        // ...上面略
        directives: {
         // 函数式的写法 就没有 inserted 这个回调, bind 和 update 合并
                         
         big(element, binding, vnode) {
         // 'big-number'(element, binding, vnode) {
             element.innerText = binding.value * 10;
         },
         // 对象式写法
         fbind: {
             bind(element, binding, vnode) {
                 // element 源DOM元素 
                 // binding 指令的信息(指令的参数等等)
                 // vnode 当前 DOM元素的信息
                 element.value = binding.value;
                 console.log('bind', this); // this是windows
             },
             inserted(element, binding, vnode) {
                 element.focus();
             },
             update(element, binding, vnode) {
                 element.value = binding.value;
             },
         }
        }
                       
        // 自定义指令(全局)
        Vue.directive('fbind', {
           bind(element, binding, vnode) {
               element.value = binding.value;
           },
           inserted(element, binding, vnode) {
               element.focus();
           },
           update(element, binding, vnode) {
               element.value = binding.value;
           },
        });
                       
        // Vue.directive('big-number', function(element, binding) {
        Vue.directive('big', function(element, binding, vnode) {
           element.innerText = binding.value * 10;
        })               
        ```

## [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)

  - 一种组件间通信的方式, 适用于: 子组件 ===> 父组件</b>

  - 使用场景: A是父组件, B是子组件, B想给A传数据, 那么就要在A中给B绑定自定义事件(事件的回调在A中)</b>

  - 绑定自定义事件:
    - 第一种方式, 在父组件中: `<Demo @事件名="回调"/`> 或 `<Demo v-on:事件名="回调"/>`
    - 第二种方式, 在父组件中:

        ```js
        <Demo ref="xxx" />
        ...
        mounted(){
            // 页面挂载后向指定的子组件绑定自定义事件 
            this.$refs.xxx.$on('事件名', 回调函数);
        }
        ```
    - 若想让自定义事件只能触发一次, 可以使用`once`修饰符, 或`$once`方法
    
  - 触发自定义事件: `this.$emit('事件名', 数据)`
   
  - 解绑自定义事件(给谁绑定就在谁哪里解绑): 
    - 单个解绑: `this.$off('事件名');`
    
    - 多个解绑: `this.$off(['事件名1','事件名2'...]);`
    - 解绑所有: `this.$off();`
    
  - 组件上也可以`绑定原生DOM事件`, 需要使用`native`修饰符

  - 注意: 

      - 通过 `this.$refs.xxx.$on('事件名', 回调函数)` 绑定自定义事件时, 回调要么配置在methodes中, 要么使用箭头函数, 否则里面的`this`指向会出现问题

### 子组件使用父组件的指定的事件

父组件给子组件绑定的事件, 可以在子组件的`$listeners`参数里收到, 使用 `v-on="$listeners"`可以原封不动的把事件绑定指定的元素上

```js
// 父组件
<Childred @click="handleClick"/>
    
// 子组件 通过 v-on="$listeners" 直接将 click 绑定到自己的按钮上
<button v-on="$listeners">子组件按钮</button>
```

### sync修饰符

开发可复用的组件库时, 需要让子组件改变父组件状态的代码, 它只是作为一个编译时的语法糖存在

它会被扩展为一个自动更新父组件属性的 v-on 监听器, 实例代码如下:

```js
<test :foo.sync="bar"></test>
```

会被扩展为：

```js
<test :foo="bar" @update:foo="(val) => { bar = val }"></test>
```

当子组件需要更新 `foo` 的值时，它需要显式地触发一个更新事件：

```js
// 触发 update:foo事件, 会把 newValue 赋值给 foo 这个 prop值
this.$emit('update:foo', newValue);
```

> 使用`props`+`自定义事件`也可以实现`.sync`修饰符的效果, 实际上就是`v-model`在组件上使用而已

### 父组件监听子组件的生命周期

子组件在触发生命周期钩子时, 会默认触发一个带有`hook:`前缀的同名事件

只需要在子组件上绑定这个自定义事件就可以监听子组件的生命周期了

```js
// 父组件在子组件上直接绑定 hook:mounted 对应的子组件的 mounted 钩子
<Childred @hook:mounted="handleInputMounted"/>
    
...
methods:{
    handleInputMounted(){
      console.log('子组件mounted钩子触发了');
    }
  }
```

> 不管子组件有没有使用这个生命周期都会触发同名的带有前缀`hook:`的事件

## 内置组件

### component

渲染一个“元组件”为[动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6), 会根据 `is` 的值, 来决定渲染哪个组件

```js
<!-- 动态组件由 vm 实例的 componentId 属性控制 -->
<component :is="componentName"></component>

<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
<component :is="$options.components.child"></component>
```

> 还有其它的内置组件包括, [transition](https://cn.vuejs.org/v2/api/#transition), [transition-group](https://cn.vuejs.org/v2/api/#transition-group), [keep-alive](https://cn.vuejs.org/v2/api/#keep-alive), [slot](https://cn.vuejs.org/v2/api/#slot)

## 全局事件总线

   - 一种组件间通信的方式, 适用于任意组件间通信
   - 在入口文件`main.js`给Vue的原型对象上定义全局事件总线(也就是自己):
     
     ```js
     new Vue({
         ...
         beforeCreate(){
             Vue.prototype.$bus = this; // 定义全局事件总线, $bus就是当前应用 vm
         },
         ...
     });
     ```
   - 使用全局事件总线:
     - 接受数据: A组件想接受数据, 则在A组件中给`$bus`绑定自定义事件, 事件的回调留在A组件自身
     
       ```js
         ...
         methods(){
             回调函数(数据){...}
         }
         // 或
         ...
         mounted(){
             this.$bus.$on('事件名', 回调函数);
         }
       ```
     - 提供数据: 在需要提供数据的组件中调用`this.$bus.$emit('事件名', 数据)`;
   - 备注: 在事件总线绑定了事件, 最好在 `beforeDestroy`钩子中, 用`$off`去解绑当前组件所用到的事件

## 消息订阅与发布
   - 一种组件间通信的方式, 适用于任意组件间通信
   - 使用步骤:
     - 安装 pubsub: `npm install pubsub-js -S`
     - 引入: `import pubsub from 'pubsub-js'`
   - 接受数据: A组件想接受数据, 则在A组件中订阅消息, 订阅得到回调留在A组件自身, 回调的第一个参数是消息名, 第二个以后才是数据
     
       ```js
       methods(){
           回调函数(消息名, 数据){...}
       }
       ...
       mounted(){
           // 返回一个唯一标识 
           this.pid = pubsub.subscribe('消息名', 回调函数) // 订阅消息
       }
       ```
   - 提供消息: `pubsub.publish('消息名', 数据);`
   - 也是最好在`beforeDestroy`钩子中, 用 `pubsub.unsubscribe(this.pid)`取消订阅

## [Vue封装的过渡与动画](https://cn.vuejs.org/v2/guide/transitions.html)

  - 作用: 在插入更新或移除DOM元素时, 在合适的时候给元素添加样式类名
   
    ![图片](./images/animate.png) 

  - [过渡的类名](https://cn.vuejs.org/v2/guide/transitions.html#%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D)(名字固定):

    - 元素进入时的样式:
      - `v-enter`: 进入的起点
      - `v-enter-active`: 进入的过程中
      - `v-enter-to`: 进入终点
    - 元素离开的样式:
      - `v-leave`: 离开的起点
      - `v-leave-active`: 离开过程中
      - `v-leave-to`: 离开的终点

  - 使用 `transition` 包裹需要过渡的元素, 并配置 `name`属性(不配置默认为:`v-`):
      ```html
      <transition name="hello">
          <h1 v-show="isShow">你好啊!</h1>
      </transition>
      ```
      
  - 备注: 

    - `appear` 属性加到 `transition` 标签上, 可以让元素一开始就执行一次出现动画
    - 若有多个元素需要过渡, 则需要使用: `transition-group`, 且每个元素都要指定`key`值

### Vue使用第三方动画库
  - 拿[`animate.css`](https://animate.style/ )动画库举例: 
    - 安装: `npm install animate.css -S`
    
    - 引入: `import "animate.css"`
    - 在需要使用的 `transition`标签上设置 `name="animate__animated animate__bounce"`
    - 在`transition`标签上指定进入动画类名: `enter-active-class="xxx"`
    - 在`transition`标签上指定离开动画类名: `leave-active-class="xxx"`
      ```html
        <transition-group appear
        name="animate__animated animate__bounce" 
        enter-active-class="animate__fadeInTopLeft"
        leave-active-class="animate__rotateOut">
            <h1 v-show="!isShow" key="1">你好啊!</h1>
            <h1 v-show="isShow" key="2">欢迎光临</h1>
        </transition-group>
      ```

:::