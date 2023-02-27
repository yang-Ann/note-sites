---
title: React-16
date: 2022-3-5
categories:
 - web开发框架
tags:
 - React
---
:::v-pre


# React-16



[[toc]]

## React 的介绍
用于动态构建用户界面的 JavaScript 库(只关注于视图), 由 Facebook 开源

   - 声明式编码
   - 组件化编码
   - React Native 编写原生应用
   - 高效（优秀的 Diffing 算法）
   - 使用虚拟(virtual)DOM, 不总是直接操作页面真实 DOM
   - DOM Diffing 算法, 最小化页面重绘

### 相关 js 库
   - react.js：React 核心库
   - react-dom.js：提供操作 DOM 的 react 扩展库
   - babel.min.js：解析 JSX 语法代码转为 JS 代码的库

## 虚拟 DOM 与真实 DOM
   1. React 提供了一些 API 来创建一种 "特别" 的一般 js 对象`const VDOM = React.createElement('xx',{id:'xx'},'xx')` 
   2. 上面创建的就是一个简单的虚拟 DOM 对象
   3. 虚拟 DOM 对象最终都会被 React 转换为真实的 DOM
   4. 我们编码时基本只需要操作 react 的虚拟 DOM 相关数据, react 会转换为真实
      DOM 变化而更新界面
  ```js
   <!-- 准备好一个"容器" -->
   <div id="test"></div>
   <!-- 引入 react 核心库 -->
   <script src="../js/react.development.js"></script>
   <!-- 引入react-dom, 用于支持 react 操作 DOM -->
   <script src="../js/react-dom.development.js"></script>
   <!-- 引入babel, 用于将jsx转为js -->
   <script src="../js/babel.min.js"></script>
       
   <!-- 此处一定要写成 type="text/babel" -->
   <script type="text/babel">
       // 1.创建虚拟 DOM
       const VDOM = ( /* 此处一定不要写引号, 因为不是字符串 */
           <h1 id="title">
               <span>Hello,React</span>
           </h1>
       );
       // 原生js写法比较繁琐
       // React.createElement(标签名,标签属性,标签体)
       // const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'));
       // 2.渲染虚拟 DON 到页面
       ReactDOM.render(VDOM, document.getElementById('test'));
       
       console.log('虚拟DOM', VDOM);
       console.log('真实DOM', document.getElementById('test'));
       console.log(typeof VDOM); // Object
       console.log(VDOM instanceof Object); // true
       /**
        * 关于虚拟DOM
        *  1.本质是Object类型的对象(一般对象)
        *  2.虚拟DOM比较'轻', 真实DOM比较'重', 因为虚拟DOM是React内部在用, 无需真实DOM上那么多的属性
        *  3.虚拟DOM最终会被React转换为真实DOM, 呈现在页面上
       */
   </script>
  ```

## JSX 基本使用
   1. 全称: JavaScript XML
   2. React 定义的一种类似于 XML 的 JS 扩展语法: JS + XML 本质是`React.createElement(component, props, ...children)`方法的语法糖
   3. 作用: 用来简化创建虚拟 DOM 
      - 写法：`var ele = <h1>Hello JSX!</h1>`
      - 注意：
        - 它不是字符串, 也不是 HTML/XML 标签
        - 它最终产生的就是一个 JS 对象
   4. 基本语法规则:
      -  定义虚拟DOM时, `不要`写引号
      -  标签中混入JS表达式要写成 `{JS表达式}`
      -  样式的类名指定不要用 class, 要用 `className`
      -  内联样式不能直接写, 要用 `style={{key:value}}`
      -  只能有`一个`根标签
      -  标签必须要`闭合`(自闭和 或者 闭合标签)
      -  标签首字母 
         - 若`小写`字母开头, 则将该标签转为html中同名元素, 若html中无同名标签, 则报错
         - 若`大写`字母开头, React就去渲染对应的`组件`, 若组件没有定义, 则报错
            ```js
            ... 略
            <script type="text/babel">
                const myId = 'HELLO';
                const myData = 'HELLO, REACT';
                const VDOM = (
                    <div>
                        <h2 className="title" id={myId.toLowerCase()}>
                            <span style={{ color: "white", fontSize: "40px" }}>{myData.toLowerCase()}</span>
                        </h2>
                        <h2 className="title" id={myId.toUpperCase()}>
                            <span style={{ color: "white", fontSize: "40px" }}>{myData.toUpperCase()}</span>
                        </h2>
                        <input type="text"/>
                        <input type="text"></input>
                        <Good>123</Good>
                    </div>
                )
                ReactDOM.render(VDOM, document.getElementById('test'));
            </script>
            ```
### jsx里面能写什么
    只能写JS表达式

 - 一定注意区分: js语句(代码) 与 js表达式
     - 表达式: 一个表达式会产生一个值, 可以放在任何一个需要值的地方, 例如: 
       - a
       - a + b
       - demo(1)
       - arr.map()
       - function test () {...}
     - 语句(代码)不会产生值, 都是一些控制代码走向的:
       - if(){}
       - for(){}
       - switch(){case:...}

         ```js
          ... 略
          <script type="text/babel">
               // 模拟一些数据
              const data = ['Anglar','React','Vue'];
              // const data2 = [<li>Anglar</li>,<li>React</li>,<li>Vue</li>]; 可以使用但不会这样用
              // 1.创建虚拟DOM
              const VDOM = (
                  // 虚拟DOM里放一个数组React会自动帮我们遍历里面的值, 放对象会报错
                  <div>
                      <h1>前端JS框架列表</h1>
                      <ul>
                          {
                              data.map((item,index)=>{
                                  return <li key={index}>{item}</li>
                              })
                          }
                      </ul>
                  </div>
              )
              // 2.渲染虚拟DOM到页面
              ReactDOM.render(VDOM, document.getElementById('test'));
          </script>
         ```

## React组件化编码

### 函数式组件

注意点:
  1. 函数名字首字母`大写`
  2. 函数里必须有`返回值`
  3. 函数式组件里的 `this` 是 undefined 
  4. `ReactDOM.render(<组件名/>, ...)` 里必须写组件标签

        ```js
        ... 略
        <script type="text/babel">
            // 1.创建函数式组件
            function MyComponent(){
                console.log(this); // 此处的this是 undefined, 因为 babel编译后开启了严格模式
                return <h2>我是用函数定义的组件(适用于简单组件的定义)</h2>
            }
            // 2.渲染组件到页面
            ReactDOM.render(<MyComponent/>,document.getElementById('test'));
            /**
                * 执行了 ReactDOM.render(<MyComponent/>, ...) 之后的执行原理
                *  1.React解析组件标签, 找到了 MyComponent 组件
                *  2.发现组件是使用函数定义的, 随后调用该函数, 将返回值的虚拟DOM转为真实DOM, 随后呈现到页面中
            */
        </script>
        ```

### 类式组件

注意点:
  1. 定义的类必须继承 `React.Component`
  2. 函数里必须有`render`方法并且必须有`返回值`, 返回值就是要呈现的内容
  3. render中的 `this`是  组件实例对象
  4. `ReactDOM.render(<组件名/>, ...)` 里必须写组件标签

        ```js
        ... 略
        <script type="text/babel">
            // 1.创建类式组件
            class MyComponent extends React.Component{
                render(){
                    // render 是放在哪里的? --- MyComponent 的原型对象上, 供实例使用
                    // render 中的 this 是谁? --- MyComponent 的实例对象 <=> MyComponent 组件实例对象
                    console.log('render中的this: ',this)
                    return <h2>我是用类定义的组件(适用于复杂组件的定义)</h2>
                }
            }
            // 2.渲染组件到页面
            ReactDOM.render(<MyComponent/>,document.getElementById('test'));
            /**
                * 执行了 ReactDOM.render(<MyComponent/>, ...) 之后的执行原理
                *  1.React解析组件标签, 找到了 MyComponent 组件
                *  2.发现组件是使用类定义的, 随后new出来该类的实例, 并通过该实例调用原型上的 render 方法
                *  3.将 render 返回的虚拟DOM转为真实DOM, 随后呈现在页面上
            */
        </script>
        ```


