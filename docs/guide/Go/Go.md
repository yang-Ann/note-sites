---
title: Go
date: 2022-12-21
categories:
 - Go
tags:
 - Go
---

[[toc]]

# Go

[官网](https://go.dev/)

[官方教程](https://go.dev/doc/)

[标准库(英文)](https://pkg.go.dev/std)

[标准库(中文)](https://studygolang.com/pkgdoc)

`Go` 是 Google 开发的一种编译型、并发型，并具有垃圾回收功能的编程语言

## 环境搭建

-   [下载安装包](https://go.dev/dl/)

    -   命令行输入`go version`

-   `vscode`装插件

    -   `Go`
    -   <kbd>F1</kbd>输入`Go: Install/Update Tools`全选安装一些必要的工具

-   如果碰到下载卡住了, 可以更换国内代理:

    ```sh
    # 停止下载
    go env -w GO111MODULE=on
    # 更换国内代理
    go env -w GOPROXY=https://goproxy.cn,direct
    ```

## 运行文件

新建`src/main.go`文件

进入`src/main.go`输入:

```go
package main // 声明为 main 包

import ( // 引入 fmt 模板
	"fmt"
)

// 注意 mian 函数的格式必须严格这样写, 不能将花括号换行
func main() {
	fmt.Println("hello world") // 控制台输出指定的字符串
}
```

执行命令

```sh
# 运行指定的文件(可以跟多个文件)
go run main.go

# 运行所有的 .go 文件(需要 go.mod 文件)
go run .

# 生成可执行文件
go build main.go

# 重命名生成的包文件
go build -o start_app_name.exe main.go

# 将编译结果移动到`$GOPATH/bin`目录下面
go install main.go
```

## 控制台打印

`fmt.Print`不换行, `fmt.Println`换行, 都可以接受任意多个参数

`Go`的四则运算和一般的语言是一样的:

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Print("--不换行--")
	fmt.Println("换行")
	fmt.Println(1 + 1, 10 * 10, "hello", 3 / 1)
}
```

结果:

```sh
--不换行--换行
2 100 hello 3
```

### 格式化打印

`fmt.Printf`格式化打印, 第一参数必须是字符串, 类似于`%v`这样的格式化动词, 后续的参数则会进行填充:

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Printf("1 + 1 = %v\n%v", 1+1, "hello\n")
	// 1 + 1 = 2
	// hello
}
```

>   `%v`表示是通用的格式化动词, 没有什么特别的含义

### 填充空格

对齐文本在格式化动词中可以指定一个宽度, 如: `%-4v`表示向右填充**4**个空格

-   正数表示向左填充空格
-   负数表示向右填充空格

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Printf("%-4v %4v\n", "水果", "价格(元)")
	fmt.Printf("%-4v %4v\n", "苹果", "10")
	fmt.Printf("%-4v %4v\n", "香蕉", "8")
}
```

结果:

```sh
水果   价格(元)
苹果     10
香蕉      8
```

### 指定打印小数位数

指定打印小数位数在格式化动词中可以使用`%f`, 如: 

-   `%.3f`表示小数显示`3`位
-   `%6.2f`表示左边显示`6`位, 不足则补空格, 小数则显示`2`位
-   `%06.2f`表示左边显示`6`位, 不足则补`0`, 小数则显示`2`位

```go
package main

import (
	"fmt"
)

func main() {
	const t = 1.0 / 3

	fmt.Printf("%v\n", t)     // 0.3333333333333333
	fmt.Printf("%f\n", t)     // 0.333333
	fmt.Printf("%.3f\n", t)   // 0.333
	fmt.Printf("%6.2f\n", t)  //   0.33
	fmt.Printf("%06.2f\n", t) // 000.33
}
```

### 输出变量类型

使用`%T`格式化动词可以打印具体变量的类型:

```go
package main

import "fmt"

func main() {
	year := 2022
	x := 1.2
	flog := true

	fmt.Printf("year 类型 %T\n", year) // year 类型 int
	fmt.Printf("x 类型 %T\n", x)       // x 类型 float64
	fmt.Printf("flog 类型 %T\n", flog) // flog 类型 bool
}
```

### 其他格式动词

| 动词 | 说明                                           |
| ---- | ---------------------------------------------- |
| `%x` | 打印十六进制, 如: `%02x`可以打印出十六进制颜色 |
| `%b` | 打印每个 bit, 如: `%08b`可以打印出**bit**表示  |
| `%c` | 打印字符                                       |

>   也可以使用`log`包下的`Println`函数, 会带上当前的时间

## 基本数据类型

| 类型     | 关键字                                                       | 说明                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 字符串   | `string`                                                     | 使用`双引号`(**会转义字符**)或`反引号`(**不会转义字符**)括起来定义, 不能用`单引号`定义 |
| 布尔     | `bool`                                                       | 只有 `true` 和 `false`                                       |
| 整型     | `int8`,`uint8`<br/>`int16`,`uint16`<br/>`int32`,`uint32`<br/>`int64`,`uint64` | `intxx`开头表示**无符号整型**, `uintxx`开头表示**有符号整型** |
| 特殊整型 | `int`(**i32**),`uint`(**i64**)                               | 具体长度取决于 CPU 位数, 默认的整数类型是`int`               |
| 浮点型   | `float32`,`float64`                                          | 默认的浮点类型是`float64`                                    |
| 字符     | `rune`                                                       | 它是`int32`的类型别名, 主要用于**Unicode**, 使用`''`定义字符 |
| 字节     | `byte`                                                       | 它是`uint8`的类型别名, 主要用于**二进制数据**                |

>   整数的一些常量都在`math`包里, 如: `math.MaxInt`, `math.Pi`

### 整数环绕

`Go`中的也会有和`Rust`一样的**整数环绕**效果, 即溢出当前类型的最大表示时则会从头计算:

```go
package main

import "fmt"

func main() {
	var x int8 = 127
	x++
	fmt.Println("x =", x) // -128

	var y uint8 = 255
	y++
	fmt.Println("y =", y) // 0
}
```

>   当碰到很大的数字需要计算时, 可以使用`math/big`包

## 常量和变量

**常量**使用`const`声明常量, 常量不可变, **变量**使用`var`声明变量, 常量和变量都**不能重复定义**

```go
var 变量名 类型 = 值
const 变量名 类型 = 值
```

在声明变量时可以省略类型, 因为会自定推导出具体的类型:

```go
package main

import (
	"fmt"
)

func main() {
	const x = 1
	var y int32 = 2

	fmt.Printf("x + y = %v", x+y) // x + y = 3

	// 修改变量
	y = 20

	fmt.Println()
	fmt.Println(y) // 20
}
```

>   **常量**在定义时没有指定类型就是`untyped`表示无类型的, 不影响使用, 因为底层是使用`big`完成的, 所有常量可以直接赋值为变量

### 同时声明多个变量

基本的的写法如下:

```go
package main

func main() {
	const a = 1
	const b = 2

	const (
		c = 3
		d = 4
	)

	const e, f = 5, 6
}
```

### 零值

`Go`里面每个类型都有一个默认值, 它称作**零值** 当声明变量却不对它进行初始化的时候, 它的值就是零值: 

```go
package main

import (
	"fmt"
)

func main() {
	var x int32
	var y float64

	fmt.Printf("x = %v, y = %v", x, y) // x = 0, y = 0
}
```

## 运算符

`Go`中**没有**前置自增运算符

```go
package main

import "fmt"

func main() {
	var x = 1
	fmt.Println("x =", x) // x = 1
	x += 1

	fmt.Println("x =", x) // x = 2
	x++

	// ++x // Error

	fmt.Println("x =", x) // x = 3
}
```

## 条件判断

条件判断和一般的语言差不多, 只不过`if`中的条件不带小括号:

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	const s = "hello go"

	// 注意条件不带小括号
	if strings.Contains(s, "go") {
		fmt.Println("x 包含 \"go\" 字符")
	} else if strings.Contains(s, "hi") {
		fmt.Println("x 包含 \"hi\" 字符")
	} else {
		fmt.Println(s)
	}
}
```

## switch

`Go`的`switch`语句, 不会发生**case穿透**的问题(即不需要加`break`关键字), 

```go
package main

import "fmt"

func main() {
	const s = "hi"

	// 注意条件不带小括号
	switch s {
	case "hi", "welcome":
		fmt.Println("匹配 hi 或者 welcome")
	case "go":
		fmt.Println("匹配 go")
	case "hello":
		fmt.Println("匹配 hello")
	default:
		fmt.Println("默认")
	}
}
```

### fallthrough

`Go`的`switch`语句, 匹配到指定项以后就会停止, 如果需要继续匹配则添加`fallthrough`关键字: 

```go
package main

import "fmt"

func main() {
	const s = "hi"

	switch s {
	case "hi", "welcome":
		fmt.Println("匹配 hi 或者 welcome")
		fallthrough // 继续向下执行
	case "other":
		fmt.Println("other")
	}
}
```

## 循环

`Go`使用`for`关键字执行循环, 后面可以跟一个表达式, 注意无法在`for`中使用`var`关键字:

```go
package main

import (
	"fmt"
	"time"
)

func main() {

	var i = 0

	for ; i < 5; i++ {
		time.Sleep(time.Second / 2) // 阻塞 0.5 秒
		fmt.Println(i)
	}
}
```

不跟表达式则是无限循环, 可以通过`break`退出循环:

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {

	for {
		time.Sleep(time.Second / 2) // 阻塞 0.5 秒

		// 生成 0 ~ 10 的随机数
		var n = rand.Intn(10) + 1
		fmt.Println(n)

		if n >= 9 {
			break
		}
	}
}
```

## 导入包

`Go`中使用`import`关键字可以导入包, 可以从标准库或者自定义的包中导入, 语法就是`import 包名`, 例如:

```go
// 导入 fmt 包, 加包名前缀使用如: fmt.Println("hi")
import fmt

// 导入 fmt 包并重命名为 myFmt, 使用例子: myFmt.Println("hi")
import myFmt "fmt"

// 导入 fmt 包把其内部的函数转发到package作用域(省略包名), 可以省略包名直接调用如: Println("hi")
import . fmt

// 导入多个包(也可以 指定包名 或者 省略包名)
import (
	fmt
  time
)
```

### 导入自定义的包

`Go`的包可以按照文件夹进行分类, 除了`main`包, `main`是主包, 也是二进制文件的入口包

-   先运行`git init mod 本地模块名`(*本地模块名一般可以叫项目名*), 初始化`go.mod`文件, 默认内容如下: 

    ```json
    module learn-go // 模块名
    
    go 1.19 // go 的版本
    ```

-   新增一个本地的目录(包), 举例为`hello`, 这个目录下面可以新建任意的`.go`文件, 只需要声明为`package hello`即可, 例如: 

    ```go
    // /hello/index.go
    
    package hello // 声明为那个包(一般与目录同名)
    
    import "fmt"
    
    // 注意导入的函数必须是大写字母开头
    func SayHi() {
    	fmt.Println("我是hello包里的 SayHi 函数")
    }
    ```

-   然后就可以在项目中的其他包中导入使用了:

    ```go
    package main
    
    import (
    	"learn-go/hello" // 以模块名开头, 根据目录就可以进行导入
    	"learn-go/abcd/ok" // 多级目录, 对应目录层级即可
    )
    
    func main() {
    	hello.SayHi()
    
    	ok.Hi()
    }
    ```

### go mod 常用命令

```sh
# 生成 go.mod 文件
go mod init projectName

# 安装指定的包
go get github.com/fatih/color

# 整理现有的依赖(可以自动下载和清理依赖)
go mod tidy

# 下载 go.mod 文件的所有依赖
go mod download

# 查看现有的依赖结构
go mod graph

# 导出项目所有的依赖到 vendor 目录
go mod vendor

# 校验一个模块是否被篡改过
go mod verify

# 查看为什么需要依赖某模块
go mod why
```

#### 相关的环境变量

- GO111MODULE
  - auto: 只要项目包含了 `go.mod` 文件的话启用 Go modules, 目前在 Go1.11 ~ Go1.14 是默认值
  - on: 启用 Go modules(推荐)
  - off: 禁用 Go modules

  设置命令:

  ```sh
  go env -w GO111MODULE=on
  ```

-   GOPROXY
    用于设置Go模块代理, 默认值: `https://proxy.golang.org,direct`
    国内设置如下: 

    - 阿里云: `https://mirrors.aliyun.com/goproxy/`

    - 七牛云: `https://goproxy.cn,direct`

    设置命令: 

    ```sh
    go env -w GOPROXY=https://goproxy.cn,direct
    ```

## 短声明

短声明可以看成是一种声明变量的语法糖, 如下: 

```go
package main

import "fmt"

func main() {

	// 正常声明变量
	var x = 1
	
	// 短声明
	y := 2

	fmt.Printf("x = %v, y = %v", x, y) // x = 1, y = 2
}
```

短声明的语法更短, 而且可以在无法使用`var`的地方使用短声明, 下面是几个使用场景

**在`for`循环中使用短声明**:

```go
package main

import (
	"fmt"
	"time"
)

func main() {

	for i := 0; i < 5; i++ {
		time.Sleep(time.Second / 2) // 阻塞 0.5 秒
		fmt.Println(i)
	}
}
```

**在`if`中使用短声明**:

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {

	if n := rand.Intn(10); n > 5 {
		fmt.Println("生成的随机数大于5")
	} else if n <= 5 {
		fmt.Println("生成的随机数小于等于5")
	}
}
```

**在`switch`中使用短声明**:

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	switch n := rand.Intn(10); n {
	case 1, 2, 3, 4, 5:
		fmt.Println("1 | 2 | 3 | 4 | 5")
	default:
		fmt.Println("other")
	}
}
```

## package作用域

`Go`的变量和作用域和一般的编程语言是一样的, 有一个**package作用域**有点像是全局作用域, **package作用域**的变量**不能使用短声明来声明变量**:

```go
package main

import "fmt"

const name = "foo"

// age := 18 // Error

func main() {
	fmt.Println(name)

	say_hi()
}

func say_hi() {
	fmt.Println(name)
}
```

## 类型别名

`Go`中也有类型别名的功能, 使用`type`关键字定义:

```go
type MyInt = int64
```

类型别名还是原来的类型:

```go
package main

import "fmt"

func main() {
	type MyInt = int64

	var x MyInt = 1

	fmt.Printf("%T", x) // int64
}
```

## 字符串

字符串分为:

-   字符串字面值(*string iteral*): **会转义字符, 不支持换行**
-   原始字符串(*raw string iteral*): **不会转义字符, 支持换行**

```go
package main

import "fmt"

func main() {
	// 字符串字面值(会转义字符)
	s := "\thello\nworld"

	// 原始字符串(不会转义字符)
	msg := `\thello\nworld`

	fmt.Println(s)
	fmt.Println(msg)
}
```

### 字符串本身不可变

可以给某个变量赋值不同的`string`值, 但是`string`本身是不可变的

```go
package main

import "fmt"

func main() {
	s := "hello"

	fmt.Printf("s[0] = %c\n", s[0]) // s[0] = h

	// Error 报错
	// s[2] = 'a'
}
```

### 处理utf8

处理`utf8`可以使用`"unicode/utf8"`包

### fmt.Sprintf

`fmt.Sprintf`类似于`fmt.Printf`只不过是返回字符串:

```go
package main

import (
	"fmt"
)

func main() {
	x := 1
	s := fmt.Sprintf("1 * 2 = %v", x*2)

	fmt.Println(s) // 1 * 2 = 2
}
```

### 操作字符串

操作字符串可以使用[`strings`](https://studygolang.com/pkgdoc)包里的函数

-   `strings.Split()`切割数组

```go
package test

import (
	"fmt"
	"strings"
)

func main() {
	s := "hello world"
	list := strings.Split(s, " ")
	fmt.Println(list) // [hello world]
}
```

-   `strings.ToUpper`和`strings.ToLower`转换大小写
-   `strings.Join()`拼接字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	s := [...]string{
		"a",
		"b",
		"c",
	}
	new_s := strings.Join(s[:], "*")
	fmt.Println(new_s) // a*b*c
}
```

-   使用切片截取字符串

```go
package main

import (
	"fmt"
)

func main() {
	s := "hello world"
	fmt.Println(s[:])  // hello world
	fmt.Println(s[:5]) // hello
	fmt.Println(s[3:]) // lo world
}
```

-   `strings.Trim()`去除两边指定的字符串

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(strings.Trim("  hello world  ", " ")) // hello world
	fmt.Println(strings.Trim("hello world", "hello")) //  world
}
```

>   还有`TrimFunc()`,`TrimLift()`,`TrimRight()`等方法也是类似

## 内置函数

`Go`里面有一些内置的函数, 比如: `len`用于获取字符串的长度

| 函数             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `append`         | 用来追加元素到数组, slice中,返回修改后的数组, slice          |
| `close`          | 主要用来关闭`channel`                                        |
| `delete`         | 从`map`中删除`key`对应的`value`                              |
| `panic`          | 停止常规的`goroutine`  (panic和recover: 用来做错误处理)      |
| `recover`        | 允许程序定义`goroutine`的**panic**动作                       |
| `real`           | 返回`complex`的实部(complex, real imag：用于创建和操作复数)  |
| `imag`           | 返回`complex`的虚部                                          |
| `make`           | 用来分配内存, 返回`Type`本身(只能应用于`slice`, `map`, `channel`) |
| `new`            | 用来分配内存, 主要用来分配值类型, 比如`int`, `struct`。返回指向Type的指针 |
| `cap`            | `capacity`是容量的意思, 用于返回某个类型的最大容量(只能用于`slice`和 `map`) |
| `copy`           | 用于复制和连接`slice`, 返回复制的数目                        |
| `len`            | 求长度, 比如`string`, `array`, `slice`, `map`, `channel`, 返回长度 |
| `print, println` | 底层打印函数, 在部署环境中建议使用`fmt`包                    |

```go
package main

import (
	"fmt"
)

func main() {
	s1 := "hello"
	s2 := "你好"

	fmt.Println(len(s1)) // 5
	fmt.Println(len(s2)) // 6
}
```

## range

使用`range`关键字, 可以遍历各种集合:

```go
package main

import (
	"fmt"
)

func main() {
	s := "hello world"

  // 遍历字符串
	for i, c := range s {
		fmt.Printf("索引: %v, 字符: %c\n", i, c)
	}
}
```

>   如果使用`range`关键字遍历不需要索引的话, 可以使用`_`来省略不需要的变量

## 类型转换

不同类型是不能直接拼接或者四则运算的, 需要进行转换, 类型转换有两种方式: 

1.   调用**对应类型的函数**转换:

```go
package main

import (
	"fmt"
)

func main() {
	x := 1
	y := 2.0
	// fmt.Println(x * y) // Error

	fmt.Println(x * int(y))
	fmt.Println(float64(x) * y)
	fmt.Println(int(y))

	var c rune = 65
	fmt.Println("c:", string(c)) // c: A
	fmt.Printf("c: %c\n", c)     // c: A

	var b byte = byte('h')
	var bs []byte = []byte("hello world")
	fmt.Println("b:", b)   // b: 104
	fmt.Println("bs:", bs) // bs: [104 101 108 108 111 32 119 111 114 108 100]
}
```

>   注意: 如果是使用`string(false)`, `int(false)`, `bool(1)`, `bool("yes")`类似的方式进行转换编译器会报错

2.   `interface{}`或者`any`类型的转换, 语法如下:

     ```go
     newVar, ok := var.(T)
     ```

     基本使用: 

     ```go
     package main
     
     import "fmt"
     
     // x 类型为任意值
     var x interface{}
     // var x any
     
     func main() {
     	x = 3.14
     	// 先判断是否可以转换为目标类型再进行其他操作
     	if _, ok := x.(float64); ok {
     		fmt.Printf("x变量的类型是: %T, 值是: %v\n", x, x) // x变量的类型是: float64, 值是: 3.14
     	}
     }
     ```

## 函数

使用`func`函数进行函数声明, 下面以`rand`包的`Intn`函数的声明为例:

```go
func Intn(n int) int { 
	// ...
}
```

`Intn`函数, 接受一个参数`n`类型是`int`返回值的类型是`int`

### 匿名函数

`Go`中的匿名函数和JS很像

```go
var add = func(a, b int) int {
  return a + b;
}
```

#### 匿名函数立即执行

`Go`中也有类似JS`iife`函数, 如下:

```go
// 类似于 js 的 iife
func() {
  fmt.Println("iife")
}()
```

### 函数默认导出

在`Go`里, **大写字母开头的函数, 变量或者其他的标识符都会被导出, 对其他包可用**, 小写字母开头的就不行

当函数声明在同一个包中时, 可以不用导包直接使用函数名调用该函数

### 函数参数类型简化

当一个函数接受的多个参数类型都是一样的就可以简化, 只在最后一个参数写上类型: 

```go
package main

import (
	"fmt"
)

func main() {
	sum := add(1, 2)
	fmt.Println(sum) // 3
}

// 函数参数类型都是 int
func add(a, b int) int {
	return a + b
}
```

### 函数返回多个值

函数可以声明为返回多个值, 语法如下:

```go
// 完整写法
func test1() (x int, y float64) {}

// 简写
func test2() (int, float64) {}
```

基本使用:

```go
package main

import (
	"fmt"
)

func main() {
	x1, y1 := test1()
	x2, y2 := test2()
}

// 完整写法
func test1() (x int, y float64) {
	return 1, 2.0
}

// 简写
func test2() (int, float64) {
	return 1, 2.0
}
```

### 可变参数

以`fmt.Println`函数为例, 它的类型声明如下:

```go
func Println(a ...any) (n int, err error) {
	// ...
}
```

`...`表示类型的参数是可变的, `any`表示可以是任意的类型, 也可以这样写`interface{}`

当`...`和`any`组合时就可以接受任意数量和任意类型的参数了

基本使用: 

```go
package main

import (
	"fmt"
)

func main() {

	test(1, "2", true, 3.14)
}

func test(args ...any) {

	// fmt.Println(args...) // 相当于是 JS 的展开运算

	for _, item := range args {
		fmt.Println("item: ", item)
	}
}
```

### 一等函数

在`Go`中函数是"一等公民", 它具有高阶函数的所有特点:

-   将函数赋值给变量

    ```go
    package main
    
    import "fmt"
    
    func main() {
    	// 赋值一个匿名函数
    	hi1 := func(s string) {
    		fmt.Println(s)
    	}
    	hi1("hello") // hello
    
    	// 赋值一个函数
    	hi2 := hello
    	hi2() // hello
    }
    
    func hello() {
    	fmt.Println("hello")
    }
    ```

-   将函数作为参数传递

    ```go
    package main
    
    import "fmt"
    
    func main() {
    	hello(1, 2,
    		func(a, b int) int {
    			return a + b
    		}) // a + b = 3
    
    }
    
    // 声明对应的参数类型
    func hello(a, b int, fn func(a, b int) int) {
    	fmt.Printf("a + b = %v", fn(a, b))
    }
    ```

    当碰到很长的类型时, 可以使用别名简化

    ```go
    // 将函数的类型声明为别名
    type funcType = func(a, b int) int
    
    // 将别名作为类型
    func hello(a, b int, fn funcType) {
    	fmt.Printf("a + b = %v", fn(a, b))
    }
    ```

-   将函数作为返回值返回(常用于**闭包**)

    ```go
    package main
    
    import "fmt"
    
    func main() {
    
    	f := hello(1)
    	fmt.Println(f(2)) // a + b = 3
    }
    
    type resType = func(int) string
    
    func hello(a int) resType {
      
      // 返回的函数可以捕获外部的变量
    	return func(b int) string {
    		return fmt.Sprintf("a + b = %v", a+b)
    	}
    }
    ```

## 方法

### 声明新类型

声明新类型和类型别名差不多如下:

```go
// 注意: 没有 = 号
type MyInt int64
```

声明的新类型不能和原类型混用:

```go
package main

import "fmt"

func main() {
	type MyInt int64
	var x MyInt = 1
	fmt.Printf("%T\n", x) // main.MyInt

	var y int = 2
	fmt.Printf("%T\n", y) // int

  // Error 类型混用了
	// fmt.Println(x + y)
}
```

### 通过方法添加行为

在`Go`里, 它提供了方法, 但是没有提供类和对象, `Go`的方法很灵活, 可以将方法与同包中的声明的任何类型相关联, 但是不可以是`int`,`float64`这样内置的类型相关联:

```go
package main

import "fmt"

func main() {
	MyInt.test(1, 2, 3.0) // m: 1, a: 2, b: 3
}

type MyInt int

// 将 test 函数关联为 MyInt 类型的方法
func (m MyInt) test(a int, b float64) {
	fmt.Printf("m: %v, a: %v, b: %v", m, a, b)
}
```

上面例子中的`(n MyInt)`是`test`函数的类型接收者(每个方法只能有一个类型接收者)

## 数组

数组是一种固定长度且有序的元素集合, **数组声明了但是没有赋值就是这个类型的零值, 数组的长度也是类型的一部分**:

```go
package main

import "fmt"

func main() {

	var v [5]string
	v[0] = "hello"
	v[1] = "world"

	fmt.Println(v[2] == "") // true
	fmt.Println(len(v))     // 5
	fmt.Println(v)          // [hello world   ]
}
```

### 数组越界

`Go`中数组越界会报错

```go
package main

import "fmt"

func main() {

	var v [5]string

	fmt.Println(v[99]) // Error 索引越界
}
```

### 复合字面值初始化数组

`Go`的复合字面值语法可以一步就完成声明数组和初始化数组和两步操作:

```go
package main

import "fmt"

func main() {

	colors := [3]string{"red", "blue", "yellow"}
	fmt.Println(colors) // [red blue yellow]

	// 使用 ... 作为长度, 让编译器自动推断数组长度
	v := [...]int{1, 2, 3}
	fmt.Println(v) // [1 2 3]
}
```

>   无论是使用那种方式声明的数组长度都是固定的

### 遍历数组

遍历数组可以使用`for`循环或者`range`: 

```go
package main

import "fmt"

func main() {

	colors := [...]string{"red", "blue", "yellow"}

	// for循环
	for i := 0; i < len(colors); i++ {
		item := colors[i]
		fmt.Println(i, item)
	}

	// range
	for i, item := range colors {
		fmt.Println(i, item)
	}
}
```

### 数组的复制

无论数组是赋值给新的变量还是将它传递给函数, 都会产生一模一样的**数组副本**:

```go
package main

import "fmt"

func main() {

	colors := [...]string{"red", "blue", "yellow"}

  // 直接进行了复制
	v := colors

	colors[0] = "green"

	fmt.Println("colors: ", colors) // colors:  [green blue yellow]
	fmt.Println("v: ", v)           // v:  [red blue yellow]
}
```

数组也是一种值, 函数通过值进行传递来接收参数, 所以数组作为参数是非常低效的:

```go
package main

import "fmt"

func main() {

	colors := [...]string{"red", "blue", "yellow"}

	forEachArray(colors)

	fmt.Println("colors: ", colors) // colors:  [red blue yellow]
}

// 直接接收数组的函数, 效率是很低的
func forEachArray(list [3]string) {
	// 修改每一个元素的值
	for i, v := range list {
		list[i] = "New" + v
	}
	fmt.Println("list: ", list) // list:  [Newred Newblue Newyellow]
}
```

>   函数一般是使用`slice`(切片)作为参数而不是直接使用数组

### 二维数组

```go
package main

import "fmt"

func main() {

	// 内层数组长度不可省略, 对应类型为: [3][3]int
	v := [...][3]int{
		{1, 2, 3},
		{4, 5, 6},
		{7, 8, 9},
	}

	fmt.Println("v: ", v)             // v:  [[1 2 3] [4 5 6] [7 8 9]]
	fmt.Println("v[0]: ", v[0])       // v[0]:  [1 2 3]
	fmt.Println("v[0][0]: ", v[0][0]) // v[0][0]:  1

	// 遍历的话就需要两层遍历
	for _, list := range v {
		for _, item := range list {
			fmt.Println(item)
		}
	}
}
```

## Slice(切片)

假设有一个数组`colors`,那么`colors[0:4]`就是一个 `Slice`, 它取出数组的前四个元素, 切片数组不会导致数组被修改, 它只是创建一个指向数组的窗口或视图, 这种视图就是`Slice`类型, `Slice`使用的是半开区间, 包括开始索引但不包括结束索引:

```go
package main

import "fmt"

func main() {

	v := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 切片可以省略开始索引或者结束索引
	v1 := v[:4]
	v2 := v[2:4]
	v3 := v[4:]
	v4 := v[:]

	fmt.Println("v1: ", v1) // v1: [1 2 3 4]
	fmt.Println("v2: ", v2) // v2: [3 4]
	fmt.Println("v3: ", v3) // v3: [5 6 7 8 9]
	fmt.Println("v4: ", v4) // v4: [1 2 3 4 5 6 7 8 9]
}
```

>   注意: `slice`的索引不能是负数

### Slice切分字符串

`Slice`也可以切片字符串:

```go
package main

import "fmt"

func main() {

	s := "hello world"

	s1 := s[:5]
	fmt.Println(s1) // hello

	// 修改原先的字符串不会影响已经切片的数据
	s = "abcd"
	fmt.Println(s1) // hello
}
```

### Slice的复合字面值

`Go`里面很多函数倾向于使用`Slice`而不是数组作为参数, 经常使用`array[:]`来快速获取切片, 或者直接声明`Slice`和数组很像, 不知道长度即可:

```go
package main

import "fmt"

func main() {

	// 注意: 这个是数组
	v := [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 快速切分
	v1 := v[:]

	// 手动声明切分
	v2 := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}

	fmt.Println(v1) // [1 2 3 4 5 6 7 8 9]
	fmt.Println(v2) // [1 2 3 4 5 6 7 8 9]

	fmt.Printf("数组类型 %T, 切片类型 %T", v, v1) // 数组类型 [9]int, 切片类型 []int
}
```

### Slice作为函数参数

`Slice`作为函数参数是会影响原先的数组的:

```go
package main

import (
	"fmt"
	"strings"
)

func main() {

	colors := [...]string{"  red ", " yellow  ", "blue  "}

	fmt.Println("before colors: ", colors) // before colors:  [  red   yellow   blue  ]

	stringArrayTrim(colors[:])

	fmt.Println("after colors: ", colors) // after colors:  [red yellow blue]
}

func stringArrayTrim(list []string) {
	for i, v := range list {
    // 去除空格
		list[i] = strings.TrimSpace(v)
	}
}
```

### 为切片绑定方法

```go
package main

import (
	"fmt"
	"strings"
)

func main() {

	// 声明为新类型
	colors := MySlice{"  red ", " yellow  ", "blue  "}

	fmt.Println("befote colors: ", colors) // after colors:  [red yellow blue]

	// 调用绑定的方法
	colors.stringArrayTrim()
	fmt.Println("after colors: ", colors) // after m:  [red yellow blue]
}

type MySlice []string

func (m MySlice) stringArrayTrim() {
	for i, v := range m {
		m[i] = strings.TrimSpace(v)
	}
}
```

### 可变的Slice

`Go`通过`Slice`和`append`函数实现可变的切片:

```go
package main

import "fmt"

func main() {

	colors := []string{"red", "yellow", "blue"}

	// 重新覆盖之前的切片
	colors = append(colors, "pink")
	fmt.Println("colors: ", colors) // colors:  [red yellow blue pink]

  // 可以一次添加多个
	colors = append(colors, "block", "green")
	fmt.Println("colors: ", colors) // colors:  [red yellow blue pink block green]
}
```

### 切片大小和容量

切片的长度可以使用`len`函数获取, 切片的容量可以使用`cap`函数获取, 切片底层会有数组来存储数据, 当不够时会自动扩容一倍的大小:

```go
package main

import "fmt"

func main() {

	v := []int{1, 2, 3}
	sliceInfo(v) // 长度: 3, 容量: 3, 数据: [1 2 3]

	v = append(v, 4)
	sliceInfo(v) // 长度: 4, 容量: 6, 数据: [1 2 3 4]

	v = append(v, 5, 6, 7, 8)
	sliceInfo(v) // 长度: 8, 容量: 12, 数据: [1 2 3 4 5 6 7 8]
}

func sliceInfo(list []int) {
	fmt.Printf("长度: %v, 容量: %v, 数据: %v\n", len(list), cap(list), list)
}
```

>   `Slice`的索引操作还可以指定第三个参数用来指定容量的大小

### make函数对Slice进行预分配

当`Slice`的容量不足以执行`append`操作时, `Go`会自动进行创建新数组并复制旧数组中的内容, 但是通过`make`函数可以预先进行分配指定大小的空间:

```go
package main

import "fmt"

func main() {

	// 创建长度为 0, 容量为 10 的 []int 切片
	v := make([]int, 0, 10)
	sliceInfo(v) // 长度: 0, 容量: 10, 数据: []

	v = append(v, 1)
	sliceInfo(v) // 长度: 1, 容量: 10, 数据: [1]

	v = append(v, 2, 3)
	sliceInfo(v) // 长度: 3, 容量: 10, 数据: [1 2 3]
}

func sliceInfo(list []int) {
	fmt.Printf("长度: %v, 容量: %v, 数据: %v\n", len(list), cap(list), list)
}
```

## map

`Go`中的`map`跟其他的语言是差不多的意思, 键值对格式的数据结构, `map`需要声明键值对的类型, 形如`map[string] int`: 

```go
package main

import "fmt"

func main() {
	// 键的类型为: string, 值的类型为: int
	o := map[string]int{
		"red":    1,
		"blue":   2,
		"yellow": 3,
	}

	o["green"] = 4
	fmt.Println(o) // map[blue:2 green:4 red:1 yellow:3]

	red := o["red"]
	fmt.Println(red) // 1

	// 获取不存在的键时, 会获取到对应类型的零值
	fmt.Println(o["hello"]) // 0

	// key 也可以是一个变量
	k := "yellow"
	fmt.Println(o[k]) // 3
}
```

### 逗号和ok写法

一般的业务是获取一个值, 如果这个值**存在**则执行什么操作, 否则就执行另外的操作, **逗号和ok写法**的写法就是一种语法糖:

```go
package main

import "fmt"

func main() {
	o := map[string]int{
		"red":    1,
		"blue":   2,
		"yellow": 3,
	}

	if item, ok := o["hello"]; ok {
		fmt.Println(item)
	} else {
		fmt.Println("hello 的key不存在")
	}
}
```

### map不会被复制

`map`作为参数或者传递给别的变量时**不会被复制**:

```go
package main

import "fmt"

func main() {
	o := map[string]int{
		"red":    1,
		"yellow": 2,
	}

	fmt.Println(o) // map[red:1 yellow:2]
	test(o)
	fmt.Println(o) // map[red:999]
}

func test(m map[string]int) {
	m["red"] = 999

	delete(m, "yellow") // 删除指定的 key
}
```

### make函数对map进行预分配

除非使用符合字面量进行初始化`map`, 否则就只能使用`make`函数进行预分配:

```go
package main

import "fmt"

func main() {
	o := make(map[string]int)

	mapInfo(o) // key长度: 0, 数据: map[]
	o["red"] = 1
	mapInfo(o) // key长度: 1, 数据: map[red:1]
}

func mapInfo(m map[string]int) {
	fmt.Printf("key长度: %v, 数据: %v\n", len(m), m)
}
```

### 遍历map

可以使用`range`可以遍历`map`, 但是顺序不能保证:

```go
package main

import "fmt"

func main() {
	o := map[string]int{
		"red":    1,
		"yellow": 2,
		"green":  3,
	}

	for k, v := range o {
		fmt.Printf("键: %v, 值: %v\n", k, v)
	}
}
```

### 将map用作set

`Go`中没有提供`set`的数据结构, 但是可以使用`map`代替:

```go
package main

import "fmt"

func main() {
	v := []int{1, 2, 2, 3, 4, 1, 1, 4, 5}

	set := make(map[int]bool)

	for _, item := range v {
		if _, ok := set[item]; ok {
			fmt.Println("重复的元素", item)
		} else {
			set[item] = true
		}
	}

	fmt.Println(set)
}
```

## struct

`Go`中也有结构体类型, 使用`struct`关键字声明, 大写开头的字段是默认导出的: 

```go
package main

import "fmt"

func main() {
	// 声明 p 变量为对应的机构体类型
	var p struct {
		name string
		age  int
	}

	p.name = "张三"
	p.age = 18

	fmt.Println(p)      // {张三 18}
	fmt.Println(p.name) // 张三
}
```

### 根据类型生成结构体

可以使用`type`来定义对应的结构体类型, 好处是可以复用:

```go
package main

import "fmt"

func main() {
	// 使用 type 定义一个 Persion 结构体
	type Persion struct {
		name string
		age  int
	}

	p1 := Persion{
		name: "张三",
		age:  18,
	}
	fmt.Println(p1) // {张三 18}

	var p2 Persion
	p2.name = "李四"
	p2.age = 28
	fmt.Println(p2) // {李四 28}
}
```

### 复合字面量初始化struct

复合字面量初始化`struct`有两种写法

-   通过成对的字段和值进行初始化
-   按字段定义的顺序进行初始化

```go
package main

import "fmt"

func main() {
	type Persion struct {
		name string
		age  int
	}

	// 成对的字段和值
	p1 := Persion {
		name: "张三",
		age:  18,
	}
	fmt.Printf("p1: %v\n", p1) // p1: {张三 18}

	// 字段定义的顺序
	p2 := Persion{"李四", 28}
	fmt.Printf("p2: %+v\n", p2) // p2: {name:李四 age:28}

	var p3 = Persion{"王五", 38}
	fmt.Printf("p3: %+v\n", p3) // p3: {name:王五 age:38}
}
```

>   使用`%+v`格式化动词可以打印出字段`key`和值的结构

### 结构体的复制

结构体赋值或者作为参数传递是会完整复制的:

```go
package main

import "fmt"

type Persion struct {
	name string
	age  int
}

func main() {
	p1 := Persion{
		name: "张三",
		age:  18,
	}

	p2 := p1
	p2.name = "hello"

	fmt.Println(p1) // {张三 18}
	fmt.Println(p2) // {hello 18}
}
```

### 将struct编码为JSON

可以使用`encoding/json`包中的`Marshal`函数来将`struct`中的数据转换为`JSON`格式(**只有被导出的字段才可以转换**):

```go
package main

import (
	"encoding/json"
	"fmt"
	"os"
)

// 字段都是大写(表示是被导出的)
type Persion struct {
	Name string
	Age  int
}

func main() {
	p := Persion{
		Name: "张三",
		Age:  18,
	}

	bytes, err := json.Marshal(p)

	if err != nil {
		fmt.Println("转换发生了错误: ", err.Error())
		os.Exit(1)
	}

	fmt.Println("json: ", string(bytes)) // json:  {"Name":"张三","Age":18}
}
```

如果想格式化的字段重命名的话, 就需要特地的标签注明

```go
// 自定义json化的字段名
type Persion struct {
	Name string `json:"aaa"`
	Age  int    `json:"bbb"`
}
```

### 将方法关联到struct

`Go`中没有`Class`, 但是可以使用`struct`模拟出来:

```go
package main

import (
	"fmt"
)

func main() {
	p := NewPersion("张三", 18)

	p.fmtInfo() // {name:张三 age:18}
}

type Persion struct {
	name string
	age  int
}

// 构造函数
func NewPersion(name string, age int) Persion {
	return Persion{name, age}
}

// Persion 的方法
func (p Persion) fmtInfo() {
	fmt.Printf("%+v\n", p)
}
```

因为`Go`没有构造函数的概念, 所以以`new`或者`new`开头加一个类型的函数, 可以理解为是某个类型的构造函数

### New函数

有一些用于构造的函数名称就是`New`, 例如: `errors`包里的`New`函数

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("error message")

	test(err)
}

func test(e error) {
	fmt.Println(e.Error())
}
```

## 组合和转发

### 组合

在面向对象的世界中, 对象由更小的对象组合而成, `Go`中没有面向对象中的**继承**, 但是提供了更灵活的方式**组合**:

```go
package main

import "fmt"

func main() {
	info := UserInfo{
		height: 180,
		weight: 100,
	}

	u := User{
		name:    "张三",
		age:     18,
		address: "广东省",
		info:    info}

	fmt.Printf("%+v\n", u) // {name:张三 age:18 address:广东省 info:{height:180 weight:100}}
}

// 组合成用户类型
type User struct {
	name    string
	age     uint8
	address string
	info    UserInfo
}

// 用户信息
type UserInfo struct {
	height uint8
	weight uint32
}
```

### 转发

利用**组合**的类型可以很轻松的使用**转发**进行搭积木一样进行搭建:

```go
package main

import "fmt"

func main() {
	info := UserInfo{
		height: 180,
		weight: 100,
	}

	u := User{
		name:    "张三",
		age:     18,
		address: "广东省",
		info:    info}

	// 调用转发的方法
	u.showUserInfo() // {height:180 weight:100}

	// 不调用转发的方法
	u.info.showUserInfo() // {height:180 weight:100}
}

type User struct {
	name    string
	age     uint8
	address string
	info    UserInfo
}

// 方法的转发
func (u User) showUserInfo() {
	u.info.showUserInfo()
}

// 用户信息
type UserInfo struct {
	height uint8
	weight uint32
}

func (i UserInfo) showUserInfo() {
	fmt.Printf("%+v\n", i)
}
```

### struct嵌入

当使用**组合**的时候可以直接写一个类型, 这时**该类型的方法和字段可以直接被转发到目标类型上面**:

```go
package main

import "fmt"

func main() {
	info := UserInfo{
		height: 180,
		weight: 100,
	}

	u := User{
		name:     "张三",
		age:      18,
		address:  "广东省",
		UserInfo: info}

	// 可以直接调用 UserInfo 上的方法
	u.showUserInfo() // {height:180 weight:100}
	// 可以直接调用 UserInfo 上的字段
	fmt.Println(u.height, u.weight) // 180 100

	// 手动调用 UserInfo 上面的方法
	u.UserInfo.showUserInfo() // {height:180 weight:100}
}

type User struct {
	name     string
	age      uint8
	address  string
	UserInfo // 这里只写了一个类型, 表示字段名和类型同名
}

type UserInfo struct {
	height uint8
	weight uint32
}

func (i UserInfo) showUserInfo() {
	fmt.Printf("%+v\n", i)
}
```

>   转发可以转发**任意类型**, 包括内置的类型(不推荐)

### 命名冲突

当使用`struct 嵌入`时, 如果**组合**类型中存在同名的方法, 就会出现命名冲突, 这时就必须使用对应类型上面的方法了, **不能直接使用自动转发的方法**:

```go
package main

import "fmt"

func main() {
	u := User{
		UserInfo1: UserInfo1{180, 100},
		UserInfo2: UserInfo2{150, 90}}

	// u.showUserInfo() // Error 不知道调用那个方法

	// 需要明确是调用哪个类型上面的方法
	u.UserInfo1.showUserInfo() // {height:180 weight:100}
	u.UserInfo2.showUserInfo() // {height:150 weight:90}
}

type User struct {
	UserInfo1
	UserInfo2
}

type UserInfo1 struct {
	height uint8
	weight uint32
}

func (i UserInfo1) showUserInfo() {
	fmt.Printf("%+v\n", i)
}

////

type UserInfo2 struct {
	height uint8
	weight uint32
}

func (i UserInfo2) showUserInfo() {
	fmt.Printf("%+v\n", i)
}
```

>   注意: 如果本身定义有和**转发**同名的方法则**本身的方法优先级最高**

## 接口

在`Go`中声明接口也是使用`interface`关键字

>    `interface{}`可以用来表示任何的类型

### 接口变量

接口变量一般是一次性的使用, 针对的是单个的变量: 

```go
package main

import "fmt"

func main() {
	// t 就是一个接口变量
	var t interface {
		// 需要一个 add 方法
		add(a, b int) int
	}

	// Obj 类型实现了 t 变量接口的类型
	t = Obj{}

	fmt.Println(t.add(1, 2)) // 3
}

type Obj struct{}

func (o Obj) add(a, b int) int {
	return a + b
}
```

### 接口类型

为了复用, 通常会把接口声明为类型, 按照约定接口的类型名通常以`er`结尾, 接口类型可以使用到任何类型可以使用的地方:

```go
package main

import "fmt"

// 声明接口类型
type adder interface {
	add(a, b int) int
}

////
type Obj struct{}

func (o Obj) add(a, b int) int {
	return a + b
}

////

// 应用在函数参数上面
func test(t adder, a, b int) {
	fmt.Println(t.add(a, b))
}

////

func main() {

	// 应用在类型上面
	var t adder = Obj{}
	fmt.Println(t.add(1, 2)) // 3

	test(t, 3, 4) // 7
}
```

>   接口可以和`struct 嵌入`特性一起使用

## 指针

指针是执行另一个变量地址的变量, `Go`中的指针同时也是强调安全性的, 虽然没`Rust`的所有权那么强大, 但是也不会出现迷途指针

`Go`中也是通过`&`表示地址操作符, 用于取变量的内存地址, `*`表示解引用, 取内存地址对应的值: 

```go
package main

import "fmt"

func main() {

	x := 1
	p := &x

	fmt.Println("x内存地址: ", p)   // x内存地址:  0xc0000180a8
	fmt.Println("x指针对应值: ", *p) // x指针对应值:  1
}
```

>   `&`操作符无法获得字符串/数值/布尔字面值的地址

>   在一些语言中, 如: C, Rust, 可以直接对指针进行操作, 如指向下一个内存地址, 在`Go`中是不允许的

### 指针的类型

指针类型存储的值内存地址, 如: `*int`,`*string`等, 它可以使用在其他类型可以使用的任何位置: 

```go
package main

import "fmt"

func main() {

	x := 1
	var p *int = &x

	fmt.Printf("int指针的类型: %T ", p) // int指针的类型: *int
}
```

### 指针操作

指针可以直接进行比较, 修改指向的值

```go
package main

import "fmt"

func main() {

	x := 1
	p1 := &x
	p2 := &x

	fmt.Printf("p1: %v, p2: %v\n", p1, p2) // p1: 0xc0000180a8, p2: 0xc0000180a8

	// 比较
	fmt.Println(p1 == p2) // true

	// 修改指向的值
	*p1 = 2
	fmt.Println(x) // 2
}
```

### 指针指向结构体

指针可以直接指向复合字面量, **对字段的访问可以直接访问也可以解引用访问**: 

```go
package main

import "fmt"

func main() {
	p := &Persion{"张三", 18}

	fmt.Println(p)  // &{张三 18}
	fmt.Println(*p) // {张三 18}

	// 可以跳过解引用直接读取下面的字符
	fmt.Println(p.name) // 张三

	// 也可以通过解引用读取
	fmt.Println((*p).name) // 张三
}

type Persion struct {
	name string
	age  uint
}
```

### 指向数组的指针

指向数组的指针, 也可以直接进行访问, 也可以解引用进行访问: 

```go
package main

import "fmt"

func main() {
	v := &[...]int{1, 2, 3}

	fmt.Println(v)  // &[1 2 3
	fmt.Println(*v) // [1 2 3]

	// 可以直接访问索引, 也可以解引用访问
	fmt.Println(v[0])    // 1
	fmt.Println((*v)[0]) // 1

	// 直接应用于切片
	fmt.Println(v[:]) // [1 2 3]
}
```

### 指向`Slice`和`map`的指针

指针可以指向`Slice`和`map`, 但是`Go`并没有提供自动解引用的功能:

```go
package main

import "fmt"

func main() {
	v := &[]int{1, 2, 3}

	fmt.Println(v)  // &[1 2 3
	fmt.Println(*v) // [1 2 3]

	// 必须解引用访问
	fmt.Println((*v)[0]) // 1

	////
	m := &map[string]int{
		"red": 1,
	}
	fmt.Println(m)  // &map[red:1]
	fmt.Println(*m) // map[red:1]
	// 必须解引用访问
	fmt.Println((*m)["red"]) // 1
}
```

### 指针作为参数

`Go`的函数和方法都是按值进行传递参数, 但是有的时候需要按引用传递, 这时可以使用指针: 

```go
package main

import "fmt"

func main() {
	per := Persion{"张三", 18}

	fmt.Println(per) // {张三 18}

	update(&per)

	fmt.Println(per) // {李四 20}
}

type Persion struct {
	name string
	age  uint
}

func update(p *Persion) {
	p.name = "李四"
	p.age = 20
}
```

### 指针接收者

指针作为接收者跟指针作为函数的参数很像: 

```go
package main

import "fmt"

func main() {
	per := Persion{"张三", 18}

	fmt.Println(per) // {张三 18}

  // 不加引用是一样的(会自动加 & 进行调用)
	per.update()
	(&per).update()

	fmt.Println(per) // {李四 20}
}

type Persion struct {
	name string
	age  uint
}

func (p *Persion) update() {
	p.name = "李四"
	p.age = 20
}
```

### 内部指针

`&`操作符不仅可以获得结构体的内存地址, 也可以获取结构体中指定字段的地址:

```go
package main

import "fmt"

func main() {
	per := Persion{"张三", 18, UserInfo{100, 180}}

	// 这里使用的就是内部指针
	show(&per.UserInfo) // 100 180
}

type Persion struct {
	name string
	age  uint
	UserInfo
}

type UserInfo struct {
	height uint
	weight int
}

func show(u *UserInfo) {
	fmt.Println(u.height, u.weight)
}
```

### 指针修改数组

```go
package main

import "fmt"

func main() {
	colors := [...]string{"red", "blue", "yellow"}

	fmt.Println(colors) // [red blue yellow]

	test(&colors)

	fmt.Println(colors) // [green blue yellow]
}

type Persion struct {
	name string
	age  uint
	UserInfo
}

type UserInfo struct {
	height uint
	weight int
}

func test(colors *[3]string) {
	colors[0] = "green"
}
```

### 隐式的指针

`Go`里一些内置的集合类型就在暗中使用指针

-   `map`在被赋值或者作为参数传递的时候不会被复制, 因为`map`就是一种隐式指针
-   `Slice`也是一种指向数组的隐式指针, 每个`Slice`都保存三个元素的结构: **数组的指针, 切片的容量, 切片的长度**

## nil

`Go`里面的`nil`有点像一些语言中的`null`, 它是一些类型的零值

-   一个指针如果没有明确的指向, 那它就是`nil`
-   还有`slice`,`map`和`interface`的零值都是`nil`
-   `nil`会导致程序*panic*

`nil`被经常用来判断操作是否成功: 

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	// string 转换为 int
	n, err := strconv.Atoi("1")

	// 判断是否有错误
	if err != nil {
		fmt.Println("转换发生了错误, ", err.Error())
	}

	fmt.Println("转换结果: ", n)
}
```

对`nil`解引用会导致程序*panic*

```go
package main

import "fmt"

func main() {
	var p *int
	fmt.Println(p) // <nil>

	fmt.Println(*p) // Error 程序 panic 了
}
```

### 防止nil导致的程序panic

在以指针为接收值或者参数时, 需要防止指针为`nil`导致的程序*panic*:

```go
package main

import "fmt"

func main() {
	var p *int
	test(p) // 非法的指针参数
}

func test(p *int) {
	if p == nil {
		fmt.Println("非法的指针参数")
		return
	}

	*p++
}
```

### 函数参数的默认值也是nil

函数参数的默认值也是`nil`, 所以必要的时候可以提供函数参数的默认值: 

```go
package main

import "fmt"

func main() {
	var fn func(s string)
	test(fn) // hello world
}

func test(fn func(s string)) {

	// 当函数参数为 nil 时, 使用默认的函数
	if fn == nil {
		fmt.Println("使用默认的函数")
		fn = func(s string) {
			fmt.Println(s)
		}
	}

	fn("hello world")
}
```

### 内置的函数处理nil

一些内置的函数是可以处理`nil`的情况的, 比如: `range`,`append`,`len`都可以处理: 

```go
package main

import "fmt"

func main() {
	var v []string

	fmt.Println(v == nil) // true

	fmt.Println(len(v)) // 0

	for _, item := range v {
		fmt.Println(item)
	}

	v = append(v, "hello")
	fmt.Println(v) // [hello]
}
```

>   虽然空的`Slice`和`nil`并不相等, 但是也需要等效的处理

## IO

IO操作可以使用[`io`](https://pkg.go.dev/io@go1.20)标准库

### 读取全部文件

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	context, err := ioutil.ReadFile("../main.go")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(0)
	}

	fmt.Println(string(context))
}
```

### 逐行读取

使用[`bufio`](https://pkg.go.dev/bufio@go1.20)包的`NewScanner`函数可以开启一个扫描器

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file_obj, err := os.Open("../main.go")
	if err != nil {
		fmt.Println(err.Error())
    return
	}

	defer file_obj.Close()

	// 创建扫描器
	file_scanner := bufio.NewScanner(file_obj)

	for file_scanner.Scan() {
		line := file_scanner.Text()
		fmt.Println("line:", line)
	}
}
```

### 写入文件

`OpenFile(文件地址, 权限, 模式)`

-   权限可见[os常量](https://pkg.go.dev/os#pkg-constants)

-   模式见官方文档[文件模式](https://pkg.go.dev/io/fs#FileMode)

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	// 打开文件, os.O_CREATE 表示文件不存在则新建(支持多个模式), 模式为: 0
	file_obj, err := os.OpenFile("../test.txt", os.O_CREATE|os.O_APPEND, 0)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer file_obj.Close()

	// 写入字节数据
	b1 := []byte("hello world\n")
	count, err := file_obj.Write(b1)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("写入了长度为 %v 的字节数据\n", count)

	// 写入字符串数据
	count, err = file_obj.WriteString("world")
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("写入了长度为 %v 的字符串数据\n", count)

	// 写入字节数据, 偏移量为 0
	b2 := []byte("xxxxxxxx\n")
	count, err = file_obj.WriteAt(b2, 0)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("写入了长度为 %v 的字节数据\n", count)
}
```

>   清空文件可以使用`Truncate()`方法

### 多次写入(缓冲区)

使用 [`bufio`](https://pkg.go.dev/bufio@go1.20) 里的 `Writer` 结构体去操作，它会开辟一个缓冲区，默认大小为 `4096` 字节。在数据没有被刷入磁盘之前，所写入的数据都会暂时保存到缓冲区里

```go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// 打开文件, os.O_CREATE 表示文件不存在则新建, 模式为: 0
	file_obj, err := os.OpenFile("../test.txt", os.O_CREATE, 0)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	defer file_obj.Close()

	writer := bufio.NewWriter(file_obj)

	// 写入字节
	if err = writer.WriteByte(62); err != nil {
		fmt.Println(err.Error())
		return
	}

	var count int

	// 写入字符
	if count, err = writer.WriteRune('a'); err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("写入了 %v 个长度的字符数据", count)

	if count, err = writer.WriteString("hello"); err != nil {
		fmt.Println(err.Error())
		return
	}
	fmt.Printf("写入了 %v 个长度的字符串数据", count)

	// 将缓存区中的数据写入到文件中
	writer.Flush()
}
```

## 错误处理

`Go`运行函数和方法返回多个值, 按照惯例, 函数在返回错误时, 最后边的值应该表示错误, 调用者调用后需要检查是否发生了错误, 

-   没有错误, 最后面的值为`nil`
-   发生了错误, 最后面的值就是对应的错误

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	// 读取当前目录
	files, err := ioutil.ReadDir(".")

	// 判断是否发生了错误
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	for _, v := range files {
		fmt.Println(v.Name())
	}
}
```

### 函数返回多个值

我们自己在书写可能发生错误的函数时, 也可以依照惯例, 来返回错误: 

```go
package main

import (
	"errors"
	"fmt"
	"os"
)

func main() {
	res, err := test(true)

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}

	fmt.Println(res)
}

func test(isError bool) (int, error) {
	if isError {
		// 发生了错误, 则返回对应的错误
		return 0, errors.New("error message")
	} else {
		// 没有错误, 返回 nil
		return 1, nil
	}
}
```

### defer

使用`defer`关键字, 可以让`deferred`动作在函数或者方法返回前执行:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	err := writeFile("./test.txt", "hello world")

	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	}
}

