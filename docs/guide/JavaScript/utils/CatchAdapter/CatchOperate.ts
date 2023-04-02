import CatchAdapter from "@/utils/catch/CatchAdapter";
import common from "@/config";

// 初始化缓存实例
const catchOperate = new CatchAdapter(common.platform, common.defaultStorageTime);

export default catchOperate;