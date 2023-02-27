// 通用缓存数据操作, 支持 web | wechat | uniapp

// 空函数
const noop = () => {};

// 判断数据类型
const getDateType = (val) => {
	return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

// uniapp 保留key
const uniExcludeKey = ["uni-", "uni_", "dcloud-", "dcloud_"];
const checkUniKey = (key) => {
	let ret = true;
	for (let item of uniExcludeKey) {
		if (key.startsWith(item)) {
			ret = false;
			break;
		}
	}
	return ret;
};

class CatchAdapter {
	#getStorage = noop;
	#setStorage = noop;
	#removeStorage = noop;
	#clearStorage = noop;
	#getStorageInfo = noop;

	constructor(platform, time, timingClear = false) {
		this.platform = platform; // (使用平台) web | wechat | uniapp
		this.cacheTime = time; // 默认的数据缓存时长(事件戳或日期对象)
		this.timingClear = timingClear; // 是否定时清理缓存数据
		this.timer = null; // 定时器

		this.init();
	}

	static OVERTIME = "overtime"; // 获取的数据超时
	static VOID = "void"; // 获取的数据不存在
	static instanceof = null; // 保存单例实例
	static PLATFORMENMU = {
		// 平台类型
		WEB: "web",
		WECHAT: "wechat",
		UNIAPP: "uniapp",
	};
	static CACHEKEY = "__CATCH_TIME"; // 缓存数据的时间key
	static OVERTIMEKEY = "__OVERTIME_TIME"; // 数据超时的key
	static ISOVERTIMEKEY = "__IS_OVER_TIME"; // 数据超时标识

	// 单例模式
	static getInstanceof(platform, time, timingClear = false) {
		const operate = CatchAdapter.instanceof;
		if (!operate || !(operate instanceof CatchAdapter)) {
			CatchAdapter.instanceof = new CatchAdapter(platform, time, timingClear);
		}
		return CatchAdapter.instanceof;
	}

	init() {
		this.initCommonApi();
		this.initOther();
	}

	// 初始化api
	initCommonApi() {
		const { WEB, WECHAT, UNIAPP } = CatchAdapter.PLATFORMENMU;
		try {
			switch (this.platform.trim().toLocaleLowerCase()) {
				case WEB:
					// localStorage 的方法不能使用解构, 也不能直接赋值函数的引用
					// const { getItem, setItem, removeItem, clear } = window.localStorage;
					this.#getStorageInfo = () => {
						return {
							keys: Object.keys(window.localStorage),
							currentSize: window.localStorage.length,
							limitSize: 0, // web无法获取大小
						};
					};
					this.#getStorage = (key) => window.localStorage.getItem(key);
					this.#setStorage = (key, value) =>
						window.localStorage.setItem(key, value);
					this.#removeStorage = (key) => window.localStorage.removeItem(key);
					this.#clearStorage = () => window.localStorage.clear();
					break;

				case WECHAT:
					const {
						getStorageSync,
						setStorageSync,
						removeStorageSync,
						clearStorageSync,
					} = wx;
					this.#getStorageInfo = wx.getStorageInfoSync;
					this.#getStorage = getStorageSync;
					this.#setStorage = setStorageSync;
					this.#removeStorage = removeStorageSync;
					this.#clearStorage = clearStorageSync;
					break;

				case UNIAPP:
					{
						const {
							getStorageSync,
							setStorageSync,
							removeStorageSync,
							clearStorageSync,
						} = uni;
						this.#getStorageInfo = uni.getStorageInfoSync;
						this.#getStorage = getStorageSync;
						this.#setStorage = setStorageSync;
						this.#removeStorage = removeStorageSync;
						this.#clearStorage = clearStorageSync;
					}
					break;
				default:
					throw new Error();
					break;
			}
		} catch (e) {
			throw new Error(`不存在 #{this.platform} 平台的API: #{e}`);
		}
	}

	// 初始化其他
	initOther() {
		const type = getDateType(this.cacheTime);
		if (type === "date") {
			this.cacheTime = new Date(this.cacheTime).getTime();
		} else if (type !== "number") {
			throw new Error("日期参数非法, 期望 Date Number, 实际为 -> " + type);
		}

		// 定时清理缓存的数据
		if (this.timingClear) {
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
		} else if (typeof next === "function") {
			// 触发 promise
			next();
		}
	}

	// 获取缓存数据
	getStorage(key, callback) {
		return new Promise((resolve, reject) => {
			if (getDateType(key) === "object") {
				console.warn(
					"getStorage(key) 的key是一个引用数据类型, 可能会获得错误的结果 -> ",
					key
				);
			}

			try {
				let res = this.#getStorage(key);
				if (!res) {
					const error = {
						flog: CatchAdapter.VOID,
						msg: "获取不存在数据: " + key,
					};
					// 带回调触发回调(不然就触发 promise)
					const next = () => reject(error);
					this.callFn(callback, error, null, next);
					return;
				}

				// 进行 JSON 转换, 不需要处理错误
				try {
					res = JSON.parse(res);
				} catch (error) {}

				// 缓存超时
				const { OVERTIMEKEY, OVERTIME } = CatchAdapter;
				if (res && Date.now() > res[OVERTIMEKEY]) {
					this.removeStorage(key);
					res = null;
					const error = {
						flog: OVERTIME,
						msg: "缓存超时: " + key,
					};
					this.callFn(callback, error, null, () => reject(error));
				} else {
					if (res.value) res = res.value;
				}
				this.callFn(callback, null, res, () => resolve(res));
			} catch (err) {
				this.callFn(callback, error, null, () => reject(err));
			}
		});
	}

	// 设置缓存数据(支持自定义存储时长)
	setStorage(key, value, cacheTime = this.cacheTime, callback) {
		if (getDateType(key) === "object") {
			console.warn(
				"setStorage(key, value, timer[, callback]) 的key是一个引用数据类型, 可能会获得错误的结果 -> ",
				key
			);
		}

		if (getDateType(cacheTime) === "date") {
			cacheTime = new Date(cacheTime).getTime();
		} else if (getDateType(cacheTime) === "number") {
			cacheTime = Date.now() + cacheTime;
		} else if (typeof cacheTime !== "function") {
			console.warn(
				"setStorage(key, value, timer[, callback]) 的 timer 期望是一个 Number 或 Date, 实际为 -> ",
				getDateType(cacheTime)
			);
		}

		if (this.platform === CatchAdapter.PLATFORMENMU.UNIAPP) {
			if (!checkUniKey(key)) {
				console.warn(
					`${uniExcludeKey.join(
						", "
					)}, 为前缀的key, 为 uniapp 的系统保留关键前缀, 请避免使用`
				);
			}
		}

		return new Promise((resolve, reject) => {
			try {
				const { CACHEKEY, OVERTIMEKEY } = CatchAdapter;
				// 存储的数据
				const obj = {
					value,
					[CACHEKEY]: Date.now(),
					[OVERTIMEKEY]: cacheTime,
				};
				const res = this.#setStorage(key, JSON.stringify(obj));
				this.callFn(callback, null, res, () => resolve(res));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}
	// 删除缓存数据
	removeStorage(key, callback) {
		return new Promise((resolve, reject) => {
			try {
				const res = this.#removeStorage(key);
				this.callFn(callback, null, res, () => resolve(res));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}
	// 清空所有的数据
	clearStorage(callback) {
		return new Promise((resolve, reject) => {
			try {
				const res = this.#clearStorage();
				this.callFn(callback, null, res, () => resolve(res));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}

	// 清空缓存的数据
	clearDateStorage(callback) {
		return new Promise(async (resolve, reject) => {
			try {
				const catchKeys = await this.getCatchDataKey();
				for (let key of catchKeys) {
					this.removeStorageSync(key);
				}
				this.callFn(callback, null, null, () => resolve(res));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}

	// 获取缓存的信息
	getStorageInfo(callback) {
		return new Promise(async (resolve, reject) => {
			try {
				const storage = await this.#getStorageInfo();

				const result = Object.create(null);
				(result.cache = []), // 缓存数据
					(result.origin = []); // 不是缓存的数据

				for (let i = 0; i < storage.keys.length; i++) {
					const key = storage.keys[i];
					let value = this.#getStorage(key);
					// JSON 化一下
					try {
						value = JSON.parse(value);
					} catch (error) {}

					const { CACHEKEY, OVERTIMEKEY, ISOVERTIMEKEY } = CatchAdapter;
					if (value && value[CACHEKEY] && value[OVERTIMEKEY]) {
						value[ISOVERTIMEKEY] = Date.now() > value[OVERTIMEKEY]; // 是否超时
						// 使用缓存的数据
						result.cache.push({ key, value });
					} else {
						result.origin.push({ key, value });
					}
				}
				this.callFn(callback, null, result, () => resolve(result));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}
	// 获取所有缓存数据的key
	getCatchDataKey(callback) {
		return new Promise(async (resolve, reject) => {
			try {
				const catchData = await this.getStorageInfo();
				const result = catchData.cache.map((e) => e.key);
				this.callFn(callback, null, result, () => resolve(result));
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}
	// 清除超时的缓存
	clearOvertimeData(callback) {
		return new Promise(async (resolve, reject) => {
			try {
				const storage = await this.getStorageInfo();
				const catchData = storage.cache;
				for (let i = 0; i < catchData.length; i++) {
					const { key, value } = catchData[i];
					if (key && value[CatchAdapter.ISOVERTIMEKEY]) {
						console.log("清理已超时的缓存数据 --> : ", key);
						await this.#removeStorage(key);
					}
				}
				this.callFn(callback, null, null, () => resolve());
			} catch (err) {
				this.callFn(callback, err, null, () => reject(err));
			}
		});
	}
	// 清除定时器
	clearInterval() {
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
		return this.#getStorage(key);
	}
	setStorageSync(key, value) {
		if (this.platform === CatchAdapter.PLATFORMENMU.UNIAPP) {
			if (!checkUniKey(key)) {
				console.warn(
					`${uniExcludeKey.join(
						", "
					)}, 为前缀的key, 为 uniapp 的系统保留关键前缀, 请避免使用`
				);
			}
		}
		return this.#setStorage(key, value);
	}
	removeStorageSync(key) {
		return this.#removeStorage(key);
	}
	clearStorageSync() {
		return this.#clearStorage();
	}
}

export default CatchAdapter;
