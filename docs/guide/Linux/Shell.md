---
title: Shell
date: 2022-7-27
categories:
 - Shell
tags:
 - Linux
 - Shell
---

# Shell

Shell 是一个用 C 语言编写的程序, 它是用户使用 Linux 的桥梁; Shell 既是一种命令语言, 又是一种程序设计语言

Shell 是指一种应用程序, 这个应用程序提供了一个界面, 用户通过这个界面访问操作系统内核的服务

[[toc]]

## Shell 脚本

Shell 脚本 (shell script) , 是一种为 shell 编写的脚本程序. 

Unix/Linux上常见的Shell脚本解释器有bash, sh, csh, ksh等, 习惯上把它们称作一种Shell. 

我们常说有多少种Shell, 其实说的是Shell脚本解释器. 

## Shell 环境

Shell 编程跟 JavaScript, php 编程一样, 只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了. 

Linux 的 Shell 种类众多, 常见的有: 

- Bourne Shell (`/usr/bin/sh`或`/bin/sh`) 
- Bourne Again Shell (`/bin/bash`) 
- C Shell (`/usr/bin/csh`) 
- K Shell (`/usr/bin/ksh`) 
- Shell for Root (`/sbin/sh`) 
- ……

Bourne Again Shell(简称Bash), 由于易用和免费, Bash 在日常工作中被广泛使用. 同时, Bash 也是大多数Linux 系统默认的 Shell

在一般情况下, 人们并不区分 Bourne Shell 和 Bourne Again Shell

所以, 像 **#!/bin/sh**, 它同样也可以改为 **#!/bin/bash**

> **#!**是一个约定的标记, 它告诉系统这个脚本需要什么解释器来执行, 即使用哪一种 Shell

**hello world**例子

创建一个`.sh`文件, 输入如下代码, 使用`git Base Here`,`cmder`或其他支持Linux的终端

输入`sh xxx.sh`, 就会在控制台输出 hello world!

```sh
#!/bin/bash

# echo 表示输出到控制台
echo "hello world!"
```

### VSCode中修改终端类型

vscode中的终端默认是cmd, 不支持linux的一些命令, 可以手动进行修改

```json
// settings.json

"terminal.integrated.profiles.windows": {
  "cmder": {
    "path": "D:\\cmder\\Cmder.exe",
  },
  "gitBash": {
    "path": "D:\\Git\\git-bash.exe"
  },
},
"terminal.integrated.defaultProfile.windows": "cmder", // 默认使用的终端配置
```

## 注释

以`#`开头的行就是注释, 会被解释器忽略. sh里没有多行注释, 只能每一行加一个`#`号

```sh
# 这是行注释
```

### EOF

EOF是END Of File的缩写, 表示自定义终止符, 可以用来定义块注释

```sh
# 这是块注释, 开始符号必须和结束符号对应
<< EOF
这是注释1
这是注释2
这是注释3
...
EOF
```

利用EOF可以实现输出多行文本

```sh
# 将文本块重定向到 cat 命令中
cat <<EOF
文本行1
文本行2
文本行3
EOF

# 还可以直接重定向到文件中, >> 一样可以用
cat > file.txt <<EOF
文本行1
文本行2
文本行3
EOF
```

## 打印输出

### echo

**echo**: 是Shell的一个内部指令, 用于在屏幕上打印出指定的字符串, 使用`-n`可以不在最后输出一个换行符, 

使用`-e`可以转义其中的特殊字符, 使用`>`将内容重定向到文件, 或使用`>>`将内容追加到文件

```sh
#!/bin/bash

msg="hello\nworld!"

echo $msg

# 执行变量msg里的转义字符, echo加了 -e 默认会换行
echo -e $msg 

# 两次输入不会换行
echo -n 123
echo -n 456 

# 将输出重定向(>)至文件, 会生成myFile文件
echo $msg > myFile.txt 

# 将输出转义并追加(>>)文件内容, 同样文件不存在时会生成文件
echo -e $msg >> myFile.txt 
```

#### 输出颜色和光标操作

```sh
#!/bin/bash 


# 下面是字体输出颜色及终端格式控制 
# 字体色范围: 30-37 
echo -e "\033[30m 黑色字 \033[0m"
echo -e "\033[31m 红色字 \033[0m"
echo -e "\033[32m 绿色字 \033[0m"
echo -e "\033[33m 黄色字 \033[0m"
echo -e "\033[34m 蓝色字 \033[0m"
echo -e "\033[35m 紫色字 \033[0m"
echo -e "\033[36m 天蓝字 \033[0m"
echo -e "\033[37m 白色字 \033[0m"

# 字背景颜色范围: 40-47 
echo -e "\033[40;37m 黑底白字 \033[0m"
echo -e "\033[41;30m 红底黑字 \033[0m"
echo -e "\033[42;34m 绿底蓝字 \033[0m"
echo -e "\033[43;34m 黄底蓝字 \033[0m"
echo -e "\033[44;30m 蓝底黑字 \033[0m"
echo -e "\033[45;30m 紫底黑字 \033[0m"
echo -e "\033[46;30m 天蓝底黑字 \033[0m"
echo -e "\033[47;34m 白底蓝字 \033[0m"

# 控制选项说明 
# \033[0m 关闭所有属性 
# \033[1m 设置高亮度 
# \033[4m 下划线 
echo -e "\033[4;31m 下划线红字 \033[0m"

# 闪烁 
echo -e "\033[5;34m 红字在闪烁 \033[0m"

# 反影 
echo -e "\033[8m 消隐 \033[0m "

# \033[30m-\033[37m 设置前景色 
# \033[40m-\033[47m 设置背景色 
# \033[nA光标上移n行 
# \033[nB光标下移n行 

echo -e "\033[4A 光标上移4行 \033[0m"

# \033[nC光标右移n行 
# \033[nD光标左移n行 
# \033[y;xH设置光标位置 
# \033[2J清屏 
# \033[K清除从光标到行尾的内容 

echo -e "\033[K 清除光标到行尾的内容 \033[0m"

# \033[s 保存光标位置 
# \033[u 恢复光标位置 
# \033[?25| 隐藏光标 
# \033[?25h 显示光标 

echo -e "\033[?25l 隐藏光标 \033[0m"
echo -e "\033[?25h 显示光标 \033[0m"
```

### printf

**printf**: 格式化输出语句, `printf`命令用于格式化输出, 是`echo`命令的增强版

它是C语言`printf()`库函数的一个有限的变形, 并且在语法上有些不同

```sh
# format-string 为格式控制字符串, arguments 为参数列表, 功能和用法与c语言的 printf 命令类似
printf format-string  [arguments...]
```

