// 连接 params 参数
const joinParams = (obj) => {
	let res = "";
	
	if (obj instanceof Object && Object.keys(obj).length > 0) {
		let first = "?";
		let result = "";
		for (let key in obj) {
			result += `${key}=${obj[key]}&`
		}
		// decodeURIComponent()
		res = first + encodeURIComponent(result.slice(0, -1));
	}
	
	return res;
}

class RouterOperator {

	constructor(platform, maxHistory = 10) {
		this.platform = platform;
		this.maxHistory = maxHistory;
		this.currentRoute = null; // 当前路由
		this.stack = []; // 访问记录

		this.init();
	}

	static instanceof = null; // 保存单例实例
	static PLATFORMENMU = { // 平台类型
		WECHAT: "wechat",
		UNIAPP: "uniapp"
	};
	static isPush = true;
	
	// 单例模式
	static getInstanceof(platform, maxHistory = 10) {
		const operate = RouterOperator.instanceof;
		if (!operate || !(operate instanceof RouterOperator)) {
			RouterOperator.instanceof = new RouterOperator(platform, maxHistory = 10);
		}
		return RouterOperator.instanceof;
	}

	init() {
		this.initCommonApi();
	}

	initCommonApi() {
		const { WECHAT, UNIAPP } = RouterOperator.PLATFORMENMU;

		try {
			switch (this.platform.trim().toLocaleLowerCase()) {
				case WECHAT:
					const { switchTab, reLaunch, redirectTo, navigateTo, navigateBack } = wx;
					this.$originPush = navigateTo;
					this.$originReplace = redirectTo;
					this.$originBack = navigateBack;
					this.$originSwitchTab = switchTab
					this.$originReLaunch = reLaunch;
					break;
				case UNIAPP:
					{
						const { switchTab, reLaunch, redirectTo, navigateTo, navigateBack } = uni;
						this.$originPush = navigateTo;
						this.$originReplace = redirectTo;
						this.$originBack = navigateBack;
						this.$originSwitchTab = switchTab
						this.$originReLaunch = reLaunch;
					}
					break;
				default:
					throw new Error();
					break;
			}

		} catch (e) {
			throw new Error(`不存在 ${this.platform} 平台的API: ${e}`);
		}
	}

	$getCurrentIdx(current, key = "url", array = this.stack) {
		return array.findIndex(e => e[key] === current[key]);
	}
	
	$popIdx(i) {
		if (i > this.stack.length) {
			throw new Error("已超过最大索引");
		}
		return this.stack.splice(i, 1)[0];
	}
	
	// 添加栈数据
	$pushStack(item, flog = false) {
		
		// 不允许重复
		if (flog) {
			const currIdx = this.$getCurrentIdx(item);
			// 已存在, 则更换位置
			if (currIdx !== -1) {
				item = this.$popIdx(currIdx);
			}
		}
		
		// 超过最大长度
		if (this.stack.length >= this.maxHistory && RouterOperator.isPush) {
			this.stack.shift();
		}

		if (RouterOperator.isPush) {
			this.stack.push(item);
		}
	}
	
	// 通用跳转
	$skipRo(methodName, url, params) {
		let toRoute = null;
		if (typeof url === "string") {
			toRoute = {
				url, params, 
				fullUrl: url + joinParams(params),
			};
		} else if(url instanceof Object && url.url)  {
			const { url: strUrl, params, type } = url;
			toRoute = {
				url: strUrl, params, type,
				fullUrl: strUrl + joinParams(params),
			};
		}
		if(!toRoute.params || toRoute.url === toRoute.fullUrl) {
			delete toRoute.params;
			delete toRoute.fullUrl;
		};

		if (!toRoute.type) {
			toRoute.type = methodName.replace("$origin", "");
			toRoute.type  = toRoute.type.charAt(0).toLocaleLowerCase() + toRoute.type.slice(1);
		}
		
		let method = this[methodName];
		if (method) {
			method = this.$originPush;
			console.warn("调用不存在的方法 --> ", methodName);
		}

		const next = () => {
			method({
				url: toRoute.fullUrl || toRoute.url,
				success: (arg) => {
					this.$pushStack({...toRoute, ...arg});
					// 触发 afterEach 事件, 可以在对应的页面监听
					// arg.eventChannel.emit("afterEach", toRoute, this.currentRoute);
					this.afterEach(toRoute, this.currentRoute, arg.eventChannel);
					this.currentRoute = toRoute;
					RouterOperator.isPush = true;
				},
				fail: (err) => {
					if (err.errMsg === "navigateTo:fail can not navigateTo a tabbar page") {
						console.warn("跳转到 tabbar 页面请使用 switchTab ");
					}
					throw new Error(err.errMsg);
				}
			});
			
			// const arg = {};
			// this.$pushStack({...toRoute, ...arg});
			// this.afterEach(toRoute, this.currentRoute, arg.eventChannel);
			// this.currentRoute = toRoute;
			// RouterOperator.isPush = true;
			// console.log("stack", this.stack);
		}
		
		if (this.beforeEach instanceof Object) {
			this.beforeEach(toRoute, this.currentRoute, next);
		} else {
			next();
		}
	}

	// 导航前
	beforeEach(to, form, next) {
		console.log("beforeEach: ", to, form, next);
		next();
	}

	// 导航后
	afterEach(to, form, arg) {
		console.log("afterEach: ", to, form, arg);
	}


	push(url, params) { // navigateTo
		this.$skipRo("$originPush", url, params);
	}

	
	replace(url, params) { // redirectTo reLaunch
		this.stack.pop();
		this.$skipRo("$originReplace", url, params);
	}

	go(num) {
		num = Number(num);
		if (typeof num !== "number") {
			throw new Error("go 的参数是一个 Number, 实际收到为: ", typeof num);
		}
		let toRoute = null;
		const currIdx = this.$getCurrentIdx(this.currentRoute);
		if ((currIdx + num) < this.stack.length - 1) {
			toRoute = this.stack[currIdx + num];
		} else {
			// 最后一个页面
			toRoute = this.stack[this.stack.length - 1];
		}

		toRoute.type = "go";
		RouterOperator.isPush = false;
		this.$skipRo("$originPush", toRoute);
	}
	
	back(num = 1, flog = false) { // navigateBack
		if (typeof num !== "number") {
			throw new Error("back 的参数是一个 Number, 实际收到为: ", typeof num);
		}
		if (num === 0) num = 1;

		let toRoute = null;
		if (num <= this.stack.length) {
			// 不允许重复
			if (flog) {
				while(num--) {
					toRoute = this.stack.pop();
				}				
			} else {
				const currIdx = this.stack.length - num - 1;
				toRoute = this.stack[currIdx];
			}
		} else {
			// 返回第一个页面
			toRoute = this.stack[0];
		}
		toRoute.type = "back";
		RouterOperator.isPush = false;
		this.$skipRo("$originPush", toRoute);
	}

	switchTab(url, params) {
		this.$skipRo("$originSwitchTab", {url, params, type: "switchTab"});
	}

	reLaunch(url, params) {
		this.$skipRo("$originReLaunch", {url, params, type: "reLaunch"});
	}
}

const instance =  new RouterOperator("uniapp", 6);

export default instance;

