// 创建缓存函数, 以fn函数接受的第一个参数为key进行缓存
const cached = (fn) => {
	const cache = Object.create(null);
	return (...pars) => {
		const key = pars[0].toString();
		const hit = cache[key];
		return hit || (cache[key] = fn(...pars));
	};
};


// 通用判断类型
function getType(obj) {
	if (Object.is(obj, NaN)) return "nan";
	const ret = Object.prototype.toString.call(obj);
	return ret.slice(8, -1).toLowerCase();
}


// 函数递归
// 返回克隆的数组, 对象, 时间对象, 正则对象
function deepCopy(obj) {
	// 时间对象
	if (obj instanceof Date) return new Date(obj);
	// 正则对象
	if (obj instanceof RegExp) return new RegExp(obj);
	// 构造一个对应的数据类型
	const result = new obj.constructor();
	for (let keys in obj) {
		if (obj.hasOwnProperty(keys)) {
			if (obj[keys] instanceof Object) {
				// 引用数据类型递归
				result[keys] = deepCopy(obj[keys]);
			} else {
				// 基本数据类型直接赋值
				result[keys] = obj[keys];
			}
		}
	}
	// 返回克隆的结果
	return result;
}

// 组合函数
const compose = function (f, g) {
	return function (x) {
		return f(g(x));
	};
};

// 防抖函数
/**
 * 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 *  使用:
 *      先调用 防抖函数 返回值才是真正的防抖函数
 */
// 参数 业务逻辑函数  触发时间
function debounce(fn, delay) {
	let t = null;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => {
			return fn.apply(this, args);
		}, delay);
	};
}
// 节流函数
/**
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有最后一次生效。
 *   使用:
 *      先调用 节流函数 返回值才是真正的节流函数
 */
// 参数 业务逻辑函数 触发时间
function throttle(fn, delay) {
	let flag = true;
	return (...args) => {
		if (flag) {
			flag = false;
			setTimeout(() => {
				return fn.apply(this, args);
				flag = true;
			}, delay);
		}
	};
}


/** 提取 url 中的 params 参数
 *    url url地址
 *    key 键值
 *      参数有多个同名返回则数组
 *      不带 key 则返回所有 params 参数的对象
 * */

function getUrlParam(url, key) {
	let paramArr = url.split("?")[1].split("#")[0].split("&"); // 取出每个参数的键值对放入数组
	const obj = {};
	paramArr.forEach((element) => {
		const [key, value] = element.split("="); // 取出数组中每一项的键与值
		if (obj[key] === undefined) {
			// 表示第一次遍历这个元素，直接添加到对象上面
			obj[key] = value;
		} else {
			obj[key] = [].concat(obj[key], value); // 表示不是第一次遍历说明这个键已有，通过数组存起来。
		}
	});
	return key === undefined ? obj : obj[key] || ""; // 如果该方法为一个参数，则返回对象。
	//如果为两个参数，key存在，则返回值或数组，否则返回空字符。
}

/*
  根据 exp 提取 data 里的数据
    data['a.b.c'] --> 不可以取值(该函数就是要识别这个)
    exp 格式 xxx.xxx.xxx
*/
function getValueByExp(data, exp) {
	// 没有 .
	if (exp.indexOf(".") === -1) {
		return data[exp] ? data[exp] : data;
	}
	// 有 .
	const keys = exp.split(".");
	let result = JSON.parse(JSON.stringify(data));
	keys.forEach((item) => (result = result[item]));
	return result;
}

/**
 * 根据表达式数值中从一个对象中读取值
 * @param {object} resp 响应对象
 * @param {array | string} expList key表达式数组或字符串
 * @param {function} cb 处理查找到的value, 默认为 JSON.parse
 * @returns { target,  findRespFun}
 *  target 为查找到的数据数组
 *  findRespFun 一个查找函数用于在target中查找对应key的值返回数组
 *
 * const { findRespFun, target } = getResponseByExp(res, ["data", "data.data", "a", "a.b.c"]);
 * console.log(target);
 * console.log(findRespFun("code")); // => [xxx1, xxx2]
 * console.log(findRespFun("data")); // => [xxx1, xxx2]
 * console.log(findRespFun("msg")); // => [xxx1, xxx2]
 */
function getResponseByExp(resp, expList, cb = JSON.parse) {
	if (!Array.isArray(expList)) {
		expList = [expList];
	}
	let resultList = [];
	for (const exp of expList) {
		let result = JSON.parse(JSON.stringify(resp));
		// 没有 .
		if (exp.indexOf(".") === -1) {
			result = result[exp] ? result[exp] : null;
		} else {
			// 有 .
			const keys = exp.split(".");
			keys.forEach((k) => (result = result?.[k]));
		}

		try {
			result = cb(result);
		} catch (error) {}
		resultList.push(result || null);
	}
	const cache = {};

	const getValue = (obj, name) => {
		let result = null;
		let value = null;
		for (let key in obj) {
			value = obj[key];
			if (key === name) {
				return value;
			} else {
				if (value instanceof Object) {
					result = getValue(value, name);
				}
			}
		}
		return result;
	};

	// 根据key查找对应的值
	const findRespFun = (key) => {
		let data = resultList;
		if (cache[key]) return cache[key];

		let values = [];
		if (data.length) {
			data = data.filter((item) => {
				if (item instanceof Object && Object.keys(item).includes(key)) {
					values.push(getValue(item, key));
				}
			});
		}
		if (values.length) {
			cache[key] = values;
		} else {
			values = null;
		}
		return values;
	};
	return {
		target: resultList,
		findRespFun
	};
}