shell的printf与C语言printf()函数的不同: 

- shell `printf`命令不用加括号
- format-string 可以没有引号, 但最好加上, 单引号双引号均可
- 参数比格式控制符(`%`)多时, 格式控制符可以重用, 可以将所有参数都转换
- arguments(参数)使用**空格分隔**, 不使用逗号分割

基本使用如下: 

```sh
#!/bin/base

# 也可以输出简单的字符串
printf "hello\nworld"
# hello
# world


# 双引号
printf "%d %s\n" 999 "abc"
# 999 abc


# 单引号与双引号效果一样 
printf '%d %s\n' 999 "abc" 
# 999 abc


# 没有引号也可以输出
printf %s abc
# abc


# 下面的会出错, 因为系统分不清楚哪个是参数, 这时候最好加引号了
# printf %d %s 999 abc  


# 格式只指定了一个参数, 但多出的参数仍然会按照该格式输出(重用格式)
printf "\t%s\n" "你" "好" "啊"
# ----
#   你
#   好
#   啊
# ----


# 如果没有 arguments, 那么 %s 用NULL代替, %d 用 0 代替
printf "%s and %d \n" 
# and 0


# 如果以 %d 的格式来显示字符串, 那么会有警告, 提示无效的数字, 此时默认置为 0
printf "错误的格式: '%s, %d'\n" Hello Shell
# printf: Shell: invalid number
# 错误的格式: 'Hello, 0'


printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%10s %8s %4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %4.2f\n" 郭芙 女 47.9876 
# %s, %c, %d, %f 都是格式替换符
# %-10s 指一个宽度为10个字符, 左对齐(默认为右对齐), 若字符串不足以0填充, 超出则全部显示
# %-4.2f指格式化为float类型, 左对齐, 且只保留2位小数
```

> `printf`不像`echo`那样会自动换行, 必须显式添加换行符`\n`

### 单引号和双引号

单引号内的内容将会被原样输出

```sh
echo '"hello" "world"'
```

双引号的内容需要使用转义字符才可以输出特殊的字符

```sh
echo "\"hello\" \"world\""
```

## 变量

### 变量的定义和使用

注意, `=`前后不能有空格

```sh
#!/bin/bash

name="张三"
echo $name # 使用变量
echo "我叫${name}" # 或者用大括号包起来使用变量

name="李四" # 修改变量
echo "我改名字了, 现在我叫${name}"
```

推荐使用`${变量名}`, 有的时候使用`$变量`, shell脚本无法判断出变量名, 加花括号是为了帮助解释器识别变量的边界, 比如下面这种情况: 

```sh
#!/bin/base

# 循环 每次的值都填充到 skill 变量中
for skill in C PHP Python Java JavaScript
do
    echo "I am ${skill}Shell"
done
```

### 只读变量

使用`readonly`命令可以将变量定义为只读变量, 语法: `readonly 变量名=变量值`

### 删除变量

使用`unset`命令可以删除变量, 语法: `unset 变量名`

### 变量类型

运行shell时, 会同时存在三种变量: 

- **局部变量**局部变量在脚本或命令中定义, 仅在当前shell实例中有效, 其他shell启动的程序不能访问局部变量. 
- **环境变量**所有的程序, 包括shell启动的程序, 都能访问环境变量, 有些程序需要环境变量来保证其正常运行. 必要的时候shell脚本也可以定义环境变量. 
- **shell变量**shell变量是由shell程序设置的特殊变量; shell变量中有一部分是环境变量, 有一部分是局部变量, 这些变量保证了shell的正常运行
- **位置参数变量:**这种变量主要是用来向脚本当中传递参数或数据的, 变量名不能自定义, 变量作用是固定的. 
- **预定义变量:**是Bash中已经定义好的变量, 变量名不能自定义, 变量作用也是固定的. 

#### 环境变量

使用`set`可以查看所有的的变量, 使用`unset`删除变量

使用`env`可以查看所有的环境变量, 使用`export`可以定义环境变量

```sh
set # 查看所有变量
env # 查看所有的环境变量
export NODE_ENV="production"
```

### 特殊变量

**变量名只能包含数字, 字母和下划线**, 而某些包含其他字符的变量有特殊含义, 这样的变量被称为**特殊变量**, 如下: 

| 变量   | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| **$0**| 当前脚本的文件名                                             |
| **$n**| 传递给脚本或函数的参数, `n`是一个数字, 表示第几个参数, 例如, 第一个参数是`$1`, 第二个参数是`$2`, 当出现大于9的参数时需要使用`${nn}`来获取参数 |
| **$#**| 传递给脚本或函数的参数个数, 常用于循环                       |
| **$***| 传递给脚本或函数的所有参数, 被双引号`""`包含时, 展开成一个由双引号引起来的字符串, 包含了所有的位置参数, 每个位置参数由 shell 变量 IFS 的第一个字符 (默认为一个空格) 分隔开 |
| **$@**| 传递给脚本或函数的所有参数, 被双引号`""`包含时, 会把每个位置参数都使用`""`包裹 |
| **$?**| 上个命令的退出状态码(为0表示命令正常执行, 非0表示异常)或函数的返回值 |
| **$$**| 当前Shell进程ID, 对于 Shell 脚本, 就是这些脚本所在的进程ID   |
| **$!**| 后台运行的最后一个进程的进程号(PID)                          |

```sh
#!/bin/base

echo "文件名称: $0"
echo "参数1: $1"
echo "参数2: ${2}"
echo "收到了$#个参数"
echo "收到的所有参数为(\$*): $*"
echo "收到的所有参数为(\$@): $@"
echo "上一个命令的退出状态码: $?"
echo "shell 的进程id: $$"
```

结果: 

```sh
λ sh index.sh 你好 999 abc ttt

文件名称: index.sh
参数1: 你好
参数2: 999
收到了4个参数
收到的所有参数为($*): 你好 999 abc ttt
收到的所有参数为($@): 你好 999 abc ttt
上一个命令的退出状态码: 0
shell 的进程id: 1803
```

#### `$*`和`$@`的区别

`$*`和`$@`都表示传递给函数或脚本的所有参数, 不被双引号`""`包含时, 都以`"$1" "$2" ~ "$n"`的形式输出所有参数

但是当它们被双引号`""`包含时, `"$*" `会将所有的参数作为一个整体, 以`"$1 $2 ~ $n"`的形式输出所有参数, `"$@"`会将各个参数分开, 以`"$1" "$2" ~ "$n"`的形式输出所有参数

