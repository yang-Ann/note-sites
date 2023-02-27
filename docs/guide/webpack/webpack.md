---
title: webpack
date: 2022-3-5
categories:
 - 打包工具
tags:
 - webpack
---
:::v-pre



# webpack



[[toc]]

## webpack 介绍

```
webpack 是一种前端资源构建工具, 一个静态模块打包器(module bundler).
在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理
它将根据模块的依赖关系进行静态分析, 打包生成对应的静态资源(bundle)
```

## webpack 五个核心概念

- **Entry**

  ```
  入口(Entry) 设置 webpack 以哪个文件为入口起点开始打包, 分析构建内部依赖图
  ```
- **Output**

  ```
  输出(Output) 设置 webpack 打包后的资源 bundles 输出到哪里去, 以及如何命名
  ```
- **Loader**

  ```
  Loader 让 webpack 能够去处理那些非 JavaScript 文件 (webpack 自身只识别JavaScript文件)
  ```
- **Plugins**

  ```
  插件(Plugins)可以用于执行范围更广的任务, 插件的范围包括, 从打包优化和压缩, 一直到重新定义环境中的变量等
  ```
  
- **Mode**

  ```
  模式(Mode) 设置 webpack 使用相应模式的配置
  ```

  | 选项        | 描述                                                         | 特点                        |
  | ----------- | ------------------------------------------------------------ | --------------------------- |
  | development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development | 能让代码本地调试 运行的环境 |
  | production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production | 能让代码优化上线 运行的环境 |

  

## 初始化配置

- 初始化package.json
  - `npm init`
- 下载并安装 webpack
  - `npm install webpack webpack-cli -g` 安装全局依赖

  - `npm install webpack webpack-cli -D` 安装开发依赖

  - 使用的 `package.json` 版本如下:

    ```js
    {
      "name": "webpack_code",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "@babel/core": "^7.8.4",
        "@babel/polyfill": "^7.8.3",
        "@babel/preset-env": "^7.8.4",
        "add-asset-html-webpack-plugin": "^3.1.3",
        "babel": "^6.23.0",
        "babel-loader": "^8.0.6",
        "core-js": "^3.6.4",
        "css-loader": "^3.4.2",
        "eslint": "^6.8.0",
        "eslint-config-airbnb-base": "^14.0.0",
        "eslint-loader": "^3.0.3",
        "eslint-plugin-import": "^2.20.1",
        "file-loader": "^5.0.2",
        "html-loader": "^0.5.5",
        "html-webpack-plugin": "^3.2.0",
        "less": "^3.11.1",
        "less-loader": "^5.0.0",
        "mini-css-extract-plugin": "^0.9.0",
        "optimize-css-assets-webpack-plugin": "^5.0.3",
        "postcss-loader": "^3.0.0",
        "postcss-preset-env": "^6.7.0",
        "style-loader": "^1.1.3",
        "terser-webpack-plugin": "^2.3.5",
        "thread-loader": "^2.1.3",
        "url-loader": "^3.0.0",
        "webpack": "^4.41.6",
        "webpack-cli": "^3.3.11",
        "webpack-dev-server": "^3.10.3",
        "workbox-webpack-plugin": "^5.0.0"
      },
      "dependencies": {
        "jquery": "^3.4.1"
      },
      "browserslist": {
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ],
        "production": [
          ">0.001%",
          "not dead",
          "not op_mini all"
        ]
      },
      "eslintConfig": {
        "extends": "airbnb-base",
        "env": {
          "browser": true
        }
      },
      "sideEffects": [
        "*.css"
      ]
    }
    ```

## 编译打包应用

1. 创建文件, 编写代码 
2. 运行指令(完整)
   - 开发环境打包指令：`webpack src/js/index.js -o build/js/built.js --mode=development` 
     - 功能：webpack会以 `./src/index.js` 为入口文件开始打包, 打包后输出到 `./build`, 整体打包环境为`开发环境`
   - 生产环境打包指令：`webpack src/js/index.js -o build/js/built.js --mode=production `
     - 功能：webpack会以 `./src/index.js` 为入口文件开始打包, 打包后输出到 `./build`, 整体打包环境为`生产环境`
3. 结论：
   - webpack能处理 js/json 资源, 不能处理 css/img 等其他资源
   - 生产环境会将 ES6模块化编译成浏览器能识别的模块化
   - 生产环境会进行 js代码压缩

## webpack 开发环境配置

