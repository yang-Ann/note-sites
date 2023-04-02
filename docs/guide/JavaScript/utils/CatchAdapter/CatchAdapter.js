var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
			function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
			function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
			step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
// 判断数据类型
const getDateType = (val) => {
	return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};
// uniapp 保留key
const uniExcludeKey = ["uni-", "uni_", "dcloud-", "dcloud_"];
const checkUniKey = (key) => {
	let ret = true;
	for (const item of uniExcludeKey) {
			if (key.startsWith(item)) {
					ret = false;
					break;
			}
	}
	return ret;
};
// 通用缓存数据操作, 支持 web | wechat | uniapp, 带缓存超时, 支持回调 和 Promise 两种使用方式
class CatchAdapter {
	constructor(platform, // 使用平台
	cacheTime, // 默认的数据缓存时长(事件戳或日期对象)
	timingClear = false) {
			this.platform = platform;
			this.cacheTime = cacheTime;
			this.timingClear = timingClear;
			this.cacheKey = "__CATCH_KEY"; // 缓存数据的时间key
			this.overtimeKey = "__OVERTIME_KEY"; // 数据超时的key
			this.timer = null; // 定时器
			this.init();
	}
	// 单例模式
	static getInstanceof(platform, catchTime, timingClear = false) {
			const operate = CatchAdapter.instanceof;
			if (!operate) {
					CatchAdapter.instanceof = new CatchAdapter(platform, catchTime, timingClear);
			}
			return CatchAdapter.instanceof;
	}
	init() {
			this.initCommonApi();
			this.initOther();
	}
	// 初始化api
	initCommonApi() {
			try {
					switch (this.platform) {
							case "web":
									// localStorage 的方法不能使用解构, 也不能直接赋值函数的引用
									// const { getItem, setItem, removeItem, clear } = window.localStorage;
									this.$getStorageInfo = () => {
											return {
													keys: Object.keys(window.localStorage),
													currentSize: window.localStorage.length,
													limitSize: 0, // web无法获取大小
											};
									};
									this.$getStorage = (key) => window.localStorage.getItem(key);
									this.$setStorage = (key, value) => window.localStorage.setItem(key, value);
									this.$removeStorage = (key) => window.localStorage.removeItem(key);
									this.$clearStorage = () => window.localStorage.clear();
									break;
							case "wechat":
									// TODO wx的全局变量类型声明, 可见 src/typings/global.d.ts
									// eslint-disable-next-line no-case-declarations
									const { getStorageSync, setStorageSync, removeStorageSync, clearStorageSync } = wx;
									this.$getStorageInfo = wx.getStorageInfoSync;
									this.$getStorage = getStorageSync;
									this.$setStorage = setStorageSync;
									this.$removeStorage = removeStorageSync;
									this.$clearStorage = clearStorageSync;
									break;
							case "uniapp":
									{
											const { getStorageSync, setStorageSync, removeStorageSync, clearStorageSync } = uni;
											this.$getStorageInfo = uni.getStorageInfoSync;
											this.$getStorage = getStorageSync;
											this.$setStorage = setStorageSync;
											this.$removeStorage = removeStorageSync;
											this.$clearStorage = clearStorageSync;
									}
									break;
							default:
									throw new Error();
					}
			}
			catch (e) {
					throw new Error(`不存在 ${this.platform} 平台的API: ${e}`);
			}
	}
	// 初始化其他
	initOther() {
			const type = getDateType(this.cacheTime);
			if (type === "date") {
					this.cacheTime = new Date(this.cacheTime).getTime();
			}
			else if (type !== "number") {
					throw new Error("日期参数非法, 期望 Date | Number, 实际为 -> " + type);
			}
			// 定时清理缓存的数据
			if (this.timingClear && typeof this.cacheTime === "number") {
					this.clearInterval();
					this.timer = setInterval(() => {
							this.clearOvertimeData();
					}, this.cacheTime);
			}
	}
	// 触发回调
	callFn(fn, ...args) {
			const next = args.pop();
			if (typeof fn === "function") {
					fn(...args);
			}
			else if (typeof next === "function") {
					// 触发 promise
					next();
			}
	}
	// 获取缓存数据
	getStorage(key, callback) {
			return new Promise((resolve, reject) => {
					if (getDateType(key) === "object") {
							console.warn("getStorage(key) 的key是一个引用数据类型, 可能会获得错误的结果 -> ", key);
					}
					try {
							let res = this.$getStorage(key);
							if (!res) {
									const error = {
											flog: CatchAdapter.VOID,
											msg: "获取不存在数据: " + key
									};
									// 带回调触发回调(不然就触发 promise)
									const next = () => reject(error);
									this.callFn(callback, error, null, next);
									return;
							}
							// 进行 JSON 转换, 不需要处理错误
							try {
									res = JSON.parse(res);
							}
							catch (error) {
									console.warn("json转换失败了: ", error);
							}
							// 缓存超时
							if (res && (Date.now() > res[this.overtimeKey])) {
									this.removeStorage(key);
									res = null;
									const error = {
											flog: CatchAdapter.OVERTIME,
											msg: "缓存超时: " + key
									};
									this.callFn(callback, error, null, () => reject(error));
							}
							else {
									if (res.value)
											res = res.value;
							}
							this.callFn(callback, null, res, () => resolve(res));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			});
	}
	// 设置缓存数据(支持自定义存储时长)
	setStorage(key, value, cacheTime = this.cacheTime, callback) {
			if (getDateType(key) === "object") {
					console.warn("setStorage(key, value, timer[, callback]) 的key是一个引用数据类型, 可能会获得错误的结果 -> ", key);
			}
			if (getDateType(cacheTime) === "date") {
					cacheTime = new Date(cacheTime).getTime();
			}
			else if (typeof cacheTime === "number") {
					cacheTime = Date.now() + cacheTime;
			}
			else if (typeof cacheTime !== "function") {
					console.warn("setStorage(key, value, timer[, callback]) 的 timer 期望是一个 Number 或 Date, 实际为 -> ", getDateType(cacheTime));
			}
			if (this.platform === "uniapp") {
					if (!checkUniKey(key)) {
							console.warn(`${uniExcludeKey.join(", ")}, 为前缀的key, 为 uniapp 的系统保留关键前缀, 请避免使用`);
					}
			}
			return new Promise((resolve, reject) => {
					try {
							// 存储的数据
							const obj = {
									value,
									[this.cacheKey]: Date.now(),
									[this.overtimeKey]: cacheTime,
							};
							const res = this.$setStorage(key, JSON.stringify(obj));
							this.callFn(callback, null, res, () => resolve(res));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			});
	}
	// 删除缓存数据
	removeStorage(key, callback) {
			return new Promise((resolve, reject) => {
					try {
							const res = this.$removeStorage(key);
							this.callFn(callback, null, res, () => resolve(res));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			});
	}
	// 清空所有的数据
	clearStorage(callback) {
			return new Promise((resolve, reject) => {
					try {
							const res = this.$clearStorage();
							this.callFn(callback, null, res, () => resolve(res));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			});
	}
	// 清空缓存的数据
	clearDateStorage(callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
					try {
							const catchKeys = yield this.getCatchDataKey();
							for (const key of catchKeys) {
									this.removeStorageSync(key);
							}
							this.callFn(callback, null, null, () => resolve({ success: true }));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			}));
	}
	// 获取缓存的信息
	getStorageInfo(callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
					try {
							const storage = yield this.$getStorageInfo();
							const result = Object.create(null);
							result.cache = [], // 缓存数据
									result.origin = []; // 不是缓存的数据
							for (let i = 0; i < storage.keys.length; i++) {
									const key = storage.keys[i];
									let value = this.$getStorage(key);
									// JSON 化一下
									try {
											value = JSON.parse(value);
									}
									catch (error) {
											console.log("json转换失败了: ", error);
									}
									if (value[this.cacheKey] && value[this.overtimeKey]) {
											// 使用缓存的数据
											result.cache.push({ key, value });
									}
									else {
											result.origin.push({ key, value });
									}
							}
							this.callFn(callback, null, result, () => resolve(result));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			}));
	}
	// 获取所有缓存数据的key
	getCatchDataKey(callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
					try {
							const catchData = yield this.getStorageInfo();
							const result = catchData.cache.map(e => e.key);
							this.callFn(callback, null, result, () => resolve(result));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			}));
	}
	// 清除超时的缓存
	clearOvertimeData(callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
					try {
							const storage = yield this.getStorageInfo();
							const catchData = storage.cache;
							for (let i = 0; i < catchData.length; i++) {
									const { key, value } = catchData[i];
									if (key && Date.now() >= value[this.overtimeKey]) {
											console.log("清理已超时的缓存数据 --> : ", key);
											yield this.$removeStorage(key);
									}
							}
							this.callFn(callback, null, null, () => resolve({ success: true }));
					}
					catch (err) {
							this.callFn(callback, err, null, () => reject(err));
					}
			}));
	}
	// 清除定时器
	clearInterval() {
			if (this.timer)
					clearInterval(this.timer);
			this.timer = null;
	}
	// 设置超时时间
	setCacheTime(time) {
			this.cacheTime = time;
			// 校验参数
			this.initOther();
	}
	// 设置定时清理
	setTimingClear(timingClear) {
			this.timingClear = timingClear;
			this.initOther();
	}
	//////////////// 提供同步方法
	getStorageSync(key) {
			return this.$getStorage(key);
	}
	setStorageSync(key, value) {
			if (this.platform === "uniapp") {
					if (!checkUniKey(key)) {
							console.warn(`${uniExcludeKey.join(", ")}, 为前缀的key, 为 uniapp 的系统保留关键前缀, 请避免使用`);
					}
			}
			return this.$setStorage(key, value);
	}
	removeStorageSync(key) {
			return this.$removeStorage(key);
	}
	clearStorageSync() {
			return this.$clearStorage();
	}
}
CatchAdapter.OVERTIME = "overtime"; // 获取的数据超时
CatchAdapter.VOID = "void"; // 获取的数据不存在
CatchAdapter.instanceof = null; // 保存单例实例
export default CatchAdapter;