func writeFile(fileName string, text string) error {
	// 创建文件
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}

	// 写入内容到文件中
	_, err = fmt.Fprintln(file, text)
	if err != nil {
		return err
	}
  
  // 当函数执行完毕时, 关闭文件
	defer file.Close()
  // 可以指定多次
	defer fmt.Println("函数执行完毕")

	return nil
}
```

>   `defer`并不是专门做错误处理的, 而是用来消除必须时刻惦记执行资源释放的负担

### 自定义错误处理

`error`类型是一个内置的接口: 任何类型只要实现了返回`string`的`Error()`方法就满足了该接口, 就可以创建新的错误类型: 

```go
package main

import (
	"fmt"
)

func main() {
	err := test()

	fmt.Println(err.Error())
}

// 自定义错误结构体
type MyError struct {
	message string
}

// 实现错误接口
func (m MyError) Error() string {
	return m.message
}

func test() error {
	return MyError{"自定义错误消息"}
}
```

### 类型断言

使用类型断言, 你可以把接口类型转化成底层的具体类型, 例如: `err.(SudokuError)`

```go
package main

import (
	"fmt"
)

func main() {
	err := test()
	
  // 断言错误类型
	if _, ok := err.(MyError); ok {
		fmt.Println("err 是 MyError 类型")
	} else {
		fmt.Println("other error")
	}
}

