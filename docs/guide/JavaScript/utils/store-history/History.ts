// 一个简单的 LFU (最近最少使用)
export default class History {
  maxDisplay: number; // 最大缓存长度
  keyField: string; // 主键字段
  stack: historyType[]; // 栈

  constructor(maxDisplay: number, keyField: string) {
    this.maxDisplay = maxDisplay;
    this.keyField = keyField;
    this.stack = [];
  }

  add(item: any) {
    const idx = this.stack.findIndex(e => e[this.keyField as keyof historyType] === item[this.keyField]);
    if (idx !== -1) {
      // 已存在, 弹出并替换
      item = this.stack.splice(idx, 1)[0];
    } else {
      // 弹出第一个(最久没有访问)
      if (this.isMaxDisplay()) {
        this.stack.pop();
      }
    }
    this.stack.unshift(item);
  }

  isMaxDisplay() {
    return this.stack.length >= this.maxDisplay;
  }

  getHistory() {
    return this.stack;
  }
  setHistory(list: historyType[]) {
    this.stack = list;
  }
  getLen() {
    return this.stack.length;
  }
  setMaxDisplay(max: number) {
    this.maxDisplay = max;
  }
}