## state(状态)
    state 保存着组件的状态属性通过更新组件的 state 来更新对应的页面显示(重新渲染组件)

 - state的完整写法(点击切换文字练习)
  
    ```js
   ... 略 
   <script type="text/babel">
   // 1.创建组件
   class Weather extends React.Component {

       // 构造器调用几次? --- 1次
       constructor(props) {
           console.log('constructor');
           super(props);
           // 初始化状态
           this.state = { isHot: true, wind: '微风' };
           /**
            * 解决 changeWeather 中 this 指向问题
            *  使用 bind 改变将原型上的 changeWeather 生成新的函数, 并把这个函数的 this 的指向实例自身
            *      然后 并赋值在实例自身上 这样就解决了 this 指向问题了
            * */

           this.changeWeather = this.changeWeather.bind(this);
       }

       // render调用几次? --- 1+n次 1是初始化的那次 n是状态更新的次数
       render() {
           console.log('render');
           // 读取状态
           const { isHot, wind } = this.state;
           return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'},{wind}</h1>
       }

       // changeWeather调用几次? --- 点几次调用几次
       changeWeather() {
           // changeWeather 是放在哪里的? --- Weather 的原型对象上, 供实例使用
           // 由于 changeWeather 是作为 onClick 的回调, 所以不是通过实例调用, 是直接调用
           // 类中的方法默认开启了局部的严格模式, 所以 changeWeather 中的 this 为 undefined
           // console.log(this); // undefined

           console.log('changeWeather');
           // 获取原来的 isHot
           const isHot = this.state.isHot;
           // 严重注意: 状态必须通过 setState 进行更新, 且更新是一种合并, 不会替换
           this.setState({ isHot: !isHot });
           // 严重注意: 状态(state)不可直接更改, 下面这种就是直接更改!!!
           // this.state.isHot = !isHot; // 这是错误写法
       }
   }
   // 2.渲染组件到页面
   ReactDOM.render(<Weather />, document.getElementById('test'));
   </script>
    ```
 - 注意点: 
   - React 中的事件绑定是采用小驼峰命名的
   - 事件中的 `this` 指向问题
   - 修改状态(state) 必须使用 `setState` 进行更新, 参数是一个对象
     - 且更新的方式是合并, 不会影响其他的属性
   - 类组件中`构造器`只会调用 1 次
   - 类组件中`render`方法会调用 1+n 次, 1是初始化的那次, n是状态更新的次数


  - state(简写形式) 
    ```js
    ... 略 
    <script type="text/babel">
      // 1.创建组件
      class Weather extends React.Component {
          // 初始化方法
          state = { isHot: true, wind: '微风' };
    
          render() {
              const { isHot, wind } = this.state;
              return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'},{wind}</h1>
          }
    
          // 自定义方法 ---> 要用赋值语句的形式+箭头函数
          changeWeather = () => {
              const isHot = this.state.isHot;
              this.setState({ isHot: !isHot });
          }
      }
      // 2.渲染组件到页面
      ReactDOM.render(<Weather />, document.getElementById('test'));
    </script>
    ```
    - 注意点: 
         - `不写构造函数` 将状态和自定义方法直接写在类里面
         - 自定义方法必须使用 `赋值语句` + `箭头函数的形式`

### state的理解:
   1. state 是组件对象最重要的属性, 值是对象(可以包含多个 key-value 的组合) 
   2. 组件被称为 "状态机", 通过更新组件的 state 来更新对应的页面显示(重新渲染组件)


### state比较重要的注意点:
   1. 组件中 render 中的 this 为组件实例对象 
   2. 组件自定义的方法(基本用于事件回调使用)中 this 为 undefined, 解决方法如下:
      - 强制在构造器里绑定通过函数对象的 `bind 来绑定 this`
      - 在类里面使用 `赋值语句 + 箭头函数` 来定义事件回调方法
   3. 状态数据, 不能直接修改或更新, 必须使用 `setState`


## setState更新状态的2种写法

   1. `setState(stateChange, [callback])`------对象式的setState
       - `stateChange`为状态改变对象(该对象可以体现出状态的更改)
       - `callback`是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
       - react 的状态更新后续动作是异步的
	
   2. `setState(updater, [callback])`------函数式的setState
       - `updater`为返回`stateChange`对象的函数
         - `updater`可以接收到`state`和`props`
       - `callback`是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

   3. 使用:

      ```jsx
      //对象式的setState
      //1.获取原来的count值
      const {count} = this.state
      //2.更新状态
      this.setState({count:count+1},()=>{
      	console.log(this.state.count); // 1
      })
      // console.log('12行的输出',this.state.count); // 0
      
      //函数式的setState
      this.setState(state => ({ count: state.count + 1 }))
      ```

   4. 总结:
      - 对象式的setState是函数式的setState的简写方式(语法糖)
      
      - 使用原则：
      
        - 如果新状态不依赖于原状态 ===> 使用对象方式
        - 如果新状态依赖于原状态 ===> 使用函数方式
        - 如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取



## props(传递参数)
    组件外向组件内传递变化的数据
   - 在组件标签中可以直接通过 key=value 的形式传递

  - 完整写法: 
      ```js
      ... 略
      <!-- 引入props-types, 用于对组件标签属性进行限制 -->
      <script src="../js/prop-types.js"></script>
      
      <script type="text/babel">
          // 创建组件
          class Person extends React.Component {
              render() {
                  // props 是只读的
                  // this.props.name = 'haha'; // 此行代码报错, props 是只读的
                  const { name, age, sex } = this.props;
                  return (
                      <ul>
                          <li>姓名: {name}</li>
                          <li>年龄: {age+1}</li>
                          <li>性别: {sex}</li>
                      </ul>
                  )
              }
          }
          // 对标签属性进行类型 必要性的限制
          Person.propTypes = {
              name: PropTypes.string.isRequired, // 限制 name 必传, 且为字符串
              sex: PropTypes.string, // 限制 sex 为字符串
              age: PropTypes.number, // 限制 age 为数值
              speak: PropTypes.func // 限制 speak 为函数, 因为 function 是关键字 使用 func 代替
          }
          // 指定默认标签属性值
          Person.defaultProps = {
              sex: '性别保密', // sex 默认值为 性别保密
              age: 18 // age 默认值为 18
          }
          // 渲染组件
          ReactDOM.render(<Person name='张三' age={18}  speak={speak}/>, document.getElementById('test1'));
          ReactDOM.render(<Person name='李四' sex='男' />, document.getElementById('test2'));
      
          const p = { name: '王五', age: 38, sex: '女' }
          // console.log(...p) // 没用 只有在标签参数上可以展开对象
          // ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'));
          ReactDOM.render(<Person {...p} />, document.getElementById('test3'));
      
          function speak(){
              console.log('我说话了');
          }
      </script>
      ```
       
  - 简写形式
    ```js 
    ... 略
    <!-- 引入props-types, 用于对组件标签属性进行限制 -->
    <script src="../js/prop-types.js"></script> 
     
    <script type="text/babel">
       // 创建组件
       class Person extends React.Component {
           // 对标签属性进行类型 必要性的限制
           static propTypes = {
               name: PropTypes.string.isRequired, // 限制 name 必传, 且为字符串
               sex: PropTypes.string, // 限制 sex 为字符串
               age: PropTypes.number, // 限制 age 为数值
               speak: PropTypes.func // 限制 speak 为函数, 因为 function 是关键字 使用 func 代替
           }
           // 指定默认标签属性值
           static defaultProps = {
               sex: '性别保密', // sex 默认值为 性别保密
               age: 18 // age 默认值为 18
           }
     
           render() {
               // props 是只读的
               // this.props.name = 'haha'; // 此行代码报错, props 是只读的
               const { name, age, sex } = this.props;
               return (
                   <ul>
                       <li>姓名: {name}</li>
                       <li>年龄: {age + 1}</li>
                       <li>性别: {sex}</li>
                   </ul>
               )
           }
       }
     </script>
    ```

### 构造器与 props
    类式组件一般不写构造器

   - 通常，在 React 中，构造函数仅用于以下两种情况：
      - 通过给 this.state 赋值对象来初始化内部 state
      - 为事件处理函数绑定实例
      
   - 构造器是否接收 props, 是否传递给super, 取决于, 是否希望在构造器中通过this访问props(基本不用)