```sh
#!/bin/base

echo '$*=' $*
echo '"$*"=' "$*"
printf "\n"
echo '"$@"=' "$@"
echo '$@=' $@


printf "\n"
echo '参数格式为 $*输出如下: '
for var in $*
do
    echo "$var"
done


printf "\n"
echo '参数格式为 "$*" 输出如下: '
for var in "$*"
do
    echo "$var"
done


printf "\n"
echo '参数格式为 $@ 输出如下: '
for var in $@
do
    echo "$var"
done

printf "\n"
echo '参数格式为 "$@" 输出如下: '
for var in "$@"
do
    echo "$var"
done
```

结果如下: 

```sh
λ sh index.sh 你好 999 abc ttt

$*= 你好 999 abc ttt
"$*"= 你好 999 abc ttt

"$@"= 你好 999 abc ttt
$@= 你好 999 abc ttt

参数格式为 $*输出如下:
你好
999
abc
ttt

参数格式为 "$*" 输出如下:
你好 999 abc ttt

参数格式为 $@ 输出如下:
你好
999
abc
ttt

参数格式为 "$@" 输出如下:
你好
999
abc
ttt
```

#### 退出状态

`$?`可以获取上一个命令的退出状态, 所谓退出状态, 就是上一个命令执行后的返回结果

大部分命令执行成功会返回`0`, 返回`非0`的表示执行不成功

```sh
#!/bin/base

if [[ $? != 0 ]]; then
  echo "error"
  exit 1
else
  echo "success exit code"
fi
```

> 可以使用`exite`命令来退出脚本, 可以跟一个数字(0~255)表示退出状态码, 不跟数字则默认退出码为`0`

#### shift

如果给一个程序添加大量的命令行参数, 那么通过`${xxx}`的方式去获取很不方法, shell 提供了一种方法, 尽管笨拙, 但可以解决这个问题, 执行一次 shift 命令, 就会导致所有的位置参数**向前移动一个位置**(除了其值永远不会改变的变量`$0`), `$#`的值也会相应的减1

```sh
#!/bin/base

echo "$0共接受到$#个参数"

# 当命令行的参数个数不小于0则进入循环 
while [[ $# -gt 0 ]]; do

  # 每次的参数(注意: $0不变)
  echo "当前剩余参数个数为: $#, 值为: $1"

  # 参数向前移动
  shift
done
```

结果

```
λ sh idx.sh *
idx.sh共接受到10个参数
当前剩余参数个数为: 10, 值为: file.txt
当前剩余参数个数为: 9, 值为: idx.sh
当前剩余参数个数为: 8, 值为: node_modules
当前剩余参数个数为: 7, 值为: out
当前剩余参数个数为: 6, 值为: package.json
当前剩余参数个数为: 5, 值为: ren.sh
当前剩余参数个数为: 4, 值为: rep.sh
当前剩余参数个数为: 3, 值为: src
当前剩余参数个数为: 2, 值为: test.md
当前剩余参数个数为: 1, 值为: tsconfig.json
```

利用`shift`可以实现一个简单的命令行参数解析

```sh
#!/bin/base

if [[ $# == 0 ]]; then
  echo -e "参数非法, 请参考如下帮助使用\n"
  sh $0 --help
  exit 1
fi

# 目录不存在, 则默认为当前目录
if [[ -d $1 ]]; then
  dir=$1
  shift
else
  dir=.
fi


# 是否递归子目录
isRecursion=0

while [[ $# != 0  ]]; do 
  case $1 in
    --help | -h) # 匹配指定的选项
      shift # 跳过这个选项匹配下一个
      cat <<EOF # 输出帮助文档
$0 脚本使用帮助....
    选项: 
    参数:
    模式
EOF
    ;;
    --type | -t)
      shift # 跳过这个选项
      type=$1 # 获取选项对应的值
      shift # 跳过这个选项值, 继续匹配下一个
    ;;
    --regexp | -r)
      shift
      reg=$1
      shift
    ;;
    --recursion | -rec)
      shift
      isRecursion=1 
      shift
    ;;
    *)
      echo "未识别的参数$1"
      exit 1
    ;;
  esac
done


echo "dir = $dir, type = $type, reg = $reg, isRecursion = $isRecursion"
```

### 变量替换

变量替换可以根据变量的状态 (是否为空, 是否定义等) 来改变它的值. 

#### ${name:-"张三"}

如果变量`name`没有设置或不存在, 那么返回 "张三", 否则返回`name`的值

```sh
#!/bin/base

# 等价于 newName = name || "张三"
newName=${name:-"张三"}

echo $newName
# 张三
```

#### ${name:="张三"}

如果变量`name`没有设置或不存在, 那么返回 "张三", 并将`name`的值设置为 "张三", 否则返回`name`的值

```sh
#!/bin/base

name="李四"

# 等价于 newName = name = name || "张三"
newName=${name:="张三"}
echo "newName=$newName, name=$name"
# newName=李四, name=李四
```

#### ${name:?"message"}

如果变量`name`没有设置或不存在, 那么将`message`送到标准错误输出, 否则返回`name`的值

```sh
#!/bin/base

newName=${name?="未定义的变量name"}
# idx.sh: line 3: name: 未定义的变量name
```

#### ${name:+"张三"}

如果变量`name`被定义, 那么返回"张三", 但不改变`name`的值, 否则返回空

```sh
#!/bin/base

name="张三"
newName=${name:+"李四"}

echo "newName=$newName, name=$name"
# newName=李四, name=张三
```

### 变量名参数展开

shell 具有返回变量名的能力, 这会用在一些相当独特的情况下

- `${!prefix*}`
- `${!prefix@}`

这种展开会返回以prefix开头的已有变量名, 两种方式展开的结果是等价的, 如下: 

```sh
#!/bin/base

bName="小红"
bAge=18
bSex="女"

echo ${!b*} 
echo ${!b@}
```

结果

```sh
λ sh idx.sh
bAge bName bSex
bAge bName bSex
```

## 字符串

单引号:

- 单引号里的任何字符都会原样输出, 单引号字符串中的变量是无效的

- 单引号字串中不能出现单独一个的单引号 (对单引号使用转义符后也不行) , 但可成对出现, 作为字符串拼接使用

双引号

- 双引号里可以有变量
- 双引号里可以出现转义字符

```sh
#!/bin/bash
name="张三"

str1='this is a ${name}'
str2="this is a \"${name}\""

echo ${str1} # this is a ${name}
echo ${str2} # this is a "张三"
```

### 转义字符

