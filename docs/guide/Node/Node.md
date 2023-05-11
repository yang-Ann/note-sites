---
title: Node
date: 2022-6-12
categories:
 - 编程语言
tags:
 - Node
---
# Node
> [官方教程](http://nodejs.cn/learn/introduction-to-nodejs), [书栈网教程](https://www.bookstack.cn/read/Nodejs-Roadmap/_coverpage.md)

[[toc]]

官网安装完`Node`以后就可以使用`node`来进入`node`环境和使用`node`来执行`.{js,cjs,mjs}`文件

```sh
# 运行当前目录中的 index.mjs 文件
$ node index.mjs

$ node # 进入 node 环境
Welcome to Node.js v16.15.0.
Type ".help" for more information.
> console.log("hello world");
hello world
> .exit # 退出

# 命令行执行代码
node -p "require('./package.json').version"
```

## Node中的js

- EcmaScript
  - node 中采用 EcmaScript标准, 但是没有BOM和DOM
  - 文件名还是js, 但是命名不能是 node.js

- 核心模块
  - 在 node 中为 js 提供了 很多服务器级别的API, 这些API都被包装到一个具名的核心模块
    - 例如: 文件操作的 `fs` 模块, http服务的 `http` 模块, 路径操作模块 `path`, 操作系统模块 `os` 等等
    - 这些核心模块都可以直接引入`const xxx = require('xxx')`

- 模块化

  - 具名模块: 

    - 例如 fs, http, path

  - 自定义模块

    - node中的模块化标准都是 `commomjs` 
      - `module.exports` 和 `exports` 是默认模块接口对象
      - `require('xxx')` 加载并执行 xxx 模块里的代码并返回对应模块的 `module.exports/exports` 对象

    > `exports 和 module.exports` 是等价的, 都是默认的接口对象, 不能直接赋值修改
  
  node的模块查找顺序是先找`核心模块`, 然后是`当前目录`, 最后才是`node_modules`

### 几个术语

- **CURRENT**：指代最新的 Node.js 版本系列（单数）
- **Active**：指正在积极维护和升级的版本系列, 包括向后移植非破坏性功能和改进, 解决错误以及修补安全漏洞
- **Maintenance**：这是一个维护的 LTS 版本系列, 直到它的生命周期终止, 只会在短时间内收到错误修复和安全补丁
- **LTS**：是 Long-Term Support 的缩写, 代表 Node.js 长期支持的版本（版本号为复数）
- **EOL**：EOL 是 End of Life 的首字母缩写, 进入到 EOL 时间线的版本, 将不在维护

## IP地址和端口号

所有联网的程序都需要进行网络通信, 计算机中只有一个物理网卡, 而且同一个局域网中, 网卡的地址必须是唯一的. 

网卡是通过唯一的 IP 地址进行定位的

- IP地址定位具体的计算机(服务器)

- 端口号定位具体的应用程序(软件APP)

   所有需要联网通信的软件都必须占用一个端口号, 端口号范围从`0 ~ 65535`

## node中的全局变量

浏览器中全局对象是`window`,在node中全局对象就是`global`

### global

在**Node.js**中, 可以使用`global`关键字访问全局对象：

```js
// node 环境
console.log(global);    // => Object [global] {...}
```

`window`、`self`或`frames` 在 Node 环境中不起作用, **Node.js**中的顶级作用域不是全局作用域。在浏览器中, `var abc = 123`将创建一个全局变量。 但是, 在 Node 中, 变量将是模块本身的局部变量

### this

在浏览器下, 可以在程序的顶层使用`this`关键字来引用全局对象:

```js
this.foo = 123;
console.log(this.foo === window.foo);    // => true
```

在非严格模式下运行的内部函数或箭头函数中的 `this` 也引用了全局对象。 但是, 在严格模式下`this`值为`undefined`

```js
;(function() {
  console.log(this);    // => Window {...}
})();

;(() => {
  console.log(this);    // => Window {...}
})();

;(function() {
  "use strict";
  console.log(this);    // => undefined
})();
```

Node 模块中, `this`在顶层不引用全局对象。相反, 它具有与`module.exports`相同的值, 在函数(Node 环境)内部, `this`值是根据调用函数的方式确定的, 在 JS 模块中, `this` 在顶层是`undefined`的, 因为模块默认开启严格模式

### globalThis

`globalThis`旨在通过定义一个标准的全局属性来整合日益分散的访问全局对象的方法, 它已经被纳入**ES2020**标准, 所有流行的浏览器, 包括Chrome 71+、Firefox 65+和Safari 12.1+, 都已经支持这项功能, 可以在**Node.js 12+**中使用它

```js
// 浏览器环境
console.log(globalThis);    // => Window {...}

// node.js 环境
console.log(globalThis);    // => Object [global] {...}

// web worker 环境
console.log(globalThis);    // => DedicatedWorkerGlobalScope {...}
```

通过使用`globalThis`, 你的代码将在 window 和非 window 上下文中工作, 而无需编写额外的检查或测试。在大多数环境中, `globalThis`直接引用该环境的全局对象。但是, 在浏览器中, 内部使用代理来考虑`iframe`和跨 window 安全性。 实际上, 它并不会改变我们编写代码的方式

### __filename

**__filename** 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径, 且和命令行参数所指定的文件名不一定相同。 如果在模块中, 返回的值是模块文件的路径, 注意`ESModule`下没有该变量, 可以使用`import.meta.url`模拟出来

```js
import * as url from "url";
console.log(import.meta.url); // 'file:///F:/project/auxiliary-util/index.ts'

const __filename = url.fileURLToPath(import.meta.url);
// or
const __filename = url.fileURLToPath(new URL(import.meta.url));

console.log(__filename); // F:\project\auxiliary-util\index.ts
```

### __dirname

**__dirname** 表示当前执行脚本所在的目录, , 注意`ESModule`下没有该变量, 但是可以通过`path.resolve()`或者`import.meta.url`模拟出来, 如下: 

```js
import * as path from "path";
import * as url from "url";

const __dirname = path.resolve();
// or
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
```

>  还有`setTimeout` `clearTimeout` `setInterval` `clearInterval` `console`同浏览器中一样

### process

**[process](http://nodejs.cn/api/process.html#processexitcode)** 是一个全局变量, 即 **global** 对象的属性

它用于描述当前Node.js 进程状态的对象, 提供了一个与操作系统的简单接口

通常在写本地命令行程序的时候, 少不了要 和它打交道

**Process 事件:**

| 事件                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| **exit**              | 当进程准备退出时触发                                         |
| **beforeExit**        | 当 node 清空事件循环, 并且没有其他安排时触发这个事件。通常来说, 当没有进程安排时 node 退出, 但是 'beforeExit' 的监听器可以异步调用, 这样 node 就会继续执行 |
| **uncaughtException** | 当一个异常冒泡回到事件循环, 触发这个事件。如果给异常添加了监视器, 默认的操作（打印堆栈跟踪信息并退出）就不会发生 |
| **Signal**            | 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名, 如 SIGINT、SIGUSR1 等 |

```js
process.on('exit', function(code) {
  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  console.log('退出码为:', code); // 退出码为: 0
});
console.log("程序执行结束");
```

**Process 属性:**

| 属性                                                         | 描述                                                         | 属性                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **stdout**                                                   | 标准输出流                                                   | **stderr**                                                   | 标准错误流                                                   |
| **stdin**                                                    | 标准输入流                                                   | [**argv**](http://nodejs.cn/learn/nodejs-accept-arguments-from-the-command-line) | **argv** 属性返回一个数组, 由命令行执行脚本时的各个参数组成<br />它的第一个成员总是node, 第二个成员是脚本文件名, 其余成员是脚本文件的参数 |
| **execPath**                                                 | 返回执行当前脚本的 Node 二进制文件的绝对路径                 | **execArgv**                                                 | 返回一个数组, 成员是命令行下执行脚本时, 在Node可执行文件与脚本文件之间的命令行参数 |
| **[env](http://nodejs.cn/learn/how-to-read-environment-variables-from-nodejs)** | 返回一个对象, 为当前 shell 的环境变量                        | **exitCode**                                                 | 进程退出时的代码, 如果进程优通过 process.exit() 退出, 不需要指定退出码 |
| **version**                                                  | 版本信息对象, 比如**v0.10.18**                               | **versions**                                                 | 一个属性, 包含了 node 的版本和依赖                           |
| **config**                                                   | 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象<br />它与运行 **./configure** 脚本生成的**config.gypi**文件相同 | **pid**                                                      | 当前进程的进程号                                             |
| **ppid**                                                     | 当前进程对应的父进程                                         |                                                              |                                                              |
| **title**                                                    | 进程名, 默认值为**node**, 可以自定义该值                     | **arch**                                                     | 当前 CPU 的架构：**arm**、**ia32** 或者 **x64**              |
| **platform**                                                 | 运行程序所在的平台系统 **darwin**, **freebsd**, **linux**, **sunos** 或 **win32** | **mainModule**                                               | require.main 的备选方法。不同点, 如果主模块在运行时改变, require.main可能会继续返回老的模块<br />可以认为, 这两者引用了同一个模块 |

```js
// 输出到终端
process.stdout.write("Hello World!" + "\n"); // Hello World!
// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val); // 0: C:\Program Files\nodejs\node.exe
                                    // 1: E:\yjb\node\app.js
});
// 获取执行路径
console.log(process.execPath); // C:\Program Files\nodejs\node.exe 
// 平台信息
console.log(process.platform); // win32
```

**设置和读取环境变量**

```js
// unix 系统中设置环境变量 NODE_ENV
NODE_ENV=producttion node app.js

// windows 系统中设置环境变量 NODE_ENV
set NODE_ENV=producttion && node app.js
// 这样环境变量就会出现在 process.env 对象中了

// 读取环境变量 NODE_ENV
const env = process.env.NODE_ENV || "development";

console.log(process.env.Path); // 对应 系统变量 Path
```

**Process方法**

| 方法                                                         | 描述                                                         | 方法                 | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| **abort()**                                                  | 这将导致 node 触发 abort 事件<br />会让 node 退出并生成一个核心文件 | **chdir(directory)** | 改变当前工作进程的目录, 如果操作失败抛出异常                 |
| **cwd()**                                                    | 当前执行node命令的文件夹地址, 对于全局命令时很有用           | **exit([code])**     | 使用指定的 [code](http://nodejs.cn/api/process.html#process_exit_codes) 结束进程。如果忽略, 将会使用 code 0 |
| **kill(pid[, signal])**                                      | 发送信号给进程. pid 是进程id, 并且 signal 是发送的信号的字符串描述。信号名是字符串, 比如 'SIGINT' 或 'SIGHUP'。如果忽略, 信号会是 'SIGTERM' | **memoryUsage()**    | 返回一个对象, 描述了 Node 进程所用的内存状况, 单位为字节     |
| **[nextTick](http://nodejs.cn/learn/understanding-process-nexttick)(callback)** | 一旦当前事件循环结束, 调用回调函数, **优先级高于宏任务和微任务** | **umask([mask])**    | 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效, 返回旧的掩码。否则, 返回当前掩码 |
| **uptime()**                                                 | 返回 Node 已经运行的秒数                                     | **hrtime()**         | 返回当前进程的高分辨时间, 形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关, 因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔, 来衡量程序的性能。<br/>你可以将之前的结果传递给当前的 process.hrtime() , 会返回两者间的时间差, 用来基准和测量时间间隔 |

```js
// 输出当前目录
console.log('当前目录: ' + process.cwd()); // 当前目录: E:\yjb\node
// 输出当前版本
console.log('当前版本: ' + process.version); // 当前版本: v14.17.3
// 输出内存使用情况
console.log(process.memoryUsage()); // {...}
```

### setImmediate

和`process.nextTick`类似只不过是在异步任务中优先级最低的比`setTimeout` `setInterval`还低

> [官方setImmediate教程](http://nodejs.cn/learn/understanding-setimmediate ), [阮一峰教程node定时器](http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html )

## fs

文件系统就是通过 node 来操作系统中的文件

```js
// 基于 回调和同步的 API 可见 http://nodejs.cn/api/fs.html#callback-api
import * as fs from "node:fs";
// 等同于 import * as fs from "fs";

// 基于 promise 的 API 可见 http://nodejs.cn/api/fs.html#promises-api
import * as fs from "node:fs/promises";
```

> [Nodejs 文件系统模块](http://nodejs.cn/learn/the-nodejs-fs-module)

fs模块的 API 都分为 同步和异步两种 (带`Sync`后缀的是同步), 而异步回调函数的参数node统一约定了**第一个参数是错误对象**

常用方法如下: 

| 方法名                                     | 说明                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| writeFile(file, data[, options], callback) | 写入文件, `file`文件路径, `data`数据, `options`写入的一些配置, `callback`回调<br />**Node写入不存在的文件时会创建对应的文件** |
| readFile(path[, options], callback)        | 文件读取, `path`读取文件路径, `options`读取的选项, `callback`回调<br />[文件标识符](http://nodejs.cn/api/fs.html#file-system-flags) |
| appendFile(path, data, callback)           | 追加到文件, `path`文件路径, `data`追加的数据, `callback`回调<br /> |
| existsSync(path)                           | 检查一个路径是否存在                                         |
| statSync(path)                             | 获取文件的状态, 返回一个对象, 对象包括文件的大小, 创建时间, 是否是文件或文件夹 |
| unlink(path, callback)                     | 删除文件(`不包括文件夹`)                                     |
| rmdir(path[, options], callback)           | 删除文件夹(`不包括文件`), 要获得类似于 `rm -rf` Unix 命令的行为, 使用`fs.rm` |
| rm(path[, options], callback)              | 异步地删除文件和目录                                         |
| readdir(path[, options], callback)         | 读取一个目录的目录结构, 回调会收到目录数组                   |
| truncata(path, len, callback)              | 截断文件, 将文件修改为指定的大小, 单位是字节, 截断中文可能会会乱码(一个字占3个字节) |
| mkdirSync(path[, mode])                    | 创建一个文件夹(`目录`), `mode`可以为`{ recursive: true }`这样可以创建父目录 |
| renameSync(oldPath, newPath)               | 对文件进行重命名, `oldPath`旧的路径, `newPath`新的路径       |
| watchFile(filename[, options], listener)   | 监视文件的修改, `filename`要监视的文件, `listener`回调(当文件发生变化时调用), 参数为当前文件的状态, 修改前的文件状态 |
| copyFile(path1, path2)                     | 复制文件                                                     |

`fs`模块的API除了读取文件的内容格式需要注意一下, 其它对着文档用就行了

```js
import * as fs from "fs";
import * as path from "path";

const __dirname = path.resolve();

const packPath = path.resolve(__dirname, "./package.json");
fs.readFile(packPath, ((err: NodeJS.ErrnoException | null, data: Buffer) => {
  if (err) {
    // 处理错误
  }

  console.log(data); // Buffer 数据
  console.log(data.toString()); // 使用 toString() 方法转换为字符串数据
  // 或者第二个可选的配置参数设置 encoding 为 "utf-8" 就会自动转换对应格式的数据
}));


const srcPath = path.resolve(__dirname, "./src");
const stat: fs.Stats = fs.statSync(srcPath);
console.log(stat); // 文件相关信息
console.log(stat.isFile()); // 是否是文件
console.log(stat.isDirectory()); // 是否是目录
console.log(fs.readdirSync(srcPath)); // 获取一个目录下的所有文件
```

使用 [`util.promisify`](http://nodejs.cn/api/util.html#utilpromisifyoriginal)加工回调API为`Promise`格式

```js
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

const __dirname = path.resolve();

const pfs = {
    // 利用 util.promisify 将文件读取加工成 Promise 形式
    readeFile: util.promisify(fs.readFile)
};


const textPath = path.resolve(__dirname, "./test.txt");
// then 方法形式的使用
pfs.readeFile(textPath).then(data=>{
    console.log(data.toString());
});

// async + await 形式
(async ()=>{
    const data = await pfs.readeFile(textPath, { encoding: "utf-8" });
    console.log(data);
})();
```

## readline

[readline](http://nodejs.cn/learn/accept-input-from-the-command-line-in-nodejs)模块 每次一行地从可读流（例如 `process.stdin` 流, 在 Node.js 程序执行期间该流就是终端输入,）中获取输入或从文件可读流里获取内容

```js
import * as fs from "fs";
import * as readline from "readline";

const rl = readline.createInterface({
  input: fs.createReadStream("./package.json"),
});

const ws = fs.createWriteStream("./package2.json");
rl.on("line", (line) => {
  console.log(`文件的单行内容: ${line}`);
  ws.write(line + "\r\n");
});

rl.on("close", () => {
  console.log("读取结束");
});
```

```js
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("我是估值一个亿的人工智能, 我可以回答你的问题: ");

rl.on("line", input => {
  if (input === "exit") {
    rl.close();
  } else {
    const str = input
      .replace("吗", "")
      .replace("?", "!");

    console.log(str + "\n");
  }
});

rl.on("close", () => {
  console.log("bye bye");
  process.exit(0);
});
```

## path

path 模块提供了一些用于处理文件路径的工具函数

| 方法或属性名              | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| sep                       | 作为路径段分隔符, 在 Windows 上是 `\`, 在 Linux/macOS 上是 `/` |
| delimiter                 | 作为路径定界符, 在 Windows 上是 `;`, 在 Linux/macOS 上是 `:` |
| basename()                | 返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名      |
| dirname()                 | 返回路径的目录部分                                           |
| extname(path)             | 返回路径中文件的后缀名, 即路径中最后一个`.`之后的部分<br/>如果一个路径中并不包含`.`或该路径只包含一个`.` 且这个`.`为路径的第一个字符, 则此命令返回空字符串 |
| isAbsolute()              | 判断是否是绝对路径, 返回布尔值                               |
| parse()                   | 解析对象的路径为组成其的片段                                 |
| format()                  | 将`path.parse()`格式的对象转换为字符串路径<br />当向 `pathObject` 提供属性时，存在一个属性优先于另一个属性的组合: <br />如果提供 `pathObject.dir`，则忽略 `pathObject.root` <br />如果 `pathObject.base` 存在，则忽略 `pathObject.ext` 和 `pathObject.name` |
| resolve([from ...], to)   | 将 **to** 参数解析为绝对路径, 给定的路径的序列是从右往左被处理的, 后面每个 **path** 被依次解析, 直到构造完成一个绝对路径<br />会把 **/** 或 **\\** 开头的字符串片段解析成**根目录** |
| join(path1, path2[, ...]) | 用于连接路径, 主要用途在于, 会正确使用当前系统的路径分隔符, Unix系统是**/**, Windows系统是**\\**<br />对 **/** 或 **\\** 开头的字符串片段只返回自身(**不会解析成根路径**) |
| normalize(path)           | 会尝试计算**path**实际的路径(归一化路径)                     |

```js
import * as path from "path";

const __dirname = path.resolve();

console.log(path.sep); // \
console.log(path.posix.sep); // /

console.log(path.delimiter); // ;
console.log(path.posix.delimiter); // :

console.log(path.basename("/test/something")); // something
console.log(path.basename("/test/something.txt")); // something.txt

console.log(path.dirname("/test/something"));  // /test
console.log(path.dirname("/test/something/file.txt"));  // /test/something

console.log(path.extname("index.js")); // .js
console.log(path.extname("./package.json")); // .json

console.log(path.isAbsolute("/test/something"));  // true
console.log(path.isAbsolute("./test/something"));  // false

const fileObj = path.parse("/abc/hello/test.txt");

console.log(fileObj);
// {
//   root: "/", // 根路径
//   dir: "/abc/hello", // 从根路径开始的文件夹路径
//   base: "test.txt", // 文件名 + 扩展名
//   ext: ".txt", // 文件扩展名
//   name: "test" // 文件名
// }


// 归一化
console.log(path.normalize("/users/joe/..//test.txt")); // \users\test.txt


console.log(path.resolve(__dirname, "./src/index.ts")); // F:\project\auxiliary-util\src\index.ts

// resolve 最后参数以 ./开头 表示当前目录正常拼接
console.log(path.resolve("/bar/foo", "./baz")); // F:\bar\foo\baz
console.log(path.resolve("www", "images/png/", "../gif/image.gif")); // F:\project\auxiliary-util\www\images\gif\image.gif

// resolve 最后的参数以 /开头 表示从根路径开始处理
console.log(path.resolve("/foo/bar", "/tmp/file/")); // F:\tmp\file
console.log(path.resolve("www", "images/png/", "/gif/image.gif")); // F:\gif\image.gif


// join 使用系统的连接符连接路径
console.log(path.join(__dirname, "./src/index.ts")); // F:\project\auxiliary-util\src\index.ts
console.log(path.join("/bar/foo", "./baz")); // \bar\foo\baz
console.log(path.join("www", "images/png/", "../gif/image.gif")); // www\images\gif\image.gif
console.log(path.join("/foo/bar", "/tmp/file/")); // \foo\bar\tmp\file\
console.log(path.join("www", "images/png/", "/gif/image.gif")); // www\images\png\gif\image.gif
```
## os

操作系统模块, 该模块提供了许多函数, 可用于从底层的操作系统和程序运行所在的计算机上检索信息并与其进行交互

```js
const os = require('os');
```

> [Nodejs 操作系统模块](http://nodejs.cn/learn/the-nodejs-os-module)

有一些有用的属性可以告诉我们一些与处理文件有关的关键事项：

`os.EOL` 可给出行定界符序列。 在 Linux 和 macOS 上为 `\n`, 在 Windows 上为 `\r\n`

`os.constants.signals` 可告知所有与处理过程信号相关的常量, 例如 SIGHUP、SIGKILL 等

`os.constants.errno` 可设置用于错误报告的常量, 例如 EADDRINUSE、EOVERFLOW 等

> [信号常量](http://nodejs.cn/api/os.html#os_signal_constants)

`os.arch()`

返回标识底层架构的字符串, 例如 `arm`、`x64`、`arm64`

```js
console.log(os.arch()); // x64
```

`os.cpus()`

返回关于系统上可用的 CPU 的信息

```js
console.log(os.cpus()); // [{...},{...},...]
```

`os.endianness()`

根据是使用[大端序或小端序](https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82%E5%BA%8F)编译 Node.js, 返回 `BE` 或 `LE`

```js
console.log(os.endianness()); // LE
```

`os.freemem()`

返回代表系统中可用内存的字节数

```js
console.log(os.freemem()); // 8299479040
```

`os.homedir()`

返回到当前用户的主目录的路径

```js
console.log(os.homedir()); // C:\Users\AOC
```

`os.hostname()`

返回主机名

```js
console.log(os.hostname()); // DESKTOP-9QBQ1DF
```

`os.loadavg()`

返回操作系统对平均负载的计算, 这仅在 Linux 和 macOS 上返回有意义的值

```js
console.log(os.loadavg()); // windows 上没有意义 [ 0, 0, 0 ]
```

`os.networkInterfaces()`

返回系统上可用的网络接口的详细信息

```js
console.log(os.networkInterfaces()); // {...}
```

`os.platform()`

返回为 Node.js 编译的平台：

- `darwin`
- `freebsd`
- `linux`
- `openbsd`
- `win32`
- ...等

```js
console.log(os.platform()); // win32
```

`os.release()`

返回标识操作系统版本号的字符串

```js
console.log(os.release()); // 10.0.19042
```

`os.tmpdir()`

返回指定的临时文件夹的路径

```js
console.log(os.tmpdir()); // C:\Users\AOC\AppData\Local\Temp
```

`os.totalmem()`

返回表示系统中可用的总内存的字节数

```js
console.log(os.totalmem()); // 17045225472
```

`os.type()`

标识操作系统：

- `Linux`
- macOS 上为`Darwin`
- Windows 上为 `Windows_NT`

```js
console.log(os.type()); // Windows_NT
```

`os.uptime()`

返回自上次重新启动以来计算机持续运行的秒数

```js
console.log(os.uptime()); // 177559
```

`os.userInfo()`

返回包含当前 `username`, `uid`,`gid`,`shell` 和 `homedir` 的对象

```js
console.log(os.userInfo()); 
{
    uid: -1,
    gid: -1,
    username: 'AOC',
    homedir: 'C:\\Users\\AOC',
    shell: null
}
```

## events

事件模块提供了 **EventEmitter** 类, 这是在 Nodejs 中处理事件的关键

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
```

> [Node事件模块](http://nodejs.cn/learn/the-nodejs-events-module)

事件监听器返回及使用以下事件：

- 当监听器被添加时返回 `newListener`
- 当监听器被移除时返回 `removeListener`

`emitter.addListener()`

**emitter.on()** 的别名

```js
emitter.addListener('hello', handleEvent); // 绑定 hello 事件
// emitter.on('hello', handleEvent); // 绑定 hello 事件

// 触发 hello 事件的回调
function handleEvent(params) {
    console.log('hello 事件触发了');
    console.log('收到的格式是: ', params);
}
```

`emitter.emit()`

触发事件, 按照事件被注册的顺序同步地调用每个事件监听器

第一个参数是事件名, 后面携带参数即可

```js
emitter.emit('hello', "我是hello事件的参数");
```

`emitter.eventNames()`

返回字符串（表示在当前 `EventEmitter` 对象上注册的事件）数组：

```js
console.log(emitter.eventNames()); // ['hello']
```

`emitter.getMaxListeners()`

获取可以添加到 `EventEmitter` 对象的监听器的最大数量（默认为 10, 但可以使用 `setMaxListeners(n)` 进行设置）

```js
console.log(emitter.getMaxListeners()); // 10
```

`emitter.listenerCount()`

获取作为参数传入的事件监听器的计数

```js
console.log(emitter.listenerCount('hello')); // 1
```

`emitter.listeners()`

获取作为参数传入的事件监听器的数组

```js
console.log(emitter.listeners('hello')); // [ f ]
```

`emitter.off()`

**emitter.removeListener()** 的别名, 新增于 Node.js 10

```js
emitter.removeListener('hello', handleEvent); // 删除事件
// emitter.off('hello', handleEvent); // 删除事件
console.log(emitter.eventNames('hello')); // []
```

`emitter.once()`

添加事件, 该事件只会被触发一次

`emitter.prependListener()`

当使用 `on` 或 `addListener` 添加监听器时, 监听器会被添加到监听器队列中的最后一个, 并且触发事件时是最后一个被调用的, 使用 `prependListener` 则可以在其他监听器之前添加并调用

`emitter.prependOnceListener()`

当使用 `once` 添加监听器时和`emitter.prependListener()`效果一样

`emitter.removeAllListeners()`

移除 `EventEmitter` 对象的所有监听特定事件的监听器

```js
// 监听3个hello事件
emitter.addListener('hello',handleEvent);
emitter.addListener('hello',handleEvent);
emitter.addListener('hello',handleEvent);

function handleEvent() {
    console.log('事件处理函数');
}
// 获取 hello 事件的数量
console.log(emitter.listenerCount('hello')); // 3

// 删除所有 hello 事件
emitter.removeAllListeners('hello');

console.log(emitter.listenerCount('hello')); // 0
```

`emitter.setMaxListeners()`

设置可以添加到 `EventEmitter` 对象的监听器的最大数量（默认为 10, 但可以增加或减少）

```js
console.log(emitter.getMaxListeners()); // 10
// 修改监听器的最大数量
emitter.setMaxListeners(999);
console.log(emitter.getMaxListeners()); // 999
```

## 其他模块

| 模块名                                                       | 描述                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [`util模块`](https://www.runoob.com/nodejs/nodejs-util.html) | node提供常用函数的集合                                      |
| [`net模块`](https://www.runoob.com/nodejs/nodejs-net-module.html) | 用于底层的网络通信。提供了服务端和客户端的的操作            |
| [`dns模块`](https://www.runoob.com/nodejs/nodejs-dns-module.html) | 用于解析域名                                                |
| [`domain模块`](https://www.runoob.com/nodejs/nodejs-domain-module.html) | 简化异步代码的异常处理, 可以捕捉处理try catch无法捕捉的错误 |

## http

http 模块专门用来创建 http 服务

```js
import * as http from "http";
const port = 8888;

// 创建一个 http 实例
http.createServer((req, res) => {
  // console.log("请求对象", req);
  // console.log("响应对象", res);
  
  const urlObj = new URL(req.url, `http:127.0.0.1:${port}`);
  
  if (["/", "/index"].includes(urlObj.pathname)) {
    // 响应
    res.end("hello index");
  } else {
    res.end("404 not found");
  }

  // 监听 8888 端口
}).listen(port, () => {
  console.log(`服务启动 ${port} 端口`);
});
```

> [Nodejs http模块](http://nodejs.cn/learn/the-nodejs-http-module)

`http.METHODS`

此属性列出了所有支持的 HTTP 方法

```js
console.log(http.METHODS);
// [
//     'ACL',        'BIND',        'CHECKOUT',
//     'CONNECT',    'COPY',        'DELETE',
//     'GET',        'HEAD',        'LINK',
//     'LOCK',       'M-SEARCH',    'MERGE',
//     'MKACTIVITY', 'MKCALENDAR',  'MKCOL',
//     'MOVE',       'NOTIFY',      'OPTIONS',
//     'PATCH',      'POST',        'PRI',
//     'PROPFIND',   'PROPPATCH',   'PURGE',
//     'PUT',        'REBIND',      'REPORT',
//     'SEARCH',     'SOURCE',      'SUBSCRIBE',
//     'TRACE',      'UNBIND',      'UNLINK',
//     'UNLOCK',     'UNSUBSCRIBE'
// ]
```

``STATUS_CODES``

此属性列出了所有的 HTTP 状态代码及其描述

```js
console.log(http.STATUS_CODES);
{
  '100': 'Continue',
  '101': 'Switching Protocols',
  '102': 'Processing',
  '103': 'Early Hints',
  '200': 'OK',
   ...
}
```

`http.globalAgent`

指向 Agent 对象的全局实例, 该实例是 `http.Agent` 类的实例

用于管理 HTTP 客户端连接的持久性和复用, 它是 Node.js HTTP 网络的关键组件

```js
console.log(http.globalAgent);

// Agent {
//     _eventsCount: 2,
//     _maxListeners: undefined,
//     defaultPort: 80, 
//     protocol: 'http:',
//     options: { path: null },
//     requests: {},
//     sockets: {},
//     freeSockets: {},
//     keepAliveMsecs: 1000,
//     keepAlive: false,
//     maxSockets: Infinity,
//     maxFreeSockets: 256,
//     scheduling: 'lifo',
//     maxTotalSockets: Infinity,
//     totalSocketCount: 0,
//     ...
// }
```

`http.createServer()`

返回 `http.Server` 类的新实例

```js
const server = new http.createServer();
```

可以给 server 实例 注册 `request` 事件, 当接收到请求就会触发回调

回调的参数

- `request` 请求对象
  请求对象可以获取客户端的一些请求信息

- `response` 响应对象

  响应对象可以给客户端响应消息, 是一个可写流  

```js
const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
    // request.url属性 获取请求端口号以后地址
    console.log('收到客户端请求了, 地址是: ' + request.url);

    /*
        response.write方法 可以给客户端端发送响应数据
            write 方法可以使用多次, 但是最后一定要使用 end方法 来结束响应
                不然客户端就会一直等待
    */
    // response.write('hello');
    // response.write(' nodejs');

    /*
        response.end方法 结束响应, 可以直接在括号里改定数据就不需要写 write方法了
            响应数据只能是 字符串 JSON 和二进制数据
    */ 
    response.end('你好 nodejs');
});


// 绑定端口号, 启动服务, 调用回调   
server.listen(3000, () => {
    console.log('服务器启动成功');
})
```

`http.request()`

发送 HTTP 请求到服务器, 并创建 `http.ClientRequest` 类的实例。

`http.get()`

类似于 `http.request()`, 但会自动地设置 HTTP 方法为 GET, 并自动地调用 `req.end()`

### 类

HTTP 模块提供了 5 个类：

- [`http.Agent`](http://nodejs.cn/api/http.html#class-httpagent)
- [`http.ClientRequest`](http://nodejs.cn/api/http.html#class-httpclientrequest)
- [`http.Server`](http://nodejs.cn/api/http.html#class-httpserver)
- [`http.ServerResponse`](http://nodejs.cn/api/http.html#class-httpserverresponse)
- [`http.IncomingMessage`](http://nodejs.cn/api/http.html#class-httpincomingmessage)

`http.Agent`

Nodejs 会创建 `http.Agent` 类的全局实例, 以管理 HTTP 客户端连接的持久性和复用, 这是 Nodejs HTTP 网络的关键组成部分, 该对象会确保对服务器的每个请求进行排队并且单个 socket 被复用, 出于性能原因, 它还维护一个 socket 池

`http.ClientRequest`

当 `http.request()` 或 `http.get()` 被调用时, 会创建 `http.ClientRequest` 对象

当响应被接收时, 则会使用响应（`http.IncomingMessage` 实例作为`request`参数）来调用 `response` 事件

`http.Server`

当使用 `http.createServer()` 创建新的服务器时, 通常会实例化并返回此类

拥有服务器对象后, 就可以访问其方法：

- `close()` 停止服务器不再接受新的连接
- `listen()` 启动 HTTP 服务器并监听连接

`http.ServerResponse`

由 `http.Server` 创建, 并作为`response`参数传给它触发的 `request` 事件

必须在每个响应事件处理函数上调用 `end()`方法, 它会关闭响应, 当消息完成时服务器会将其发送给客户端

与 HTTP 消息头进行交互的方法：

- `getHeaderNames()` 获取已设置的 HTTP 消息头名称的列表
- `getHeaders()` 获取已设置的 HTTP 消息头的副本
- `setHeader('headername', value)` 设置 HTTP 消息头的值
- `getHeader('headername')` 获取已设置的 HTTP 消息头
- `removeHeader('headername')` 删除已设置的 HTTP 消息头
- `hasHeader('headername')` 如果响应已设置该消息头, 则返回 true
- `headersSent()` 如果消息头已被发送给客户端, 则返回 true

在处理消息头之后, 可以通过调用 `response.writeHead()`

该方法接受 statusCode 作为第一个参数, 可选的状态消息和消息头对象, 将它们发送给客户端

如果消息头还未被发送, 还可以手动赋值

```js
response.statusCode = 500;
response.statusMessage = '内部服务器错误';
```

`http.IncomingMessage`

`http.IncomingMessage` 对象可通过以下方式创建：

- `http.Server`, 当监听 `request` 事件时
- `http.ClientRequest`, 当监听 `response` 事件时

它可以用来访问响应：

- 使用`statusCode`和`statusMessage` 方法来访问状态
- 使用`headers()`或 `rawHeaders` 来访问消息头
- 使用`method()`来访问 HTTP 方法
- 使用`httpVersion()`来访问 HTTP 版本
- 使用url()`来访问 URL
- 使用`socket()`来访问底层的 socket

因为 `http.IncomingMessage` 实现了可读流接口, 因此数据可以使用流访问

### MIME

MIME 就是响应内容类型`Content-type `

在服务器端默认发送的数据是 **utf-8** 编码的, 浏览器时默认使用当前的操作系统的默认编码解析的, 

中文操作系统默认的编码是 **gdk**
在 http 协议中, 可以设置响应头里`Content-type`来指定对应的解码方式(一般都用 utf-8) 和文本类型

具体的其他资源内容类型可以参考: https://www.runoob.com/http/http-content-type.html

```js
// 普通文本
res.setHeader('Content-type','text/plain; charset=utf-8');

// html格式的文本
res.setHeader('Content-type','text/html; charset=utf-8');

// jpeg 图片数据
// 图片资源不需要指定字符编码, 只有字符数据才需要指定编码
res.setHeader('Content-type','image/jpeg');
```

可以使用`mime`包来判断需要的MIME类型

```js
const mime = require("mime");

mime.getType("/paht/hello/file.txt"); // "text/plain"
mime.getType("file.txt"); // "text/plain"
mime.getType(".js"); // "application/javascript"
mime.getType("html"); // "text/html"
mime.getType("md"); // "text/markdown"
```

有的时候我们不需要客户端去打开响应内容, 比如附件下载, 这个时候可以使用`Content-Disposition`字段去控制, 该字段可以用来控制客户端是即时打开浏览还是下载附件, 内容查看对应`inline`, 数据为附件下载时`attachment`, 该字段还可以控制下载的文件名, 格式如下: 

```js
Content-Disposition: attachment; filename="filename.txt"
```

## Node发送网络请求

在Node.js中也是可以发起网络请求的, 可以使用一些知名的库, 比如: `axios`,`request`等, `axios`和前端使用方式是一样的, 这里以`request `为例

安装 `npm install request -S` 

### GET请求

```js
const request = require("request");

request("https://www.baidu.com/", (err, response, body) => {
  if (err) {
    console.log("请求失败", err);
    return;
  }
  // console.log(response); // 响应信息的集合

  if (response.statusCode == 200) { 
    // 响应体
    console.log(body);
  }
})
```

### POST请求

**application/x-www-form-urlencoded (普通表单)**

```js
const request = require("request");

request.post(
  {
    url: url,
    form: { key: 'value' }
  },
  (error, response, body) => {
    // 返回的结果和 GET请求 一样
  })
```

**application/json (JSON表单)**

```js
request({
  url: url,
  method: "POST",
  json: true,
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({ key: 'value' })
}, (error, response, body) => {
  // 返回的结果和 GET请求 一样
})
```

**multipart/form-data (上传文件)**

```js
const url = 'https://www.baidu.com/';
const formData = {
  // 普通文本
  field: 'value',
  // 文件
  file: fs.createReadStream('./img.jpg'),
}

request.post(
  {
    url: url,
    formData: formData
  },
  (error, response, body) => {
    // 返回的结果和 GET请求 一样F
  })
```

**保存文件**

```js
const request = require('request');
const fs = require('fs');
const EventEmitter = require('events');

// request 会返回文件流实例
const instance = request('https://www.jmjc.tech/public/home/img/flower.png');
console.log(instance instanceof EventEmitter); // true


// 通过 可写流+pipe 就可以实现文件下载到本地
request('https://www.jmjc.tech/public/home/img/flower.png')
  .pipe(fs.createWriteStream('./flower.png')) // 下载文件到本地
```

## zlib

用于压缩文件, 可以减少数据传输的大小

```js
import * as fs from "fs";
import * as http from "http";
import * as zlib from "zlib";

const port = 8888;

// 获取 gzip
const gzip = zlib.createGzip();

http.createServer((req, res) => {
  // 读取一个html文件
  const rs = fs.createReadStream("./index.html");

  // 写入响应和响应头同样和 end方法一样只能调用一次
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8", // 指定MIME和字符集不然会乱码
    "Content-Encoding": "gzip" // 指定压缩格式
  })

  rs.pipe(gzip) // 压缩后传输指定的流
    .pipe(res);
    
}).listen(port, () => {
  console.log(`服务启动 ${port} 端口`);
});
```



## url

用于解析url路径

### 旧版API

```js
const url = require("url");

const urlStr = "http://example.com:8080/one/two?a=1&b=2";

// 将url转换为对象
const obj = url.parse(urlStr);
// const obj = url.parse(urlStr, true);

console.log(obj);
// {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'example.com:8080',
//   port: '8080',
//   hostname: 'example.com',
//   hash: null,
//   search: '?a=1&b=2',
//   query: 'a=1&b=2', // url.parse() 第二个参数为true时会将其解析成对象, 变成: { a: '1', b: '2' }
//   pathname: '/one/two',
//   path: '/one/two?a=1&b=2',
//   href: 'http://example.com:8080/one/two?a=1&b=2'
// }

// 将对象转换为url
console.log(url.format(obj)); // http://example.com:8080/one/two?a=1&b=2
```

### 新版API

```js
import * as url from "url";

const urlObj = new URL("/two", "http://example.com:8080/one?a=1&b=2#hello");
console.log(urlObj);
// URL {
//   href: 'http://example.com:8080/one/two?a=1&b=2#hello',
//   origin: 'http://example.com:8080',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'example.com:8080',
//   hostname: 'example.com',
//   port: '8080',
//   pathname: '/one/two',
//   search: '?a=1&b=2',
//   searchParams: URLSearchParams { 'a' => '1', 'b' => '2' },
//   hash: '#hello'
// }

// url请求参数是一个迭代器对象
console.log(urlObj.searchParams.get("a")); // 1


// 遍历了所有的查询参数
for (const [key, value] of urlObj.searchParams) {
  console.log("key: ", key);
  console.log("value: ", value);
}

// 可以对其拼接参数
urlObj.searchParams.append("c", "3");

// 或设置一些其他参数
urlObj.username = "hello";
urlObj.password = "123456";


// 使用 url.format 同样可以将其转换为url字符串 
url.format(urlObj, {
  auth: true, // 用户名密码格式
  fragment: true, // 
  search: true, // 搜索字符串
  unicode: true, // Unicode 编码转换
});

// http://hello:123456@example.com:8080/one/two?a=1&b=2&c=3#hello
```

### 转换格式API

```js
import * as url from "url";

// file协议 转换为系统路径格式
console.log(new URL("file:///C:/path/").pathname); // 错误 /C:/path/
console.log(url.fileURLToPath("file:///C:/path/")); // 正确 C:\path\

// 系统路径格式转换为 file协议
console.log(new URL("file#1", "file:").href); // 错误 file:///file#1
console.log(url.pathToFileURL("file#1").href); // 正确 file:///F:/project/auxiliary-util/file%231

const myUrl = new URL("https://a:b@测试?abc#f00");
console.log(url.urlToHttpOptions(myUrl));
// {
//   protocol: 'https:',
//   hostname: 'xn--0zwm56d',
//   hash: '#f00',
//   search: '?abc',
//   pathname: '/',
//   path: '/?abc',
//   href: 'https://a:b@xn--0zwm56d/?abc#f00',
//   auth: 'a:b'
// }
```

> 使用`fileURLToPath`和`pathToFileURL`会正确的进行编码网址控制字符

## querystring

用于转换查询字符串参数

### parse 和 encode

```js
const queryString = require("querystring");
const str = "a=1&b=2&id=001";
const query = queryString.parse(str);

// 转换查询字符串为对象
console.log(query); // { a: '1', b: '2', id: '001' }
// 对象转换为查询字符串
console.log(queryString.encode(query)); // a=1&b=2&id=001
```

### escape 和 unescape

```js
const queryString = require("querystring");

const str = "<script>console.log('恶意代码')</script>";
const query = queryString.escape(str);

// 转义url中的一些特殊字符
console.log(query); // %3Cscript%3Econsole.log('%E6%81%B6%E6%84%8F%E4%BB%A3%E7%A0%81')%3C%2Fscript%3E

// 转换回来
console.log(queryString.unescape(query)); // <script>console.log('恶意代码')</script>
```

## Buffer

Buffer(缓冲区) 的结构和数组很像, 操作方法和数组类似

数组中不能存储二进制文件, 而 Buffer 就是专门用来存储二进制数据的

使用 Buffer 不需要引入模块, 直接使用, 

在 Buffer 中存储的都是二进制数据, 但是在显示时是以16进制显示的

它由 Nodejs [Buffer](http://nodejs.cn/api/buffer.html#buffer)类实现 

### Buffer的作用

Buffer 被引入用以帮助开发者处理二进制数据, 在传统生态上js只处理字符串而不是二进制数据

Buffer 与流紧密相连, 当流处理器接收数据的速度**快于**其消化的速度时, 则会将数据放入 buffer 中

在现实场景就是: 在线观看视频时预先加载后面的内容(**白色的进度条**), 即下载数据的速度比查看数据的速度快, 且浏览器会对数据进行缓冲

`Buffer.from(str)`

将一个字符串转换为 Buffer

```js
const str = "hello buffer";

// 将字符串转换为 Buffer 数据
const buf = Buffer.from(str);
console.log(buf); // <Buffer 68 65 6c 6c 6f 20 62 75 66 66 65 72>

// 将 Buffer 数据转换为字符串
console.log(buf.toString()); // hello buffer (默认utf8)
console.log(buf.toString("hex")); // 68656c6c6f20627566666572
console.log(buf.toString("base64")); // aGVsbG8gYnVmZmVy
```

> buffer 数据的显示都是以16进制显示的, 需要使用 `tostring` 方法来进行转换

`Buffer.alloc(size) `

创建一个指定大小(以字节为单位)的 Buffer, 使用零进行初始化

```js
const buf = Buffer.alloc(1024); // <Buffer 00 00 00 00 ...>
```

`Buffer.allocUnsafe(size) `

创建一个指定大小(以字节为单位)的 Buffer, 不会被初始化, 可能会包含敏感数据

```js
// 每次创建的 Buffer数据都不一样
const buf = Buffer.allocUnsafe(1024); // <Buffer d8 2e db 9f f6 01 ...>
```

> 当 `Buffer` 内存被读取时, 如果内存中存在较旧的数据, 则可以被访问或泄漏
>
> 这就是真正使 `allocUnsafe` 不安全的原因, 在使用它时必须格外小心

### 访问 buffer 的内容

可以像数组一样被访问

```js
const str = "abcde";
const buf = Buffer.from(str);

// 下标操作访问
buf[0] = 65; // 对应 A

console.log(buf[1]); // 98

console.log(buf.length); // 5

// 循环
for (const b of buf) {
  console.log(b); // 输出对应的 Unicode 码
}

console.log(buf.toString()); // Abcde

// 会覆盖之前的数据
buf.write("ooo");
console.log(buf.toString()); // ooode

// 截取 Buffer
const newBuf = buf.slice(3, 5);
console.log(newBuf.toString()); // de
```

这些数字是 **Unicode** 码, 用于标识 buffer 位置中的字符

#### Buffer 字符编码

通过使用字符编码, 可实现 Buffer 实例与 JavaScript 字符串之间的相互转换, 目前所支持的字符编码如下所示：

- ‘**ascii**’ - 仅适用于 7 位 ASCII 数据。此编码速度很快, 如果设置则会剥离高位。
- ‘**utf8**’ - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8,(不指定编码为`utf-8`)
- ‘**utf16le**’ - 2 或 4 个字节, 小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- ‘**ucs2**’ - ‘utf16le’ 的别名。
- ‘**base64**’ - Base64 编码。当从字符串创建 Buffer 时, 此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
- ‘**latin1**’ - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义, 第 63 页, 作为 Latin-1 的补充块和 C0/C1 控制码）。
- ‘**binary**’ - ‘latin1’ 的别名。
- ‘**hex**’ - 将每个字节编码成两个十六进制的字符。

### 复制 buffer

使用`copy()`可以复制 buffer

```js
const str = "hello";
const buf = Buffer.from(str);

// 定义一个12字节长度的空buffer
const bufCopy = Buffer.alloc(12);

// 复制 buf 到 bufCopy
buf.copy(bufCopy);

// 查看结果
console.log(buf.toString()); // hello
console.log(bufCopy.toString()); // hello
```

默认情况下, 会复制整个 buffer, 另外的 3 个参数可以定义**开始位置、新的buffer偏移位置、**以及**新的 buffer 长度**

```js
const str = "hello";
const buf = Buffer.from(str);

// 定义一个12字节长度的空buffer
const bufCopy = Buffer.alloc(12);

// 复制 buf 到 bufCopy, 长度是依据被复制的buffer来算的
buf.copy(bufCopy, 0, 1, 3);

// 查看结果
console.log(buf.toString()); // hello
console.log(bufCopy.toString()); // el
```

### 切片buffer

如果要创建 buffer 的局部数据, 则可以创建切片,  **切片不是副本**, 原始 buffer 仍然是真正的来源, 如果原始 buffer改变了, 则切片数据也会改变

和数组的切片方法类似, 也是使用 `slice()`,  第一个参数是起始位置, 可以指定第二个参数作为结束位置

```js
const str = "hello";
const buf = Buffer.from(str);

const bufSlice = buf.slice(0);
console.log(bufSlice); // hello 

// 负数规则和数组的 slice 一样
console.log(buf.slice(0, -2).toString()); // hel

// 修改切片的buffer
bufSlice[1] = 104;
bufSlice[2] = 104;

// 修改后源数据和切片数据都会改变
console.log(buf.toString()); // hhhlo
console.log(bufSlice.toString()); // hhhlo
```

## stream

### 什么是流

流是为 Nodejs 应用程序提供动力的基本概念之一

它们是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换

流不是 Nodejs 特有的概念, 是在几十年前 Unix 操作系统中引入的, 程序可以通过管道运算符`|`对流进行交互

例如, 在传统的方式中, 当告诉程序读取文件时, 这会将文件从头到尾读入内存, 然后进行处理

如果使用流的方式, 则可以逐个片段地读取并处理, 而无需全部保存在内存中

Node.js 的 [`stream`](http://nodejs.cn/api/stream.html) 模块 提供了构建所有流 API 的基础。 所有的流都是 [EventEmitter](http://nodejs.cn/api/events.html#events_class_eventemitter) 的实例

### 流的优点

- **内存效率**: 无需加载大量的数据到内存中即可进行处理
- **时间效率**: 当获得数据之后就可以开始处理数据, 这样所需的时间更少, 而不必等到整个数据加载完成后可用

> [Nodejs 流](http://nodejs.cn/learn/nodejs-streams)

### 使用流读取和写入文件

使用流读取文件适用于一些比较大的文件, 会持续的读取和写入文件

`fs.createReadStream(path)`

根据给定的路径创建一个**可读流**对象并返回(不存在对应的文件会报错)

可读流事件: 

- open 打开文件
- data 当有数据可读时触发。
- error 在读收和写入过程中发生错误时触发。
- close 关闭文件
- end 没有更多的数据可读时触发

```js
// 大文件的读取不适合使用普通的fsAPI, 容易导致内存溢出, 使用流为最佳
import * as fs from "fs";
import * as path from "path";

const __dirname = path.resolve();

// 可读流 
const rs = fs.createReadStream(path.resolve(__dirname, "./assets/test.zip"));

rs.on("open", () => {
  console.log("可读流打开了文件");
});

rs.on("data", (chunk) => {
  console.log(chunk.toString());
});

rs.on("end", () => {
  console.log("可读流读取完成");
});

rs.on("close", () => {
  console.log("可读流关闭了");
});

setTimeout(() => {
  // 取消可读流
  rs.close();
}, 1000);
```

可读流可以在http模块中使用

```js
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const server = http.createServer((req, res) => {
  // 可读流 
  const rs = fs.createReadStream(path.resolve(__dirname, "./data.text"));
  // 使用 pipe方法 
  rs.pipe(res);
})
server.listen(3000);
```

当要发送的数据块已获得时就立即开始将其流式传输到 HTTP 客户端, 而不是等待直到文件被完全读取

`pipe()`

可以在文件流上调用 `pipe()` 方法, 在来源流上调用它, 它会获取自动来源流, 并将其通过管道传输到目标流

`pipe()` 方法的返回值是目标流, 这使得可以链式多个调用`pipe()`如下所示

```js
src.pipe(dest1).pipe(dest2);
// 相当于
src.pipe(dest1);
dest1.pipe(dest2);
```

> `pipe()`传输流是异步的

`fs.createWriteStream(path)`

根据给定的路径创建一个**可写流**对象并返回(不存在对应的文件时会被创建)

```js
// 大文件的写入也同样使用流为最佳
import * as fs from "fs";
import * as path from "path";

const __dirname = path.resolve();

// 可读流 
const rs = fs.createReadStream(path.resolve(__dirname, "./assets/test.zip"));
// 可写流
const ws = fs.createWriteStream(path.resolve(__dirname, "./assets/test2.zip"));

// 通过 write方法可以同步的向可写流向文件中写入内容
ws.write("通过可写流写入的内容\r\n");
ws.write("通过可写流写入的第二次内容\r\n");
ws.write("最后一行就不写了\r\n");

// 通过 pipe方法 将可读流传输到可写流里
rs.pipe(ws);

ws.write("write方法写入的数据永远在pipe方法传输的数据前面(同步)");

rs.on("end", () => {
  console.log("读取完成");
  // 关闭流
  ws.end();
});
```

### 流驱动的 Node.js API

 标准输入流

由于流的优点, 许多 Nodejs 核心模块都提供了原生的流处理功能, 最值得注意的有：

- `process.stdin` 返回连接到 **stdin** 的流(`标准输入流`)
- `process.stdout` 返回连接到 **stdout** 的流(`标准输出流`)
- `process.stderr` 返回连接到 **stderr** 的流(`标准错误流`)
- `fs.createReadStream()` 创建文件的可读流
- `fs.createWriteStream()` 创建到文件的可写流
- `net.connect()` 启动基于流的连接
- `http.request()` 返回 **http.ClientRequest** 类的实例, 该实例是可写流
- `zlib.createGzip()` 使用 **gzip**（压缩算法）将数据压缩到流中
- `zlib.createGunzip()` 解压缩 **gzip** 流
- `zlib.createDeflate()` 使用 **deflate**（压缩算法）将数据压缩到流中
- `zlib.createInflate()` 解压缩 **deflate** 流

### 不同类型的流

流分为四类：

- `Readable`(可读流): 可以通过管道读取、但不能通过管道写入的流（可以接收数据, 但不能向其发送数据）, 当推送数据到可读流中时, 会对其进行缓冲, 直到使用者开始读取数据为止
- `Writable`(可写流): 可以通过管道写入、但不能通过管道读取的流（可以发送数据, 但不能从中接收数据）
- `Duplex`(双工流): 可以通过管道写入和读取的流, 基本上相对于是可读流和可写流的组合
- `Transform`(转换流): 类似于双工流、但其输出是其输入的转换的转换流

#### 自定义创建可读流

从 [`stream`](http://nodejs.cn/api/stream.html#stream) 模块获取可读流类[`Readable`](http://nodejs.cn/api/stream.html#class-streamreadable), 对其进行初始化并实现 `readable._read()` 方法

```js
import * as stream from "stream";

// 实例化
const readableStream = new stream.Stream.Readable();
```

实现 `_read` 方法

```js
readableStream._read = ()=>{};
```

也可以在构造时传入`read`选项来实现`_read`

```js
const readableStream = new Stream.Readable({
    read(){}
});
```

初始化完毕, 使用`push`方法发送数据到可读流

```js
readableStream.push('hello');
readableStream.push('world');
```

#### 自定义创建可写流

若要创建可写流, 需要实例化 [`Writable`](http://nodejs.cn/api/stream.html#class-streamwritable) 类, 并实现其 `_write()` 方法

```js
writableStream._write = (chunk, encoding, next) => {
    console.log(chunk.toString());
    next();
}
```

同样可以在构造时传入 `write` 选项

```js
const writableStream = new Stream.Writable({
    write(chunk, encoding, next) {
        console.log(chunk.toString());
        next();
    }
});
```

#### 从自定义可读流中获取数据

```js
const Stream = require('stream');

const readableStream = new Stream.Readable({
    read() { }
});

const writableStream = new Stream.Writable({
    // chunk 数据块, encoding 编码 next函数用于放行
    write(chunk, encoding, next) {
        // 打印收到的数据块
        console.log(chunk.toString());
        next();
    }
});

// 通过 pipe方法 传输数据到可写流里
readableStream.pipe(writableStream);

// 发送数据到可读流
readableStream.push('hello');
readableStream.push('world');
```

也可以使用 `readable` 事件直接地消费可读流

```js
readableStream.on('readable', () => {
    const data = readableStream.read();
    console.log(data); // <Buffer 68 65 6c 6c 6f 77 6f 72 6c 64>
    console.log(data.toString()); // helloworld
});
```

使用可写流的 `write()` 方法发送数据到可写流

```js
writableStream.write('hey!\n');
```

使用`end()`方法来结束可写流

```js
writableStream.end('结束');
```

## crypto 

[`crypto模块`](http://nodejs.cn/api/crypto.html) 是 Node.js 内置的密码模块, 封装了一些密码处理方法

```js
import * as crypto from "crypto";
```

**摘要算法**

```js
const cipher = crypto.createHash("md5"); // 指定算法
/**
 * update方法, 可以多次调用
 * 第一个参数表示要加密的数据, 必须是字符串格式
 * 第二参数表示要传入数据的格式, 可以是"utf8", "binary", "ascii", "latin1", 默认: "utf8"
 * 第三个参数表示要加密数据的输出格式, 可以是"latin1",  "base64" 或者 "hex", 没有则返回Buffer
 */
cipher.update("hello");
cipher.update("world");

const data = JSON.stringify({ id: 1, name: "张三" });
cipher.update(data);

// 指定输出的加密格式, 
const md5 = cipher.digest("base64");
console.log(md5); // RChFS9qOBovOqHnadv2tRA==
```

**hmac 算法**

hmac算法, 增强版的摘要算法, 需要一个密钥(也叫做**盐**)

```js
import * as crypto from "crypto";

const secret = "密钥"
// 使用 createHmac方法, 指定为 sha256 算法, 然后给定一个密钥
const hmacsha256 = crypto.createHmac("sha256", secret);

// 加密数据
hmacsha256.update("data");
hmacsha256.update("append data1");
hmacsha256.update("append data2");

// 加密后的格式为 hex
const pwd = hmacsha256.digest("hex");
console.log(pwd); // 1433c412d4400ff24832a79305a5be8a4bdde65ff03042cc8e68e254d43fe17a
```

**对称加密**

对称加密是一种双向加密算法, 跟摘要算法的单向加密不同, 它是支持加解密的, 通过配备一个`密钥`完成

AES 是对称加密的一种, 常见算法有 `aes192` `aes-128-ecb` `aes-256-cbc`

```js
import * as crypto from "crypto";

const dataJson = JSON.stringify({ id: 1, name: "张三" });
const key = Buffer.alloc(16); // 初始化密钥(16为字节)
const iv = Buffer.alloc(16); // 初始化向量(16为字节)

// 加密
const encrypt = (key, iv, data) => {
  try {
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    // 加密数据格式为 utf8, 输出加密格式为 hex
    // 调用了 cipher.final() 方法，则 Cipher 对象就不能再用于加密数据, 多次调用 cipher.final() 将导致抛出错误 
    return cipher.update(data, "utf8", "hex") + cipher.final("hex");
  } catch (e) {
    console.log("加密失败");
    return e.message || e;
  }
}

// 加密数据
const hash = encrypt(key, iv, dataJson);
console.log(hash); // 30ea685209dd3fce13aa8e90a147d475ed42922aaff8faefd0cd2fb569dd0e25

// 解密
const decipher = (key, iv, crypted) => {
  try {
    const ciphed = crypto.createDecipheriv("aes-128-cbc", key, iv);
    // 解密数据格式为 hex, 输出解密格式为 utf8
    return ciphed.update(crypted, "hex", "utf8") + ciphed.final("utf8");
  } catch (e) {
    console.log("解密失败");
    return e.message || e;
  }
}
const dataStr = decipher(key, iv, hash);
console.log(dataStr); // {"id":1,"name":"张三"}
```

## child_process

[child_process](http://nodejs.cn/api/child_process.html) 是 Node.js 的内置模块, 用于创建子进程

## 开发环境与生产环境

**在 Node 中可以为生产环境和开发环境使用不同的配置**

Node.js 假定其始终运行在开发环境中, 可以通过设置 `NODE_ENV=production` 环境变量来向 Node.js 发出正在生产环境中运行的信号

通常通过在 **shell** 中执行以下命令来完成

设置 Windows 中的环境变量

```shell
SET NODE_ENV=production # 设置为生产环境
SET NODE_ENV=development # 设置为开发环境
```

设置 Linux 中的环境变量

```shell
export NODE_ENV=production # 设置为生产环境
export NODE_ENV=development # 设置为开发环境
```

> 未设置环境变量时默认为`undefined`

但最好将其放在的 shell 配置文件中（例如, 使用 Bash shell 的 `.bash_profile`）, 否则当系统重启时, 该设置不会被保留

也可以通过将环境变量放在应用程序的初始化命令之前来应用它

```shell
NODE_ENV=production node app.js
```

设置环境为 `production` 通常可以确保：

- 日志记录保持在最低水平
- 更高的缓存级别以优化性能

**可以使用条件语句在不同的环境中执行代码**

```js
if (process.env.NODE_ENV === "development") {
  // 开发环境代码
}
if (process.env.NODE_ENV === "production") {
  // 生产环境代码
}
if(["production", "staging"].indexOf(process.env.NODE_ENV) >= 0) {
  //...
})
```

例如, 在 Express 应用中, 可以使用此工具为每个环境设置不同的错误处理程序

```js
if (process.env.NODE_ENV === "development") {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
})

if (process.env.NODE_ENV === "production") {
  app.use(express.errorHandler())
})
```

## 断点调试

node 中的断点调试直接添加断点然后`node xxx`是不会生效的, 需要设置环境, 以 VS Code 为例, 先生成配置文件`运行 -> 添加配置`会生成一个`.vscode`目录里面有一个`launch.json`配置文件, 里面可以设置[很多字段](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes), 通过设置`program`字段, 这个字段可以配置需要调试的文件, 支持字符串目录, 也可以使用变量`${file}`(表示当前打开的文件)

> 了解更多可以见[VSCode 中的Node 调试](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## 错误处理

Node.js 中的错误通过异常进行处理

### 创建异常

使用 `throw` 关键字创建异常

```js
throw value;
```

一旦 JavaScript 执行到此行, 则常规的程序流会被停止, 且控制会被交给最近的异常处理程序

通常, 在客户端代码中, `value` 可以是任何 JavaScript 值（包括字符串、数字、或对象）

在 Node.js 中, 一般不抛出字符串, 而仅抛出 `Error` 对象

### 错误对象

错误对象是 Error 对象的实例、或者继承自 Error 类, 由 [Error](http://nodejs.cn/api/errors.html#errors) 核心模块提供

```js
throw new Error("错误信息");

// or

class myError extends Error {
  //...
}
throw new myError();
```

### 处理异常

异常处理程序是 `try/catch` 语句, 与客户端一致

### 捕获未捕获的异常

如果在程序执行过程中引发了未捕获的异常, 则程序会崩溃

若要解决此问题, 则监听 `process` 对象上的 `uncaughtException` 事件

```js
process.on("uncaughtException", error => {
    console.error('有一个未捕获的错误', error);
    process.exit(1); // 强制性的退出 shell
});
```

> Node 在处理异常是约定了, 将异常作为回调函数的第一个实参传回, 如果为空则表示此次调用没有异常

### Promise 异常

和客户端一致使用`.catch`子句或者`try/catch`语句

## Node.js 中记录对象

在 Node.js 中 `console.log()`控制台打印输出对象的信息, 对象结构在经过两个级别的嵌套后, Node.js 会放弃展开并打印 `[Object]` 作为占位符

可以使用 `JSON.stringify` 进行转义后再打印

```js
// 都可以
console.log(JSON.stringify(obj, null, 2));
console.log(JSON.stringify(obj, "*", 2));
console.log(JSON.stringify(obj, undefined, 2));
```

或者可以修改`util`模块的[`defaultOptions`](http://nodejs.cn/api/util.html#utilinspectdefaultoptions)配置

```js
require('util').inspect.defaultOptions.depth = null; // 之后打印的对象层级都会被展开
console.log(obj); 
```

> 通过修改`util`模块配置, 也有个问题, 就是之后的嵌套对象都会被展平, 这可能会把复杂对象也全部展开了

## Node 模块化

在Node中默认是使用`CommonJS`模块化的, 同时支持对标准`ES6`模块的兼容(不完全兼容), 

Node再加载模块时需要知道该模块是使用`require()`和`exports`/`module.exports`, 还是使用`import`和`export`

Node再把一个js文件加载为`CommonJS`模块时, 会自动定义`require()`函数及其标识符`exports`和`module`, 

不会启用`import`和`export`, 相反, Node在把js文件加载为`ES6`模块时, 它必须启用`import`和`export`, 

同时必须不能定义`require` `exports`和`module`等额外的关键字

**指定Node加载对应的模块化**

- 以**.mjs**后缀的js文件, Node会始终使用`ES6`模块化加载它

- 以**.cjs**后缀的js文件, Node会始终使用`commonjs`模块化加载它

- 以**.js**文件后缀的js文件, 默认就是`CommonJS`模块化

- 还可以在`package.json`里添加一个`type`字段, 来指定使用那种模块化标准

	- **module**:  使用`ES6`模块化

	- **commonjs**: 使用`CommonJS`模块化

		```json
		{
		  "name": "test",
		  "version": "1.0.0",
		  "description": "",
		  "type": "module", // 使用ES6模块化
		   ...
		}
		```

> Node中的大部分模块都是`CommonJS`模块化格式的, 故Node支持使用`import`加载`CommonJS`模块, 但是不能使用`require()`加载`ES6`模块

## 使用 TypeScript

安装`typescript`npm包即可使用 typescript 语法和`tsc`命令

```shell
npm install typescript
```

安装`@types/node`包, 以获得node模块的类型提示

`package.json`的`type`字段设置为`module`就可以使用`ESModule`

使用`ts-node`包可以直接运行`.ts`文件

```sh
# 将 index.ts 转换为esm并运行
node --loader ts-node/esm ./index.ts
```

Node.js 中的知名框架

- [NestJS](https://nestjs.com/) - 健壮且功能齐全的框架, 可轻松愉快地创建可扩展且结构合理的系统
- [TypeORM](https://typeorm.io/#/) - 伟大的 ORM, 受其他语言（如 Hibernate、Doctrine 或 Entity Framework）的其他知名工具的影响
- [RxJS](https://rxjs.dev/) - 广泛用于反应式编程的库

## WebAssembly

[WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly) 是一种高性能的类汇编语言, 可以从包括 C/C++、Rust 和 AssemblyScript 在内的无数语言进行编译。 目前, Chrome、Firefox、Safari、Edge 和 Node.js 都支持它！

WebAssembly 规范详细说明了两种文件格式, 一种是二进制格式, 被称为 WebAssembly 模块, 扩展名为 `.wasm`；另一种是相应的文本表示格式, 被称为 WebAssembly 文本, 扩展名为 `.wat`

### 关键概念

- 模块 - 编译后的 WebAssembly 二进制文件, 即 `.wasm` 文件
- 内存 - 可调整大小的 **ArrayBuffer**
- 表格 - 未存储在内存中的引用的可调整大小的类型化数组
- 实例 - 模块及其内存、表格、以及变量的实例化

为了使用 WebAssembly, 需要 `.wasm` 二进制文件和一组 API 来与 WebAssembly 通信

Node.js 通过全局的 [`WebAssembly`](http://nodejs.cn/api/wasi.html) 对象提供必要的 API

```js
console.log(WebAssembly);
// Object [WebAssembly] {
//     compile: [Function: compile],
//     validate: [Function: validate],
//     instantiate: [Function: instantiate]
// }
```

### 生成 WebAssembly 模块

有多种方法可用于生成 WebAssembly 二进制文件, 包括：

- 手工编写 WebAssembly（`.wat`）并使用 [wabt](https://github.com/webassembly/wabt) 等工具转换为二进制格式
- 在 C/C++ 应用程序中使用 [emscripten](https://emscripten.org/)
- 在 Rust 应用程序中使用 [wasm-pack](https://rustwasm.github.io/wasm-pack/book/)
- 如果你喜欢类似 TypeScript 的体验, 则使用 [AssemblyScript](https://www.assemblyscript.org/)

> 其中一些工具不仅会生成二进制文件, 还会生成 JavaScript 代码和相应的 HTML 文件以在浏览器中运行

一旦有了 WebAssembly 模块, 就可以使用 Node.js `WebAssembly` 对象来实例化它

```js
// 假设 add.wasm 文件存在, 其中包含添加了 2 个提供的参数的函数
const fs = require('fs');
const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
  // 导出的函数位于 instance.exports 下
  const add = wasmModule.instance.exports.add;
  const sum = add(5, 6);
  console.log(sum); // 输出：11
});
```

### 与操作系统交互

WebAssembly 模块本身不能直接访问操作系统功能

可以使用第三方工具 [Wasmtime](https://docs.wasmtime.dev/) 来访问此功能

`Wasmtime` 利用 [WASI](https://wasi.dev/) API 来访问操作系统功能

## Express 

**[Express](https://www.expressjs.com.cn/5x/api.html#express)** 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用, 和丰富的 HTTP 工具

使用 Express 可以快速地搭建一个完整功能的网站

Express 框架核心特性：

- 可以设置中间件来响应 HTTP 请求
- 定义了路由表用于执行不同的 HTTP 请求动作
- 可以通过向模板传递参数来动态渲染 HTML 页面

安装`npm install express -S`

几个比较重要的模块:

- **body-parser** - node.js 中间件, 通过`req.body`可获取`post`请求的数据
- **cookie-parser** - 这就是一个解析**cookie**的工具。通过`req.cookies`可以取到传过来的**cookie**, 并把它们转成对象
- **multer** - node.js 中间件, 用于处理`enctype="multipart/form-data"`(设置表单的MIME编码)的表单数据

**基本使用:**

```js
// 引入 express
const express = require("express");
// 调用 express 获取 app对象
const app = express();

// get请求 地址为 /
app.get('/', (request, response) => {
    // request 为请求对象
    // response 为响应对象
    
    // response调用json方法返回 hello wrold
    response.json('hello world');
});

// 侦听8080端口, 侦听成功调用回调函数
app.listen(8080, () => {
    console.log(`服务启动8080端口....`);
});
```

访问`http://localhost:8888/`就可以看到**hello world**

### app.use

**app.use([path,]callback[,callback...])**

在指定路径挂载指定的[中间件](http://expressjs.com/guide/using-middleware.html)函数或函数：当请求路径的基匹配时执行中间件函数`path`(默认值`/`)

```js
app.use((req, res, next)=> {
  console.log(Date.now());
  next();
})
```

### 请求和响应

**Express** 应用使用回调函数的参数： **request** 和 **response** 对象来处理请求和响应的数据

```js
app.post('/test', function (req, res) {
   // ...
});
```

[**Request 对象**](https://www.expressjs.com.cn/en/4x/api.html#req)表示 HTTP 请求, 包含了请求查询字符串, 参数, 内容, HTTP 头部等属性。常见属性有：

|            属性             |                             描述                             |                 属性                 |                      描述                      |
| :-------------------------: | :----------------------------------------------------------: | :----------------------------------: | :--------------------------------------------: |
|         **req.app**         |  当callback为外部文件时, 用**req.app**访问**express的实例**  |           **req.baseUrl**            |           获取路由当前安装的URL路径            |
|        **req.body**         | 获取**post**发送的数据解析出来的对象, 需要**body-parser**中间件 |    **req.fresh  <br />req.stale**    | 判断请求缓存是否还「新鲜」, 也就是内容没有改变 |
|       **req.headers**       |                        请求头信息对象                        |           **req.cookies**            |                获取**cookies**                 |
| **res.header(key,  value)** |                      设置响应请求头信息                      |            **req.get()**             |            获取指定的**HTTP**请求头            |
|  **req.hostname  req.ip**   |                      获取主机名和IP地址                      | **req.originalUrl**<br />**req.url** |        原始请求**URL**<br />匹配**url**        |
|       **req.params**        |      在路由地址使用**/:id/:name** 匹配**params**的参数       |             **req.path**             |                  获取请求路径                  |
|      **req.protocol**       |                         获取协议类型                         |            **req.query**             |            查询字符串解析出来的对象            |
|        **req.route**        |                      获取当前匹配的路由                      |          **req.subdomains**          |                   获取子域名                   |
|      **req.accepts()**      |                  检查可接受的请求的文档类型                  |           **req.is(type)**           |      判断请求头**Content-Type**的MIME类型      |

[**Response 对象**](https://www.expressjs.com.cn/en/4x/api.html#res)表示 HTTP 响应, 即在接收到请求时向客户端发送的 HTTP 响应数据(是一个可写流), 常见属性有：

|               属性               |                             描述                             |                属性                |              描述              |
| :------------------------------: | :----------------------------------------------------------: | :--------------------------------: | :----------------------------: |
|       **res.headersSent**        |                 查看http响应是否响应了http头                 |     **res.append(key, value)**     |         追加http响应头         |
|   **res.attachment(filePath)**   |                         响应文件请求                         |     **res.cookie(key,value)**      |         设置**cookie**         |
| **res.clearCookie(cookiename)**  |                        删除**cookie**                        |          **res.get(key)**          |       获取响应header数据       |
|   **res.header(key,  value)**    |                      设置响应请求头信息                      |         **res.type(type)**         | 设置**Content-Type**的MIME类型 |
|        **res.json(data)**        | 返回json数据 会自动设置响应**header Content-type** 为json格式 **application/json** | **res.setHeader()<br />res.set()** |           设置请求头           |
| **res.redirect(301,'/api/aes')** |            重定向 把访问的地址跳转到另一个地址上             |         **res.send(data)**         | 发送数据 可以是任意类型的数据  |
|    **res.sendFile(filePath)**    |                           发送文件                           |        **res.status(404)**         |      设置状态码, 默认200       |

### 覆盖 Express API

**Express API** 由请求和响应对象的各种方法和属性组成, 这些是由原型继承的 API 有两个扩展点：

- 全局原型的`express.request`和`express.response`
- 特定于应用程序的原型`app.request`和`app.response`

#### 修改方法

可以通过分配自定义函数来用自己的方法覆盖现有方法的签名和行为

```js
// 覆盖 res.sendStatus 方法的行为
app.response.sendStatus = function (statusCode, type, message) {
  return this.contentType(type)   // 指定编码类型
    .status(statusCode) // 指定响应状态码
    .send(message); // 响应体
}
```

**使用**

```js
res.sendStatus(
    404, 
    'application/json', 
    JSON.stringify({
        message: '响应失败了'
    })
);
```

#### 添加特性

Express API 中的属性是：

- 分配的属性（例如：`req.baseUrl`, `req.originalUrl`）

- 定义为`getters`（例如：`req.secure`, `req.ip`）

由于分配的属性在当前请求-响应周期的上下文中会动态分配给`request`和`response`对象, 因此它们的行为不能被覆盖, `getters`的属性是可以覆盖的

```js
// 通过修改 app.request 来影响当前应用程序下的 req.ip 获取的值
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get: function () { 
      return this.get('Client-IP') 
  }
})
```



### 静态文件

**Express** 提供了内置的中间件 `express.static` 来设置静态文件

```js
//将静态文件目录设置为 根目录/xxx.png
app.use(express.static('public'));
//或者
app.use(express.static(__dirname + '/public'));
```

设置了静态资源目录后, **Express** 会在静态资源目录下查找文件, 存放静态文件的目录名不会出现在 **URL** 中

如果要使用多个静态资源目录, 请多次调用 `express.static` 中间件函数：

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

> 访问静态资源文件时, `express.static` 中间件函数会根据目录的添加顺序查找所需的文件

指定静态文件的前缀

```js
//将静态文件目录设置为 根目录/static/xxx.png
app.use('/static', express.static('public'));
```

### 路由

路由决定了匹配那个函数去响应客户端请求

请求类型共有: `GET` `POST` `DELETE` `PUT` `PATCH` `OPTIONS`

常用的就是: `GET` `POST` `DELETE` `PUT`

```js
//  主页 GET 请求
app.get('/', (req, res)=> {
   // 可以链式调用
   res.status(200).json('index GET');
});


//  /test/post POST 请求
app.post('/test/post', (req, res)=> {
   res.json('/test/post POST');
});

//  all 方法响应所有的请求
app.all('/all', (req, res)=> {
   res.json('/all');
});

//  地址栏可以使用*来匹配
// a和c之间可以是任何字母数字之类的合法url字符
app.all('/test/a*c', (req, res)=> {
   res.json('/test/a*c');
});

// * 匹配所有的所有的地址一般放到最后兜底
app.all('*', (req, res)=> {
   res.json('404 Not Found');
});
```

> Express 的路由匹配时基于[`Path-to-RegExp`](https://www.npmjs.com/package/path-to-regexp)

#### 路由参数

路由参数是命名的 URL 段, 用于捕获在 URL 中的位置指定的值

捕获的值填充到`req.params`对象中, 路径中指定的路由参数的名称作为它们各自的键

```js
路由地址: /users/:userId/books/:bookId
请求URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

要使用路由参数定义路由, 只需在路由的路径中指定路由参数

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params); // { "userId": "34", "bookId": "8989" }
})
```

> 路由参数的名称必须由“单词字符”（[A-Za-z0-9_]）组成

#### 多个回调函数处理路由

```js
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

const cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

const cb2 = function (req, res) {
  res.send('Hello express!');
}

app.get('/express', [cb0, cb1, cb2]);
```

**函数数组+匿名函数处理路由**

```js
app.get('/express', [cb0, cb1], (req, res, next) => {
    console.log('匿名函数处理');
    next();
}, (req, res) => {
    res.send('Hello express');
});
```

#### 响应方法

| 方法                                                         | 描述                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| [res.download()](https://www.expressjs.com.cn/en/4x/api.html#res.download) | 提示要下载的文件。                                     |
| [res.end()](https://www.expressjs.com.cn/en/4x/api.html#res.end) | 结束响应过程。                                         |
| [res.json()](https://www.expressjs.com.cn/en/4x/api.html#res.json) | 发送 JSON 响应。                                       |
| [res.jsonp()](https://www.expressjs.com.cn/en/4x/api.html#res.jsonp) | 发送带有 JSONP 支持的 JSON 响应。                      |
| [res.redirect()](https://www.expressjs.com.cn/en/4x/api.html#res.redirect) | 重定向请求。                                           |
| [res.render()](https://www.expressjs.com.cn/en/4x/api.html#res.render) | 渲染视图模板。                                         |
| [res.send()](https://www.expressjs.com.cn/en/4x/api.html#res.send) | 发送各种类型的响应。                                   |
| [res.sendFile()](https://www.expressjs.com.cn/en/4x/api.html#res.sendFile) | 将文件作为八位字节流发送。                             |
| [res.sendStatus()](https://www.expressjs.com.cn/en/4x/api.html#res.sendStatus) | 设置响应状态代码并将其字符串表示形式作为响应正文发送。 |

#### 路由模块化

当路由很多的时候, 就需要使用路由模块化来方便管理

路由模块文件`router/test.js`

```js
const express = require('express');
// 获取路由实例
const router = express.Router();
// 定义路由
router.get('/testModule', (req, res) => {
    res.json('route module');
});
// 暴露路由对象
module.exports = router;
```

> `express.Router` 可以理解为一个迷你版的 `app` 对象, 但是它功能完备, 同样支持注册中间件和路由

入口文件`app.js`

```js
const express = require("express");
const app = express();
// 引入路由对象
const text = require('./router/test');
// 指定地址使用应用路由对象, 当访问 根路由/test 就会去匹配 test路由文件里的路由
app.use('/test', text);
```

访问`http://localhost:8888/test/testModule`就可以访问对应路由模块

#### 跨域配置

在node中出现跨域可以使用`cors`模块解决

npm下载 cors: `npm install cors -S`

```js
// 引入 cors 模块
const cors = require( 'cors' ); 
// 应用 cors 模块
app.use(cors()); 
```

> 应用 cors 模块一定要写在注册路由的最前面, 此模块也可以, 当做路由中间件, 指定某一个, 或者某一部分路由, 拥有跨域功能

**常规方式**

```ts
// 跨域中间件
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.originalUrl);
  // console.log(req.headers.origin);

  // 允许指定的请求源地址,可以填*
  res.header("Access-Control-Allow-Origin", "*");
  // 允许携带请求凭证,如为true, 那请求地址就不能设置为*
  // res.header("Access-Control-Allow-Credentials", "true");
  // 允许的请求方法
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  // 允许的请求头类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Blade-Auth");


  if (req.method.toLowerCase() == "options") {
    // 让 options 请求快速结束
		res.sendStatus(200); 
	} else {
    // 路由放行
		next();
	}
});
```

> 同样需要写到注册路由的最前面

### 中间件

**Express** 的[中间件](https://www.expressjs.com.cn/resources/middleware.html)一般分成两种:

- 全局中间件
- 路由中间件

![image-20220104161603645](./images/Middleware.png)

首先客户端向服务器发起请求, 然后服务器依次执行每个中间件, 最后到达路由, 选择相应的逻辑来执行

有两点需要注意：

- 中间件是**按顺序执行**的, 因此在配置中间件时顺序非常重要, 不能弄错
- 中间件在执行内部逻辑的时候可以选择将请求传递给下一个中间件, 也可以直接返回用户响应

#### Express 中间件的定义

在 **Express** 中, 中间件就是一个函数

```js
// 和普通的路由一样, 只不过多了 next参数是一个方法
function someMiddleware(req, res, next) {
  // 可以自定义逻辑, 也可以返回数据
    
  // 调用 next方法 将控制权传递给下一个中间件函数
  next();
}
```

> 如果忘记在中间件中调用 `next` 函数, 并且又不直接返回响应时, 服务器会直接卡在这个中间件不会继续执行下去

#### 全局中间件

通过 `app.use` 函数就可以注册中间件, 并且此中间件会在用户发起**任何请求**都可能会执行, 例如:

```js
app.use(someMiddleware);
// or
app.use((req, res, next)=>{...});
```

#### 可配置的中间件

如果需要可配置中间件, 请导出一个接受选项对象或其他参数的函数, 然后根据输入参数返回中间件实现

中间件定义假设在文件在`my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // 这里可以根据 options 对象的选项来执行不同的操作
    next();
  }
}
```

导入使用

```js
const mw = require('./my-middleware.js');

// 使用中间件
app.use(mw({ namg: '张三', age: 18 }));
```

#### 路由中间件

通过在路由定义时注册中间件, 此中间件只会在用户访问该路由对应的 URI 时执行, 例如：

```js
app.get('/hello', someMiddleware, (req, res) => {
  res.send('Hello World');
});
// 同样匿名函数也可以
```

只有在用户访问 `/hello` 时, 定义的 `someMiddleware` 中间件才会被触发, 访问其他路径时不会触发

> 在中间件中写 `console.log` 语句是比较糟糕的做法, 因为 `console.log`（包括其他同步的代码）都会阻塞 node 的异步事件循环, 降低服务器的吞吐率

中间件不仅可以读取 `req` 对象上的各个属性, 还可以添加新的属性或修改已有的属性（后面的中间件和路由函数都可以获取）, 能够很方便地实现一些复杂的业务逻辑（例如用户鉴权）

```js
const express = require('express');
const app = express();
const router = express.Router();

// 定义一个路由中间件用于检查判断路由器, 并在需要时退出
router.use(function (req, res, next) {
  if (!req.headers['x-auth']){
      // 跳过路由器的其余中间件功能, 
      return next('router');
  }
  next();
})

router.get('/user/:id', function (req, res) {
  res.send('hello, user!');
})


app.use('/admin', router, function (req, res) {
  res.sendStatus(401);
})
```

#### 处理 404 和服务器错误

客户端方面的错误(状态码 4xx), 服务器方面的错误(状态码 5xx)

完善 **Express** 中间件的运作流程, 来处理错误

![image-20220104162944251](./images/Middleware2.png)

这张示意图和之前的图有两点重大区别：

- 每个路由定义本质上是一个**中间件**（更准确地说是一个**中间件容器**, 可包含多个中间件）, 当 URI 匹配成功时直接返回响应, 匹配失败时继续执行下一个路由
- 每个中间件（包括路由）不仅可以调用 `next` 函数向下传递、直接返回响应, 还可以**抛出异常**

从这张图就可以很清晰地看出怎么实现 404 和服务器错误的处理了：

- 对于 404, 只需在所有路由之后再加一个中间件, 用来接收所有路由均匹配失败的请求
- 对于错误处理, 前面所有中间件抛出异常时都会进入错误处理函数, 可以使用 **Express** 自带的, 也可以自定义

```js
// 中间件和其他路由 ...

app.use('*', (req, res) => {
  req.status(404).json('404 Not Found');
});
```

> `*` 表示匹配任何路径。将此中间件放在所有路由后面, 即可捕获所有访问路径均匹配失败的请求

**Express** 可以通过自定义错误处理函数来解决服务器错误的问题, 错误处理函数的形式如下：

```js
function handleError(err, req, res, next) {
  // 处理错误逻辑
}
```

和普通的中间件函数相比, 就多了`err`参数, 也就是 `err` 异常对象

```js
// 中间件和其他路由 ...

app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json('server Error');
});
```

> 错误处理中间件总是需要**四个参数**, **必须**提供四个参数以将其标识为错误处理中间件函数。即使是不需要使用该`next`函数, 也必须要指定它来维护签名, 否则, 该`next`函数将被解释为常规中间件并且无法处理错误

### 使用token

安装依赖: `npm install jsonwebtoken --save`

基本使用如下: 

```js
const jsonwebtoken = require("jsonwebtoken");
const secret = "密钥";
const token = jsonwebtoken.sign(
  { id: "001", name: "张三", age: 18 }, // 加密数据
  secret, // 加密密钥
  {
    // 指定过期时间
    // expiresIn: 1 // 数字以秒(s)做单位
    expiresIn: "1000" // 字符串就以毫秒(ms)
  });

console.log("生成的token: " + token);

const decoded = jsonwebtoken.verify(token, secret);
console.log("同步解密token:");
console.log(decoded);

jsonwebtoken.verify(token, secret, (err, decoded) => {
  if (err) throw "token错误";
  console.log("异步解密token: ");
  console.log(decoded);
});


// 过期解密token将会报错
setTimeout(() => {
  const decoded = jsonwebtoken.verify(token, secret);
  console.log(decoded);
}, 2000);
```

模块化封装

```js
const jsonwebtoken = require("jsonwebtoken");
const secret = "密钥";

// 封装操作token的方法
const JWT = {
  // 生成token
  generate(data, expires = "2h", stub = "Bearer ") {
    const token = jsonwebtoken.sign(data, secret, { expiresIn: expires });
    return stub + token;
  },
  // 解密token
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      // 说明token失效或过期
      return null;
    }
  }
}

// 解析和重新设置token的中间件
const verifyAuthorization = (req, res, next) => {
  // 获取token
  // const token = req.headers.authorization;
  const token = req.get("authorization");
  // 解密
  const decoded = JWT.verify(token);
  if (decoded) {
    // 存在就放到请求对象中
    req.decoded = decoded;

    // 重新生成一个新的token, 用于刷新过期时间(数据就是上次解析出来的数据)
    const { id, userName } = decoded;
    const newToken = JWT.generate({ id, userName });
    // 重新存到响应请求头中传递给前端 
    res.header("authorization", newToken);
    next();
  } else {
    // 否则返回错误码
    res.status(401).json("没有权限");
  }
}


module.exports = {
    JWT,
    verifyAuthorization
};
```

### 解析body参数

使用body-parser

```js
const bodyParser = require('body-parser');


// app.use(bodyParser()); // 弃用

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
```

### 文件上传

使用[multer](https://www.npmjs.com/package/multer), 该模块专门用于接受`multipart/form-data`格式的文件数据

```js
const { join, sep, normalize, basename } = require("path");
const fs = require("fs");
const multer = require('multer');

// 指定文件上传保存的路径
const uploadFilePath = join(__dirname, "../public/uploads/");

const storage = multer.diskStorage({
    // 定义上传文件保存目录
    destination(req, file, cb) {
        cb(null, uploadFilePath);
    },
    // 定义文件保存的文件名
    filename(req, file, cb) {
        const { fieldname, originalname } = file;
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // 拼接文件扩展名
        if (originalname.indexOf(".") !== -1) {
            uniqueSuffix += "." + originalname.split(".")[1];
        }
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})
const upload = multer({ storage: storage });

router.post('/fileUpload', upload.single('file'), (req, res) => {
    // req.file 就是上传的文件
    console.log(req.file);

    // 可以返回一个文件的完整路径给前端显示
    const { headers, file } = req;
    const filePath = headers.host + sep + join(basename(uploadFilePath), file.filename);
    res.json({ code: 200, mag: '文件上传成功', data: { filePath: normalize(filePath) } });
});
```

### 文件下载

```js
const mime = require("mime");
const setFileDownload = (filePath, res) => {
    // 获取文件信息
    const stat = fs.statSync(filePath);
    // 获取可读流
    const rs = fs.createReadStream(filePath);
    // 设置内容
    res.setHeader("Content-Type", mime.getType(filePath));
    // 设置长度
    res.setHeader("Content-Length", stat.size);
    // 设置为附件
    res.setHeader("Content-Disposition", `attachment; filename=${basename(filePath)}`);
    
    // 或者这样写也一样
    // res.writeHead(200, {
    //     "Content-Type": mime.getType(filePath),
    //     "Content-Length": stat.size,
    //     "Content-Disposition": `attachment; filename=${basename(filePath)}`
    // });
    
    // 管道写入
    rs.pipe(res);
}

router.get("/fileDownload", (req, res) => {
    const filePath = join(__dirname, "../public/123.png");
    setFileDownload(filePath, res);
});
```



### 模板引擎

[模板引擎](https://www.expressjs.com.cn/resources/template-engines.html)

### 日志管理

```js
const { createLogger, format, transports } = require('winston');
require("winston-daily-rotate-file");

// 日志信息格式处理
const getCustomFormat = level => {
    return format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.align(),
        format.printf(i => {
            const msg = `${i.level}: ${[i.timestamp]}: ${i.message}`;
            // 因为每个类型的日志都会触发所以需要进行level判断
            return i.level === level ? msg.trim() : "";
        })
    );
}


// 日志默认配置
const defaultOptions = {
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m", 
    maxFiles: "14d", // 要保留的最大日志数14天
};

const getYM = () => {
    const time = new Date();
    const YYYY = time.getFullYear().toString().padStart(2, "0");
    const MM = (time.getMonth() + 1).toString().padStart(2, "0");
    return `${YYYY}/${MM}`;
}

// 全局日志
const globalLogger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            // 文件名以日期命名
            filename: `logs/info/${getYM()}/%DATE%.log`,
            level: "info",
            ...defaultOptions,
            format: getCustomFormat("info"),
            // 这里可以单独处理每个类型的日志
            // format: format.combine(
            //     format.printf(({ level, message }) => {
            //         return level === "error" ? "单独处理全局错误日志" : '';
            //     })
            // )
        }),
        new transports.DailyRotateFile({
            filename: `logs/error/${getYM()}/%DATE%.log`,
            level: "error",
            ...defaultOptions,
            format: getCustomFormat("error")
        })
    ],
})


// 权限日志
const authLogger = createLogger({
    transports: [
        new transports.DailyRotateFile({
            filename: `logs/authLog/${getYM()}/%DATE%.log`,
            format: getCustomFormat("info"),
            ...defaultOptions,
        }),
    ],
});


module.exports = {
    globalLogger,
    authLogger
};
```

记录日志

```js
const { globalLogger, authLogger } = require('./logger.js');

globalLogger.info("记录日志");

app.use((err, req, res, next) => {
    const { message, stack } = err;
    const msg = message + "\r\n stack: " + stack + "\r\n";
    // 记录错误日志
    globalLogger.error(msg);
    res.status(500).json('server Error');
});
```

## Koa 

`Express` 就是 [`koa`](https://koa.bootcss.com/#) 的前生, 也可以理解为 Koa 是ES6版的 Express, 由原班人马打造, 

只是把ES5语法改成ES6, 并且换了个名目前最新的 Koa 版本是 `koa2`

安装`npm install koa`

**简单使用**

```js
const koa = require('koa');
// koa 是一个构造函数
const app = new koa();

// 定义一个中间件
app.use(async (ctx, next) => {
    // ctx 是一个上下文对象, 包括 request 和 response 对象
    ctx.response.status = 200; // 响应状态码
    ctx.response.body = 'hello koa'; // 响应体
    await next(); // 调用下一个中间件(后续有其他的中间件需要执行时必须要调用, 不然就会阻塞在这里)
})

const port = 8000;
app.listen(port, () => {
    console.log(`服务启动${port}端口`);
});
```

访问 `http://localhost:8000/` 就可以看到`hello koa`内容

> [阮一峰教程](https://www.ruanyifeng.com/blog/2017/08/koa.html)

### Koa参数设置

应用程序设置是 `app` 实例上的属性, 目前支持如下：

- `app.env` 默认是 **NODE_ENV** 或 **"development"**
- `app.keys` 签名的 cookie 密钥数组
- `app.proxy` 当真正的代理头字段将被信任时
  - 忽略 `.subdomains` 的 `app.subdomainOffset` 偏移量, 默认为 2
- `app.proxyIpHeader` 代理 ip 消息头, 默认为 `X-Forwarded-For`
- `app.maxIpsCount` 从代理 ip 消息头读取的最大 ips, 默认为 **0** (代表无限)

可以将设置传递给构造函数:

```js
const Koa = require('koa');
const app = new Koa({ proxy: true });

// or

const Koa = require('koa');
const app = new Koa();
app.proxy = true;
```

### app的常用属性/方法

#### app.use方法

`app.use(function)`

将给定的中间件方法添加到此应用程序, `app.use()` 返回 `this`, 因此可以链式表达

```js
app.use(someMiddleware);
app.use(someOtherMiddleware);
app.listen(3000);

// 等同于

app.use(someMiddleware)
  .use(someOtherMiddleware)
  .listen(3000);
```

#### app.listen方法

`app.listen(port[,callback])`

将 Koa 应用程序被绑定到指定端口

```js
const koa = require('koa');
const app = new koa();
const port = 8000;

app.listen(port, () => {
    console.log(`服务启动${port}端口`);
});
```

#### app.context属性

`app.context` 是创建 `ctx` 的原型, 可以添加一些通用方法到 `app.context` 中从而使用更少的 **中间件** 或者`require()`

```js
// 挂载工具函数
app.context.util = {
    log: require('./utils/log.js'),
    hi: () => console.log('hello koa'),
    myName: '张三'
}

app.use(async (ctx, next) => {
    console.log(ctx.util);
    console.log(ctx.util.myName); // 张三
    ctx.util.hi(); // 'hello koa'
    await next();
});
```

#### ctx.app

应用程序实例引用

#### app.emit

Koa 应用扩展了内部 [EventEmitter](http://nodejs.cn/api/events.html#events_class_eventemitter), `app.emit` 可以触发一个以第一个参数定义的事件

```js
// 监听事件
app.on('time',(date)=>{
    console.log(date); 
})
// 触发事件
app.emit('time', '2022-01-28');
```

#### ctx.respond

为了绕过 Koa 的内置 response 处理, 你可以显式设置 `ctx.respond = false`, 这样 Koa 就不会处理你的 response

> 这个属性官方不支持使用, 只是便于那些希望在 Koa 中使用传统的 `fn(req, res){...}` 功能和中间件的人

### 中间件

中间件是 Koa 的一个重要的概念, 它是一个执行的链条, 整个链条组成了一个运行的周期

中间件可以写成同步的也可以写成异步的(`async`+`await`)

#### 洋葱模型

Koa 是运用了洋葱模型的代表框架之一

![](./images/ycmx1.png) 

上面的图有点抽象, 复习一下 **Express** 的中间件过程

![image-20220126152507915](./images/image-20220126152507915.png) 

请求（Request）直接依次贯穿各个中间件, 最后通过请求处理函数返回响应（Response）, 非常简单, 然后来看看 **Koa** 的中间件是什么样的：

![image-20220126152610623](./images/image-20220126152610623.png) 



可以看到, **Koa** 中间件不像 **Express** 中间件那样在请求通过了之后就完成了自己的使命, 相反, 中间件的执行清晰地分为**两个阶段**

##### Koa 中间件的定义

Koa 的中间件是一个这样的函数

```js
async function middleware(ctx, next) {
  // 第一阶段
  await next();
  // 第二阶段
}
```

ctx封装了请求和响应对象后面细说, Koa 的`next` 函数返回的是一个 **Promise**, 

在这个 **Promise** 进入完成状态（Fulfilled）后, 就会去执行中间件中第二阶段的代码

可以利用这个特性来记录每次请求的方法, url, 状态码, 响应时间

```js
app.use(async (ctx, next) => {
    // 记录一个时间
    const start = Date.now();
    // 执行下一个中间件
    await next();
    // 计算时间差
    const ms = Date.now() - start;
    // 输出记录
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
})
```

**多个中间件的运行顺序**

```js
// 访问权限
app.use(async (ctx, next) => {
    console.log('>>> 1.权限验证通过...');
    await next() // 执行下一个中间件
    console.log('<<< 6.权限验证通过之后');
})

// 日志记录
app.use(async (ctx, next) => {
    console.log('>>> 2.日志记录完成...');
    await next() // 执行下一个中间件
    console.log('<<< 5.日志记录完成之后');
})

// 响应处理
app.use(async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = 'hello koa';
    console.log('>>> 3.数据响应完成...');
    await next(); // 执行下一个中间件
    console.log('<<< 4.数据响应完成之后');
})

const port = 8000;
app.listen(port, () => {
    console.log(`服务启动${port}端口`);
});
```

访问 `http://localhost:8000/` 会按照洋葱模型的顺序执行结果如下: 

```js
>>> 1.权限验证通过...
>>> 2.日志记录完成... 
>>> 3.数据响应完成... 
<<< 4.数据响应完成之后
<<< 5.日志记录完成之后
<<< 6.权限验证通过之后
```

> 洋葱模型的执行顺序规律就是, 一开按照顺序依次执行中间件, 执行到最后一个中间件时, 会一直向上返回控制器

### 上下文(Context)

**Koa** **Context** 将 node 的 `request` 和 `response` 对象封装到单个对象中

为编写 Web 应用程序和 API 提供了许多有用的方法

每个请求都将创建一个 `Context`对象, 并在中间件中作为接收器引用

 `Context`对象可以解决中间件之间的依赖问题, 是中间件之间的全局变量

```js
app.use(async (ctx, next) => {
    console.log(ctx);
    // 可以随便放数据
    ctx.myData = "第一个中间件的数据";
  
    // 还可以把请求参数都往上一级挪一下
  	const { body, reqeust, params } = ctx.request;
    ctx.body = body;
    ctx.reqeust = reqeust;
    ctx.params = params;
  
    await next(); // 执行下一个中间件
})

app.use(async (ctx, next) => {
    console.log(ctx.myData); // 第一个中间件的数据
    await next();
})
```

> `await next()`执行下一个中间件时, 一定要放到语句的最后, 不然中间的修改参数下一个中间件就会失效

#### 请求处理([ctx.request](https://koa.bootcss.com/#request))

```js
ctx.req; // 原生 node 的 request 对象

// header
ctx.request.get('authorization'); // 返回请求头对象里的指定字段(不区分大小写)
ctx.request.headers; // 请求头
ctx.request.protocol; // 请求协议
ctx.request.type; // 请求 Content-Type
ctx.request.charset; // 请求字符集

// method
ctx.request.method; // 请求类型
ctx.request.query; // query 数据(params参数, 带?)
ctx.request.querystring // 根据 ? 获取原始查询字符串(不带?)
ctx.request.body; // 请求体数据, 依赖 koa-bodyparse 第三方模块

// path
ctx.request.url; // WHATWG 解析的 URL 字符串
ctx.request.origin; // 获取URL的来源(完整路径)
ctx.request.href; // 获取完整的URL(包括params参数)
ctx.request.path; // 请求路径名

// host
ctx.request.host; // 主机号(带端口)
ctx.request.hostname; // 主机名(不带端口)
ctx.request.ip; // ip地址
crx.request.subdomains; //子域(数组形式)

// cookie
ctx.cookies.get('name') // 获取 cookie
ctx.cookies.set(name, value, { // 设置 cookie
    'expires': new Date(), // 时间
    'path': '/', // 路径
    'domain': '0.0.0.0', // 域
    'httpOnly': false, // 禁止js获取
})

// error
ctx.throw(404, 'Not found');
```

#### ctx.request.fresh

检查请求缓存是否“新鲜”, 也就是内容没有改变

此方法用于 `If-None-Match` / `ETag`, 和 `If-Modified-Since` 和 `Last-Modified` 之间的缓存协商

在设置一个或多个这些响应头后应该引用它

#### ctx.request.stale

与 `ctx.request.fresh` 相反

```js
app.use(async (ctx, next) => {
    // 新鲜度检查需要状态20x或304
    ctx.status = 200;
    ctx.set('ETag', '123');

    // 缓存是好的
    if (ctx.fresh) {
        ctx.status = 304;
        return;
    }

    // 缓存是陈旧的
    // 获取新数据
    ctx.body = '最新的数据'
    await next();
});
```

#### request.is(types...)

检查传入请求是否包含 `Content-Type` 消息头字段,  并且包含任意的 mime `type`。 如果没有请求主体, 返回 `null`。 如果没有内容类型, 或者匹配失败, 则返回 `false`。 反之则返回匹配的 content-type

```js
app.use(async (ctx, next) => {
    // 使用 Content-Type: text/html; charset=utf-8
    ctx.is('html'); // => 'html'
    ctx.is('text/html'); // => 'text/html'
    ctx.is('text/*', 'text/html'); // => 'text/html'

    // 当 Content-Type 是 application/json 时
    ctx.is('json', 'urlencoded'); // => 'json'
    ctx.is('application/json'); // => 'application/json'
    ctx.is('html', 'application/*'); // => 'application/json'

    ctx.is('html'); // 不匹配就会返回 false
    await next();
});
```

例如, 如果要确保仅将图像发送到给定路由

```js
app.use(async (ctx, next) => {
    if (ctx.is('image/*')) {
        // 处理
    } else {
        ctx.throw(415, 'images only!');
    }
    await next();
});
```

#### request.accepts(types)

与 `request.is()`类似

#### Request别名

![image-20220830214728074](./images/image-20220830214728074.png) 

#### 响应处理([ctx.response](https://koa.bootcss.com/#response))

```js
ctx.res; // 原生 node 的 response 对象

ctx.response.headers; // 响应头

// 用一个对象设置多个响应头
ctx.set({
  'Etag': '1234',
  'Last-Modified': Date.now()
});

// 根据字段获取响应头vale(不区分大小写)
ctx.response.get('Last-Modified');

// 响应数据, 简写 ctx.body
ctx.response.body = { code: 200, msg: "success", data: {} };
// 响应状态码, 简写 ctx.status
ctx.response.status = 200; 
// 响应的状态消息字符串 默认情况下, response.message 与 response.status 关联, 简写 ctx.message
ctx.response.message = 'ok';

// 响应 Content-Type
ctx.response.type = 'text/html; charset=utf-8'; // defaule

// 删除消息头 field
ctx.response.remove(field);

// 类似 ctx.request.is()
response.is(types...);

// 重定向
ctx.response.redirect('https://www.baidu.com/');
```

#### ctx.response.append(field, value)

追加响应头字段数据

```js
app.use(async (ctx, next) => {
    ctx.append('Link', '<http://127.0.0.1/>');
    ctx.append('Link', '<http://localhost/>');
    console.log(ctx.response.get('Link'));
        // [ '<http://127.0.0.1/>', '<http://localhost/>' ]
    await next();
});
```

#### Response 别名

![image-20220830214755893](./images/image-20220830214755893.png)  

绕过 **Koa** 的 **response** 处理是 **不被支持的**, 应避免使用以下 node 属性：

- `res.statusCode`
- `res.writeHead()`
- `res.write()`
- `res.end()`

```js
app.use(async (ctx, next) => {
    // ctx.res.end('res.end'); 不推荐使用原生 node 响应对象处理
    ctx.response.body = 'ctx.response';
    await next();
});
```

> 官方说不支持, 测试了一下是支持的, 不推荐这样使用

### 错误处理

默认情况下, **Koa** 会将所有错误输出到 **stderr**, 可以添加一个`error`事件来捕获错误

```js
app.on('error', err => {
    console.log('发生了错误', err);
})
```

如果 req/res 期间出现错误, 并且 _无法_ 响应客户端, `Context`实例仍然被传递

```js
app.on('error', (err, ctx) => {
    console.log('发生了错误', err);
    console.log('上下文对象', ctx);
})
```

当发生错误**并且**仍然可以响应客户端时, 也没有数据被写入 **[socket](https://zh.wikipedia.org/wiki/%E7%B6%B2%E8%B7%AF%E6%8F%92%E5%BA%A7)** 中, Koa 将用一个状态码 **500** “内部服务器错误” 进行适当的响应

### Koa流行依赖(包)	

`koa`没有捆绑任何中间件, 需要添加中间件的话只能是自己组合

#### koa-router

[koa-router](https://github.com/koajs/router/blob/HEAD/API.md)

如果是不使用第三方包来写路由的话, 代码就会这样

```js
app.use(async (ctx, next) => {
    switch (ctx.request.path) {
        case '/': // 首页
            ctx.response.status = 200
            ctx.response.body = 'index'
            break;
        case '/list': // 列表页
            ctx.response.status = 200
            ctx.response.body = 'list'
            break;
        default:
            ctx.throw(404, 'Not found'); // 404
            break;
    }
    await next();
})
```

代码就会写的很长, 很繁琐, 当然社区已经有人把这些封装好了就是`koa-router`

**koa-router**

安装`npm install koa-router -S`

这是一个路由管理模块, 可以专门新建一个目录来存放路由控制器, 然后这些控制器通过 `app.js` 的 `koa-router` 模块加载

`app.js`文件

```js
const koa = require('koa');
const app = new koa();
const fs = require('fs');
const path = require("path");

const Router = require('koa-router');

// 实例化路由
const router = new Router();


// 可以使用中间来判断首页
app.use(async (ctx, next) => {
    if (ctx.request.path === '/') {
        ctx.response.status = 200;
        ctx.response.body = 'index';
    }
    await next();
})

// 单独使用(或分文件)也可以
router.get("/test", async (ctx, next) => {
  ctx.body = "test...";
  await next();
});

// 也可以通过 fs.readdirSync 读取 urls 目录下的所有文件名, 并挂载到 router 上面
const urlPath = path.resolve(__dirname, './urls');
const urls = fs.readdirSync(urlPath);
urls.forEach((item) => {
    // 引入对应的文件
    const module = require(urlPath + "/" + item);
    // 挂载到路由上
    router.use(
        '/' + item.replace(/.js$/, ''), 
        module.routes(), 
        module.allowedMethods()
    );
})
// 挂载到 app 上
app.use(router.routes())


const port = 8000;
app.listen(port, () => {
    console.log(`服务启动${port}端口`);
});
```

`/urls/home.js`文件

```js
const Router = require('koa-router');
const home = new Router();

//=> /home
home.get('/', async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = 'home';
    await next();
})

//=> home/list
home.get('/list', async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = 'home-list';
    await next();
})

module.exports = home;
```

#### 静态文件

[koa-static](https://www.npmjs.com/package/koa-static)

像一些静态文件的处理, Koa 也要现成的模块

安装静态文件模块`npm install koa-static -S` 

```js
// 引入 koa-static
const koaStatic = require('koa-static');
const { resolve } = require('path');

// 静态文件目录
const staticPath = resolve(__dirname, './static');
// 应用
app.use(koaStatic(staticPath));
```

访问`http://localhost:8000/xxx.png`就可以访问静态资源了

#### koa-bodyparser

[koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

一个解析 `POST` 数据的模块, 相当于**Express**里的`body-parser`

安装 `npm install koa-bodyparser -S`

```js
const bodyParser = require('koa-bodyparser');

// 一定要放到中间件或路由的前面
app.use(bodyParser());

app.use(async (ctx, next) => {
    // post请求的 请求体数据会被挂载到 ctx.request.body, 是一个 key => value 的集合
    console.log(ctx.request.body);
    await next();
})
```

需要使用文件上传可以用[`koa-body`](https://www.npmjs.com/package/koa-body)模块来完成

```js
const koaBody = require('koa-body');
const app = new koa();
app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
    }
}));
```

获取上传后文件的信息, 则需要在 `ctx.request.files` 中获取

获取其他的表单字段, 则需要在 `ctx.request.body` 中获取

#### @koa/cors

[@koa/cors](https://www.npmjs.com/package/@koa/cors) 类似于 **Express**中的`cors`, 同样是处理跨域请求

安装`npm install @koa/cors -S`

```js
const cors = require("@koa/cors");
// 注册中间件
app.use(cors());
```

#### @koa/multer

[@koa/multer](https://www.npmjs.com/package/@koa/multer)模块使用功同[multer](https://www.npmjs.com/package/multer)

#### koa-views

[koa-views](https://www.npmjs.com/package/koa-views) 是一个视图管理模块, 它的灵活度很高, 支持很多的模版引擎, 以 `ejs`引擎为例

安装 `npm install koa-views egg.js -S` 

`app.js`文件

```js
const views = require('koa-views');
const { resolve } = require('path');

// 视图目录
const viewsPath = resolve(__dirname, './views');

// 应用
app.use(views(viewsPath, {
    // ejs 文件扩展名映射到引擎
    extension: 'ejs'
}))


app.use(async (ctx, next) => {
    // render 渲染方法, 这里加载到 views/index.ejs 文件, 第二参数是传参到模版
    await ctx.render('index', { message: 'index页面' });
    await next();
})
```

新建一个`views`目录, 存放视图文件, 再新建一个`index.ejs`, 内容如下:

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ejs</title>
</head>
<body>

<%=message%> <!-- ejs 的模版语法, 读取变量 message | 是从 render 传递过来 -->

</body>
</html>
```

**ejs**

[ejs](https://ejs.bootcss.com/#promo) 是一个非常简洁的 JavaScript 模版引擎, 使用起来也很简单

```js
// 读取变量
<%=%> 

// 控制流程, 循环操作
<%%> 

// 例子
<% if (arr) {%>
 <% arr.forEach((element) => { %>
  <%=element%>
 <%})%>
<%}%>

// 引入文件
<% include file %>
```

#### koa-compose

`koa-compose`模块可以将多个中间件合成为一个

安装`npm install koa-compose -S `

```js
const compose = require('koa-compose');

// 打印请求时间, 请求类型, 请求URL
const logger = async (ctx, next) => {
    console.log(`${new Date()} ${ctx.request.method} ${ctx.request.url}`);
    await next();
}
// 返回数据
const main = ctx => {
    ctx.response.status = 200;
    ctx.response.body = 'hello koa-compose';
    console.log('main');
}
// 组合到一起从右到左执行
const middlewares = compose([logger, main]);
// 应用
app.use(middlewares);
```

测试访问输出

```js
Thu Jan 27 2022 15:21:07 GMT+0800 (中国标准时间) GET /
main
```

#### Koa封装数据库操作

先把操作mysql[封装](#Node 连接 MySQL)成一个函数, 然后保存到上下文对象中

```js
// 直接将工具函数挂载到 app.context 上(推荐)
app.context.util = {
    mysql: require('./utils/mysql')
};

// 或者通过一个中间件, 把所有的工具关联起来
app.use(async (ctx, next) => {
    ctx.util = {
        mysql: require('./utils/mysql')
    };
    await next();
})


// 在后面的中间直接操作数据库
app.use(async (ctx, next) => {
  ctx.util.mysql('select * from user', (err, results)=> {
    console.log(results)'
  })
  await next();
})
```

#### Koa记录日志

日志模块用的是第三方的 Node.js 模块 [log4js](https://www.npmjs.com/package/log4js), 日志的功能也可以定制成一个工具, 存放到 `utils` 目录

安装`npm install log4js -S`

封装`log4js`

```js
const log4js = require('log4js');
// 配置日志信息
log4js.configure({
    appenders: {
        everything: {
            type: 'file',
            // 输出日志目录, 按天分类
            filename: `logs/${new Date().toLocaleDateString()}.log`
        }
    },
    categories: {
        default: {
            appenders: ['everything'],
            level: 'info'
        }
    }
})

const logger = log4js.getLogger();

module.exports = logger;
```

`app.js`

```js

// 挂载日志模块
app.context.util = {
    log: require('./utils/log.js')
};


// 记录日志
app.use(async (ctx, next) => {
	ctx.util.log.info('记录一个日志');
    console.log(123);
	await next();
});
```

生成的日志如下

![image-20220126143441527](./images/image-20220126143441527.png) 

## REST

[REST](https://www.runoob.com/nodejs/nodejs-restful-api.html) 即表述性状态传递, 是一种软件架构风格, 是一组架构约束条件和原则

[REST](https://www.runoob.com/nodejs/nodejs-restful-api.html)即表述性状态传递, 是一种软件架构风格,表述性状态转移是一组架构约束条件和原则

满足这些约束条件和原则的应用程序或设计就是RESTful, 并不是标准通常使用 JSON 数据格式

> [REST架构详解](https://www.runoob.com/w3cnote/restful-architecture.html)

#### HTTP 方法

以下为 REST 基本架构的四个方法：

- **GET** - 用于获取数据
- **PUT** - 用于更新或添加数据
- **DELETE** - 用于删除数据
- **POST** - 用于添加数据

## 命令行输出颜色

终端命令行输出颜色除了使用第三方库还可以使用ANSI Escape Code(ANSI转义码)实现, 常用的ANSI转义码如下:

```
\x1b[30m黑色文本\x1b[0m
\x1b[31m红色文本\x1b[0m
\x1b[32m绿色文本\x1b[0m
\x1b[33m黄色文本\x1b[0m
\x1b[34m蓝色文本\x1b[0m
\x1b[35m紫色文本\x1b[0m
\x1b[36m青色文本\x1b[0m
\x1b[37m白色文本\x1b[0m
```

基本使用: 

```ts
console.log("\x1b[31m%s\x1b[0m", "红色文本");
console.log("\x1b[33m%s\x1b[0m", "黄色文本");
console.log("\x1b[36m青色文本\x1b[0m");
```

## Node 连接 MySQL

安装 [**MySql**](https://www.npmjs.com/package/mysql) `npm install mysql -S`

封装成`Promise`+ 线程池的通用函数

> [Node 集成数据库](https://www.expressjs.com.cn/guide/database-integration.html)

```js
const mysql = require('mysql');

// 获取连接对象
const pool = mysql.createPool({
    host: 'localhost', // 地址
    port: 3306,
    user: 'root', // 用户
    password: '123456', // 密码
    database: 'test', // 数据库
    connectionLimit: 10, // 线程数
});

// 封装成函数
function db(sql, sqlParams = []) {
    // 封装成 Promise
    return new Promise((resolve, reject) => {
        // 连接数据库
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            }
            // 连接对象调用 query方法 查询 sql语句, 并传入 参数sqlParams
            conn.query(sql, sqlParams, (error, results, fields) => {
                if (error){
                    reject(error);
                };
                // 查询到的数据(数组)
                // console.log(results);
                resolve(results);
                // 释放连接
                conn.release();
                // 终止连接
                // conn.destroy();
            });
        });
    });
};

// 暴露数据库操作函数
module.exports = db;
```

参数说明: 

| 参数                   | 描述                                                         |
| :--------------------- | :----------------------------------------------------------- |
| **host**               | 主机地址 （默认：localhost）                                 |
| **user**               | 用户名                                                       |
| **password**           | 密码                                                         |
| **port**               | 端口号 （默认：3306）                                        |
| **database**           | 数据库名                                                     |
| **charset**            | 连接字符集（默认：'UTF8_GENERAL_CI', 注意字符集的字母都要大写） |
| **localAddress**       | 此IP用于TCP连接（可选）                                      |
| **socketPath**         | 连接到unix域路径, 当使用 host 和 port 时会被忽略             |
| **timezone**           | 时区（默认：'local'）                                        |
| **connectTimeout**     | 连接超时（默认：不限制；单位：毫秒）                         |
| **stringifyObjects**   | 是否序列化对象                                               |
| **typeCast**           | 是否将列值转化为本地JavaScript类型值 （默认：true）          |
| **queryFormat**        | 自定义query语句格式化方法                                    |
| **supportBigNumbers**  | 数据库支持bigint或decimal类型列时, 需要设此option为true （默认：false） |
| **bigNumberStrings**   | supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false） |
| **dateStrings**        | 强制timestamp,datetime,data类型以字符串类型返回, 而不是JavaScript Date类型（默认：false） |
| **debug**              | 开启调试（默认：false）                                      |
| **multipleStatements** | 是否许一个query中有多个MySQL语句 （默认：false）             |
| **flags**              | 用于修改连接标志                                             |
| **ssl**                | 使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串, 目前只捆绑Amazon RDS的配置文件 |