### 函数式组件使用 props
```js
...略
  <script type="text/babel">
      // 创建组件
      function Person(props) {
          // 会收到所有传过来的 props 是一个对象
          const { name, age, sex } = props;
          return (
              <ul>
                  <li>姓名: {name}</li>
                  <li>性别: {sex}</li>
                  <li>年龄: {age}</li>
              </ul>
          )
      }
      // 对标签属性进行类型 必要性的限制
      Person.propTypes = {
          name: PropTypes.string.isRequired, // 限制 name 必传, 且为字符串
          sex: PropTypes.string, // 限制 sex 为字符串
          age: PropTypes.number, // 限制 age 为数值
      }

      // 指定默认标签属性值
      Person.defaultProps = {
          sex: '性别保密', // sex 默认值为 性别保密
          age: 18 // age 默认值为 18
      }

      // 渲染组件
      ReactDOM.render(<Person name='张三' sex='男' age={18} />, document.getElementById('test1'));
  </script>
```

### props的理解:
   1. 每个组件实例对象都会有 props 属性
   2. 组件标签的所有属性都保存在 props 中


### props的作用
   1. 通过标签属性从组件外向组件内传递变化的数据
   2. 注意: 组件内部不要修改 props 的数据

### props 编码操作
  - 内部读取某个值 
    -  `this.props.属性名`
  - 对 props 中的属性进行类型限制, 必要性限制
    - 第一种方式(React v15.5开始已弃用)
    
        ```js
          static propTypes = {
             name: React.PropTypes.string.isRequired, 
             sex: React.PropTypes.string, 
             age: React.PropTypes.number, 
          }
        ```
    - 第二种方式(新的)
    - 需要引入 `prop-types `库进行限制
        ```js
        static propTypes = {
           name: PropTypes.string.isRequired, 
           sex: PropTypes.string, 
           age: PropTypes.number, 
        }
        ```
    - 设置 `props` 默认值
        ```js
         static defaultProps = {
             sex: '性别保密', 
             age: 18 
         }
        ```

    - 扩展属性: 将对象的所有实现通过 props 传递  
      - `<Person {...person} />`

### props的注意点:
   - 使用 `prop-types` 库时名字别写混了类上面要写`propTypes`是来告知需要限制 props, `PropTypes`是引入 `prop-types` 库来实现限制 props 的 
   - 限制 props 为函数时, 因为`function`是关键字, 请使用`func`代替


## refs(标识)
    组件内的标签可以定义 ref 属性来标识自己
    相当于原生JS里的 id 一样

### 字符串形式的 ref (官方不推荐使用)
  - 在组件标签结构里 `ref='my-ref'` React会自动帮我们收集到实例的 `this.refs` 身上
   
    ```html
      // 组件标签结构定义
      <input ref='my-ref' type="text" placeholder='点击按钮提示数据' />
      
      // 组件中使用
      this.refs."my-ref"
    ```

### 回调函数式的 ref
  - 在组件标签结构里写一个箭头函数, React会自动帮我们调用, 并且参数就是就是`当前节点`然后我们可以`赋值`到实例身上
   
    ```html
    // 组件标签里写一个箭头函数
    <input ref={(c) => { this.input1 = c }} type="text" placeholder='点击按钮提示数据' />
    <input ref={c => this.input2 = c } type="text" placeholder='点击按钮提示数据' />
    
    // 组件中使用
    this.input1
    this.input2
    ```
    - 关于 回调`ref`调用次数(了解)
      - render方法调用渲染时会调用一次, 之后每次调用 render 更新页面会调用`两次`, 第一次参数为 `null`, 第二次为节点, 目的就是清空上一次的数据
      - 使用 实例方法的形式保存可以避免这种问题(一般清空下, 是无关紧要的)

        ```jsx
        // 组件标签里写一个方法保存节点
        <input ref={ this.saveInput } type="text" placeholder='点击按钮提示数据' /> <br/><br/>
                                                                           
        // 方法里保存节点
        saveInput = (c) => {
            this.input1 = c;
        }
                                                                           
        // 组件中使用
        this.input1
        ```

### createRef
  - 调用 `React.createRef()` 会收到一个存储 ref 的容器, 在组件标签里写上收到的容器, React会自动把当前节点收集到 指定的容器上
  - 注意: 这个容器是 "专人专用" 的, 只能放一个ref
   
    ```jsx
    // 组件标签里写一个箭头函数
    <input ref={this.myRef} type="text" placeholder='点击按钮提示数据' />
    
    // 组件拿到 ref 容器
    myRef = React.createRef();
    
    // 组件中使用(固定叫current)
    this.myRef.current
    ```


## 事件处理
   - 通过 `onXxx` 属性指定事件处理函数(注意大小写)
      - React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件 --- 为了更好的兼容性
      - React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素) --- 为了高效
   -  通过 `event.target` 得到发生事件的 DOM 元素对象 --- 不要过度的使用 ref


## 收集表单数据
包含表单的组件分类

非受控组件 和 受控组件

### 非受控组件
 - 页面里输入类DOM的数据是通过 ref 现用现取
 - 用多了 ref 会导致效率的问题
 ```js
<script type="text/babel">
// 页面里输入类DOM的数据是通过 ref 现用现取
// 创建组件
class Login extends React.Component{
    handlerSubmit = (e)=>{
        e.preventDefault();
        const {username,password} = this;
        alert(`你输入的用户名: ${username.value}, 密码是: ${password.value}`);
    }

    render(){
        return (
            <form onSubmit={this.handlerSubmit} action="https://www.baidu.com">
                用户名: <input ref={c=>this.username=c} type="text" name="username"/>&nbsp;
                密码: <input ref={c=>this.password=c} type="password" name="password" />&nbsp;
                <button>登录</button>
            </form>
        )
    }
}
// 渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'));
</script>
 ```

### 受控组件
- 页面中所有输入类的DOM, 随着用户的输入可以实时的把数据维护到状态里, 需要使用的时候再从状态里取数据 
- 受控组件可以省略 ref 来提高效率问题

#### 柯里化写法
    通过函数调用继续返回函数的方式, 实现多次接受参数最后统一处理的函数编码形式
 ```js
<script type="text/babel">
    // 创建组件
    class Login extends React.Component{
        // 初始化状态
        state = {
            username:'', // 用户名
            password:'' // 密码
        }
        // 保存表单数据到状态中
        saveFormData = (dataType)=>{
            return (e)=>{
                this.setState({[dataType]: e.target.value})
            }
        }
        // 表单提交回调
        handlerSubmit = (e)=>{
            e.preventDefault();
            const {username,password} = this.state;
            alert(`你输入的用户名: ${username}, 密码是: ${password}`);
        }
        render(){
            return (
                <form onSubmit={this.handlerSubmit} action="https://www.baidu.com">
                    用户名: <input onChange={this.saveFormData('username')} type="text" name="username"/>&nbsp;
                    密码: <input onChange={this.saveFormData('password')}  type="password" name="password" />&nbsp;
                    <button>登录</button>
                </form>
            )
        }
    }
    // 渲染组件
    ReactDOM.render(<Login/>,document.getElementById('test'));
</script>
```

#### 不用柯里化写法
```js
<script type="text/babel">
  // 创建组件
  class Login extends React.Component {
      // 初始化状态
      state = {
          username: '', // 用户名
          password: '' // 密码
      }
      // 保存表单数据到状态中
      saveFormData = (dataType, e) => {
          this.setState({ [dataType]: e.target.value })
      }
      // 表单提交回调
      handlerSubmit = (e) => {
          e.preventDefault();
          const { username, password } = this.state;
          alert(`你输入的用户名: ${username}, 密码是: ${password}`);
      }
      render() {
          return (
              <form onSubmit={this.handlerSubmit} action="https://www.baidu.com">
                  用户名: <input onChange={(e) => { this.saveFormData('username', e) }} type="text" name="username" />&nbsp;
                  密码: <input onChange={e => this.saveFormData('password', e)} type="password" name="password" />&nbsp;
                  <button>登录</button>
              </form>
          )
      }
  }
  // 渲染组件
  ReactDOM.render(<Login />, document.getElementById('test'));
</script>
```