```sh
\\	反斜杠
\a	输出警报声
\b	退格 (删除键) 
\f	换页(FF), 将当前位置移到下页开头
\n	换行
\r	回车
\t	水平制表符 (tab键) 
\v	垂直制表符
```

`echo`命令默认是不转义上面的字符的, 需要加`-e`选项, `-E`选项禁止转义, 默认也是不转义的, 使用 `-n`选项可以禁止插入换行符

```sh
#!/bin/base

# 默认不转义或使用-E
echo "哈\n哈" 
echo -E "哈\n哈" 
# 哈\n哈
# 哈\n哈

# 开启转义
echo -e "哈\n哈" 
# 哈
# 哈

# 禁止输出换行符
echo -n "哈\n哈" 
# 哈\n哈
```

### 字符串拼接

```sh
hi="hello"
name="张三"
age="18"
echo ${hi}, 我叫${name}, 今年${age}岁 # hello, 我叫张三, 今年18岁
```

### 获取字符串长度

`${#parameter}`展开成由 parameter 所包含的字符串的长度(等价于一些编程语言中的`.length`). 通常, parameter 是一个字符串; 如果 parameter 是`@`或者是`*`的话, 则展开结果是位置参数的个数(同`$#`或者`$*`)

```sh
#!/bin/base

msg="hello shell"

echo "\$msg变量为: ${msg}, 长度为: ${#msg}"
# $msg变量为: hello shell, 长度为: 11
```

### 截取字符串

- `${parameter:offset}`: 从parameter中提取始于第 offset 个字符直到字符串的末尾的字符串

- `${parameter:offset:length}`: 从parameter中提取的字符始于第 offset 个字符长度为 length 的字符串

```sh
#!/bin/base

msg="hello shell"

# 从第6个字符开始提取到结尾
echo "${msg:6}"
# shell

# 从第6个字符开始提取3个长度
echo "${msg:6:3}"
# she
```

若 offset 的值为负数, 则认为 offset 值是从字符串的末尾开始算起, 而不是从开头. 注意负数前面必须有一个空格, 为防止与 `${parameter:-word}`展开形式混淆. length, 若出现, 则必须不能小于零

```sh
#!/bin/base

msg="hello shell"

# 提取倒数4个长度的字符串(注意 -号之前的空格)
echo "${msg: -4}"
# hell

# 从倒数4个长度的字符串中提取2个长度的字符串(注意 -号之前的空格)
echo "${msg: -4:2}"
# he
```

### 清除开头的字符串

`${parameter#pattern}`和`${parameter##pattern}`

根据`pattern`来删除左边, 保留右边, `%`格式为从右起最短匹配, `%%`格式则是最长匹配

`#`形式清除**最短的匹配结果**, 而该`##`模式清除**最长的匹配结果**

```sh
#!/bin/base

text="aaa---bbb---ccc";
var=${text#*---};
echo $var # bbb---ccc


url="http://localhost:3000/test/index.html";
var=${url##*/};
echo $var # index.html


# 获取文件扩展名
ext=${file##*\.}
```

### 清除结尾的字符串

`${parameter%pattern}`和`${parameter%%pattern}`

根据`pattern`来删除右边, 保留左边, `%`格式为从右起最短匹配, `%%`格式则是最长匹配

```sh
#!/bin/base


text="aaa---bbb---ccc"
var=${text%---*}
echo $var # aaa---bbb


url="http://localhost:3000/test/index.html"
var=${url%%/*};
echo $var # http:

# 获取文件名
fileNname=${file%%\.*}
```

### 替换字符串

- `${parameter/pattern/string}`: 对`parameter`的内容执行查找和替换操作, 将第一个`pattern`匹配项会被替换为`string`
- `${parameter//pattern/string}`: 同上不过是将所有的匹配项都会被替换掉
- `${parameter/#pattern/string}`: 要求匹配项出现在字符串的开头
- `${parameter/%pattern/string}`: 要求匹配项出现在字符串的末尾

```sh
#!/bin/base

foo=ABC---ABC---ABC

# 将变量 foo 中的的第一个 ABC 替换为 abc
echo ${foo/ABC/abc}
# abc---ABC---ABC

# 将变量 foo 中的的所有的 ABC 替换为 abc
echo ${foo//ABC/abc}
# abc---abc---abc

# 将变量 foo 中的的开头的 ABC 替换为 abc
echo ${foo/#ABC/abc}
# abc---ABC---ABC

# 将变量 foo 中的的结尾的 ABC 替换为 abc
echo ${foo/%ABC/abc}
# ABC---ABC---abc
```

### 大小写转换

bash 有四个参数展开和`declare`命令的两个选项来支持大小写转换

#### declare 命令

```sh
#!/bin/base

msg="The is a Test TEXT"

declare -u upper
declare -l lower

upper=$msg
lower=$msg

echo "\$msg = $msg"
echo "\$upper = $upper"
echo "\$lower = $lower"
```

#### 参数展开

字符串的大小写转换的参数如下: 

| 格式           | 结果                                                        |
| :------------- | :---------------------------------------------------------- |
| ${parameter,,} | 把 parameter 的值全部展开成小写字母. |
| ${parameter,}  | 仅仅把 parameter 的第一个字符展开成小写字母. |
| ${parameter^^} | 把 parameter 的值全部转换成大写字母. |
| ${parameter^}  | 仅仅把 parameter 的第一个字符转换成大写字母 (首字母大写) . |

```sh
#!/bin/base

msg="The is a Test TEXT"

echo "\$msg = $msg"
echo "全部小写 = ${msg,,}"
echo "第一个字符变成小写 = ${msg,}"

echo "全部大写 = ${msg^^}"
echo "第一个字符变成大写 = ${msg^}"
```

### 查找子字符串

使用反引号**`**, 索引从1开始

```sh
string="hello"
e=`expr index "$string" e`# 查找 e
lo=`expr index "$string" lo`# 查找 i 或 o
echo $e # 2
echo $lo # 3
```

## 条件判断

### if语句

```sh
#!/bin/base

a=10
b=20
c=30

# 条件表达式必须要放到方括号之间, 并且要有空格
if [ $a == $b ]
then
  echo "a=b"
elif [ $a == $c ]; then # 如果 then 放到一行就要加分号分隔
  echo "a=c"
elif [ $b == $c ]; then
  echo "b=c"
else
  echo "都没有匹配上"
fi
```

shell中不允许出现空的if块, 例如: 

```sh

if [ $a == $b ]; then
  # 这里会报错不能为空
else
  echo "都没有匹配上"
fi
```

### test语句

`test`语句很像`if`语句, 它有两种等价模式:

```sh
test expression

# or