// 判断 target 数组里的参数是否非法
function isEmpty(target, verify) {
	verify = verify || ["undefined", undefined, 0, "", " "];
	if (!Array.isArray(target) || isNaN(target)) {
		throw new Error(`target 必须是数组`);
	}
	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (verify.includes(item)) {
			return true;
		}
	}
	return false;
}

// 统计给定字符串的信息
function strCountInfo(str) {
	if (typeof str !== "string") throw "参数必须是字符串";
	const arr = [...new Set(str.split(""))];
	const result = new Array(arr.length);
	arr.forEach((item, i) => {
		let pos = str.indexOf(item);
		const obj = {
			value: "",
			count: 0,
			posInfo: []
		};
		while (pos > -1) {
			obj.value = item;
			obj.count++;
			obj.posInfo.push(pos);
			pos = str.indexOf(item, ++pos);
		}
		result[i] = obj;
	});
	return result;
}


/**
 * 批量设置列表查询条件
 * @param {Object} query 对象
 * @param {Array} lists 需要设置的 key,可以是数组和字符串(用,分割)
 * @param {String} exact 列表查询条件
 * @returns 返回一个转换好的对象
 */
export function exactSearchArr(query, fields, exact = "_equal") {
	if (!query || !fields) return;
	if (typeof fields === "string") fields = fields.split(",");
	if (!Array.isArray(fields)) fields = [fields];

	const result = JSON.parse(JSON.stringify(query));
	for (let item of fields) {
		if (query[item]) {
			const value = query[item];
			const key = item + exact;
			result[key] = value;
			delete result[item];
		}
	}
	return result;
}

/**
 * 将后台字段转换成表单字段
 * @param {Object} data 数组对象
 * @param {Array} fields
 *      二维数组会将后台字段转换为表单字段  => [[后台字段2,表单字段1], 字段2]
 *      字符串则表示后台字段转换为表单字段(同名)
 * @returns  返回一个转换好的对象
 */
function conversionField(data, fields = []) {
	const result = {};
	for (const field of fields) {
		let newVal;
		let oldVal;
		if (Array.isArray(field)) {
			if (field.length === 1) {
				oldVal = newVal = field[0];
			} else {
				[oldVal, newVal] = field;
			}
		} else {
			oldVal = newVal = field;
		}
		if (data[oldVal]) {
			const value = data[oldVal];
			if (value) result[newVal] = value;
		}
	}
	return result;
}


/**
 * 给对象或数组添加 key 或 value 的前后缀
 * @param {Object,Array} dataArr 需要添加前后缀的对象或数组
 * @param {Object} options
 *      prefix: '添加的前缀',
 *      suffix: "添加的后缀",
 *      key: 'name,age', // 或 ['name','age'], 需要添加的 key
 *      type: 'value,key', // ['value','key'], 对键添加或对值添加
 * @returns 返回添加好的数组或对象
 */

function modifier(dataArr, options) {
	if (!dataArr || !options || !options instanceof Object) return dataArr;

	let _isArray = false;
	if (!Array.isArray(dataArr)) {
		_isArray = true;
		// 支持单个对象
		dataArr = [dataArr];
	}

	const result = JSON.parse(JSON.stringify(dataArr));

	for (const item of result) {
		let { key, prefix, suffix, type } = options;

		// 支持 key1,key2
		if (typeof key === "string") key = key.split(",");
		// 支持单个
		// if (!Array.isArray(key)) key = [key];

		if (typeof type === "string") type = type.split(",");
		// if (!Array.isArray(type)) type = [type];

		for (let k of key) {
			// 清除空格
			k = k.trim();
			for (let t of type) {
				// 清除空格
				t = t.trim();
				// 默认对 key 添加前后缀
				if (!t) t === "key";
				if (t === "value" && item[k]) {
					// value 添加前后缀
					item[k] = prefix + item[k] + suffix;
				}
				if (t === "key" && item[k]) {
					// key 添加前后缀
					const key = prefix + k + suffix;
					item[key] = item[k];
					delete item[k];
				}
			}
		}
	}
	return _isArray ? result[0] : result;
}