type MyError struct {
	message string
}

func (m MyError) Error() string {
	return m.message
}

func test() error {
	return MyError{"自定义错误消息"}
}
```

>   如果类型满足多个接口，那么类型断言可使它从一个接口类型转化为早一个接口类型

### 手动panic

可以调用内置函数`panic`进行手动*panic*:

```go
package main

func main() {
	panic("手动 panic")
}
```

### 错误值, panic, os.Exit

通常, 更推荐使用**错误值**, 其次才是`panic`
`panic`比 `os.Exit`更好, `panic`后会执行所有`defer`的动作, 而`os.Exit`则不会

### recover

为了防止 `panic`导致程序崩溃, `Go`提供了`recover`函数, `defer`的动作会在函数返回前执行, 即使发生了`panic`, 但如果`defer`的函数里面调用了`recover`函数，`panic`就会停止, 程序将继续运行

```go
package main

import "fmt"

func main() {
	defer func() {
		e := recover()

		if e != nil {
			fmt.Println("panic 消息", e)
			fmt.Println("我继续执行了")
		}
	}()

	panic("手动 panic")
}
```

## goroutine

`goroutine`也叫**协程**, 是`Go`中的一个特点, `Go`中`goroutine`虽然跟其他语句的协程, 进程, 和线程都不一样, `Go`的`goroutine`创建效率非常的高, 是处理**并发**的一大利器,`Go`可以很简单的将顺序式代码修改为并发式代码, 只需要添加在函数或者方法的调用前, 添加`go`关键字即可:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
  // 添加 go 关键字进行调用(会起一个独立的任务进行运行)
	go sleepHi()
	time.Sleep(time.Second * 2)
}

func sleepHi() {
	time.Sleep(time.Second)
	fmt.Println("hello")
}
```