根目录创建 `webpack.config.js`

```
作用: 设置 webpack 的配置（当你运行 webpack 指令时, 会加载里面的配置）
所有构建工具都是基于nodejs平台运行的, 模块化默认采用commonjs
```

### 打包样式资源

webpack.config.js 配置信息如下:

```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
  // webpack配置
  // 入口起点
  entry: './src/index.js',
  // 打包输出
  output: {
    // 打包输出文件名
    filename: 'built.js',
    // 打包输出路径
    // __dirname   nodejs的变量, 代表当前文件的目录的绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // test 匹配哪些文件(正则)
        test: /\.css$/,
        // use 使用哪些loader处理匹配上的文件
        // use 数组中loader执行顺序：从右到左, 从下到上 依次执行
        use: [
          // 创建style标签, 将js中的样式资源插入进行, 添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中, 里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
           // 将less文件编译成css文件
          'less-loader'  // 需要下载 less-loader和less
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式
  mode: 'development',   // 开发模式
  // mode: 'production'  // 生产模式
}
```

- 运行指令(项目根目录下): `webpack`

> loader的module配置: use 数组中loader执行顺序：`从右到左`, `从下到上`依次执行,

### 打包 HTML 资源

```
需要使用到插件
```

- 下载 `npm install html-webpack-plugin -D`

- 在 plugins 上配置需要使用的插件

  ```js
  // 引入 html-webpack-plugin
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  
  module.exports = {
      ...
      plugins: [
      // plugins的配置
      // html-webpack-plugin
      // 功能：默认会创建一个空的HTML, 自动引入打包输出的所有资源（JS/CSS）
      new HtmlWebpackPlugin({
        // 复制 './src/index.html' 文件, 并自动引入打包输出的所有资源（JS/CSS）
        template: './src/index.html'
      })
    ],
      ...
  }
  ```

### 打包图片资源

- 下载 `npm install html-loader url-loader file-loader -D`

  ```js
  // 引入 html-webpack-plugin
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  
  module.exports = {
      ...
      module: {
          rules: [
            {
              // 问题：默认处理不了html中img图片
              // 处理图片资源
              test: /\.(jpg|png|gif)$/,
              // 使用一个 loader 可以不写 use 直接写 loader
              // 下载 url-loader file-loader
              loader: 'url-loader',
              type: "javascript/auto", // 阻止 webpack5 中 asset(不关闭会打包两次图片)
              options: {
                // 图片大小小于8kb, 就会被base64处理
                // 优点: 减少请求数量（减轻服务器压力）
                // 缺点：图片体积会更大（文件请求速度更慢）
                limit: 8 * 1024,
                esModule: false, // webpack 4
                // 给图片进行重命名
                // [hash:10]取图片的hash的前10位
                // [ext]取文件原来扩展名
                name: '[hash:10].[ext]',
              }
            },
            {
              test: /\.html$/,
              // 处理html文件的img图片（负责引入img, 从而能被url-loader进行处理）
              loader: 'html-loader'
            }
          ]
        },
      plugins: [
      // plugins的配置
      // html-webpack-plugin
      // 功能：默认会创建一个空的HTML, 自动引入打包输出的所有资源（JS/CSS）
      new HtmlWebpackPlugin({
        // 复制 './src/index.html' 文件, 并自动引入打包输出的所有资源（JS/CSS）
        template: './src/index.html'
      })
    ],
      ...
  }
  ```

### 打包其他资源

```js
module.exports = {
  ...
  module: {
    rules: [
      // 打包其他资源(除了html/css/js/less资源以外的资源)
      {
        // 排除 html/css/js/less 等资源
        exclude: /\.(html|css|js|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  }
  ...
}
```

### devServer

- 下载 `webpack-dev-server` 

  ```js
  module.exports = {
    ...
      // 开发服务器 devServer：用来自动化（自动编译, 自动打开浏览器, 自动刷新浏览器~~）
      // 特点：只会在内存中编译打包, 不会有任何输出
      // 启动devServer指令为：npx webpack-dev-server
      devServer: {
          // 项目构建后路径
          contentBase: resolve(__dirname, 'build'),
          // 启动 gzip 压缩(代码体积更小, 速度更快)
          compress: true,
          // 开发服务器端口号
          port: 3000,
          // 自动打开浏览器
          open: true
      }
    ...
  }
  ```

## 开发环境基本配置