## 旧版本生命周期

<img src="./images/react生命周期(旧).png" style="width:800px"/></br>

| 钩子函数                      | 调用时机                                    |
| ----------------------------- | ------------------------------------------- |
| **constructor**               | 构造器最先调用                              |
| **componentWillMount**        | 组件挂载之前                                |
| **componentDidMount**         | 组件挂载完毕                                |
| **shouldComponentUpdate**     | 控制组件更新的"阀门"(根据返回值)            |
| **this.forceUpdate()**        | 不修改状态强制更新(不受阀门构子的影响)      |
| **componentWillUpdate**       | 组件将要更新之前                            |
| **render**                    | 初始化渲染, 状态更新时                      |
| **componentDidUpdate**        | 组件更新完毕                                |
| **componentWillReceiveProps** | 组件接受到 props 之前调用, 注意: 第一次不算 |
| **componentWillUnmount**      | 组件卸载之前                                |

### 生命周期的三个阶段（旧）
  1. 初始化阶段: 由 ReactDOM.render()触发---初次渲染
       - constructor()
       - componentWillMount()
       - render()
       - **componentDidMount()** ===> 常用
  2. 更新阶段: 由组件内部 this.setSate()或父组件 render 触发
       - shouldComponentUpdate()
       - componentWillUpdate()
       - **render()** ===> 必须使用的一个
       - componentDidUpdate()
  3. 卸载组件: 由 ReactDOM.unmountComponentAtNode()触发
       - **componentWillUnmount()** ===> 常用

## 新版本生命周期

<img src="./images/react生命周期(新).png" style="width:1000px"/></br>

| 钩子函数                     | 调用时机                             |
| ---------------------------- | ------------------------------------ |
| **constructor**              | 构造器最先调用                       |
| **getDerivedStateFromProps** | (基本不用)                           |
| **componentDidMount**        | 组件挂载完毕                         |
| **shouldComponentUpdate**    | 控制组件更新的"阀门"(根据返回值)     |
| **render**                   | 初始化渲染, 状态更新时               |
| **getSnapshotBeforeUpdate**  | 组件将要更新之前获取快照值(基本不用) |
| **componentDidUpdate**       | 组件更新完毕                         |
| **componentWillUnmount**     | 组件卸载之前                         |

- 一些不常用的构子的传递参数问题

  ```js
  // 若 state 的值在任何时候都取决于 props, 那么可以使用 getDerivedStateFromProps
  static getDerivedStateFromProps(props,state){
   /* 
       收到两个参数
           props 外面传进来的 props 
           state 和当前的 state
       必须返回一个 state 对象 或 null
       将会把返回的state对象作为该组件实例的状态, 并且无法修改
   */
   console.log('getDerivedStateFromProps',props,state);
   return props
  }
  
  /* 
   在更新之前获取快照, 必须返回一个快照值 值可以是任何值
       会传递给 componentDidUpdate钩子
  */
  getSnapshotBeforeUpdate(){
   console.log('getSnapshotBeforeUpdate');
   return 'hello';
  }
  
  // 组件更新完毕的钩子
  componentDidUpdate(preProps,preState,snapshotValue){
    /* 
        收到三个参数
            preProps 先前传递的 props 
            preState 先前的 state
            snapshotValue  getSnapshotBeforeUpdate钩子返回的快照值
    */
    console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
  }
  ```

### 生命周期的三个阶段（新）
   1. 初始化阶段: 由 ReactDOM.render()触发---初次渲染
        - constructor()
        - getDerivedStateFromProps() 
        - render()
        - **componentDidMount**() ===> 常用
   2. 更新阶段: 由组件内部 this.setSate()或父组件重新 render 触发
        - getDerivedStateFromProps()
        - shouldComponentUpdate()
        - **render**() ===> 必须使用的一个
        - getSnapshotBeforeUpdate()
        - componentDidUpdate()
   3. 卸载组件: 由 ReactDOM.unmountComponentAtNode()触发
        - **componentWillUnmount**() ===> 常用

### 重要的勾子
  - **render：初始化渲染或更新渲染调用**
  - **componentDidMount：开启监听, 开启定时器, 发送 ajax 请求**
  - **componentWillUnmount：做一些收尾工作, 如: 清理定时器, 取消订阅消息**

### 即将废弃的三个勾子
  - componentWillMount
  - componentWillReceiveProps
  - componentWillUpdate
> 现在使用会出现警告，下一个大版本需要加上 `UNSAFE_`前缀才能使用，以后可能会被彻底废弃，不建议使用

### 新推出的两个构子(基本用不上)
  - getSnapshotBeforeUpdate
  - getDerivedStateFromProps

## react遍历列表时, key的内部原理

  1. 虚拟DOM中key的作用：   
     - 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用

     - 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
        - 旧虚拟DOM中找到了与新虚拟DOM相同的key：
        	- 若虚拟DOM中内容没变, 直接使用之前的真实DOM
        	- 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
        	- 旧虚拟DOM中未找到与新虚拟DOM相同的key 根据数据创建新的真实DOM，随后渲染到到页面

  2. 用index作为key可能会引发的问题：
     - 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
       	- 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低

     - 如果结构中还包含输入类的DOM：
       	- 会产生错误DOM更新 ==> 界面有问题
       
     - 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
     	- 仅用于渲染列表用于展示，使用index作为key是没有问题的

  3. 如何选择key:
     - 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号等唯一值
     - 如果确定只是简单的展示数据，用index也是可以的


## React 脚手架
  1. xxx 脚手架: 用来帮助程序员快速创建一个基于 xxx 库的模板项目
     - 包含了所有需要的配置（语法检查、jsx 编译、devServer…）
     - 下载好了所有相关的依赖
     - 可以直接运行一个简单效果
  2. react 提供了一个用于创建 react 项目的脚手架库: `create-react-app`
  3. 项目的整体技术架构为: `react + webpack + es6 + eslint`
  4. 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化

### 创建项目并启动
  - 全局安装：`npm install -g create-react-app`
  - 切换到要创建项目的目录里，使用命令：`create-react-app xxx`
  - 进入项目文件夹：`cd xxx`
  - 启动项目：`npm start`

### react 脚手架项目结构
    public ---- 静态资源文件夹
        favicon.icon ------ 网站页签图标
        index.html -------- 主页面 ---> 重要
        logo192.png ------- logo 图
        logo512.png ------- logo 图
        manifest.json ----- 应用加壳的配置文件
        robots.txt -------- 爬虫协议文件
    src ---- 源码文件夹
        App.css -------- App 组件的样式
        App.js --------- App 组件 ---> 重要
        App.test.js ---- 用于给 App 做测试
        index.css ------ 样式
        index.js ------- 入口文件 ---> 重要
        logo.svg ------- logo 图
        reportWebVitals.js
        --- 页面性能分析文件(需要 web-vitals 库的支持)
        setupTests.js
        ---- 组件单元测试的文件(需要 jest-dom 库的支持)


### react 文件的模块化

  - 每一个组件都是一个文件夹, 里面包括 组件(`jsx` `js`), `css`, 图片, 音视频资源等等
  - css 也可以模块化:
    -  文件名必须加上 `.module` 例如: `Hello.module.css`
    -  可以用一个变量引入接受:  `import test from './Hello.module.css`
    -  使用: ` <h1 className={test.title}>Hello, React</h1>`


### todoList案例相关知识点
   1. 拆分组件、实现静态组件，注意：`className`、`style`的写法
   2. 动态初始化列表，如何确定将数据放在哪个组件的state中？
       - 某个组件使用：放在其自身的state中
       - 某些组件使用：放在他们共同的父组件state中（官方称此操作为：`状态提升`）
   3. 关于父子之间通信：
        - 【父组件】给【子组件】传递数据：通过 props 传递
        - 【子组件】给【父组件】传递数据：通过 props 传递，要求父提前给子传递一个函数
   4. 注意 defaultChecked 和 checked 的区别，类似的还有：defaultValue 和 value
   5. 状态在哪里，操作状态的方法就在哪里


## react脚手架配置代理