/**
 * 对一个对象或数组的指定 key 或 value 匹配, 支持删除匹配值, 赋值匹配值
 *
 * @param {Object,Array} obj
 *      需要操作的对象或数组
 * @param {Object} options
 *      prefixSymbol: '$', // 需要匹配的前缀标志(会使用正则匹配)
 *      suffixSymbol: '*', // 需要匹配的后缀标志(会使用正则匹配)
 *      matchVal: 'name,age',  // 需要匹配的值, 可以是以 , 分割的字符串或数组(值会被转换为字符串)
 *      value: '赋值默认值', // 给匹配后的赋值, 支持 $ 引用匹配到的值
 *      manualHandle(option){}, // 匹配后的自定义处理函数(返回值就是匹配后的赋值)
 *      type: 'del', // 匹配后操作(优先级最高), del 删除属性, reverse 键值互换
 *      modu: 'key'// key 表示匹配 key, value 表示匹配 value
 * @returns
 *      返回已经处理好的对象或数组
 */
export function formatClipAttr(obj, options) {
	if (!obj instanceof Object || !options instanceof Object) {
		throw new Error("参数 object 或 options 必须是对象");
	}
	let {
		prefixSymbol,
		suffixSymbol,
		value,
		matchVal,
		manualHandle,
		type,
		modu
	} = options;

	// 默认值
	if (typeof modu !== "string") modu = "key";

	let _isArray = false;
	if (!Array.isArray(obj)) {
		obj = [obj];
		_isArray = true;
	}

	// 构建前缀匹配正则
	let prefixRE = "";
	if (prefixSymbol) {
		for (const p of prefixSymbol) prefixRE += "\\" + p;
		prefixRE = new RegExp("^" + prefixRE, "i");
	}

	// 构建后缀匹配正则
	let suffixRE = "";
	if (suffixSymbol) {
		for (const s of suffixSymbol) suffixRE += "\\" + s;
		suffixRE = new RegExp(suffixRE + "$", "i");
	}

	// matchVal 构建成数组
	if (matchVal) {
		if (typeof matchVal === "string") matchVal = matchVal.split(",");
		if (!Array.isArray(matchVal)) matchVal = [matchVal];
	}

	const result = JSON.parse(JSON.stringify(obj));
	// 命中标识
	let _flag = false,
		temp;

	for (const item of result) {
		for (const key in item) {
			if (Object.hasOwnProperty.call(item, key)) {
				const val = item[key];
				// 匹配 key值 还是 value值
				temp = modu === "key" ? key : val;

				// 对应值匹配
				if (Array.isArray(matchVal)) {
					for (let i = 0, len = matchVal.length; i < len; i++) {
						const matchStr = matchVal[i].trim();
						if (typeof matchStr !== "string") {
							throw new Error("matchVal 的相关值必须是字符串");
						}
						if (matchStr === temp.toString().trim()) {
							_flag = true;
							break;
						}
					}
				}

				// 前缀匹配
				if (prefixRE && prefixRE.test(temp)) _flag = true;
				// 后缀匹配
				if (suffixRE && suffixRE.test(temp)) _flag = true;

				// 命中
				if (_flag) {
					_flag = false;
					// 删除属性
					if (type === "del") {
						delete item[key];
						continue;
					}
					// key value 颠倒
					if (type === "reverse") {
						item[val] = key;
						delete item[key];
						continue;
					}
					// 加上引用本身变量
					if (value && modu === "key") {
						let newKey = getQuoteVal(value, temp);
						item[newKey] = val;
						delete item[key];
					} else if (value && modu === "value") {
						item[key] = getQuoteVal(value, temp);
					}
					// 调用自定义处理函数
					if (manualHandle && typeof manualHandle === "function") {
						const res = manualHandle({
							target: item, // 匹配到值的所在对象
							value: val, // 所在对象 value
							key, // 所在对象 key
							matcVal: temp, // 匹配到的值
							modu // 匹配 key 还是 value
						});

						if (res && modu === "key") {
							let newKey = getQuoteVal(res, temp);
							item[newKey] = val;
							delete item[key];
						} else if (res && modu === "value") {
							item[key] = getQuoteVal(res, temp);
						}
					}
				}
			}
		}
	}

	// 获取替换引用的值
	function getQuoteVal(targetVal, val) {
		if (targetVal && typeof targetVal === "string") {
			return targetVal.indexOf("$") !== -1
				? targetVal.replace("$", val)
				: targetVal;
		} else {
			return targetVal;
		}
	}
	return _isArray ? result[0] : result;
}

/**
 * 转换时间格式 YYYY-MM-DD hh:mm:ss SSS w, 默认 YYYY-MM-DD
 * @param {String} timeStr 转换时间格式 YYYY-MM-DD hh:mm:ss, 默认 YYYY-MM-DD
 * @param {Date} time 日期对象, 默认当前时间
 * @returns 返回格式好的字符串
 */
