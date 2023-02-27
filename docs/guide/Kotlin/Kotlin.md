```
title: Kotlin
date: 2022-4-11
categories:
 - Android
tags:
 - Android
```

# Kotlin

[Kotlin](https://kotlinlang.org/) 是一种在 Java 虚拟机上运行的静态类型编程语言, 被称之为 Android 版 Swift, 由 JetBrains 设计开发并开源

Kotlin可以编译成Java字节码, 也可以编译成 JavaScript, 方便在没有 JVM 的设备上运行

在Google I/O 2017中, Google 宣布 Kotlin 成为 Android 官方开发语言

> [Kotlin 中文文档](https://www.kotlincn.net/docs/reference/#%E5%AD%A6%E4%B9%A0-kotlin)

## 环境搭建

下载 Java SDK(**推荐Java8**): https://www.oracle.com/java/technologies/downloads/archive/

###  环境变量配置

添加环境变量`JAVA_HOME`

```sh
# 本机安装的JDK文件夹的绝对路径
C:\Program Files\Java\jdk1.8.0_91
```

修改系统变量`Path`

添加**两条**路径

```sh
%JAVA_HOME%\bin
%JAVA_HOME%\jre\bin
```

添加系统变量`CLASSPATH`

```sh
# 变量值中开头的.以及结尾的;千万不能遗漏
.;%JAVA_HOME%lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
```

**cmd** 窗口测试`java`和`javac`命令有对应输出即可

### 安装IDE

- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows)
- [Eclipse](https://www.eclipse.org/downloads/): 安装  Kotlin 插件
- [Android Studio](https://developer.android.google.cn/studio)

## 程序入口点

Kotlin 应用程序的入口点是`main`函数

```kotlin
fun main() {
    println("Hello world!")
  	// 或者
  	print("hello wrold!")
}
```

`println`和`print`方法的区别就是前者会在输出末尾添加换行符(**\n**)

## 常量与变量

定义变量使用`var`关键字

```kotlin
fun main() {
    var x = 1 // 自动推断出 `Int` 类型
    x += 1
	  var y: Int = 2 
    println("x = $x, y = $y") // => x = 2, y = 2
}
```

定义常量使用`val`关键字, (**只能为其赋值一次**)

```kOTLIN
fun main() {
    val a: Int = 1  // 立即赋值
    val b = 2   // 自动推断出 `Int` 类型
    val c: Int  // 如果没有初始值类型不能省略
    c = 3       // 明确赋值
	  // c = 4		// Error 
    println("a = $a, b = $b, c = $c") // => a = 1, b = 2, c = 3
}
```

## 基础数据类型

### 数字型

| 类型   | 位宽度 |
| ------ | ------ |
| Byte   | 8      |
| Short  | 16     |
| Int    | 32     |
| Long   | 64     |
| Double | 64     |
| Float  | 32     |

**显式转换**

每个数字类型支持如下的转换:

- `toByte(): Byte`
- `toShort(): Short`
- `toInt(): Int`
- `toLong(): Long`
- `toFloat(): Float`
- `toDouble(): Double`
- `toChar(): Char`

缺乏隐式类型转换很少会引起注意，因为类型会从上下文推断出来，而算术运算会有重载做适当转换，例如：

```kotlin
fun main() {
    val l = 1L + 3 // Long + Int => Long
    println(l is Long) // => true
}
```

#### 运算

**整数除法**

请注意，整数间的除法总是返回整数。会丢弃任何小数部分。例如：

```kotlin
fun main() {
    val x = 5 / 2
    println(x) // => 2
  	// 对于任何两个整数类型之间的除法来说都是如此
  	println(5L / 2) // => 2
}
```

如需返回浮点类型，请将其中的一个参数**显式转换**为浮点类型

```kotlin
fun main() {
    val x = 5 / 2F
    // 或者
    val y = 5 / 2.toDouble()
    println("x = $x, y = $y") // => x = 2.5, y = 2.5
}
```

### 字符

字符用 `Char` 类型表示。它们不能直接当作数字

```kotlin
fun main() {
    val c: Char = '1'
    // println(c > 2) Error
    println(c.toInt()) // 49 会转换成 Unicode码
}
```

字符字面值用**单引号**括起来: `'1'`。 特殊字符可以用反斜杠转义, 如：`\t`、 `\b`、`\n`、`\r`、`\'`、`\"`、`\\` 与 `\$`。 编码其他字符要用 Unicode 转义序列语法：`'\uFF03'`

```kotlin
fun main() {
    println('\uFF03') // => ＃
}
```

### 布尔值

布尔值用 `Boolean` 类型表示，它有两个值：`true` 和`false`

内置的布尔运算有：`||`  `&&` `!`

> `||`和 `&&`同样具有**短路**特性

### 字符串

字符串用 `String` 类型表示。字符串是不可变的。 字符串的元素——字符可以使用索引运算符访问: `s[i]`。 也可以用**for循环**迭代字符串:

```kotlin
fun main() {
  	var str = "hello"
  
  	println(str[1]) // => e
    
  	for (c in "hello") {
    	println(c) 
		}
	
    println(str + " wrold") // => hello wrold
}
```

### 字符串模板

```kotlin
fun main() {
    var name: String = "张三"
    // 模板中使用变量：
    val s1 = "name is $name" 
		println(s1) // => name is 张三
	
    name = "李四"
    // 模板中使用意表达式：
    val s2 = "${s1.replace("is", "was")}, but now is $name"
    println(s2) // => name was 张三, but now is 李四
}
```

### 条件控制

`if-else`方式

```kotlin
fun main() {
  var name = "张三"
	if (name == "孙悟空") {
		println("齐天大圣")
	} else {
		println("凡夫俗子")
	}
}
```

`when`方式

```kotlin
fun main() {
  var name = "无名氏"
  when (name) {
    "孙悟空" -> println("齐天大圣")
    else -> println("凡夫俗子")
  }
}
```

**三元运算符**

在其他语言中三元运算符是使用`condition ? true : false`

在 Kotlin 不包含传统的[三元运算符](https://en.wikipedia.org/wiki/%3F:)，而是倾向于使用条件表达式

```kotlin
fun main() {
    val flag1 = if (1 > 2) true else false
    println(flag1) // => false
  
    val count = 10
    val answerString: String = if (count == 10) {
      	// 这里不用写 return 
    		"count 等于 10"
    } else if (count > 35) {
        "count 大于 35"
    } else {
        "count 小于 35"
    }
    println(answerString) // => 小于 35
}
```



### 循环

#### for循环

```kotlin
fun main() {
    val items = listOf(1, "hello", true)
    for (item in items) {
        println(item)
    }
  	// 或者
  	for (index in items.indices) {
        println("item at $index is ${items[index]}")
    }
    
  	// 指定类型
    var nums = listOf(1, 2, 3)
    for (n: Int in nums) {
      // for 循环中的值默认不可修改
      // n++  Error 
      println(n)
    }
}
```

#### while循环

```kotlin
fun main() {
    val items = listOf("apple", "banana", "kiwifruit")
    var index = 0
    while (index < items.size) {
        println("item at $index is ${items[index]}")
        index++
    }
}
```

#### do..while循环

```kotlin
fun main() {
    var value = 5
    do {
        println(value--)
    } while (value > 0)
}
```

### 区间

三种语法`a..b` `x in a..b` `x !in a..b`

```kotlin
fun main() {
    val n = 5;
    println(n in 1..10) // => true
    println(999 !in n-4..n+5) // => true
}
```

用于循环

```kotlin
// 1..3 等价于与 [1, 2, 3]
for (item: Int in 1..3) {
    println(item)
}
```

### 函数

函数定义使用关键字`fun`

```kotlin
fun main() {
  	// 接受两个 Int 参数, 返回值 Int
    fun sum(a: Int, b: Int): Int {   
        return a + b
    }
    
    print(sum(1, 2)) // => 3
}
```

表达式作为函数体，返回类型自动推断：

```kotlin
fun sum(a: Int, b: Int) = a + b

fun main() {
    print(sum(1, 2)) // => 3
}
```

无返回值的函数, 可以显示指定为`Unit`, 也可以省略

```kotlin
fun printSum1(a: Int, b: Int): Unit {
    println(a + b)
}
// 或者
fun printSum2(a: Int, b: Int) = println(a + b)

fun main() {
    printSum1(1, 2) // => 3
    printSum2(3, 4) // => 7
}
```

**参数默认值**

```kotlin
fun sayHi(msg: String = "hello") {
    println(msg)
};


fun main() {
    sayHi() // hello
    sayHi("你好") // 你好
}
```

**可变长参数**

```kotlin
fun vars(vararg v:Int){
    for(vt in v){
        print(vt)
    }
}

fun main() {
    vars(1, 2, 3, 4, 5)  // 输出12345
}
```

### NULL检查机制

Kotlin的空安全设计对于声明可为空的参数，在使用时要进行空判断处理，有两种处理方式，字段后加!!像Java一样抛出空异常，另一种字段后加?可不做处理返回值为 **null** 或配合 **?:** 做空判断处理

```kotlin
fun main() {
		// 类型后面加?表示可为空
    var age: String? = "18.5" 
    
    // 抛出空指针异常
    // val ages = age!!.toInt() // Error
    
    // 还是照样可以读取属性和调用方法
		println(age?.length) // 4
    
		// 可以修改为 null
    age = null
    
    // 不做处理返回 null
    val ages1 = age?.toInt()
    println(ages1) // => null
    
    // age为空返回-1
    val ages2 = age?.toFloat() ?: -1
    println(ages2) // => -1
}
```