[ expression ]
```

这里的expression是一个表达式, 其执行结果是 true 或者是 false. 当表达式为真时, 这个 test 命令返回一个零退出状态, 当表达式为假时, test 命令退出状态为1

### 文件测试符

| 表达式          | 下列条件为真则返回true                                       |
| :-------------- | :----------------------------------------------------------- |
| file1 -ef file2 | file1 和 file2 拥有相同的索引号 (通过硬链接两个文件名指向相同的文件) . |
| file1 -nt file2 | file1新于 file2. |
| file1 -ot file2 | file1早于 file2. |
| -b file         | file 存在并且是一个块 (设备) 文件. |
| -c file         | file 存在并且是一个字符 (设备) 文件. |
| -d file         | file 存在并且是一个**目录**. |
| -e file         | file **是否存在**(包括目录). |
| -f file         | file 存在并且是一个**普通文件**. |
| -g file         | file 存在并且设置了组 ID. |
| -G file         | file 存在并且由有效组 ID 拥有. |
| -k file         | file 存在并且设置了它的" sticky bit ". |
| -L file         | file 存在并且是一个符号链接. |
| -O file         | file 存在并且由有效用户 ID 拥有. |
| -p file         | file 存在并且是一个命名管道. |
| -r file         | file 存在并且**可读**(有效用户有可读权限) . |
| -s file         | file 存在且其长度大于零. |
| -S file         | file 存在且是一个网络 socket. |
| -t fd           | fd 是一个定向到终端／从终端定向的文件描述符. 这可以被用来决定是否重定向了标准输入／输出错误. |
| -u file         | file 存在并且设置了 setuid 位. |
| -w file         | file 存在并且**可写**(有效用户拥有可写权限) . |
| -x file         | file 存在并且**可执行**(有效用户有执行／搜索权限) . |

> 权限几个判断, 如果只有一个部分符合, 则认为是有权限的

```sh
#!/bin/base

echo 你输入的文件名是: $1

if [ -f $1 ]; then 
  echo "这个文件存在"
else 
  echo "这个文件不存在"
fi

if [ -d $1 ]; then
    echo "这个文件是一个目录"
fi

if [ -r $1 ]; then
    echo "这个文件可以读取"
fi
```

### 字符串运算符

| 表达式                                    | 如果下列条件为真则返回True                                   |
| :---------------------------------------- | :----------------------------------------------------------- |
| string                                    | string 不为 null. |
| $string                                   | 检测字符串是否不为空                                         |
| -n string                                 | 字符串 string 的长度大于零. |
| -z string                                 | 字符串 string 的长度为零. |
| string1 = string2<br />string1 == string2 | string1 和 string2 相同. 单或双等号都可以, 不过双等号更受欢迎. |
| string1 != string2                        | string1 和 string2 不相同. |
| string1 > string2                         | sting1 排列在 string2 之后. |
| string1 < string2                         | string1 排列在 string2 之前. |

```sh
#!/bin/base

a="abc"
b="efg"

if [ $a = $b ]; then
  echo "$a = $b: a 等于 b"
else
  echo "$a = $b: a 不等于 b"
fi

printf "\n"

if [ -z $a ]; then
  echo "-z $a: 字符串长度为 0"
else
  echo "-z $a: 字符串长度不为 0"
fi
```

> 注意: 当与`test`一块使用的时候, `>`和`<`表达式操作符必须用引号引起来 (或者是用反斜杠转义) . 如果不这样, 它们会被 shell 解释为重定向操作符, 造成潜在的破坏结果

### 整型表达式

关系运算符只支持数字, 不支持字符串, 除非字符串的值是**数字**

| 表达式                | 如果为真则返回true             |
| :-------------------- | :----------------------------- |
| integer1 -eq integer2 | integer1 等于 integer2. |
| integer1 -ne integer2 | integer1 不等于 integer2. |
| integer1 -le integer2 | integer1 小于或等于 integer2. |
| integer1 -lt integer2 | integer1 小于 integer2. |
| integer1 -ge integer2 | integer1 大于或等于 integer2. |
| integer1 -gt integer2 | integer1 大于 integer2. |

```sh
#!/bin/base

a=10
b=20

if [ $a -eq $b ]; then
  echo "$a -eq $b: a 等于 b"
elif [ $a -gt $b ]; then
  echo "$a -gt $b: a 大于 b"
else
  echo "$a -gt $b: a 小于 b"
fi
```

### test复合命令[[]]

目前的 bash 版本包括一个复合命令, 作为加强的 test 命令替代物. 它使用以下语法: 

```sh
[[ expression ]]
```

```sh
#!/bin/base

a=1
b=2

if [[ $a > $b ]]; then
  echo "a大于b"
else
  echo "b大于a"
fi
```

#### 在if中使用正则表达式

还有类似于 test expression 是一个表达式, 其计算结果为真或假. 这个`[[ ]]`命令非常相似于`test`命令 (它支持所有的表达式) , 但是增加了一个重要的新的字符串表达式:

```sh
# 如果 string1匹配扩展的正则表达式 regex, 其返回值为真
string1 =~ regex
```

```sh
#!/bin/base

a="a"

if [[ $a =~ [0-9] ]]; then
  echo "a是一个数字"
elif [[ $a =~ [:alpha:] ]]; then
  echo "a是一个字母"
fi
```

`[[ ]]`添加的另一个功能是`==`操作符支持类型匹配, 正如路径名展开所做的那样:

```sh
#!/bin/base

FILE=foo.txt

if [[ $FILE == foo.*]]; then
  echo "yes"
else
  echo "no"
fi
```

> `[[ ]]`对于计算文件和路径名很有帮助

### 整数复合命令(())

`(( )) `复合命令是专门为整数设计的, 被用来执行算术真测试. 如果算术计算的结果是非零值, 则其测试值为真, 

`(()) `里面是可以执行常规运算符, 一元运算符, 赋值运算符, 位运算符, 逻辑运算符, 三元运算符的, 

因为它只处理整数, 所以可以不加`$`使用变量, 它能够通过名字识别出变量

```sh
#!/bin/base

a=1
b=20

# if (( (($a + $b)) > 10 )); then

# 可以不加 $ 使用变量
if (( ((a + b)) > 10 )); then
  echo a + b 大于 10
else
  echo a + b 不大于 10
fi
```

也可以用于计算变量

```sh
#!/bin/base

a=1
b=20

sum=$(( a + b))

echo "sum = $sum" # 21
```

### 控制操作符

bash 支持两种可以执行分支任务的控制操作符. `&& (AND) `和`|| (OR) `操作符作用如同 复合命令`[[ ]]`中的逻辑操作符. 这是语法: 

```sh
# command1命令 执行成功时才会执行 command2命令
command1 && command2 