### 多个goroutine

每次使用`Go`关键字都会产生一个新的`goroutine`, 从表面上看, `goroutine`似乎在同时运行, 但由于计算机处理单元有限, 其实技术上来说, 这些`goroutine`不是真的在同时运行, 而是利用了**分时**技术, 在多个`goroutine`上轮流花费一些时间执行, 所以多个`goroutine`的执行顺序是无法保证的: 

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 5; i++ {
    // 5个`goroutine`的顺序无法确定
		go sleepHi(i)
	}
	time.Sleep(time.Second * 2)
}

func sleepHi(index int) {
	time.Sleep(time.Second)
	fmt.Println("hello", index)
}
```

### channel(通道)

`channel`可以在多个`goroutine`之间安全的传值, `channel`可以使用在变量, 参数, 结构体字段等地方

#### 创建channel

可以使用`make`函数创建`channel`, 类型是`chan 通道要传递的类型`

```go
package main

import (
	"fmt"
)

func main() {
	// 创建一个 channel, 传递的类型是 int
	c := make(chan int)

	test(c)
}

// 接收一个 channel 作为参数
func test(c chan int) {
	fmt.Println(c) // 0xc00001a120
}
```

#### 通过channel通信

使用左箭头操作符`<-`可以往`channel`里发送和接收值: 

**向`channel`发送值**

发送操作会等待直到另外一个`goroutine`对其进行接收数据为止

```go
c := make(chan int)