```js
/*
  开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包, 没有输出
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    // filename: 'js/built.js',
    path: resolve(__dirname, 'build')
    // path: `${__dirname}/build`
  },
  module: {
    rules: [
      // loader的配置
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭 es6 模块化
          esModule: false,
          // 输出到 imgs 目录
          outputPath: 'imgs'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          // 输出到 media 目录
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
};
```

## webpack 生产环境配置

### 提取 css 成单独文件

- 下载 `npm install mini-css-extract-plugin -D`

  ```js
  const { resolve } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
  module.exports = {
    entry: './src/js/index.js',
    output: {
      filename: 'js/built.js',
      path: resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // 创建style标签, 将样式放入
            // 'style-loader', 
            // 这个loader取代style-loader.作用：提取js中的css成单独文件
            MiniCssExtractPlugin.loader,
            // 将css文件整合到js文件中
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        // 对输出的css文件进行重命名
        filename: 'css/built.css'
      })
    ],
    mode: 'development'
  };
  ```

### 兼容 css 处理

- 下载`npm install postcss-loader postcss-preset-env -D`

- 在 package.json 中添加 browserslist 配置, 

  ```js
  const { resolve } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  
  // 设置nodejs环境变量
  // process.env.NODE_ENV = 'development';
  
  module.exports = {  
    ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            /*
              css兼容性处理：postcss --> postcss-loader postcss-preset-env
  
              帮 postcss 找到 package.json 中 browserslist 里面的配置, 通过配置加载指定的css兼容性样式
                (在 package.json 中添加 browserslist 选项: 如下)
  
              "browserslist": {
                // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development (mode不生效)
                // 兼容最近版本的浏览器
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                // 生产环境：默认就是生产环境
                // 大于 0.001%的 不要已经死掉的 不要op_mini
                "production": [
                  ">0.001%",
                  "not dead",
                  "not op_mini all"
                ]
              }
            */
            // 使用loader的默认配置
            // 'postcss-loader',
            // 修改loader的配置
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  // postcss的插件
                  require('postcss-preset-env')()
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/built.css'
      })
    ],
    mode: 'development'
  };
  ```

### css压缩

- 下载 `npm install --save-dev optimize-css-assets-webpack-plugin`

  ```js
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  
  // 设置nodejs环境变量
  // process.env.NODE_ENV = 'development';
  
  module.exports = {
    ...
    plugins: [
      // 压缩css
      new OptimizeCssAssetsWebpackPlugin()
    ],
    ...
  };
  
  ```

### js兼容性处理

```
需要使用如下库(@babel/polyfill可以不安装)
	
	npm install --save-dev babel-loader @babel/core @babel/preset-env core-js
```

```js
module.exports = {
  ...
  module: {
    rules: [
      /*
        js兼容性处理：--> babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法, 如promise高级语法不能转换
            
          2. 全部js兼容性处理 --> @babel/polyfill (直接文件中引入)
            问题：我只要解决部分兼容性问题, 但是@babel/polyfill会将所有兼容性代码全部引入, 体积太大了(不建议使用)
            
          3. 需要做兼容性处理的就做：按需加载  --> core-js(就不能再使用@babel/polyfill)
      */  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 指定兼容性做到哪个版本浏览器版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
...
};
```

### 压缩 js 和 html

```js
生产模式下打包会自定压缩 js代码
```

```js
// 压缩 html 使用 html-webpack-plugin 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
...
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
  ]
...
};
```

## 生产环境基本配置

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader']
      },
      /*
        正常来讲, 一个文件只能被一个loader处理.
        当一个文件要被多个loader处理, 那么一定要指定loader执行的先后顺序：
          先执行eslint 在执行babel
      */
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {version: 3},
                targets: {
                  chrome: '60',
                  firefox: '50'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production'
};
```

## HMR

```
HMR: hot module replacement 热模块替换 / 模块热替换
    作用：一个模块发生变化, 只会重新打包这一个模块（而不是打包所有模块） 
      极大提升构建速度