// 转换时间格式 YYYY-MM-DD hh:mm:ss SSS毫秒 w星期, 默认 YYYY-MM-DD
const transformationTime = (timeStr = "YYYY-MM-DD", time = new Date()) => {
	const _toString = Object.prototype.toString;
	if (_toString.call(time) !== "[object Date]") {
		time = new Date(time);
	}
	if (isNaN(Date.parse(time))) return timeStr;

	const week = ["日", "一", "二", "三", "四", "五", "六"];
	const timeObj = {
		YYYY: time.getFullYear(),
		MM: getVal(time.getMonth() + 1),
		DD: getVal(time.getDate()),
		hh: getVal(time.getHours()),
		mm: getVal(time.getMinutes()),
		ss: getVal(time.getSeconds()),
		SSS: getVal(time.getMilliseconds(), 3),
		w: week[time.getDay()]
	};

	let retStr = timeStr.slice();
	for (const key in timeObj) {
		if (Object.hasOwnProperty.call(timeObj, key)) {
			const val = timeObj[key];
			if (retStr.indexOf(key) !== -1) {
				retStr = retStr.replace(key, val);
			}
		}
	}

	function getVal(val, n = 2, s = "0") {
		return val.toString().padStart(n, s);
	}
	return retStr;
};






/** 可以给指定函数添加函数执行前回调和函数执行后回调
 *
 * @param {function} fn
 *  需要执行的函数
 * @param {optionss} options
 *  配置对象
 *      beforeFn 函数执行前回调
 *      afterFn  函数执行后回调
 *      content  函数执行的 this 上下文
 * @returns
 *      对应函数的返回值
 */
function insertWhen(fn, options) {
	return function (...args) {
		const { beforeFn, afterFn, content } = options;

		let isContent = false;
		if (content && content instanceof Object) isContent = true;

		function execFn(func) {
			if (func && typeof func === "function") {
				return isContent ? func.apply(content, args) : func(...args);
			}
		}

		const beforeFnRes = execFn(beforeFn);
		const res = execFn(fn);
		const afterFnRes = execFn(afterFn);

		return {
			beforeFnRes,
			res,
			afterFnRes
		};
	};
}