// 把 10 发送到 c 这个通道中
c <- 10
```

>   发送期间的`goroutine`无法执行其他的操作

**从`channel`中接收值**

执行接收操作的`goroutine`也会等待直到另外一个`goroutine`对其发送完毕数据为止

```go
c := make(chan int)

// 从 c 这个通道中读取值到 data 变量中
data := <- c

// 也可以从第二个返回值中判断通道是否已经关闭
data, ok := <- c
```

#### 一个`channel`可以给多个`goroutine`使用

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan int)

	// 执行 5次 goroutine
	for i := 0; i < 5; i++ {
		go sleep(i, c)
	}

	// 读取 5次channel的值
	for i := 0; i < 5; i++ {
		goFnId := <-c
		fmt.Println("接收到的channel值: ", goFnId)
	}
	time.Sleep(time.Second * 2)
}

func sleep(index int, c chan int) {
	time.Sleep(time.Second)

	// 向 channel 发送值
	c <- index
}
```

#### time.After

`time.After`函数是标准库内置的函数它返回一个通道(计算器通道), 该通道在指定时间后会接收到一个值(发送该值的`goroutine`是`Go`运行时的一部分)

#### 使用select处理多个通道

`select`语句用于等待不同类型的值, `select`和`switch`有点像

-   `select`语句包含的每个`case`都持有一个通道, 用来发送或接收数据

