const process = {
  env: {
    NODE_ENV: "development"
  }
}


// 指定环境下 DevLog 
export default class DevLog {

  prefix: string; 
  value: string; 
  env: string | undefined;
  formatting: string;

  constructor(prefix: string, formatting: string, value: string, env: string | undefined) {
    this.prefix = prefix || "DevLog"; // log 添加前缀
    this.formatting = formatting || "hh:mm:ss"; // 添加打印日期格式
    this.value = value || "development"; // 匹配那个值才打印
    this.env = env || process?.env?.NODE_ENV; // 环境变量
  }

  static getInstance(prefix = "DevLog", formatting = "hh:mm:ss", value = "development", env = process.env.NODE_ENV): DevLog | void {
    if (value === env) {
      return new DevLog(prefix, formatting, value, env);
    }
  }
  static copyObj<T extends Object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
  static stringify(obj: Object, n: number = 2): string {
    return JSON.stringify(obj, null, 2);
  }

  public logBlock(title: string, info: string, type: string = "default") {
    const typeColor: Record<string, string> = {
      "default": "#35495E",
      "primary": "#3488ff",
      "success": "#43B883",
      "warning": "#e6a23c",
      "danger": "#f56c6c"
    };

    console.log(
      `%c${title}%c${info}%c`,
      `background: ${typeColor[type]}; padding: 2px 2px 2px 4px; border-radius: 3px 0 0 3px; color: #fff;`,
      `background: #35495E; padding: 2px 4px 2px 2px; border-radius: 0 3px 3px 0;  color: #fff;`,
      `background: transparent`);
  }

  // 指定环境下log
  public log(label: string | Object, obj: Object | boolean, isUnfoid: boolean | undefined) {
    let val = null;
    const args: any[] = [];

    if (!(label instanceof Object) && !obj) {
      args.push(label);
    } else if (label instanceof Object) {
      val = DevLog.copyObj(label);
      if (obj) {
        args.push(DevLog.stringify(val, 2));
      } else {
        args.push(val);
      }
    } else {
      val = DevLog.copyObj(obj);
      if (isUnfoid) {
        args.push(label, DevLog.stringify(val, 2));
      } else {
        args.push(label, val);
      }
    }

    if (this.value === this.env) {
      const timeStr = this.transformationTime(this.formatting);
      // if (typeof args[0] === "string") {
      //   console.log(`%c${timeStr}`, "background: #42b883;", `%c${args.shift()}`, "background: #3488ff;", ...args);
      // } else {
      //   console.log(`%c${timeStr}`, "background: #42b883;", ...args);
      // }
      console.log(`%c${timeStr}`, "background: #42b883;", ...args);
    }
  }

  // 格式化日期
  public transformationTime(timeStr = "YYYY-MM-DD", time = new Date()) {
    if (Object.prototype.toString.call(time) !== "[object Date]") {
      time = new Date(time);
    }

    const getVal = (val: number, n = 2, s = "0") => val.toString().padStart(n, s);

    const week = ["日", "一", "二", "三", "四", "五", "六"];
    const timeObj: Record<string, string> = {
      "YYYY": time.getFullYear().toString(),
      "MM": getVal(time.getMonth() + 1),
      "DD": getVal(time.getDate()),
      "hh": getVal(time.getHours()),
      "mm": getVal(time.getMinutes()),
      "ss": getVal(time.getSeconds()),
      "SSS": getVal(time.getMilliseconds(), 3),
      "w": week[time.getDay()],
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

    return retStr;
  }
}