// 批量发送多个请求(需要引入 request)
async function moreAxiosRequest(options) {
	// 默认配置
	const defaultOptions = {
		// vm实例(this)
		// that: this,
		// 支持数组或者,分割的字符串
		// urlList: ['/subsidyProject1/list', '/subsidyProject2/list', '/subsidyProject3/list'],
		// 基础URL(前缀)
		// baseURL: 'api/mlkj-fsFct',
		// URL后缀(会拼到url地址后面和设置 params参数效果一样)
		// urlSuffix: '?current=-1&size=-1',
		// 请求类型
		method: "GET",
		// params 参数支持对象, 数组
		params: {},
		// headers 参数支持对象, 数组
		headers: {},
		// data 参数支持对象, 数组
		data: {},
		// 超时时间
		timeout: 100000,

		// 添加 crud dicData
		handleDic: false,
		// 需要添加设置 prop 支持数组或者,分割的字符串
		// propList: 'deptName1,deptName2,deptName3',
		// crud 对应的配置项key, 默认 option
		key: "option",

		// 请求发送之前回调
		questAfter() {},
		// 成功回调
		success(resList) {},
		// 失败回调
		failure(err) {},
		// 结束回调
		end(resList) {}
	};
	const opt = Object.assign(defaultOptions, options);

	let {
		that,
		baseURL,
		urlList,
		urlSuffix,
		method,
		params,
		headers,
		data,
		timeout,
		questAfter,
		success,
		failure,
		end,
		propList,
		key,
		handleDic
	} = opt;
	const _isArray = Array.isArray;

	if (baseURL && typeof baseURL !== "string") {
		throwError("参数 baseURL 必须是字符串");
	} else if (!baseURL) {
		baseURL = "";
	}
	if (urlSuffix && typeof urlSuffix !== "string") {
		throwError("参数 urlSuffix 必须是字符串");
	}
	if (!urlList) throwError("参数 urlList 不能为空");

	if (!that instanceof Object) throwError("参数 that 必须是对象");

	if (typeof urlList === "string") urlList = urlList.split(",");
	if (!_isArray(urlList)) urlList = [urlList];

	const args = {
		dataList: [params, headers, data],
		msgList: ["params", "headers", "data"]
	};
	for (let i = 0; i < args.dataList.length; i++) {
		let item = args.dataList[i];
		if (item && !item instanceof Object)
			throwError(`参数 ${args.msgList[i]} 必须是对象或数组`);

		// params, headers, data 是对象就放到数组里
		if (!_isArray(item) && item instanceof Object) item = [item];
	}

	// 保存请求数组
	const promiseList = [];

	// 创建实例, 指定 基础 URL 和 超时时间
	// const request = that.$axios.create({ baseURL, timeout });

	const urlListInfo = [];
	// 存储请求
	for (let i = 0; i < urlList.length; i++) {
		let url =
			typeof urlList[i] !== "string"
				? urlList[i].toString().trim()
				: urlList[i].trim();

		if (urlSuffix && urlSuffix.indexOf("?") === -1) {
			urlSuffix = "?" + urlSuffix.toString().trim();
		}

		// 获取请求需要携带的数据
		const _params = normalizeParams(params, i);
		const _headers = normalizeParams(headers, i);
		const _data = normalizeParams(data, i);
		const urlInfo = {
			url: baseURL.trim() + url + (urlSuffix || ""),
			method,
			params: _params,
			headers: _headers,
			data: _data,
			timeout
		};
		urlListInfo.push(urlInfo);
		promiseList.push(request(urlInfo));
	}

	let resList;

	try {
		// 请求之前回调
		callFn(questAfter, urlListInfo);
		// 发送请求
		resList = await Promise.all(promiseList);
		// 成功回调
		callFn(success, resList);
		// crud相关处理
		if (handleDic) {
			if (!key || !propList)
				throwError("需要处理 dicData 时, 参数 propList 或者 key 不能为空");
			if (typeof propList === "string") propList = propList.split(",");
			if (!_isArray(propList)) propList = [propList];

			callFn(handleDicFn, resList);
		}
	} catch (error) {
		callFn(failure, error);
		console.error(error);
	} finally {
		callFn(end, resList);
	}

	// 错误抛出
	function throwError(msg) {
		throw new Error(msg);
	}

	// 调用函数
	function callFn(fn, ...args) {
		if (typeof fn === "function") {
			fn.apply(that, args);
		}
	}

	// 参数检验函数
	function normalizeParams(params, i) {
		let ret;
		if (_isArray(params) && params[i]) {
			ret = params[i];
		} else if (_isArray(params) && params[0]) {
			ret = params[0];
		} else if (params) {
			ret = params;
		} else {
			ret = {};
		}
		return ret;
	}

	// 处理 crud dicData
	function handleDicFn(dataArr) {
		const dataList = dataArr.map(
			(item) => item.data.code === 200 && item.data.data.records
		);
		if (!dataList) return;
		for (let i = 0, len = propList.length; i < len; i++) {
			const prop = propList[i];
			let { columnObj, groupObj } = findPropObj(prop);
			setDicData(columnObj, _isArray(dataList) ? dataList[i] : dataList);
			setDicData(groupObj, _isArray(dataList) ? dataList[i] : dataList);
		}
		return dataList;
	}

	// 获取 prop 对象
	function findPropObj(prop) {
		let columnObj = -1,
			groupObj = -1;

		if (that.findObject) {
			columnObj = that.findObject(that[key].column, prop);
			groupObj = that.findObject(that[key].group, prop);
		}
		if (columnObj === -1) columnObj = null;
		if (groupObj === -1) groupObj = null;
		return { groupObj, columnObj };
	}

	// 设置 dicData
	function setDicData(propObj, dataList) {
		if (propObj === null || !dataList) return;
		if (!propObj.dicData || !_isArray(propObj.dicData)) {
			this.$set(propObj, "dicData", dataList);
		} else {
			propObj.dicData = [...dataList];
		}
	}
}

