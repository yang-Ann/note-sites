---
title: gulp
date: 2024-08-04
categories:
 - 前端基础
tags:
 - gulp
---
# gulp

[`gulp`](https://gulpjs.com/)是一个自动化和增强您的工作流程的工具包, 利用 `gulp` 和 `JavaScript` 的灵活性来自动执行缓慢、重复的工作流，并将它们组合成高效的构建管道。

>   [中文官网](https://www.gulpjs.com.cn/)

## 基本使用

安装依赖

```sh
mkdir learn_grlup
npm init --yes
npm install gulp
```

创建`gulpfile.js`文件, 写入如下内容

```js
import gulp from "gulp";

/**
 * gulp 函数参数
 * @typedef {() => void} FnType;
 */

/**
 * 任务1
 * @param {FnType} callback
 */
export function task1(callback) {
	console.log("task1 run start");
	callback();
	console.log("task1 run end");
}

/**
 * 任务2
 * @param {FnType} callback
 */
export function task2(callback) {
	console.log("task2 run start");
	callback();
	// callback(new Error("发生了错误"));
	console.log("task2 run end");
}

// 组合任务, 从左到右依次执行
export default gulp.series(task1, task2);
```

>   如果要写ts文件参考[transpilation](https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#transpilation)

添加运行命令`package.json`

```json
"scripts": {
  "gulp": "gulp",
},
```

运行, 执行如下命令

```sh
npm run gulp
npm run gulp -- -f test.js # 可以指定需要运行的文件
```

>   `gulp`默认会执行`export default`暴露的函数

## 任务回调或者返回值

每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 callback 作为参数的函数，或者是一个返回 stream、promise、event emitter、child process 或 observable类型值的[函数](https://www.gulpjs.com.cn/docs/getting-started/async-completion/)

```js
import gulp from "gulp";

/**
 * gulp 函数参数
 * @typedef {() => void} FnType;
 */

/** 打包任务 */
function build() {
	console.log("build run start");

	// 可以直接返回 promise
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
			// reject("任务执行失败");
			console.log("build run end");
		}, 1000);
	});
}

/**
 * 清理任务, 任务可以接收一个回调参数
 * @param {FnType} callback
 */
function clean(callback) {
	console.log("clean run start");

	setTimeout(() => {
    // 回调参数调用则表示任务完成
		callback();
		console.log("clean run end");
	}, 500);
}

export default gulp.series(build, clean);
```

## 流式操作

```js
import gulp from "gulp";

/** 流式拷贝文件 */
export default function streamTask() {
  // 将 ./src/**/*.js 文件都拷贝到 ./output/js 目录下面
	return gulp.src("./src/**/*.js").pipe(gulp.dest("./output/js"));
}
```

## 监听文件

```js
import gulp from "gulp";

/** 监听文件修改运行任务 */
export default function watchTask() {
	gulp.watch(["./src/**/*.js", "./src/**/*.html"], (callback) => {
		console.log("文件修改了, 执行任务");
		callback();
	});
}
```

## 使用插件

每个插件都可以使用`pipe`方法进行流式调用, 安装依赖: 

```sh
npm install gulp-uglify gulp-rename
```

代码如下: 

```js
import gulp from "gulp";
import uglify from "gulp-uglify"; // 压缩代码插件
import rename from "gulp-rename"; // 文件重命名插件

export default function pluginTask() {
	return gulp
		.src("./src/**/*.js") // 读取 src 下面所有的 .js 文件
		.pipe(uglify()) 
		.on("end", () => console.log("文件压缩完成"))
		.pipe(rename({ extname: ".min.js" })) // 文件后缀名重命名为 .min.js
		.on("end", () => console.log("文件重命名完成"))
		.pipe(gulp.dest("output-min")) // 输出到 output-min
		.on("end", () => console.log("任务执行完成"));
}
```

## 自定义插件

创建`gulp`插件可以使用 `through2` 或 `vinyl` 库, 下面是使用`through2` , 将文件内容转换为大写的例子: 

安装依赖:

```sh
npm install through2
```

代码如下:

```js
import gulp from "gulp";
import through2 from "through2";

export default function defaultTask() {
	return gulp
		.src("./test/**/*")
		.pipe(myPlugin())
		.pipe(gulp.dest("./test-plugin"))
		.on("end", () => console.log("success"));
}

/**
 * 自定义插件
 * @param {*} options 插件配置
 */
function myPlugin(options) {
	console.log("插件配置", options);

	return through2.obj((file, encoding, callback) => {
		// 在这里处理每个文件
		console.log(`Processing file: ${file.path}`);

		if (file.isBuffer()) {
			// 将文件内容修改为大写
			file.contents = Buffer.from(file.contents.toString().toUpperCase());
		}

		// 必须调用此回调以将文件传递给下一个插件
		callback(null, file);

		// 错误回调
		// callback(new Error('发生了错误'));
	});
}
```

## 综合使用

安装依赖

```sh
npm install @babel/cli @babel/core @babel/preset-env core-js gulp gulp-babel gulp-rename gulp-uglify gulp-typescript typescript -D
```

`tsconfig.json`

```json
{
	"compilerOptions": {
		"ignoreDeprecations": "5.0",
		"target": "ES3",
		"lib": ["DOM", "ESNext"],
		"module": "ESNext",
		"baseUrl": "./src",
		// "types": [],
		"declaration": true,
		"sourceMap": false,
		"outDir": "./dist",
		"strict": true,
		"skipLibCheck": true
	}
}
```

`babel.config.json`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

基本代码

```js
import gulp from "gulp";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import ts from "gulp-typescript";

/**
 * gulp 函数参数
 * @typedef {() => void} FnType;
 */

const JS_FILE_LIST = ["./src/**/*.js"];
const TS_FILE_LIST = ["./src/**/*.js", "./src/**/*.ts"];
const HTML_FILE_LIST = ["./src/**/*.html"];
const OUTPUT_DIR = "./output";
const TYPESCRIPT_CONFIG = "tsconfig.json";

// TypeScript 编译配置, 用于 watch 任务
const tsProjectWatch = ts.createProject(TYPESCRIPT_CONFIG);

/**
 * 监听任务
 * @param {FnType} callback
 */
export default function watchTask(callback) {
	// 一开始执行一次
	defaultTask(callback);

	// 监听文件修改
	gulp.watch([...TS_FILE_LIST, ...JS_FILE_LIST, ...HTML_FILE_LIST], (cb) => {
		console.log("文件修改了, 执行任务");
		defaultTask(cb);
	});
}

/**
 * 默认任务
 * @param {FnType} callback
 */
function defaultTask(callback) {
	tsProjectWatch
		.src()
		.pipe(tsProjectWatch())
		.js.pipe(gulp.dest(OUTPUT_DIR + "-ts"))
		.on("end", () => console.log("ts编译完成"))
		.pipe(babel({ presets: ["@babel/env"] }))
		.pipe(gulp.dest(OUTPUT_DIR))
		.on("end", () => console.log("babel转换完成"))
		.pipe(uglify())
		.pipe(rename({ extname: ".min.js" }))
		.pipe(gulp.dest(OUTPUT_DIR + "-min"))
		.on("end", () => {
			console.log("代码压缩完成");
			cpHtmlTask(callback);
		});
}

/**
 * 拷贝 html 到指定目录
 * @param {FnType} callback
 */
function cpHtmlTask(callback) {
	gulp
		.src(HTML_FILE_LIST)
		.pipe(gulp.dest(OUTPUT_DIR))
		.on("end", () => {
			console.log("拷贝HTML到输出目录完成");
			callback();
		});
}

```