# command1命令 执行失败时才会执行 command2命令
command1 || command2
```

利用控制操作符可以写出一些有趣的命令如: 

```sh
# 创建一个叫 temp 的目录成功后, 进入该目录
mkdir temp && cd temp

# 判断当前目录下有没有叫 temp 的目录, 没有则会创建
[ -d temp ] || mkdir temp

# 当没有 temp 目录时, 退出脚本退出码为1
[ -d temp ] || exit 1
```

## read

`read`命令从标准输入读取单行数据. 这个命令可以用来读取键盘输入, 当使用重定向的时候, 读取文件中的一行数据语法如下: 

```sh
# options 是选项
# variable 来存储输入数值的一个或多个变量名
read [-options] [variable...]
```

> 如果不指定变量名, 会把输入保存入默认变量`REPLY`

```sh
#!/bin/base

# 这里会读取用户的输入并赋值给 name 这个变量
read -p "请输入你的姓名: " name
echo "你输入的名字是: ${name}"
```

### 读取多个输入

```sh
#!/bin/bash

read -p "请输入参数: " a b c d

echo "a = $a"
echo "b = $b"
echo "c = $c"
echo "d = $d"
```

参数不足时多余的参数则为空

```sh
λ sh idx.sh
请输入参数: 1 2
a = 1
b = 2
c =
d =
```

参数多余时多余的参数则会被保存到最后一个变量中

```sh
λ sh idx.sh
请输入参数: 1 2 3 4 5 6
a = 1
b = 2
c = 3
d = 4 5 6
```

选项

- `-a`: 后跟一个变量, 该变量会被认为是个数组, 然后给其赋值, 默认是以空格为分割符
- `-p "message"`: 在等待read输入时, 输出提示信息
- `-t 秒数`: read命令会一直等待用户输入, 使用此选项可以指定等待时间
- `-n 数字`: read命令只接受指定的字符数, 就会执行
- `-s`: 隐藏输入的数据, 适用于机密信息的输入
- `-d delimiter`: 用字符串 delimiter 中的第一个字符指示输入结束, 而不是一个换行符
- `-e`: 在输入的时候可以使用命令补全功能
- `-r`: 不把反斜杠字符解释为转义字符
- `-u fd`: 使用文件描述符fd中的输入, 而不是标准输入

```sh
#!/bin/base

read -t 10 -n 6 -p "请输入你的密码: " -s pwd

if [ $? -eq 0 ]; then
  echo "你的密码是: $pwd"
  # echo 你的密码是: $REPLY
else 
  echo "超时未输入"
fi
```

> 如果不指定变量名, 会把输入保存入默认变量`REPLY`

### IFS

shell 对提供给 read 的输入按照单词进行分离, 这种行为由 shell 变量__IFS__ (内部字符分隔符) 配置. **IFS**的默认值包含一个空格, 一个 tab, 和一个换行符, 每一个都会把字段分割开, 可以调整**IFS**的值来控制输入字段的分离:

```sh
#!/bin/bash

FILE=/etc/passwd

read -p "请输入你的用户名:  " user_name
file_info=$(grep "^$user_name:" $FILE)

if [ -n "$file_info" ]; then
    # 指定 : 为分割符(会自动恢复为原来的值)
    IFS=":"

    # 从 file_info 文件中读取出对应的字段并赋值给 user pw uid gid name home shell
    read user pw uid gid name home shell <<< "$file_info"

    echo "用户名为: '$user'"
    echo "UID为: '$uid'"
    echo "GID为: '$gid'"
    echo "全称用户名为: '$name'"
    echo "家目录为: '$home'"
    echo "Shell目录为: '$shell'"
else
    echo "没有获取到该 '$user_name' 用户的信息" >&2
    exit 1
fi
```

### 重定向操作符<<<

上面例子中的`<<<`操作符的作用是等价于管道符的`|`, 但是不能把管道用在`read`上, 如下: : 

```sh
# 这个命令将显示成功, 但是 REPLY 变量 总是为空
echo 'hello' | read 
```

这与shell处理管道线的方式有关系. 在 bash (和其它 shells) 中, 管道符会创建子 shell, 这个子 shell 是为了执行执行管线中的命令而创建的shell和它的环境的副本, 上面示例中, `read`命令将在子 shell 中执行正常赋值`REPLY`, 但是当命令退出后, **子 shell 和它的环境将被破坏掉**

## case语句

Shell中case语句以`case`开头, 以`esac`结尾, 以`;;`作为分割效果和一些编程中的**switch**语句相同

```sh
#!/bin/base


read -p "请输入字符串, 并按enter确认: " key

case ${key} in
  999) # 比较不区分字符串和数字 
    echo "你输入的值是: 999"
  ;; # ;; 号等价于 break, 在shell中没有 case语句穿透
  [0-9])
    echo "您输入的是数字"
  ;;
  [a-z]|[A-Z])
    echo "您输入的是字母"
  ;;
  *)
    echo "您输入的了其他字符: ${key}"
  ;;
esac
```

### 匹配模式

case 语句使用的模式和路径展开中使用的那些是一样的, 如下: 

| 模式         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| a)           | 若单词为" a ", 则匹配                                         |
| a \| A)      | 若单词为" a "或者 "A", 则匹配                                 |
| [[:alpha:]]) | 若单词是一个字母字符, 则匹配                                 |
| ???)         | 若单词只有3个字符, 则匹配                                    |
| *.txt)       | 若单词以" .txt "字符结尾, 则匹配                             |
| *)           | 匹配任意单词. 把这个模式做为 case 命令的最后一个模式, 是一个很好的做法, 可以捕捉到任意一个与先前模式不匹配的数值; 也就是说, 捕捉到任何可能的无效值. |

### 匹配多个条件

默认case语句是匹配到一个时则会终止退出, 如果要case语句匹配多个条件则使用`;;&`结尾而不是`;;`, 如下: 

```sh
#!/bin/base

a=a

case $a in
  a)
    echo "\$a等于a"
  ;;&
  [[:alpha:]])
    echo "\$a是一个字母"
  ;;&
  *)
    echo "default"
  ;;
esac
```

## 基本运算符

### 数学运算

shell中的可以使用`expr`, `awk`命令来进行数学运算

乘号*****前边必须加反斜杠才能实现乘法运算

```sh
#!/bin/base

a=10
b=20

echo "a和b的值分别为: $a $b"
echo "a+b=`expr $a + $b`"
echo "a-b=`expr $a - $b`"
echo "a*b=`expr $a \*$b`"
echo "a/b=`expr $a / $b`"
echo "a%b=`expr $a % $b`"

