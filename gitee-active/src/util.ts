import fs from "node:fs";
import loggerConfig from "./config/logger.js";

const { operPath } = loggerConfig;

// 获取指定的日期格式
const transformationTime = (timeStr = "yyyy-MM-dd", time = new Date()) => {
  const arr = [undefined, "日", "一", "二", "三", "四", "五", "六"];
  const timeObj: timeObjType = {
    yyyy: time.getFullYear().toString(),
    MM: getVal(time.getMonth() + 1),
    dd: getVal(time.getDate()),
    hh: getVal(time.getHours()),
    mm: getVal(time.getMinutes()),
    ss: getVal(time.getSeconds()),
    SSS: getVal(time.getMilliseconds(), 3), // 毫秒
    DDD: arr[time.getDay() + 1] // 星期
  };

  let retStr = timeStr.slice();
  for (const key in timeObj) {
    if (Object.hasOwnProperty.call(timeObj, key)) {
      const val = timeObj[<keyof timeObjType>key];
      if (retStr.indexOf(key) !== -1) {
        if (val) {
          retStr = retStr.replace(key, val);
        }
      }
    }
  }

  function getVal(val: string | number, n = 2, s = "0"): string {
    return val.toString().padStart(n, s);
  }

  return retStr;
};

// 操作步骤写入
const writeOperInfo = (msg: string, isLog = true): void => {
  const d = transformationTime("yyyy-MM-dd hh:mm:ss");
  const logText = `${d} ${msg}\n`;
  if (!fs.existsSync(operPath)) fs.writeFileSync(operPath, "");
  fs.appendFile(operPath, logText, (err: NodeJS.ErrnoException | null) => {
    if (err) console.error("文件写入失败");
  });
  if (isLog) console.log(logText);
};

export { transformationTime, writeOperInfo };