- 方法一

  - 在`package.json`中追加如下配置

    ```json
    "proxy":"http://localhost:5000"
    ```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀
2. 缺点：不能配置多个代理
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

- 方法二

  -  第一步：创建代理配置文件

     ```
     在src下创建配置文件：src/setupProxy.js
     ```

  -  编写`setupProxy.js`配置具体代理规则：

     ```js
     const proxy = require('http-proxy-middleware')
     
     module.exports = function(app) {
       app.use(
         proxy('/api1', {  // /api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
           target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
           changeOrigin: true, //控制服务器接收到的请求头中host字段的值
           pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
         }),
         proxy('/api2', { 
           target: 'http://localhost:5001',
           changeOrigin: true,
           pathRewrite: {'^/api2': ''}
         })
       )
     }
     ```

说明：
  1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理
  2. 缺点：配置繁琐，前端请求资源时必须加前缀

## github搜索案例相关知识点

1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办

2. ES6小知识点：解构赋值+重命名

    ```jsx
    const obj = {a:{b:1}}
    const {a} = obj; //传统解构赋值
    const {a:{b}} = obj; //连续解构赋值
    const {a:{b:value}} = obj; //连续解构赋值+重命名
    ```

3. 消息订阅与发布机制 `pubsub-js`插件
    - 先订阅，再发布（理解：有一种隔空对话的感觉）
    - 适用于任意组件间通信
    - 要在组件的componentWillUnmount中取消订阅

4. fetch发送请求（关注分离的设计思想）

   ```jsx
    async function fetchGET(){
         try {
             const response= await fetch(`url`)
             const data = await response.json()
             console.log(data);
         } catch (error) {
             console.log('请求出错',error);
         }
    }
   ```



## React 路由的基本使用

   1. 下载: `npm install react-router-dom -S`
   2. 明确好界面中的导航区、展示区
   3. 导航区的 a标签改为`Link`标签
       ```jsx
        // 引入 Link 
        import { Link } from 'react-router-dom'
        
        // to属性就是点击后跳转的地址(小写)
        <Link to="/xxxxx">路由链接</Link>
        ```
	
   4. 展示区写`Route`标签进行路径的匹配
       ```jsx
        // 引入 Route 
        import { Route } from 'react-router-dom'
        
        // path 属性匹配路径  component 属性需要展示的组件
        <Route path='/xxxx' component={Demo}/>
        ```
	
   5. `<App>`组件的最外侧需要包裹了一个`<BrowserRouter>` 或 `<HashRouter>`
       ```jsx
        ...略 
        // 引入 BrowserRouter 或 HashRouter 路由器
        import { BrowserRouter } from 'react-router-dom'
        
        // 需要用路由器标签把App包裹着 这样就可以监测到所有组件的路由变化
        ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
            document.getElementById('root'));
        ```
   - 注意: 
     - `Link` 标签最终是会转换为 a标签的
     - BrowserRouter 和 HashRouter
       - `BrowserRouter` 地址栏就是 /xxx/xxx
       - `HashRouter` 地址栏会有#号 /xxx#/xxx, #后面的属性不会发送给后台
       - 后面会有详解

### 路由组件与一般组件
  1. 写法不同: 
	 - 一般组件: `<Demo/>`
	 - 路由组件: `<Route path="/demo" component={Demo}/>`
  2. 存放文件不同: 
	 - 一般组件: `components`
	 - 路由组件: `pages`
  3. 接收到的props不同: 
	 - 一般组件: 写组件标签时传递了什么，就能收到什么
	 - 路由组件: 接收到三个固定的属性
	

```js
history:
    go: ƒ go(n) // 正数前进 负数后退
    goBack: ƒ goBack() // 后退
    goForward: ƒ goForward() // 前进
    push: ƒ push(path, state) // push 跳转
    replace: ƒ replace(path, state) // replace 跳转

location:
    pathname: "/about"
    search: "" // search 参数
    state: undefined // state 参数

match:
    params: {} // params 参数
    path: "/about"
    url: "/about"
```

## NavLink与封装NavLink

### NavLink
    NavLink 可以实现路由链接的高亮，通过activeClassName 指定路由匹配时的样式名

```js
// 引入 NavLink
import { NavLink } from 'react-router-dom'

// 路径匹配时 自动添加 hello 类名
<NavLink activeClassName="hello" className="list-group-item" to="/about">About</NavLink>
<NavLink activeClassName="hello" className="list-group-item" to="/home">Home</NavLink>
```

### 封装NavLink
     组件标签体内容是一个特殊的标签属性
     通过 this.props.children 可以获取组件标签体内容
     在组件标签里设置也可以生效 children="xxx"

```jsx
// MyNavLink 组件内 事先封装好
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        // console.log(this.props);
        return (
            // {...this.props} 可以自动把外面传递进来的属性全部展开 
            <NavLink activeClassName="hello" className="list-group-item" {...this.props}/>
        )
    }
}


// 可以直接将需要的属性通过 props 传递进去 
import MyNavLink from './components/MyNavLink'
<MyNavLink to="/about" a={1} b={2} c={3}>About</MyNavLink>
<MyNavLink to="/home" >Home</MyNavLink>
```

## Switch的使用
    通常情况下，path 和 component 是一 一对应的关系
    Switch 可以提高路由匹配效率(单一匹配)

```jsx
import { Route, Switch } from 'react-router-dom'

{/* 注册路由, 匹配上同一个地址的路由只会展示第一个匹配上的 */}
<Switch>
	<Route path="/about" component={About} />
	<Route path="/home" component={Home} />
	<Route path="/home" component={Test} />
</Switch>
```

### 解决多级路径刷新页面样式丢失的问题
   1. public/index.html 中 引入样式时不写 ./ 写 / （常用）
   2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
   3. 使用 HashRouter 路由模式

### 路由的严格匹配与模糊匹配
   1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
   2. 开启严格匹配：`exact={true}`
>  严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

## Redirect的使用	
   1. 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到`Redirect`指定的路由
   2. 具体编码：

         ```jsx
         import { Route, Switch, Redirect } from 'react-router-dom'
         <Switch>
           <Route path="/about" component={About}/>
           <Route path="/home" component={Home}/>
           <Redirect to="/about"/>
         </Switch>
        ```
        

## 嵌套路由
   1. 注册子路由时要写上父路由的 path 值
   2. 路由的匹配是按照注册路由的顺序进行的 
   3. 不要随便开启严格匹配, 开启了就无法匹配到子路由了

```js
export default class Home extends Component {
  render() {
      return (
          <div>
              <h3>我是Home的内容</h3>
              <ul className="nav nav-tabs">
                  <li>
                       // 使用 自己封装的 MyNavLink 组件
                      <MyNavLink to="/home/news" >News</MyNavLink>
                  </li>
                  <li>
                      <MyNavLink to="/home/message" >Message</MyNavLink>
                  </li>
              </ul>

              {/* 注册子路由 */}
              <Switch>
                  <Route path="/home/news" component={News} />
                  <Route path="/home/message" component={Message} />
                  <Redirect to="/home/news" />
              </Switch>
          </div>
      )
  }
}
```

## 向路由组件传递参数

### params 参数 
   - 路由链接(携带参数)：
     
        ```js
         // 简单携带
         <Link to='/demo/test/zhangsan/18'>详情</Link>
         // 携带变量
         <Link to={`/demo/test/${data.name}/${data.age}`}>详情</Link>
        ```
   - 注册路由(声明接收)：
        ```html
         <Route path="/demo/test/:name/:age" component={Test}/>
        ```
   - 使用参数：
        ```js
         this.props.match.params.xxx;
         const {xxx} = this.props.match.params;
        ```
> 携带了的参数必须要声明接受, 不然是接受不到

### search 参数
  - 路由链接(携带参数)：
   
       ```js
        // 简单携带  
        <Link to='/demo/test?name=zhangsan&age=18'}>详情</Link>
         
        // 携带变量
        <Link to={`/demo/test?name=${data.name}&age=${data.age}`}}>详情</Link>
       ```
  - 注册路由(无需声明，正常注册即可)：
       ```html
       <Route path="/demo/test" component={Test}/>
       ```
  - 使用参数：
    - 备注：获取到的`search`是 urlencoded 编码字符串，需要借助`querystring`库解析(React自带)
    
       ```js
       // 引入 querystring
       import qs from 'querystring'
       
       // 使用 querystring 解析
       const {search} = this.props.location; // ?name=zhangsan&age=18
       const {name, age } = qs.parse(search.slice(1));
       ```