-   `select`会等待直到某个`case`分支的操作就绪, 然后就会执行该`case`分支

    

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	c := make(chan int)

	// 执行 5次 goroutine
	for i := 0; i < 5; i++ {
		go sleep(i, c)
	}

	// 定时器 channel(3s后返回值)
	timeout := time.After(time.Second * 3)

	// 读取 5次channel的值
	for i := 0; i < 5; i++ {

		select {
		case date := <-timeout: // 3s之后走这个 channel
			fmt.Println("定时器返回了值退出程序: ", date)
			return
		case goFnId := <-c: // 否则走这个 channel
			fmt.Println("接收到的channel值: ", goFnId)
		}
	}
}

func sleep(index int, c chan int) {
	// 0 ~ 5s 随机睡眠时间
	randTime := time.Duration(rand.Intn(5000)) * time.Millisecond

	time.Sleep(randTime)

	// 向 channel 发送值
	c <- index
}
```

>   注意: 即使已经停止等待`goroutine`，但只要`main`函数还没结束, 仍在运行的`goroutine`将会继续占用内存

>   `select`语法在不包含任何`case`的情况下将会永远等下去

#### nil通道

如果不使用`make`函数初始化通道, 那么通道变量的值就是`nil`

-   对`nil`通道进行发送或接收不会引起*panic*，但会导致永久阻塞
-   对`nil`通道执行`close`函数(**释放通道**), 那么会引起*panic*

```go
package main

