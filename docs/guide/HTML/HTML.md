---
title: HTML
date: 2022-3-5
categories:
 - 前端基础
tags:
 - HTML
---
:::v-pre


# HTML



[[toc]]

## 语义化标签

```
在网页HTML专门用来负责网页的结构, 所以在使用HTML标签时，
应该关注的是标签的语义，而不是它的样式
语义化标签还有利于 网站的SEO
```

### 常见的语义化标签

- `<header>`：网页的头部
- `<main>`：网页主要内容
- `<footer>`：网页的页脚
- `<nav>`：导航栏
- `<hn>`：h1~h6，分级标题
- `<ul>`：无序列表
- `<ol>`：有序列表
- `<p>`：段落
- `<span>`：文本
- `<a>`：超链接
- `<i>`：图标
- `<div>`：布局块元素

### SEO

汉译为搜索引擎优化。是一种方式：利用**搜索引擎**的规则提高网站在有关搜索引擎内的**自然排名**

## 行内元素和块元素

### 行内元素

- 行内元素主要用来包裹文字

- 宽高就是内容宽高、设置宽高无效

- 一般情况下不会在行内元素中放块元素

  - 常见行内元素

    ```html
    span a i img input buttom em b u ...
    ```

### 块元素

- 在网页中一般通过块元素来对网页进行布局

- 元素单独占一行

- 块元素中基本什么都能放

- 未设置宽度时，默认宽度是父容器的100%

  - 常见块元素

    ```
    div h1~h6 ul li p from header main footer ...
    ```

## 表格

```
在table中使用 tr 表示表格中的一行(行数)
在tr中使用 td 表示一个单元格(列数)
```

- `colspan`

  ```
  横向合并单元格
  ```

- `rowspan`

  ```
  纵向合并单元格
  ```

### 长表格

```
将一个表格分成三个部分：
    头部 thead
    主体 tbody
    底部 tfoot

    th 表示头部的单元格
```

- 如果表格中没有使用`tbody`而是直接使用`tr`，哪么浏览器会自动创建一个`tbody`，并且将`tr`全部放到`tbody`中
- `tr`不是`table`的子元素

### 表格的常用样式

| 属性                  | 描述                  |
| --------------------- | --------------------- |
| border-spacing        | 指定 边框之间的距离   |
| border-collapse       | 设置边框的合并        |
| vertical-align:center | 在td中垂直居中        |
| display: table-cell   | 将元素设置为单元格 td |

## 表单

- 在网页中使用表单来表示要提交的数据
- 使用form标签来创建一个表单

### 表单标签

- 文本框

  ```html
  <input type="text" size="12" maxlength="20" name="username"> // input 默认就是文本框
  ```

- 数字文本框

  ```html
  <input type="number" name="username">
  ```

  - 只能输入数字, 但是接受到的还是字符串

- 多行文本框

  ```html
  <textarea id="textarea" cols="30" rows="10"></textarea>
  ```

  - 对 textarea 应用样式 `resize:none;` 即可禁止放大缩小

- 密码框

  ```html
  <input type="password" name="userpassword">
  ```

- 文件框

  ```html
  <input type="file" name="filename">
  ```

- 单选框

  ```html
  <input type="radio" name="hello" value="aaa" >
  <input type="radio" name="hello" value="bbb" checked>
  ```

  - 像这种选择框，必须指定一个`value`属性，value属性最终会作为用户填写的值传递给服务器
  - name值需设置成一样，`checked `可以将单选框设置为默认选中

- 多选框 

  ```html
  <input type="checkbox" name="test" value="1" checked>
  <input type="checkbox" name="test" value="2">
  <input type="checkbox" name="test" value="3">
  ```

- 下拉列表

  ```html
  <select name="haha">
      <option value="i">选项一</option> 
      <option value="ii">选项二</option>
      <option selected value="iii">选项三</option>
  </select>
  ```

  - `selected` 设置多选框的默认选中 
  - select 的 value 就是当前选中的项 

- 提交按钮

  ```html
  <input type="submit" value="登录"> 
  ```

- 普通的按钮

  ```html
  <input type="button" value="按钮">
  ```

- `button`标签同样可以设置表单项

  ```html
  <button type="submit">提交</button>
  <button type="reset">重置</button>
  <button type="button">按钮</button>
  ```

> 文本框和按钮设置 `type=“submit”`可以回车触发提交表单的`submit `事件
>
> 设置为 `reset`则是重置表单功能, 也会触发 `reset`事件

### 表单常用属性和方法

| 属性\|方法 | 描述                             |
| ---------- | -------------------------------- |
| reset()    | 重置表单选项, 会触发 `reset`事件 |
| submit()   | 提交表单, 不会触发 `submit `事件 |

### 表单字段常用属性和方法

| 属性\|方法     | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| placeholder    | 文本框提示信息                                               |
| autocomplete   | 表单自动补全                                                 |
| required       | 该表单项为必填, 否则无法提交表单                             |
| readonly       | 将表单项设置为只读 数据会提交                                |
| disabled       | 将表单项设置为禁用 数据不会提交                              |
| autofocus      | 设置表单项自动获取焦点                                       |
| checked        | 设置单选框选中                                               |
| defaultChecked | 设置单选框默认选中(第一次有效后面就改不了了)                 |
| selected       | 设置多选框默认选中                                           |
| pattern        | 输入验证, 参数是正则表达式                                   |
| focus()        | 获取焦点, 会触发 `focus`事件                                 |
| blur()         | 移除焦点, 会触发 `blur`事件                                  |
| select()       | 只有文本框和文本域支持, 会选中文本框和文本域所有的文本, 会触发 `select`事件 |

> `select`事件触发时元素身上的 `selectionStart `和 `selectionEnd`属性会填充为选中的索引和结束的索引

## select

多选框, 里面放 option 

- select.options: 保存着所有的 option 子元素

  > 子元素的 option 用来表示是否被选中

## 富文本编辑

给任何元素添加 `contenteditable`属性即可设置富文本编辑(类似于 `textarea`元素)

> 将 `document.designMode = "on"`会使整个文档变成可编辑状态

## iframe

**HTML内联框架元素** ([`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)) 表示嵌套的[browsing context](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context), 它能够将另一个HTML页面嵌入到当前页面中

:::