### state 参数
  - 路由链接(携带参数)：
       ```js
        // 简单携带  
        <Link to={{pathname:'/demo/test',state:{name:'zhangsan',age:18}}}>详情</Link>
         
        // 携带变量
        <Link to={{pathname:'/demo/test',state:{name:data.name,age:data.age}}}>详情</Link>
       ```
  - 注册路由(无需声明，正常注册即可)：
       ```html
       <Route path="/demo/test" component={Test}/>
       ```
  - 使用参数：
    - 备注：刷新也可以保留参数
    
       ```js
       this.props.location.state.xxx
       const {name,age} = this.props.location.state || {};
       ```

## 路由的跳转模式

### push   
    默认就是 push, 类似于栈的结构, 先进后出, 会留下历史记录

### replace
    替换当前栈顶的页面, 不会留下历史记录, 会替换当前的页面

   - 使用, 在路由跳转标签加上 `replace`
  
      ```html
       <Link replace to='/demo/test'>详情</Link>
       ```
## 编程式路由导航
	借助 this.prosp.history 对象上的API可以操作路由跳转、前进、后退

  ```js
  // replace 跳转 
  // replace 跳转 + 携带 params 参数
  this.props.history.replace(`/demo/test/${data.name}}/${data.age}`);
  
  // replace 跳转 + 携带 search 参数
  this.props.history.replace(`/demo/test?name=${data.name}}&age=${data.age}`);
  
  // replace 跳转 + 携带 state 参数
  this.props.history.replace('/demo/test',{name:data.name, age:data.age});
  ```
  
  ```js
  // push 跳转
  // push 跳转 + 携带 params 参数
  this.props.history.push(`/demo/test/${data.name}}/${data.age}`);
  
  // push 跳转 + 携带 search 参数
  this.props.history.push(`/demo/test?name=${data.name}}&age=${data.age}`);
  
  // push 跳转 + 携带 state 参数
  this.props.history.push('/demo/test',{name:data.name, age:data.age});
  
  // 回退
  this.props.history.goBack();
  ```
  
  ```js
  // 前进
  this.props.history.goForward();
  
  // 正数表示 前进 n 步
  // 负数表示 后退 n 步
  this.props.history.go(2);
  ```

## withRouter
   - withRouter 可以加工一般组件, 让一般组件具备路由组件所有的API
   - withRouter 的返回值是一个新组件
     
       ```js
        // 引入  withRouter
        import { withRouter } from 'react-router-dom'
         
        class Header extends Component {
            ...
        }
         
        // 加工一般组件并暴露
        export default withRouter(Header);
       ```

## BrowserRouter与HashRouter的区别
   1. 底层原理不一样：
	   - BrowserRouter 使用的是H5的history API，不兼容IE9及以下版本
	   - HashRouter 使用的是URL的哈希值
   2. path 表现形式不一样
         - BrowserRouter 的路径中没有#, 例如：localhost:3000/demo/test
            - HashRouter 的路径包含#, 例如：localhost:3000/#/demo/test
            - #号后面的属性不会作为参数传递给后台 

   3. 刷新后对路由 state 参数的影响
	   - BrowserRouter 没有任何影响，因为 state 保存在 history  对象中
	   - HashRouter 刷新后会导致路由 state 参数的丢失!!!
   4. 备注：HashRouter 可以用于解决一些路径错误相关的问题


## 路由组件的lazyLoad
	路由的懒加载, 使用时再加载

```js
//1.通过 React 的 lazy函数 配合import()函数 动态加载路由组件 ===> 路由组件代码会被分开打包
import React, { Component,lazy,Suspense} from 'react'
import Loading from './Loading'
const Home = lazy(()=> import('./Home') )
const About = lazy(()=> import('./About'))

//2.通过 <Suspense> 指定在加载得到路由打包文件前显示一个 fallback 属性指定的 Loading组件
<Suspense fallback={<Loading/>>
	<Switch>
		<Route path="/about" component={About}/>
		<Route path="/home" component={Home}/>
	</Switch>
</Suspense>
```



## redux(非官方)
    比较难使用, 后面有官方出的库 react-redux

1. `redux` 是一个专门用于做状态管理的 JS 库(不是 react 插件库)
2. 它可以用在 react, angular, vue 等项目中, 但基本都是与 react 配合使用
3. 作用: 集中式管理 react 应用中多个组件`共享`的状态, 类似于 vue 中 vuex

<img src="./images/redux原理图.png" style="width:800px"/>


### 什么情况下需要使用 redux
   1. 某个组件的状态，需要让其他组件可以随时拿到（共享）
   2. 一个组件需要改变另一个组件的状态（通信）
   3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用

### redux 的三个核心概念

#### action
   1. 动作的对象
   2. 包含 2 个属性
       - type：标识属性, 值为字符串, 唯一, 必要属性
       - data：数据属性, 值类型任意, 可选属性
   1. 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }

#### reducer
   1. 用于初始化状态、加工状态
   2. 加工时，根据旧的 state 和 action， 产生新的 state 的纯函数

#### store
   1. 将 state、action、reducer 联系在一起的对象
   2. 如何得到此对象?
        - `import {createStore} from 'redux'`
        - `import reducer from './reducers'`
        - `const store = createStore(reducer)`
   3. 此对象的功能?
      - `getState()`: 得到 state
      - `dispatch(action)`: 分发 action, 触发 reducer 调用, 产生新的 state
      - `subscribe(listener)`: 注册监听, 当产生了新的 state 时, 自动调用

## 求和案例_redux精简版
   - 去除Count组件自身的状态
   - `src`下建立 `redux/store.js` 和 `redux/count_reducer.js`:

     - `store.js` 文件就流程：
       
         - 引入 `redux` 中的 `createStore` 函数，创建一个 `store`
         - `createStore` 调用时要传入一个为其服务的 `reducer`
         - 记得暴露 store 对象

           ```js
             // 该文件专门用于暴露一个 store 对象，整个应用只有一个 store 对象
               
             //引入 createStore，专门用于创建 redux 中最为核心的 store 对象
             import {createStore} from 'redux'
             //引入为 Count 组件服务的 reducer
             import countReducer from './count_reducer'
             //暴露 store
             export default createStore(countReducer)
           ```
         
     - `count_reducer.js` 文件就流程：
     	
     	- `reducer`的本质是一个函数，接收：`preState`, `action`，返回加工后的状态
     	- `reducer`有两个作用：初始化状态，加工状态
     	- `reducer`被第一次调用时，是`store`自动触发的，
     		
         	- 传递的`preState`是`undefined`,
         	 
         	- 传递的`action`是: `{type:'@@REDUX/INIT_...}`
     	  
         ```js
           /* 
                该文件是用于为创建一个为 Count组件服务的 reducer, reducer本质上就是一个函数
                    reducer 函数会接受两个参数, 分别为: 之前的状态(preState), 动作对象(action)
           */
           
          // 初始化 staet 
           const inieState = 0;
           
           export default function countReducer(preState=inieState,action) {
              // 从 action 对象中获取: type, data
               const {type,data} = action;
           
               // 根据 type 决定如何加工数据
               switch (type) {
                   case 'increment': // 加
                       return  preState + data;
                   case 'decrement': // 减
                       return  preState - data;    
                   default:
                       return preState;
              }
          } 
         ```

   - 在 `index.js` 中监测 `store` 中状态的改变，一旦发生改变重新渲染`<App/>`
		- 备注：`redux `只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写
       	
         	```js
         	   // 引入 store, 用于获取 redux 中保存的状态
         	   import store from '../../redux/store'
         	   
         	   // index.js 入口文件内检测数据变化一劳永逸
         	   store.subscribe(()=>{
         	       ReactDOM.render(<App/>,document.getElementById('root')); 
         	   })
         	   
         	   
         	   // 对应组件内一个一个写
         	   componentDidMount(){
         	       // 检测 redux 中状态的变化, 只要变化, 就调用 render
         	       store.subscribe(()=>{
         	           this.forceUpdate();
         	           // this.setState({});
         	       })
         	   }
          ```