import (
	"fmt"
)

func main() {
	// 没有使用 make 函数初始化 channel
	var c chan int

	fmt.Println(c)        // <nil>
	fmt.Println(c == nil) // true
}
```

`nil`通道的用处:

-   对于包含`select`语句的循环, 如果不希望每次循环都等待`select`所涉及的所有通道, 那么可以先将某些通道设为`nil`，等到发送值准备就绪之后, 再将通道变成一个非`nil`值并执行发送操作

### 阻塞和死锁

当`goroutine`在等待通道的发送或接收时, 就说它被**阻塞**了, 

除了`goroutine`本身占用少量的内存外, 被阻塞的`goroutine`并不消耗任何其它资源, 等待解除阻塞

当一个或多个`goroutine`因为某些永远无法发生的事情被阻塞时, 这种情况被称为**死锁**, 

而出现死锁的程序通常会崩溃或挂起, 如下代码就会导致**死锁**:

```go
package main

func main() {
	c := make(chan int)
	<-c // 这里会导致死锁
}
```

### 关闭的goroutine

`Go`允许在没有值可供发送的情况下通过`close`函数关闭通道, 

通道被关闭后无法写入任何值,如果尝试写入将引发 *panic*

尝试读取被关闭的通道会获得与通道类型对应的零值

>   注意: 如果循环里读取一个已关闭的通道，并没检查通道是否关闭,那么该循环可能会一直运转下去, 耗费大量 CPU时间, 可以先判断通道是否已经关闭`data, ok := <- c`在做操作

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan int)

	// 提前关闭通道
	close(c)

	go func() {
		data, ok := <-c
		if !ok {
			fmt.Println("通道已经关闭了")
			return
		}
		fmt.Println("读取到通道的值: ", data)
	}()

	// c <- 1

	time.Sleep(time.Second)
}
```