# 代码块中[]可以执行基本的算术运算
echo "a+b="$[a + b]

# 双括号计算法
count=$((a + b))
echo $count
```

结果如下: 

```sh
λ sh index.sh

a和b的值分别为: 10 20
a+b=30
a-b=-10
a*b=200
a/b=0
a%b=10
a!=b
a+b=30
```

### 布尔运算

- `!`非运算
- `-o`或运算(**||**)
- `-a`与运算(**&&**)

```sh
#!/bin/base

a=20
b=20

if [ $a != $b ]; then
  echo "$a != $b: a 不等于 b"
else
  echo "$a == $b: a 等于 b"
fi
```

## 数组

bash支持一维数组 (不支持多维数组) , 并且没有限定数组的大小, 其值应大于或等于0

在 Shell 中, 用括号来表示数组, 数组元素用"空格"分割开

```sh
# 索引为 4 的值为 999(超过最大长度的索引会默认添加到最后)
arr=(1 2 3 [4]=999)
arr[3]=4

# 超过最大长度的索引会默认添加到最后
arr[99]=5

# 同样是使用数组下标读取对应索引的数据
echo ${arr[4]} # 999

# 使用 *和 @ 下标符号可以被用来访问数组中的每一个元素, 与位置参数一样
echo ${arr[@]} # 1 2 3 4 999 5
echo ${arr[*]} # 1 2 3 4 999 5