## 求和案例_redux完整版
新增文件：
   1. `src/redux/constant.js` 放置需要使用的常量

      ```js
      /* 
          该模块是用于定义 action 对象中 type 类型的常量值, 目的只有一个: 便于管理的同时防止程序员单词写错
      */
      export const INCREMENT = 'increment';
      export const DECREMENT = 'decrement';
      ```

   2. `src/redux/count_action.js` 专门用于创建action对象
      ```js
      /* 
       该文件专门为 Count 组件生成 action 对象
      */
      import {INCREMENT,DECREMENT} from './constant'

      // 常规函数写法
      export function createIncrementAction(data) {
         return { type: INCREMENT, data }
      }

      // 箭头函数写法
      export const  createDecrementAction = (data)=> ({ type: DECREMENT, data })
      ```

## 求和案例_redux异步action版
   1. 明确：延迟(异步)的动作不想交给组件自身，想交给action
   2. 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回
   3. 具体编码：

- 使用 `redux-thunk` 库，并配置在`redux/store`文件中

    ```js
    // 需在 redux 引入 applyMiddleware 来使用中间件 redux-thunk
    import {createStore,applyMiddleware} from 'redux'
    // 引入 redux-thunk, 用于支持异步 action
    import thunk from 'redux-thunk'
    // 将 中间件作为 createStore 函数的第二个参数使用
    export default createStore(countReducer,applyMiddleware(thunk));
    ```
- 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务, 在 `redux/count_action.js`文件中

- 当异步任务有结果后，分发一个同步的 action 去真正操作数据

   ```js
   export function createIncrementAction(data) {
        return { type: INCREMENT, data }
   }
       
   // 所谓的异步 action, 就是指 action 的值为函数, 异步 acting 一般都会调用同步 action 
   // 异步 action 不是必须要用的
   export const createIncrementAsyncAction = (data, time) => {
       // 收到参数 dispatch
       return (dispatch)=>{
           setTimeout(() => {
               // 通知 reducer 加工状态
               dispatch(createIncrementAction(data));
           }, time);
       }
   }
   ```

> 异步action不是必须要写的，完全可以在组件里自己等待异步任务的结果了再去分发同步action


<img src="./images/react-redux模型图.png" style="width:800px">
<!-- ![图片](./images/react-redux模型图.png) -->

## 求和案例_react-redux基本使用
   1. 明确两个概念：

   	- UI组件: 不能使用任何redux的api，只负责页面的呈现、交互等
   	- 容器组件: 负责和redux通信，通过props将结果交给UI组件

   2. 如何创建一个容器组件————靠react-redux 的 connect函数

         ```jsx
         // 引入 Count 的 UI 组件
         import CountUI from '../../component/Count'
         // 引入 connect 用于连接 UI组件 与 redux
         import { connect } from 'react-redux'
         // 引入 action 
         import {
           createIncrementAction,
           createDecrementAction,
           createIncrementAsyncAction
         } from '../../redux/count_action'
         
         ////////////////////////////////如下是 connect的完整写法
         /* 
           1.mapStateToProps函数返回的是一个对象；
           2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
           3.mapStateToProps用于传递状态
         */
         
         // 会直接收到状态 redux 的状态
         const mapStateToProps = state => ({ count: state });
         
         /* 
           1.mapDispatchToProps函数返回的是一个对象；
           2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
           3.mapDispatchToProps用于传递操作状态的方法
         */
         const mapDispatchToProps = dispatch => ( // 会直接收到状态 dispatch
            {
                jia: number => dispatch(createIncrementAction(number)),
                jian: number => dispatch(createDecrementAction(number)),
                jianAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
            }
         );
         
         //使用 connect()() 创建并暴露一个 Count 的容器组件(连接UI组件)
         export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
         
         /////////////////////////////////如下是 connect的简写
         export default connect( state => ({ count: state }), // 映射状态
         ```
         
         > UI组件通过`props`就可以使用容器组件传递的状态或方法

1. `mapStateToProps`:映射状态，返回值是一个对象

   ```jsx
   // mapDispatchToProps 的一般写法
   /* dispatch => ({ // 映射操作状态的方法
       jia: number => dispatch(createIncrementAction(number)),
   jian: number => dispatch(createDecrementAction(number)),
       jianAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time)),
   }) */
   
   // mapDispatchToProps 的简写
   // react-redux 会自动将 active 分发(dispatch)
   {
       jia:createIncrementAction,
       jian:createDecrementAction,
       jianAsync:createIncrementAsyncAction,
   }
   ```

2. 容器组件中的store是靠`props传进去`的，而不是在容器组件中直接引入

   ```jsx
   import React, { Component } from 'react'
   // 引入 容器组件
   import Count from './containers/Count'
   // 引入 store
   import store from './redux/store'
   
   export default class App extends Component {
       render() {
           return (
               <div>
                   {/* 给容器组件传递 store */}
                   <Count store={store}/>
               </div>
           )
       }
   }
   ```

## 求和案例_react-redux优化
   1. 容器组件和UI组件整合成一个文件

      ```jsx
      import React, { Component } from 'react'
      // 引入 connect 用于连接 UI组件 与 redux
      import { connect } from 'react-redux'
      // 引入 action 
      import {
          createIncrementAction,
          createDecrementAction,
          createIncrementAsyncAction
      } from '../../redux/count_action'
      
      // 定义UI组件
      class Count extends Component {...}
      
      //使用 connect()() 创建并暴露一个 Count 的容器组件
      export default connect(
          state => ({ count: state }), // 映射状态
      
          {
              jia:createIncrementAction,
              jian:createDecrementAction,
              jianAsync:createIncrementAsyncAction,
          }
      )(Count)
      ```

      

   2. 无需自己给容器组件传递`store`，给`<App/>`包裹一个`<Provider store={store}>`即可

   3. 使用了`react-redux`后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作

       ```jsx
       import React from 'react'
       import ReactDOM from 'react-dom'
       import App from './App'
       import store from './redux/store'
       import { Provider } from 'react-redux'
       
       ReactDOM.render(
           <Provider store={store}>
               <App/>
           </Provider>,
           document.getElementById('root')
       );
       ```

       

   4. `mapDispatchToProps`也可以简单的写成一个对象

   5. 一个组件要和redux“打交道”要经过哪几步？
         定义好UI组件---不暴露

       - 引入connect生成一个容器组件，并暴露，写法如下：

         ```jsx
         connect(state => ({key:value}), //映射状态
         	{key:xxxxxAction} //映射操作状态的方法
         )(UI组件)
         ```

        > 在UI组件中通过`this.props.xxx`读取和操作状态

## 求和案例_react-redux数据共享版
   1. 定义一个Pserson组件，和Count组件通过redux共享数据
   2. 为Person组件编写：reducer、action，配置constant常量
   3. 重点：Person的reducer和Count的Reducer要使用`combineReducers`进行合并, 合并后的总状态是一个对象！！！
      
        ```js
        /* 
            该文件专门用于暴露一个 store 对象，整个应用只有一个 store 对象
        */
        //引入 combineReducers 用于合并状态对象
        import {createStore,applyMiddleware,combineReducers} from 'redux'
        //引入为 Count 组件服务的 reducer
        import countReducer from './reducers/count'
        //引入为 Person 组件服务的 reducer
        import personReducer from './reducers/person'
        // 引入 redux-thunk, 用于支持异步 action
        import thunk from 'redux-thunk'
        
        // 汇总所有的 reducer 变为一个总的 reducer
        const allReducer = combineReducers({ // 这一句很重要
            he: countReducer,
            rens: personReducer
        });
        
        //暴露 store
        export default createStore(allReducer,applyMiddleware(thunk));
        ```
   5. 交给store的是总的reducer，最后注意在组件中取出状态的时候，记得“取到位”
        ```js
       // 对应组件的映射需要注意拿到的状态是总的状态
       
       // Person
       export default connect(
       	state => ({yiduiren:state.rens,he:state.he}), // 映射状态
       	{jiaYiRen:createAddPersonAction} // 映射操作状态的方法
       )(Person)
       
       
       // Count
       export default connect(
         state => ({ count: state.he, renshu:state.rens.length }),
         { 
             jia:createIncrementAction,
             jian:createDecrementAction,
             jianAsync:createIncrementAsyncAction,
         }
       )(Count)
       ```