开发指令: npx webpack-dev-server
```

```JS
/*
      样式文件：可以使用HMR功能：因为style-loader内部实现了~
      
      js文件：默认不能使用HMR功能 --> 需要修改js代码, 添加如下支持HMR功能的代码

        if (module.hot) {
          // 一旦 module.hot 为true, 说明开启了HMR功能. --> 让HMR功能代码生效
          module.hot.accept('./print.js', function() {
            // 监听 print.js 文件的变化, 一旦发生变化, 其他模块不会重新打包构建.
            // 会执行后面的回调函数
            print();
          });
        }
        注意：HMR功能对js的处理, 只能处理非入口js文件的其他文件.


      html文件: 默认不能使用HMR功能, 同时会导致问题：html文件不能热更新了 （一般不用做HMR功能）
        解决：修改entry入口为数组, 将html文件引入
*/

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  ...
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置, 新配置要想生效, 必须重新webpack服务
    hot: true
  }
};
```

## source-map

```
一种提供源代码到构建后代码映射 技术 （如果构建后代码出错了, 通过映射可以追踪源代码错误）
    
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    浏览器 需要打开 enable javascript source maps选项
    
    
    source-map：外部
      错误代码准确信息 和 源代码的错误位置

    eval-source-map：内联
      每一个文件都生成对应的source-map, 都在eval
      错误代码准确信息 和 源代码的错误位置
      
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息

    hidden-source-map：外部
      错误代码错误原因, 但是没有错误位置
      不能追踪源代码错误, 只能提示到构建后代码的错误位置
        
    ...配置太多不一一列出
      
内联 和 外部的区别：
	1. 外部生成了文件, 内联没有 2. 内联构建速度更快

开发环境：
      --> eval-source-map  / eval-cheap-module-souce-map
      
生产环境：
      内联会让代码体积变大, 所以在生产环境不用内联
      nosources-source-map 隐藏全部代码
      hidden-source-map 只隐藏源代码, 会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
```

```js
module.exports = {
	devtool: "eval-source-map"
}
```

## oneOf

```
只会让文件执行一个loader
```

```js
module.exports = {
  module: {
    rules: [
      {loader...} // 需要同一种类型文件使用多个loader时 把它单独拿出来
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {loader...},
          {loader...},
          {loader...}
        ]
      }
    ]
  }
};
```

## 缓存

```
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
      
      
    文件资源缓存(打包时根据hash值为对应文件命名)
      hash: 每次wepack构建时会生成一个唯一的hash值.
        问题: 因为js和css同时使用一个hash值.
          如果重新打包, 会导致所有缓存失效.（只改动一个文件）

      chunkhash：根据chunk生成的hash值.如果打包来源于同一个chunk, 那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的, 所以同属于一个chunk

      contenthash: 根据文件的内容生成hash值.不同文件hash值一定不一样    
      --> 让代码上线运行缓存更好使用
```

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js', //  使用 contenthash 命名文件名
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时, 会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]', //  使用 contenthash 命名文件名
              outputPath: 'imgs',
              esModule: false
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
  ]
};
```

## tree shaking

```
tree shaking：去除无用代码
前提：1. 必须使用ES6模块化  2. 开启production环境
作用: 减少代码体积

在package.json中配置 
  "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
    问题：可能会把css / @babel/polyfill （副作用）文件干掉
    
  "sideEffects": ["*.css", "*.less"]
  	可以配置排除某些指定文件名的
```

## code split

- 多个入口文件分割代码:

  ```js
  const { resolve } = require('path');
  
  module.exports = {
    // 单入口
    // entry: './src/js/index.js',
    entry: {
      // 多入口：有几个入口, 最终输出就有几个bundle
      index: './src/js/index.js',
      test: './src/js/test.js'
    },
    output: {
      // [name]：取文件名加hash命名文件来区分文件
      filename: 'js/[name].[contenthash:10].js',
      path: resolve(__dirname, 'build')
    }
  };
  ```

- `optimization` 配置

  ```
  可以将 node_modules 中使用的代码包单独打包一个chunk最终输出
  自动分析多入口chunk中, 有没有公共的文件.如果有会打包成单独一个chunk, 多文件共用
  ```

  ```js
  const { resolve } = require('path');
  
  module.exports = {
    // 单入口
    // entry: './src/js/index.js',
    entry: {
      index: './src/js/index.js',
      test: './src/js/test.js'
    },
    output: {
      // [name]：取文件名
      filename: 'js/[name].[contenthash:10].js',
      path: resolve(__dirname, 'build')
    },
    /*
    	optimization
          1. 可以将node_modules中代码单独打包一个chunk最终输出
          2. 自动分析多入口chunk中, 有没有公共的文件.如果有会打包成单独一个chunk, 多文件共用
    */
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    mode: 'production'
  };
  ```

