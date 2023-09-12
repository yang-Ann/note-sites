---
title: MySQL
date: 2022-3-5
categories:
 - 数据库
tags:
 - 数据库
---
# MySql

SQL全称Structured Query Language(结构查询语言)

[菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)

[Mysql廖雪峰](https://www.liaoxuefeng.com/wiki/1177760294764384)

## 下载安装

下载安装解压即可

- 最新版本: https://dev.mysql.com/downloads/installer/

- 其他版本: https://dev.mysql.com/downloads/windows/installer/5.7.html

然后在bin目录**同级**下创建一个文件`my.ini`文件, 用来配置mysql配置, 基本配置如下: 

```ini
[mysqld]
# 设置3306端口
port=3306

# 设置mysql的安装目录 ---这里输入安装的文件路径----
basedir=E:\mysql-5.7.37-winx64

# 设置mysql数据库的数据的存放目录(MySQL 8+ 不需要以下配置)
datadir=E:\mysql-5.7.37-winx64\data

# 允许最大连接数
max_connections=200

# 允许连接失败的次数。
max_connect_errors=10

# 服务端使用的字符集默认为utf8
character-set-server=utf8

# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password

[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8

[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```

进入`bin`目录打开终端, 运行如下命令初始化数据库

```sh
mysqld --initialize --console
```

> 可以将mysql的`bin`目录添加到环境变量`path`中就可以在任何地方执行mysql命令了

执行完成后，会输出 root 用户的初始默认密码，如下: 

```sh
2022-07-24T07:14:22.356051Z 0 [Warning] CA certificate ca.pem is self signed.
2022-07-24T07:14:22.522252Z 1 [Note] A temporary password is generated for root@localhost: Gp6ap>_6ws#N
```

初始密码就是`Gp6ap>_6ws#N`, 在登录的时候需要使用到, 还需要输入一下的命令: 

```sh
# 安装命令
mysqld install

# 启动命令
net start mysql

# 停止服务
# net end mysql
```

### 登录MySql

数据库软件: https://dbeaver.io/download/

命令格式如下: 

```sh
mysql -h 主机名 -u 用户名 -p
```

- **-h** : 指定客户端所要登录的 MySQL 主机名, 登录本机(localhost 或 127.0.0.1)该参数可以省略;
- **-u** : 登录的用户名;
- **-p** : 告诉服务器将会使用一个密码来登录, 如果所要登录的用户名密码为空, 可以忽略此选项。

如果要登录本机的 MySQL 数据库，只需要输入以下命令即可:

```sh
mysql -u root -p
```

输入密码即可登录, 登录成功会有提示并且shell提示符会变成`mysql>`, 输入**exit**或**quit**则退出登录

> 注意: mysql中的命令需要使用`;`来表示结束, 不然mysql就以为输入还没有结束

### 修改密码

mysql修改密码有三种方式; 

```sql
# 1.SET PASSWORD 命令
set password for 用户名 @localhost = password('密码');


# 2.mysqladmin 命令, 注意 -u用户名 和 -p旧密码 是一个整体
mysqladmin -u用户名 -p旧密码 password 新密码;


# 3.编辑user表

# 应用权限数据库
use mysql;
# 设置新密码
update mysql.user set authentication_string=password('新密码') where user='用户名' and Host ='主机';
# 刷新权限
flush privileges;
```

### 新建用户

```mysql
# 新建用户并指定权限
create user 'yang'@'%' identified by 'abcd123.com';
```

```mysql
// 插入表的方式添加mysql数据库用户
INSERT INTO user 
          (host, user, password, 
           select_priv, insert_priv, update_priv) 
           VALUES ('%', 'yang', 
           PASSWORD('abcd123.com'), 'Y', 'Y', 'Y');
INSERT INTO user 
          (host, user, password, 
           select_priv, insert_priv, update_priv) 
           VALUES ('%', 'guest', 
           PASSWORD('guest123'), 'Y', 'Y', 'Y');
```
### 权限相关命令

```sql
# 查看系统用户
select user, host from user; 

# 查看用户授权信息
show grants; 

# 修改用户Host为 %,代表外网可以连接
update user set Host='%' where User ='username';

# 配置用户外网 IP 访问
create user 'username'@'%' identified by 'password';

# 查看 MySQL当前加密方式
select host,user,plugin from user;  

# 刷新权限
flush privileges;

# 删除用户
drop user xxx@localhost;

# 修改用户权限
grant all privileges on *.* to 'username'@'%' identified by 'password' with grant option;
```

用户权限列表

| 权限名    | 描述                                   |
| --------- | -------------------------------------- |
| ALTER     | 修改表和索引                           |
| CREATE    | 创建数据库和表                         |
| DELETE    | 删除表中已有的记录                     |
| DROP      | 抛弃(删除)数据库和表                   |
| INDEX     | 创建或抛弃索引                         |
| INSERT    | 向表中插入新行                         |
| REFERENCE | 未用                                   |
| SELECT    | 检索表中的记录                         |
| UPDATE    | 修改现存表记录                         |
| FILE      | 读或写服务器上的文件                   |
| PROCESS   | 查看服务器中执行的线程信息或杀死线程   |
| RELOAD    | 重载授权表或清空日志、主机缓存或表缓存 |
| SHUTDOWN  | 关闭服务器                             |
| ALL       | 所有权限，ALL PRIVILEGES同义词         |
| USAGE     | 特殊的 "无权限" 权限                   |

可根据上面的权限字段 为用户分配相应的权限, 语法格式如下: 

```sh
grant 权限1,权限2,... on 数据库名称.表名称 to 用户名@用户地址 identified by ‘密码’;
```

- 当权限1,权限2, ...被`all privileges`或者`all`代替，表示赋予用户全部权限
- 当**数据库名称.表名**称被`.`代替, 表示赋予用户操作服务器上所有数据库所有表的权限
- 用户地址可以是 localhost，也可以是ip地址、机器名字、域名。也可以用`%`表示从任何地址连接

- 密码不能为空，否则创建失败

下面是示例: 

```sql
# 指定用户获得全部服务器上所有数据库所有表的全部权限
grant all privileges on *.* to '用户名'@'%' identified by '密码';

# 只有 检索, 删除, 更新 三个权限
grant SELECT,DELETE,UPDATE on *.* to '用户名'@'%' identified by '密码';
```

## 数据库操作

创建数据库

```sql
craete database 数据库名;
```

删除数据库

```sh
# drop 命令
drop database 数据库名;


# mysqladmin 命令
mysqladmin -u root -p drop 数据库名;
```

查看所有的数据库

```sql
# 查看当前所有的数据库信息
show databases;

# 查看当前使用的数据库的表的列名
show tables;

# 查看一个表的所有列名
DESCRIBE 表名;
```

使用数据库

```sql
use 数据库;
```

## 数据表操作

### 创建数据表

创建数据表的语法如下: 

```sh
create table `数据表名` (
	`列的名称` 列的类型 列的条件 [设置主键],
	`列的名称` 列的类型 列的条件,
	`列的名称` 列的类型 列的条件,
);
```

```sql
# 当 test1 表不存在时才创建
create table if not exists `test1`( 
   `id` int PRIMARY KEY AUTOINCREMENT, # 自增 主键
   `title` varchar(100) NOT NULL, # 类型为 varchar(100), 即字符串长度为 100, 不能为空
   `author` varchar(40) NULL, # 可以为空
   `date` date,
   primary key ( `id` ) # 主键是id
) engine=innodb default charset=utf8; # 设置存储引擎和字符串为 utf8
```

#### 常用的列条件

-   `PRIMARY KEY`: 主键(不能为空)

-   `AUTOINCREMENT`: 自增
-   `NOT NULL`: 非空
-   `NULL`: 可以为空

### 更新表结构

语法如下:

```sql
alter table 表名 add 新增列的名称 新增列的类型 新增列的条件 
```

```sql
alter table learn_mysql.test1 add content varchar(255) null 
```

### 删除数据表

1. 不再需要该表时，用 **drop**.
2. 仍要保留该表，但要删除所有记录时， 用 **truncate**.
3. 要删除部分记录时，用 **delete**.

以下是一些示例: 
```sql
# 删除表内数据
delete from 表名 where 删除条件;

# 删除学生表内姓名为张三的
delete from 表名 where  t_name = '张三';

# 清除表内数据，保存表结构
truncate table 表名;

# 清除学生表内的所有数据
truncate table 表名;

# 删除表
drop table 表名;
```

### 插入数据

```sql
insert into [数据库名.]表名 (字段1, 字段2, ... )
                				values
                				(值1, 值2, ... );
```

>   `insert into 数据库名.表名`可以指定为那个数据库的那个表插入数据, 当然使用`use 数据库`也可以省略指定数据库

```sh
# 插入一条数据, NOW()为 mysql 自带的时间函数
insert into test1 (author, title, date) values ('An', 'learn mysql', NOW());
```

### 插入多条数据

```sql
insert into [数据库名.]表名 (字段1, 字段2, ... )
                        values ( 值1, 值2, ... ),
                        (行1值1, 行1值2, ... ),
                        (行2值1, 行2值2, ... ),
                        (行3值1, 行3值2, ... );
```

#### 常见的mysql函数

-   `Null`: 空

-   `NOW()`: 当前时间
-   `default`: 数值自动递增

### 查询数据

```sql
select 列字段1,列字段2 from 表名 [where Clause] [limit N][ offset M]
```

- 查询语句中可以使用一个或者多个表, 表之间使用逗号`,`分割, 并使用`where`语句来设定查询条件
- 可以使用星号`*`来代替所有的字段，`select`语句会返回表的所有字段数据
    - 可以指定多个字段(逗号分隔)
    - 可以重命名字段, 使用空格分开

- 可以使用`where`语句来指定任意的条件
- 可以使用`limit`属性来设定返回的记录数
- 可以通过`offset`指定`select`语句开始查询的数据偏移量, 默认情况下偏移量为**0**

基本使用: 

```sql
# 查询 test1 表中所有的数据
select * from test1;

# 查询 test1 表中 author 等于 An 的数据(只返回 title 和 author 列的数据)
select title, author from test1 where author = 'An';

# 效果同上, 只不过重命名了返回的字段
select title new_title, author new_author from test1 where author = 'An';

# 查询 test1 表中 author 等于 An 和 title 等于 标题1的数据
select * from test1 where author = 'An' and title = '标题1';
```

### where 条件过滤

where子句类似于程序语言中的 if 条件, 根据 mysql 表中的字段值来读取指定的数据
 - 可以使用`and`或者`or`指定一个或多个条件
 - `where`子句也可以运用于 `delete`或者 `update`命令

- `where`子句支持
    - 比较运算符:`=`, `!=`, `<`, `<=`, `>`, `>=`, `between`(数字范围),`in`(字符值)

    - 逻辑运算符: `and`与,`or`或,`not或!`非

- `where`子句默认字符串匹配不区分大小写, 添加`binary`关键字则区分大小写

```sql
# 查询 author 不是 "An" 的数据
select * from learn_mysql.test1 where not author = "An";

# 查询 num 的值在 100 ~ 1000 之间的
select * from learn_mysql.test1 where num between 100 and 1000;

# 查询 author 为 "An" 和 "Ac"
select * from learn_mysql.test1 where author in ("An", "Ac");

# 查询 author 为 "An" 并且 date 为今天的数据
select * from learn_mysql.test1 where author = "An" and to_days(date) = to_days(now());

# 查询昨天的数据
select * from learn_mysql.test1 where to_days(now()) - to_days(date) = 1;
```

### 更新数据

```sql
update 表名 set 字段1=值1, 字段2=值2 [while Clause]
```

```sql
# 更新 id 等于 9 数据
update test1 set author='An', title='更新后的title' where id = 9;
```

### 删除数据

```sql
delete form 表名 [while Clause]
```

```sql
# 删除 id 等于 9 数据
delete from test1 where id = 9;
```

> 一般在数据库中都不会真正的去删除数据的而是通过逻辑删除, 用一个字段表示该数据是否已删除

### like 模糊查询

`like`子句的作用是模糊匹配, 可以用在`whilere`子句中与等号`=`的效果是一样的但是

`like`子句可以使用一些符号来进行模糊匹配, 如下: 

- `'%a'`: 以a结尾的数据
- `'a%'`: 以a开头的数据
- `'%a%'`: 含有a的数据
- `'_a_'`: 三位且中间字母是a的
- `'_a'`: 两位且结尾字母是a的
- `'a_'`: 两位且开头字母是a的
- `['a', 'b']`: 包括字母a, b的

百分号`%`字符来表示任意字符, 类似于UNIX或正则表达式中的星号`*`

```sql
# 不使用符号则等价于 = 
select * from test1 where author like 'An';

# 查询所有 author 字段以A开头的数据
select * from test1 where author like 'A%';
```

### order by 排序

`order by`子句用于对指定的列进行数据排序, `asc`表示升序, `desc`表示降序

语法: 

```sql
select * from 表名 order by 要排序的列名 asc
```

```sql
# test1 表按照 date 字段升序排列
select * from test1 order by date asc

# 降序排列
select * from test1 order by date desc
```

### group by 分组

`group by`子句用于对搭配一些sql函数来对数据进行分组

```sql
# 统计 test1 表 author 字段的次数, COUNT(*) 函数用于计数
select author, COUNT(*) from test1 group by author

# 效果同上, 不过当有数据的 author 字段为空时, 则填充空数据
select coalesce(author, '空数据'), COUNT(*) from test1 group by author
```

### 聚合查询
