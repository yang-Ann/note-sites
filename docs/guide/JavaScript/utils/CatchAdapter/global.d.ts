type UserInfoType = {
	avatar: string;
	code: string;
	deptCode: string;
	deptName: string;
	deptParentCodes: string;
	email: string;
	id: string;
	idCard: string;
	mobile: string;
	name: string;
	nickname: string;
	openId: string;
	orgCode: string;
	permissions: string;
	roleCodes: string;
	roleNames: string;
	sex: string;
	status: string;
	subDeptCodes: string | void;
	superAdminFlag: string;
	username: string;
} | null;


// TODO 微信全局变量类型
declare namespace wx {
	function getStorageSync(k: string): any;
	function setStorageSync(k: string, v: string): any;
	function removeStorageSync(key: string): any;
	function clearStorageSync(): any;
	function getStorageInfoSync(): any;
}