- `import ` 异步导入文件(单入口文件):

  ```js
  /*
    通过js代码, 让某个文件被单独打包成一个chunk
    	还是需要 optimization 配置分割 node_module 
    import异步导入语法：能将某个文件单独打包
  */
  //     /* webpackChunkName: 'test' */ 为打包的文件设置固定的前缀名
  import(/* webpackChunkName: 'test' */'./test')
    .then(({ mul, count }) => {
      // 文件加载成功~
      // eslint-disable-next-line
      console.log(mul(2, 5));
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log('文件加载失败~');
    });
  ```

## 懒加载和预加载

```js
import() 异步导入
  懒加载：当文件需要使用时才加载

import异步导入加上 webpackPrefetch: true 
  预加载: 会在使用之前, 提前加载js文件  
  
 正常加载可以认为是并行加载（同一时间加载多个文件）  
 预加载 prefetch：等其他资源加载完毕, 浏览器空闲了, 再偷偷加载资源(兼容性不是很好)
```

```js
document.getElementById('btn').onclick = function() {
   // 预加载 test 文件 
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
};
```

## PWA

```
渐进式网络开发应用程序(离线可访问)
```

- 下载 `npm install --save-dev workbox-webpack-plugin`

- 在plugins里使用一下

  ```js
  const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
  module.exports = {
    plugins: [
      new WorkboxWebpackPlugin.GenerateSW({
        /*
          1. 帮助serviceworker快速启动
          2. 删除旧的 serviceworker
  
          生成一个 serviceworker 配置文件~
        */
        clientsClaim: true,
        skipWaiting: true
      })
    ]
  }
  ```

- 注册 `serviceWorker`

  ```js
  // 一般在入口文件中注册
  
  // 处理兼容性问题
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          console.log('sw注册成功了~');
        })
        .catch(() => {
          console.log('sw注册失败了~');
        });
    });
  }
  ```

- 如果配置了 `eslint`

  ```js
  eslint不认识 window、navigator全局变量
  解决：需要修改package.json中eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  ```

- `serviceWorker `代码必须运行在服务器上

  ```
  1. serviceWorker 代码放到服务器上
  
  2. 可以使用 serve 这个包来打来 serviceWorker 代码(打包好的代码)
  ```


## 多进程打包

- 下载  `npm install --save-dev thread-loader`

- 在需要开启多线程打包的 loader 后面使用 thread-loade

  ```js
  module.exports = {
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                /* 
                  开启多进程打包.(babel-loader)
                  进程启动大概为600ms, 进程通信也有开销.
                  只有工作消耗时间比较长, 才需要多进程打包
                */
                {
                  loader: 'thread-loader',
                  options: {
                    workers: 2 // 进程2个
                  }
                },
                {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      [
                        '@babel/preset-env',
                        {
                          useBuiltIns: 'usage',
                          corejs: { version: 3 },
                          targets: {
                            chrome: '60',
                            firefox: '50'
                          }
                        }
                      ]
                    ],
                    cacheDirectory: true
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  };
  ```

## externals

```
可以拒接打包指定的第三方包, 需要使用被拒接的包请使用 cdn 引入
```

```js
module.exports = {
  externals: {
    // 拒绝jQuery被打包进来
    jquery: 'jQuery'  // npm包名: 包名暴露的对象或方法
  }
}
```

## DII

```
dll技术, 对某些库（第三方库：jquery、react、vue...）进行单独打包
```

- 编写 dii 文件(`webpack.dii.js`): 

  ```js
  /*
    使用dll技术, 对某些库（第三方库：jquery、react、vue...）进行单独打包
      当你运行 webpack 时, 默认查找 webpack.config.js 配置文件
      需求：需要运行 webpack.dll.js 文件
        --> webpack --config webpack.dll.js
  */
  
  const { resolve } = require('path');
  const webpack = require('webpack');
  
  module.exports = {
    entry: {
      // 最终打包生成的[name] --> jquery
      // ['jquery'] --> 要打包的库是jquery
      jquery: ['jquery'], 
      // react: ['react','react-dom'...] 可以写多个 
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dll'),
      library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
      // 打包生成一个 manifest.json --> 提供和jquery映射
      new webpack.DllPlugin({
        name: '[name]_[hash]', // 映射库的暴露的内容名称
        path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
      })
    ],
    mode: 'production'
  };
  ```

- 运行: `webpack --config webpack.dll.js` 生成 `dll/manifest.json`文件里面有和库的映射关系, 还有 jq 文件(打包后的)