// fetch 批量发送多个请求
async function moreFetchRequest(options) {
	const opt = Object.assign(
		{
			// 支持数组或者,分割的字符串
			// urlList: ['/subsidyProject1/list', '/subsidyProject2/list', '/subsidyProject3/list'],
			// 基础URL(前缀)
			// baseURL: 'api/mlkj-fsFct',
			// URL后缀(会拼到url地址后面和设置 params参数效果一样)
			// urlSuffix: '?current=-1&size=-1',
			// 请求类型
			method: "GET",
			// params 参数支持对象, 数组
			params: {},
			// headers 参数支持对象, 数组
			headers: {},
			// body 参数支持对象, 数组
			data: {},
			// 超时时间
			timeout: 100000,
			// 返回的数据类型, 默认json
			requestType: "json",
			// 请求发送之前回调
			questAfter() {},
			// 成功回调
			success(resList) {},
			// 失败回调
			failure(err) {},
			// 结束回调
			end(resList) {}
		},
		options
	);

	const _isArray = Array.isArray;

	let {
		urlList,
		baseURL,
		urlSuffix,
		method,
		params,
		headers,
		data,
		timeout,
		requestType,
		questAfter,
		success,
		failure,
		end
	} = opt;

	if (baseURL && typeof baseURL !== "string") {
		throwError("参数 baseURL 必须是字符串");
	} else if (!baseURL) {
		baseURL = "";
	}

	if (urlSuffix && typeof urlSuffix !== "string") {
		throwError("参数 urlSuffix 必须是字符串");
	}

	if (!urlList) throwError("参数 urlList 不能为空");

	if (typeof urlList === "string") urlList = urlList.split(",");
	if (!_isArray(urlList)) urlList = [urlList];

	const args = {
		dataList: [params, headers, data],
		msgList: ["params", "headers", "data"]
	};
	for (let i = 0; i < args.dataList.length; i++) {
		let item = args.dataList[i];
		if (item && !item instanceof Object)
			throwError(`参数 ${args.msgList[i]} 必须是对象或数组`);

		// params, headers, data 是对象就放到数组里
		if (!_isArray(item) && item instanceof Object) item = [item];
	}

	// 保存请求数组
	const promiseList = [];
	const urlListInfo = [];
	// 存储请求
	for (let i = 0; i < urlList.length; i++) {
		let url =
			typeof urlList[i] !== "string"
				? urlList[i].toString().trim()
				: urlList[i].trim();

		// 获取请求需要携带的数据
		const _params = normalizeParams(params, i);
		const _headers = normalizeParams(headers, i);
		const _data = normalizeParams(data, i);

		baseURL = baseURL.trim();

		let paramsStr = getParams(_params);
		// 拼接 url params参数 urlSuffix
		urlSuffix = urlSuffix ? urlSuffix.toString().trim() : "";
		if (paramsStr && urlSuffix) {
			url =
				baseURL +
				url +
				paramsStr +
				(urlSuffix.indexOf("?") !== -1
					? "&" + urlSuffix.slice(1)
					: "&" + urlSuffix);
		} else if (paramsStr) {
			url = baseURL + url + paramsStr;
		} else if (urlSuffix) {
			url = baseURL + url + urlSuffix;
		}

		const option = {
			method,
			headers: _headers,
			body: JSON.stringify(_data),
			timeout
		};

		if (method.toLocaleLowerCase() === "get") delete option.body;

		urlListInfo.push(url, option);

		promiseList.push(await request(url, option));
	}

	let resList;

	try {
		// 请求之前回调
		callFn(questAfter, urlListInfo);
		// 发送请求
		resList = await Promise.all(promiseList);
		// 成功回调
		callFn(success, resList);
	} catch (error) {
		callFn(failure, error);
		console.error(error);
	} finally {
		callFn(end, resList);
	}

	// 错误抛出
	function throwError(msg) {
		throw new Error(msg);
	}

	// 调用函数
	function callFn(fn, ...args) {
		if (typeof fn === "function") {
			fn(...args);
		}
	}

	// 拼接params参数
	function getParams(obj) {
		if (!Object.keys(obj).length) return "";
		let str = "?";
		for (const key in obj) {
			if (Object.hasOwnProperty.call(obj, key)) {
				const value = obj[key];
				str += key + "=" + value + "&";
			}
		}
		str = str.slice(0, str.length - 1);
		return str;
	}

	// 请求函数
	function request(url, opt) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await fetch(url, opt);
				const data = await response[requestType]();
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}

	// 参数检验函数
	function normalizeParams(params, i) {
		return _isArray(params) && params[i]
			? params[i]
			: _isArray(params) && params[0]
			? params[0]
			: params
			? params
			: {};
		// let ret;
		// if (_isArray(params) && params[i]) {
		//     ret = params[i];
		// } else if (_isArray(params) && params[0]) {
		//     ret = params[0];
		// } else if (params) {
		//     ret = params;
		// } else {
		//     ret = {};
		// }
		// return ret;
	}
}

// 替换字符串的指定位数为给定的符号
// 例如: 12345 => 12**5
const privacyStar = (options: privacyOption) => {
	const defaultOpt = {
		value: "", // 需要替换的字符串
		sratrIdx: 4, // 开始位数
		digit: 4, // 隐藏的位数
		symbol: "*", // 隐藏位数显示的符号
		defaultValue: "" // value 为空显示的默认值
	};
	options = Object.assign({}, defaultOpt, options);

	const { value, sratrIdx, digit, symbol, defaultValue } = options;

	const handleError = (msg: string) => {
		throw new Error(msg);
	};

	if (typeof value !== "string") {
		handleError("value 参数请给字符串");
	}

	if (value.trim() === "") {
		return defaultValue;
	}

	const len = value.length;
	if (typeof sratrIdx !== "number" || typeof digit !== "number") {
		handleError("sratrIdx 或者 digit 请给数字");
	}
	const sumLen = sratrIdx + digit;

	if (sratrIdx >= len) {
		handleError("开始位置 sratrIdx 不能大于或等于总长度");
	}

	// 大于总长度
	let isGreaterLen = false;
	if (sumLen >= len) isGreaterLen = true;

	let ret;
	let prefixVal = "";
	let suffixVal = "";

	if (isGreaterLen) {
		prefixVal = value.slice(0, sratrIdx - 1);
		ret = prefixVal + (symbol as string).repeat(len - sratrIdx + 1);
	} else {
		prefixVal = value.slice(0, sratrIdx - 1);
		suffixVal = value.slice(sumLen - 1, len);
		ret = prefixVal + (symbol as string).repeat(digit) + suffixVal;
	}
	return ret;
};