## 纯函数和高阶函数
### 纯函数
   1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
   2. 必须遵守以下一些约束
      - 不得改写参数数据
      - 不会产生任何副作用，例如网络请求，输入和输出设备
      - 不能调用 `Date.now()` 或者 `Math.random()` 等方法
> 注意: redux 的 reducer 函数必须是一个纯函数

### 高阶函数
   1. 理解: 一类特别的函数
      - 情况 1: 参数是函数
      - 情况 2: 返回是函数
   2. 常见的高阶函数:
      - 定时器设置函数
      - 数组的 `forEach()/map()/filter()/reduce()/find()/bind()`
      - `Promise`
      - `react-redux` 中的 `connect` 函数
   3. 作用: 能实现更加动态, 更加可扩展的功能

## 求和案例_react-redux开发者工具的使用
   1. 下载插件 `Redux DevTools` , 安装 `redux-devtools-extension` 
   2. store中进行配置
    
         ```js 
         // 引入 redux-devtools-extension
         import {composeWithDevTools} from 'redux-devtools-extension'

         // 直接应用
         export default createStore(allReducer,composeWithDevTools())

         // 有异步 action 的应用
         export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
         ```

## 求和案例_react-redux最终版
   1. 所有变量名字要规范，尽量触发对象的`简写形式`
   2. `redux/reducers` 文件夹中，编写 index.js 专门用于`汇总`并暴露所有的 reducer

      ```js
      /* 
          该文件用于汇总所有的 reducer 汇总为一个总的 reducer
      */
      //引入 combineReducers，用于汇总多个 reducer
      import {combineReducers} from 'redux'
      //引入为 Count 组件服务的 reducer
      import count from './count'
      //引入为 Person 组件服务的 reducer
      import person from './person'
          
      // 汇总所有的 reducer 变为一个总的 reducer
      const allReducer = combineReducers({
      	count,
      	person
      });
          
      export default allReducer;
      ```

## render props
如何向组件内部动态传入带有属性的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <Test><div>hello</div></Test>


	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

### children props

```jsx
<Test>
  <Deno>xxxx</Deno>
</Test>

{this.props.children} // 获取 到 Deno 组件
```

> 问题: 如果Deno组件需要Test组件内的数据 ==> 做不到 

### render props

	<Test render={(xxx) => <Demo data={xxx}></Demo>}></Test>
	Test组件: {this.props.render(内部state数据)}
	Demo组件: 读取Test组件传入的数据显示 {this.props.xxx} 

```js
// 通过 render props的形式将 要显示的组件和数据带入内部
<A render={(name)=><B name={name}/>}/>

class A extends Component {
	state = {name:'张三'}
	render() {
		const {name} = this.state
		return (
			<div>
				<h3>我是A组件</h3>
                // 预留一个位置 调用带入的render函数渲染想要显示的组件
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div>
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}
```

## Hooks

#### React Hook/Hooks的介绍

	1. Hook是React 16.8.0版本增加的新特性/新语法
	2. 可以让你在函数组件中使用 state 以及其他的 React 特性


#### 三个常用的Hook

     1. State Hook: React.useState()
     2. Effect Hook: React.useEffect()
     3. Ref Hook: React.useRef()

#### State Hook
	State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作


1. 语法: `const [xxx, setXxx] = React.useState(initValue)`  
2. useState()说明:
    - 参数: 第一次初始化指定的值在内部作缓存
    - 返回值: 包含2个元素的数组, 第1个为`内部当前状态值`, 第2个为`更新状态值的函数`
3. setXxx()2种写法:
    - setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
    - setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值


#### Effect Hook
	Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
  1. React中的副作用操作:
      - 发ajax请求数据获取
      - 设置订阅 / 启动定时器
      - 手动更改真实DOM
  2. 语法和说明: 

      ```js
      import React from 'react'
       React.useEffect(()=>{
           // 在此可以执行任何带副作用操作, 根据第二个参数来决定调用多少次
      
           return ()=>{ // 在组件卸载前执行, 相当于 componentWillUnmount() 
               // 在此做一些收尾工作, 比如清除定时器/取消订阅等
           }
      },[])   // 如果指定的是[], 回调函数只会在第一次render()后执行, 相当于 componentDidMount()
           // 如果有指定值 则会在对应值发生改变时调用, 相当于 componentDidUpdate()
      ```
    
  3. 可以把 useEffect Hook 看做如下三个函数的组合
     - componentDidMount()
     - componentDidUpdate()
     - componentWillUnmount() 


#### Ref Hook
	Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据

   1. 语法: `const refContainer = React.useRef()`
   2. 作用:保存标签对象, 功能与`React.createRef()`一样

## Fragment
	可以让根标签不必使用一个真实的DOM根标签, 会在渲染时丢掉

  - 使用方法:

    ```jsx
    import { Fragment } from 'react'
    <Fragment key={1}> // 需要指定key
    	<input type="text"/>
    	<input type="text"/>
    <Fragment>
    
    <>
    	<input type="text"/>
    	<input type="text"/>
    </>
    ```

> 使用空标签也可以实现, 不过空标签不能指定key而 Fragment 可以指定 key

## Context
	一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

```jsx
1) 创建Context容器对象(必须得放到所有A, B, C都能访问到的地方)：
	import React  from 'react'
	const XxxContext = React.createContext()  
	
2) 渲染子组件时，外面包裹`xxxContext.Provider`, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        return 要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

> 一般情况都不会使用用context, 一般都用它的封装插件



## 组件优化

### Component的2个问题 

1. 只要执行setState(), 即使不改变状态数据, 组件也会重新render ==> 效率低

2. 只当前组件重新render, 就会自动重新 render 子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

### 效率高的做法
	只有当组件的 state 或 props 数据发生改变时才重新 render

### 原因
	Component 中的 shouldComponentUpdate() 总是返回 true

### 解决

- 办法1(不推荐): 

    ```jsx
    - 重写shouldComponentUpdate()方法
    - 比较新旧 state 或 props 数据, 如果有变化才返回 true, 如果没有返回 false
    
    shouldComponentUpdate(nextProps,nextState){
    console.log(this.props,this.state); //目前的 props 和 state
	  console.log(nextProps,nextState); //接下要变化的 目标props，目标state
	  return !this.state.carName === nextState.carName
	  }
	```
- 办法2(推荐):  

    - 不要使用Component创建组件, 使用PureComponent
    - PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
    - 注意: 
    		只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 会返回false  
    		不要直接修改state数据, 而是要产生新数据

      ```js
      // 引入 PureComponent
      import React, { PureComponent } from 'react'
      export default class test extends PureComponent {...}
      ```
>  项目中一般使用PureComponent来优化


## 错误边界
    错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

    只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误
    和其他组件在合成事件、定时器中产生的错误

### 使用方式：
    getDerivedStateFromError 配合 componentDidCatch

```js
import React, { Component } from 'react'
import Child from './Child'

export default class Parent extends Component {
    
	state = {
		hasError: '' //用于标识子组件是否产生错误
	}

	//当 Parent 的子组件出现报错时候，会触发 getDerivedStateFromError调用，并携带错误信息
	static getDerivedStateFromError(error) {
		console.log('@@@', error);
		return { hasError: error }
	}

	componentDidCatch() {
		console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
	}

	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，请稍后再试</h2> : <Child />}
			</div>
		)
	}
}
```


## 组件通信方式总结

- 组件间的关系：

  - 父子组件
  - 兄弟组件（非嵌套组件）
  - 祖孙组件（跨级组件）

### 几种通信方式：

1. props：
   - children props
   - render props
2. 消息订阅-发布：
   - pubs-sub、event等等
3. 集中式管理：
   - redux、dva等等
4. conText:
   - 生产者-消费者模式

### 比较好的搭配方式：
	父子组件：props
	兄弟组件：消息订阅-发布、集中式管理
	祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少，封装插件用的多)

:::