- 下载 `npm install --save-dev add-asset-html-webpack-plugin`

- `webpack.config.js` 配置:

  ```js
  const { resolve } = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');
  const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
  
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'built.js',
      path: resolve(__dirname, 'build')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      // 告诉webpack哪些库不参与打包(页面不会引入)
      new webpack.DllReferencePlugin({
        manifest: resolve(__dirname, 'dll/manifest.json') // 这个文件就是 上面生成的映射文件
      }),
      // 自动引入打包好的第三方包
      new AddAssetHtmlWebpackPlugin({
        filepath: resolve(__dirname, 'dll/jquery.js') // 这个文件就是上面单独打包的第三方包
      })
    ],
    mode: 'production'
  };
  ```

## webpack的详细配置(常用)

### entry

```js
 entry: 入口起点
    1. string --> './src/index.js'
      单入口
      打包形成一个chunk. 输出一个bundle文件.
      此时chunk的名称默认是 main

    2. array  --> ['./src/index.js', './src/add.js']
      多入口
      所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件.
        --> 会在HMR功能中让html热更新生效时使用

    3. object --> {index:'./src/index.js', add: './src/add.js'}
      多入口
      有几个入口文件就形成几个chunk, 输出几个bundle文件
      此时chunk的名称是 key

      --> 特殊用法
        {
          // 输出一个bundle文件 index 里面包含 './src/index.js', './src/count.js'
          index: ['./src/index.js', './src/count.js'], 
          // 输出一个bundle文件 add 只包含 ./src/add.js
          add: './src/add.js'
        }
```

### output

```js
const { resolve } = require('path');

module.exports = {
...
  output: {
    // 文件名称（可以指定目录和名称）
    filename: 'js/[name].js',
    // 输出文件目录（所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    // 非入口文件chunk的名称指定
    chunkFilename: 'js/[name]_chunk.js', 
      
    // library: '[name]', // 整个库(chunk)向外暴露的变量名
    // libraryTarget: 'window' // 变量名添加到哪个 浏览器 变量上
    // libraryTarget: 'global' // 变量名添加到哪个 node 变量上
    // libraryTarget: 'commonjs' // 以 commonjs 模块暴露
  },
...
};
```

### module

```js
const { resolve } = require('path');

module.exports = {
...
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 使用多个loader用use
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        // 排除node_modules下的js文件
        exclude: /node_modules/,
        // 只检查 src 下的js文件
        include: resolve(__dirname, 'src'),
        // 优先执行
        enforce: 'pre',
        // 延后执行
        // enforce: 'post',
        // 使用单个loader用loader
        loader: 'eslint-loader',
        options: {}
      },
      {
        // oneOf里配置的loader只会生效一个 
        oneOf: [
            {...},
            {...},
            {...}
        ]
      }
    ]
  }
...
};
```

### resolve

```
此 resolve 不是 js 或者 path 里的resolve, 而是webpack的配置项
```

```js
const { resolve } = require('path');

module.exports = {
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名, 优点: 引入文件简写路径, 缺点: 写路径时没有提示
    alias: {
      $css: resolve(__dirname, 'src/css') // $css/a.css --> src/css/a.css
    },
    // 配置省略引入文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 配置 webpack 解析模块去找哪个目录找
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
};
```

### devServer

```js
const { resolve } = require('path');

module.exports = {
  devServer: {
    // 运行代码的目录
    contentBase: resolve(__dirname, 'build'),
    // 监视 contentBase 目录下的所有文件, 一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外, 其他内容都不要显示
    quiet: true,
    // 如果出错了, 不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求, 就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时, 请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
```

### optimization

```js
const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build'),
        chunkFilename: 'js/[name].[contenthash:10]_chunk.js'
    },
    optimization: {
        // 代码分割配置
        splitChunks: {
            // 代码分割所有
            chunks: 'all'
            // 还有一堆默认值, 可以不用修改
        },
        /* 
            注意点:
                使用 contenthash 文件缓存加 代码分割时   文件缓存会失效
                    因为每次修改代码打包都会生成一个新的 contenthash 然后, 
                        导致其他文件的引用也会变化, 其他文件也会被打包
                 解决: 配置 optimization.runtimeChunk 选项如下:
        */
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}` // 解决：上述问题
        },
        minimizer: [
            // 自定义配置生产环境的压缩方案：js和css
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 启动source-map
                sourceMap: true
            })
        ]
    }
};
```

:::