/** 字典数据替换为字典value
 *
 * @param {object} dictMap
 *  字典对象信息每个value都是key对应的字典值 => { isFlag: [{dictKey: "0", dictValue: "正常"}] }
 *
 * @param {array} dataList
 *  数据数组 => [{isFlag: "0"}]
 *
 * @param {string} symspl
 *  多选字典的字段连接符 => 0,1
 *
 * @param {string} joinSym
 *  替换多选字段后的value连接符 => 正常,失败
 *
 * @returns
 *  返回 => [{isFlag: "正常"}]
 *
 */
export function replaceDictKey(dataList, column, symspl = ",", joinSym = "|") {
	const dictList = column.filter((e) => Array.isArray(e.dicData));
	// 获取字典key
	const propList = dictList.map((e) => e.prop);
	const ret = JSON.parse(JSON.stringify(dataList));
	for (const item of ret) {
		for (const key in item) {
			let keys = null;
			if (propList.includes(key)) {
				// 多选字段
				if (item[key].indexOf(symspl) !== -1) {
					keys = item[key].split(symspl);
				}
				if (Array.isArray(keys)) {
					// 循环替换
					keys.forEach((k, i) => {
						const row = dictList.find((e) => e.prop === key);
						if (row) {
							const target = row.dicData.find(
								(e) => e.dictKey === k || e.prop === k
							);
							if (target) {
								keys[i] = keys[i].replace(k, target.dictValue || target.label);
							}
						}
					});
					// 连接替换
					item[key] = keys.join(joinSym);
				} else {
					const row = dictList.find((e) => e.prop === key);
					if (row) {
						const target = row.dicData.find(
							(e) => e.dictKey === item[key] || e.prop === item[key]
						);
						// 直接替换
						if (target) {
							item[key] = target.dictValue || target.label;
						}
					}
				}
			}
		}
	}
	return ret;
}


import province from "./city-data/province.js";
import city from "./city-data/city.js";
import area from "./city-data/area.js";

/**
 * 获取指定地区的区划码信息
 * @param {string} val 地区名或区划码
 * @param {string} key label对应地区名匹配, value对应区划码匹配
 * @returns {target, list}
 *              target 完全匹配的地区对象
 *              list 匹配市或县列表
 *
 *  getRegionInfo("广东");
 *  getRegionInfo("广东省");
 *  getRegionInfo("北京市");
 *  getRegionInfo("110000", "value");
 *  getRegionInfo("河北");
 */
const getRegionInfo = cached((val, key = "label") => {
	const find = (arr) => {
		const tarIdx = arr.findIndex(
			(e) => e[key] === val || e[key]?.startsWith(val)
		);
		return { tarIdx, target: arr[tarIdx] };
	};
	const findData = (list) => {
		const res = find(list);
		if (res && res?.tarIdx !== -1) return res;
		for (let i = 0; i < list.length; i++) {
			const item = list[i];
			if (Array.isArray(item)) {
				const res = findData(item);
				if (res && res?.tarIdx !== -1) return res;
			}
		}
	};

	const sourceData = [province, city, area];
	let ret;
	for (let i = 0; i < sourceData.length; i++) {
		const item = sourceData[i];
		ret = findData(item);
		if (ret) {
			for (let j = 0; j < item.length; j++) {
				const value = item[j];
				if (value[key] === val || value[key]?.startsWith(val)) {
					// 市
					ret.list = sourceData[i + 1][j];
					ret.parent = null;
				} else if (Array.isArray(value)) {
					const { tarIdx } = find(value);
					if (tarIdx !== -1) {
						// 县, 区
						ret.list = sourceData[i + 1][j][tarIdx];
						ret.parent = sourceData[i - 1][j];
					}
				}
			}
			delete ret.tarIdx;
			return ret;
		}
	}
});

// 控制台输出块文本信息
// 示例: logColorText("标题", "内容", "success");
const logColorBlockText = (title, info, type = "default") => {
	const typeColor = {
		default: "#35495E",
		primary: "#3488ff",
		success: "#43B883",
		warning: "#e6a23c",
		danger: "#f56c6c"
	};

	console.log(
		`%c${title}%c${info}%c`,
		`background: ${typeColor[type]}; padding: 2px 2px 2px 4px; border-radius: 3px 0 0 3px; color: #fff;`,
		`background: #35495E; padding: 2px 4px 2px 2px; border-radius: 0 3px 3px 0;  color: #fff;`,
		`background: transparent`
	);
};

// 开发环境 log
const devLog = (label, obj, isUnfoid, envFlog) => {
	let val = null;
	const args = [];
	envFlog = envFlog || process?.env?.NODE_ENV || "development";

	if (!(label instanceof Object) && !obj) {
		args.push(label);
	} else if (label instanceof Object) {
		val = JSON.parse(JSON.stringify(label));
		if (obj) {
			args.push(JSON.stringify(val, null, 2));
		} else {
			args.push(val);
		}
	} else {
		val = JSON.parse(JSON.stringify(obj));
		if (isUnfoid) {
			args.push(label, JSON.stringify(val, null, 2));
		} else {
			args.push(label, val);
		}
	}

	if (envFlog === "development") {
		const time = new Date();
		const getVal = (val, n = 2, s = "0") => val.toString().padStart(n, s);

		const hh = getVal(time.getHours());
		const mm = getVal(time.getMinutes());
		const ss = getVal(time.getSeconds());

		console.log(`${this.prefix} ${hh}:${mm}:${ss}: `, ...args);
	}
};


