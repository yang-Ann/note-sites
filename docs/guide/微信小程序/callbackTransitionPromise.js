// uniapp 相关 api Promise 化

// 需要封装的api(仅支持带回调的)
const callbackMethods = [
	"showToast",
	"chooseImage",
	...["login", "checkSession"],
	...["getLocation", "getUserProfile", "getNetworkType"],
	...["showLoading", "hideLoading"],
	...["navigateTo", "switchTab"],
	"setNavigationBarTitle",
	"request"
];

const uniAdapter = Object.create(null);
const noop = () => { };

const callFn = (fn, ...e) => {
	if (typeof fn === "function") {
		fn(...e);
	}
}

for (let i = 0; i < callbackMethods.length; i++) {
	const method = callbackMethods[i];

	uniAdapter[method] = (option) => {
		option || (option = {});
		// 保存相关回调
		const complete = option.complete || noop;
		const success = option.success || noop;
		const fail = option.fail || noop;
		// 完成回调置空(因为回调顺序和 Promise 执行顺序不对)
		option.complete = noop;

		return new Promise((resolve, reject) => {
			// 调用 uni 的api
			uni[method]({
				...option,
				success(...args) {
					resolve(...args);
					callFn(success, ...args);
					// 手动调用完成的回调(这里要异步)
					setTimeout(() => {
						callFn(complete, ...args)
					}, 14);
				},
				fail(...args) {
					reject(...args);
					callFn(fail, ...args);
					// 手动调用完成的回调(这里要异步)
					setTimeout(() => {
						callFn(complete, ...args)
					}, 14);
				},
			});
		});
	}
}


export default uniAdapter;