# 获取数组长度
echo ${#arr[@]} # 6
echo ${#arr[*]} # 6
```

> 使用`declare -a arr`命令也可以创建数组

### 在数组末尾添加元素

除了通过超过最大索引来向数组的末尾添加元素, 也可以通过`+=`赋值运算符就够自动地把值附加到数组末尾

```sh
#!/bin/base

arr=(1 2 3)
echo ${arr[@]} # 1 2 3

# 向 arr 数组的末尾添加指定的元素
arr+=(4 5 6)
echo ${arr[@]} # 1 2 3 4 5 6 
```

### 循环数组

```sh
#!/bin/base

arr=(a b c d)

for var in ${arr[@]}; do
  echo "var = $var"
done

echo "---------"

for (( i = 0; i < ${#arr[@]}; i++ )); do
  item=${arr[${i}]}
  echo "$i: $item"
done
```

### 数组排序

可以通过for循环加管道和`sort`命令将排好序的数据重新赋值给新的数组即可

```sh
#!/bin/base

arr=(f e d c b a)

# 注意: 外面的括号是定义数组, 里面的$()是执行命令
sortArr=($(for var in "${arr[@]}"; do echo $var; done | sort))

echo "arr: ${arr[@]}"
# arr: f e d c b a

echo "sortArr: ${sortArr[@]}"
# sortArr: a b c d e f
```

### 替换指定的数组项

默认是替换所以匹配的元素

```sh
#!/bin/base

arr=(a f e d c b a)

newArr=${arr[@]/a/AAAA}

echo "arr: ${arr[@]}"
# arr: a f e d c b a

echo "newArr: ${newArr[@]}"
# newArr: AAAA f e d c b AAAA
```

### 删除数组或指定索引

使用`unset`就可以删除数组或者对应的数组项

```sh
#!/bin/base

arr=(1 2 3)
echo ${arr[@]} # 1 2 3

# 删除索引为0的元素
unset arr[0]

echo ${arr[@]} # 2 3

# 删除数组
unset arr

echo ${arr[@]}
```

### 克隆数组

```sh
#!/bin/base

arr=(1 2 3)

# 创建一个新的数组, 使用 *下标符号也可以
newArr=(-1 0 ${arr[@]} 4 5)

echo "arr = ${arr[@]}"
# arr = 1 2 3

echo "newArr = ${newArr[@]}"
# newArr = -1 0 1 2 3 4 5
```

### 关联数组

关联数组可以使用其他类型来作为数组的下标, 有点像其他编程语言中对象的用法, 注意关联数组必须使用`declare -A`命令来创建数组, 其他使用方式不变, 如下

```sh
#!/bin/base

# 创建一个关联数组
declare -A colors

# 关联数组可以使用其他类型来作为数组的下标
colors["red"]="#ff0000"
colors["green"]="#00ff00"
colors["blue"]="#0000ff"

echo ${#colors[@]} # 3
echo ${colors[@]} # #ff0000 #0000ff #00ff00

echo ${colors["red"]} # #ff0000
echo ${colors["green"]} # #00ff00
echo ${colors["blue"]} # #0000ff
```



## 循环

循环中支持使用`break`,`countinue`关键字类退出或跳过循环

### for循环

```sh
#!/bin/base

# 传统 shell 格式
for var in 1 2 3 4 5; do
  echo "当前的值是: ${var}"
done

# or

# C 语言格式
for ((i = 0; i < 5; i++)); do
  echo "当前的值是: ${i}"
done
```

### while循环

```sh
msg="请输入一个大于10的数字"

read -p $msg num;

# 输入的值小于10则进入 while 循环
while [ $num -le 10 ]; do
  read -p $msg num;
done

echo "你输入的数字是: ${num}"
```

### until循环

`until`循环跟`while`循环**相反,**只要条件判断式**不成立则进行循环**, 语法是一样的

### 循环读取文件

`while`和`until`能够处理标准输入也能够处理文件: 

```sh
#!/bin/base

# 写入需要操作的文件数据
echo -e "张三 18 男 170\n李四 20 女 180" > file.txt

# 获取文件文本管道给 while 循环
cat file.txt | while read name age sex height; do
  printf "姓名:%s, 年龄:%s, 性别:%s, 身高:%s\n" $name $age $sex $height
done
```

```sh
λ sh idx.sh
姓名:张三, 年龄:18, 性别:男, 身高:170
姓名:李四, 年龄:20, 性别:女, 身高:180
```

> 使用管道将会在子shell中执行`while`循环, 当循环终止的时候, 循环中创建的任意变量或赋值的变量都会消失

## 函数

函数的定义有两种语法: 

```sh
function 函数名() {

}

# or

函数名() {

}
```

基本使用如下: 

```sh
#!/bin/base

function sum() {
  # 函数的参数也是通过`$n`来获取的在函数内获取的就是该函数的参数, 在脚本中就是获取这个脚本的参数
  echo "函数接受到了$#个参数"
  sum=0
	for ((i = 0; i <= $#; i++ )); do
      # 函数的参数会存在到 $n 这个变量中, 每次累加值
			sum=$(( $i + $sum ))
	done
  echo "sum函数计算的总和为: ${sum}"
}

# 调用函数, 后面跟着的就是传递给给函数的参数
sum 1 2 3 4
```

### 函数接受数组参数

```sh
#!/bin/base

arr=(1 2 3)

fn (){
  echo "传入所有参数为: $@"

  # 将接收到所有的参数展开后重新赋值为新数组
  newarr=$(echo $@)
  
  echo "newarr = ${newarr[@]}"
}

echo "arr = ${arr[@]}"

fn ${arr[@]}
```



### 局部变量

只需要在定义的变量前添加`local`关键字即可, 需要注意的是`local`关键字只能在函数中使用

```sh
#!/bin/base

# 全局变量
foo=1

function fn() {
  echo foo = $foo # 1
  
  # 局部变量, 如果不加上 local 则会覆盖全局变量
  local foo=999
  
  echo foo = $foo # 999
}

fn

echo foo = $foo # 1
```

### 函数的退出码

函数的退出码通过`return`返回, 将会是该函数的

```sh
#!/bin/base

ls 

echo ls命令的退出码 $?

function fn() {
  # 返回什么就表示这个函数命令的退出码是什么
  return 1
}

fn
echo fn函数的退出码 $?
```

## 命令替换

命令替换是指可以先执行Shell命令, 还可以将输出结果暂时保存, 在适当的地方输出, 语法: 

```sh
# 使用 反引号 或者 $括号
`command`
# or
$(command) # 这样也可以(command)
```

```sh
#!/bin/base

# 获取当前的时间戳(秒)
start=$(date +%s)
echo $start

# 等待3s
$(sleep 3)

end=$(date +%s)
echo $end

echo "共用时`expr $end - $start`s"
```

## 组命令和子shell

bash 允许把命令组合在一起, 可以通过两种方式完成: 要么用一个组命令, 要么用一个子 shell, 如下: 

```sh
# 组命令(组命令的花括号与命令之间必须有一个空格)
{ command1; command2; [command3; ...] }

# 子 shell
(command1; command2; [command3;...])
```

> 组命令或者子shell中的每个命令都是用`;`或者回车符分割

假设需要使用如下的三步操作

```sh
#!/bin/base

# ls -l 的输出重定向到文件 file.txt
ls -l > file.txt

# 追加文本到 file.txt
echo "下面的是 foo.txt文件的内容" >> file.txt

# 将 foo.txt 中的文本追加到 file.txt 中
cat foo.txt >> file.txt
```

这些代码的输出都重定向到一个名为 file.txt 的文件中, 这时就可以使用一个组命令了: 

```sh
# 写成一行就使用;号分割
{ ls -l; echo "下面的是 foo.txt文件的内容"; cat foo.txt; } > file.txt


# 写成多行就要用回车分割
{ 
  ls -l
  echo "下面的是 foo.txt文件的内容"
  cat foo.txt
} > file.txt
```

> 子shell同理只不过是将`{`换成`(`

组命令或者子shell同样可以使用管道操作

```sh
{ ls -l; echo "下面的是 foo.txt文件的内容"; cat foo.txt; } | less
```

### 进程替换

虽然组命令和子 shell 的作用相似, 都能用来在重定向中合并流, 但是两者之间有一个很重要的不同之处. 

一个组命令在当前 shell 中执行它的所有命令, 而子 shell(顾名思义)在当前 shell 的一个子副本中执行它的命令. 

这意味着运行环境被复制给了一个新的 shell 实例. 当这个子 shell 退出时, 环境副本会消失, 所以在子 shell 环境 (包括变量赋值) 中的任何更改也会消失. 

在大多数情况下, 除非脚本要求一个子 shell, 否则使用组命令比子 shell 更合适, 并且组命令运行很快并且占用的内存也少. 

`read`命令不能使用管道操作也是因为管道后的命令会在子shell中执行, 所幸, shell提供了一种奇异的展开方式, 进程替换:

```sh
# 一种适用于产生标准输出的进程
<(CommandList)

# 另一种适用于接受标准输入的进程
>(CommandList)

# CommandList 表示一串命令列表
```

使用进程替换也可以完成`read`命令使用其他输入的操作:

```sh
# TODO 都执行报错

# 第一个 < 表示重定向, <() 表示进程替换
read < <(echo "hello")
echo $REPLY

# or

echo "foo" > >(read; echo $REPLY)
```

其他使用

```sh
# 重定向
(ls -l)> file.txt
(echo "hello")>> file.txt
```

## 异步执行

bash 有一个内置命令, 能帮助管理诸如此类的异步执行的任务. `wait`命令导致一个父脚本暂停运行, 直到一个 特定的进程 (例如, 子脚本) 运行结束, 只需要在启动脚本后加上`&`即可让一个脚本异步执行了

**child.sh**

```sh
#!/bin/base

echo "child start"
sleep 3
echo "child end"
```

**parent.sh**

```sh
#!/bin/base

echo "parent start"

# 异步执行子脚本(注意后面加了 &)
sh child.sh &

echo "parent end"
```

## 命令管道

在大多数类似 Unix 的操作系统中, 有可能创建一种特殊类型的文件, 叫做命名管道. 命名管道用来在 两个进程之间建立连接, 也可以像其它类型的文件一样使用

命名管道的行为类似于文件, 但实际上形成了先入先出 (FIFO) 的缓冲. 和普通 (未命令的) 管道一样, 数据从一端进入, 然后从另一端出现. 通过命名管道, 语法如下: 

```sh
process1 > named_pipe
process2 < named_pipe

# 等价于下面

process1 | process2
```

#### 设置一个命名管道

使用`mkfifo`命令能够创建命名管道

```sh
# 在当前目录下创建一个命名管道 pipe1
[root@AnVirual test]# mkfifo pipe1

# 命名管道的文件类型为 p
[root@AnVirual test]# ls -l
总用量 0
prw-r--r--. 1 root root 0 7月  23 20:58 pipe1
```

#### 使用命名管道

可以使用`command > pipe`来将对应命令的输出重定向命名管道中

```sh
# 重定向到 pipe1 管道中
echo test pipe > pipe1
```

执行上面这条命令后, 该命令将会挂起, 因为在管道的另一端没有任何对象来接收数据, 这种现象被称为**管道阻塞**, 一旦我们绑定一个进程到管道的另一端, 该进程开始从管道中读取输入的时候, 管道阻塞现象就不存在了, 新建一个终端后输入如下命令:

```sh
# 将 pipe1 管道中的数据重定向给 cat 命令
cat < pipe1 
# test pipe
```

