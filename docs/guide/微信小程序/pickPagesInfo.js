// 获取小程序 pages.json 中的页面信息(用于路由跳转使用)

const fs = require("fs");
const path = require("path");


const [
  targetPath = path.resolve(__dirname, "./pages.json"), // 目标文件地址
  isAllInfo = false // 是否获取全部配置
] = process.argv.slice(2);

const pages = require(targetPath);


/** 获取路由地址信息
 * @param {array} pages pages 配置
 * @param {boolean} flog 是否收集全部的数据, 默认 false
 * @param {string} prefix path 添加path前缀
 * @returns 
 */
const getPagesInfo = (pages, flog = false, prefix = "/") => {
  if (!(Array.isArray(pages))) {
    throw new Error("参数必须是一个数组");
  }

  const list = pages.map(e => {
    const pathList = e.path.split("/");
    const key = pathList[pathList.length - 1];
    const name = e?.style?.navigationBarTitleText || "";
    return { key, name, ...e };
  });

  const result = {};

  for (const item of list) {
    let value = item.path = prefix + item.path;
    if (flog) value = item;
    result[item.key] = value;
    delete result[item.key].key;
  }
  return result;
}

// 中横线转换大写字母
const camelize = (str, symbol = "[_|-]") => {
  const reg = new RegExp(`${symbol}(\\w)`, "g");
  return str.replace(reg, (_, c) => c ? c.toUpperCase() : '')
}


// 去除 json 数据 key 的双引号
const dislodgeDouble = option => {
  if (!(option instanceof Object)) {
    throw new Error("参数必须是一个对象");
  }
  const doubleSymRE = /"(?<key>.*?)"\s*:\s*(?<value>.*?)(?=,|\n)/gs
  const text = JSON.stringify(option, null, 2);
  return text.replace(doubleSymRE, (match, key, value) => {
    // 转换 key
    key = camelize(key);
    return `${key}: ${value}`;
  });
}

const pageInfo = {
  // 主包信息
  pages: getPagesInfo(pages.pages, !!isAllInfo)
};

for (const item of pages.subPackages) {
  // 分包信息
  pageInfo[item.root] = getPagesInfo(item.pages, !!isAllInfo, `/${item.root}/`);
}

const data = `export default ${dislodgeDouble(pageInfo)}`;
const resultPath = path.resolve(__dirname, "./routesInfo.js");

fs.writeFile(resultPath, data, (err) => {
  if (err) {
    throw new Error(err.message || "文件写入失败");
  }
  console.log("文件写入成功 ---> " + resultPath);
});

