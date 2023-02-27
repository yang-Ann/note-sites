import Vue from "vue";

const requireComponent = require.context("../components", true, /\.vue$/);
for (const compUrl of requireComponent.keys()) {
	const defaultComp = requireComponent(compUrl).default;

	let name = defaultComp.name;
	if (!name) {
		const paths = defaultComp.__file.split("/");
		name = paths.pop().replace(/.vue$/, "");
		console.warn(defaultComp, `组件没有正确配置 name属性, 根据文件名自动命名为 -> ${name}`);
	}
	Vue.component(name, defaultComp);
}