/**
 * 格式化对象成字符串形式
 * @param {object} obj 需要格式化的对象
 * @param {number} division 添加几个空格
 * @param {boolean} flag 是否删除首尾的 { }
 * @returns  返回格式化好的字符串
 */
function formatData(obj, division = 2, flag = false) {
	// 格式化
	const text = JSON.stringify(obj, "*", division);
	// 去掉key的""
	const reg = /"(\w+)"(?=:)/gs;
	let code = text.replace(reg, "$1");
	// 去掉前面和后面的 { }
	if (flag) {
		const regMustache = /^{(?<code>.*?)}$/gs;
		code = regMustache.exec(code).groups.code;
		code = code.replaceAll(" ", "").slice(1);
	}
	return code;
}

// 去除 json 数据 key 的双引号 {"name": "张三"} => {name: "张三"}
const dislodgeDouble = (option) => {
	if (!(option instanceof Object)) {
		throw new Error("参数必须是一个对象");
	}
	const doubleSymRE = /"(?<key>.*?)"\s*:\s*(?<value>.*?)(?=,|\n)/gs;
	const text = JSON.stringify(option, null, 2);
	return text.replace(doubleSymRE, (match, key, value) => {
		// 需要保留双引号的 key
		if (key.indexOf("-") !== -1) {
			key = `"${key}"`;
		}
		return `${key}: ${value}`;
	});
};


// 将 xxx_yyy-zzz 转换为 xxxYyyZzz
const camelize = (str: string, symbol: string = "[_|-]"): string => {
  const reg = new RegExp(`${symbol}(\\w)`, "g");
  return str.replace(reg, (_, c) => typeof c === "string" ? c.toUpperCase() : "");
}

// 将 xxxYyyZzz 转换为 xxx_yyy_zzz 或者 xxx-yyy-zzz
const snakeCase = (str: string, symbol: string = "_"): string => {
  const reg = new RegExp(`([A-Z])`, "g");
  return str.replace(reg, (_, c) => typeof c === "string" ? symbol + c.toLowerCase() : "");
}

// 返回字符串首字母大写
const capitalize = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

// canvas 将图片地址转换为 base64
const canvasToBase64 = (imgSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    // 图片跨域问题
    img.setAttribute("crossOrigin", "Anonymous");
    img.src = imgSrc;

    img.onload = e => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } else {
        resolve("没有获取到 canvas 上下文对象");
      }
    };
    img.onerror = e => {
      resolve(e.toString());
    };
  });
};

// fileReader 读取 Blob, 支持类型: ArrayBuffer | Binary | Base64 | Text
const fileReaderFile = (
  file: Blob,
  type: "ArrayBuffer" | "Binary" | "Base64" | "Text" = "Base64"
): Promise<string | ArrayBuffer | void> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      if (fileReader.readyState === FileReader.DONE && fileReader.result) {
        resolve(fileReader.result);
      }
    };
    fileReader.onerror = (e: ProgressEvent<FileReader>) => {
      reject(fileReader.error);
    };
		switch (type) {
      case "ArrayBuffer":
        fileReader.readAsArrayBuffer(file);
        break;
      case "Binary":
        fileReader.readAsBinaryString(file);
        break;
      case "Base64":
        fileReader.readAsDataURL(file);
        break;
      case "Text":
        fileReader.readAsText(file);
        break;
      default:
        console.error("未知的读取类型: ", type);
        break;
    }
  });
};


// 解析文件成 json import * as XLSX from "xlsx";
const parseExcelToJson = (file: Blob) => {
	return new Promise(async (resolve, reject) => {
		// const binaryData = fs.readFileSync(resolve(__dirname, "./code.xlsx"), { encoding: "binary" });
		const binaryData = await fileReaderFile(file, "Binary");
		// 解析成二进制格式数据
		const workbook = XLSX.read(binaryData, { type: "binary" }); 

		const workJson = {};

		const SheetNames = workbook.SheetNames;
		const len = SheetNames.length;

		const workData = {
				json: {}, // json 数据
				workbook, // 工作表
		};

		for (let i = 0; i < len; i++) {
			// 工作表名
			const sheetName = SheetNames[i];
			// 工作表
			const worksheet = workbook.Sheets[sheetName];
			// 转换为 json
			const json = XLSX.utils.sheet_to_json(worksheet); 
			
			(workData.json as any)[sheetName] = json;
		}
		resolve(workData);
	});
};