### range和channel

有一种很常用的模式是从通道里面读取值, 直到它关闭为止, `Go`提供了一个语法糖, 就是使用`range`关键字:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	c := make(chan int)

	go func() {
    // 只要通道没关闭就可以一直读取值
		for data := range c {
			fmt.Println("读取到通道的值: ", data)
		}
	}()

  // 隔 1s 发送一次值
	time.Sleep(time.Second)
	c <- 1
	time.Sleep(time.Second * 2)
	c <- 2

	time.Sleep(time.Second * 3)
}
```

### mutex(互斥锁)

`Go`中的互斥锁, 可以从`sync`包中获得:

```go
package main

import (
	"sync"
)

// 声明全局变量, 是一个 sync.Mutex 类型
var mu sync.Mutex

func main() {
	// 获取锁
	mu.Lock()

	// 释放锁
	defer mu.Unlock()

	// 其他的操作
}
```

### 长时间运行的工作进程(worker)

使用`for`循环和`select`语句即可实现:

```go
package main

func main() {
	// 以 goroutine 方式启动
	go worker()
}

func worker() {
	for {
		select {
		// 在这里等待 channel
		}
	}
}
```

简单使用工作进程:

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 以 goroutine 方式启动
	go worker()

	// 运行 30s
	time.Sleep(time.Second * 30)
}

func worker() {
	n := 0
	next := time.After(time.Second)

	for {
		select {
		case <-next:

			// 更新值
			n++

			// 1s 打印一次值
			fmt.Println(n)

			// 更新定时器通道
			next = time.After(time.Second)
		}
	}
}
```

## 常用标准库

完整的标准库文档见[官方](https://pkg.go.dev/std)

### log

[`log`](https://pkg.go.dev/log@go1.20)是日志常用库, 使用和`fmt`基本差不多

```go
package main

import "log"

func main() {
	log.Println("test") // 2023/02/12 10:05:15 test
}
```

### time

[`time`](https://pkg.go.dev/time@go1.20)是获取时间相关的函数

```go
package main

import {
	"fmt"
	"time"
}


func main() {
	
	start := time.Now()

	// ...

	elapsed := time.Since(start)

	fmt.Println("函数执行用了: ", elapsed)
}
```

### os

[`os`](https://pkg.go.dev/os@go1.20)是获取和系统相关的

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("命令行参数: ", os.Args)
	fmt.Println("path 环境变量: ", os.Getenv("path"))

	// 退出程序
	os.Exit(1)
}
```

