export default class DrapOperate {
    container;
    rowCopie;
    columnCopie;
    margin;
    averageWidthOffset;
    averageHeightOffset;
    containerClientWidth;
    containerClientHeight;
    averageWidth;
    averageHeight;
    constructor(options) {
        this.container = options.container;
        this.rowCopie = options.rowCopie;
        this.columnCopie = options.columnCopie;
        this.margin = options.margin;
        this.averageWidthOffset = options.averageWidthOffset;
        this.averageHeightOffset = options.averageHeightOffset;
        this.containerClientWidth = 0; // 容器可视宽度
        this.containerClientHeight = 0; // 容器可视高度
        this.averageWidth = 0; // 一份行的宽度
        this.averageHeight = 0; // 一份列的宽度
        this.init();
    }
    // 计算布局数据
    init() {
        const clientWidth = this.container.clientWidth;
        const clientHeight = this.container.clientHeight;
        this.containerClientWidth = clientWidth;
        this.containerClientHeight = clientHeight;
        this.averageWidth = clientWidth / this.rowCopie + this.getAverageWidthOffset(); // 行偏移值
        this.averageHeight = clientHeight / this.columnCopie + this.getAverageHeightOffset(); // 列偏移值
        // window.addEventListener("resize", this.init);
        // window.removeEventListener("resize", this.init);
    }
    getAverageWidthOffset() {
        return this.averageWidthOffset || 0;
    }
    getAverageHeightOffset() {
        return this.averageHeightOffset || 0;
    }
    getMargin() {
        return this.margin || 0;
    }
    // 获取指定份的行宽
    getRowNum(n) {
        if (n > this.rowCopie) {
            n = this.rowCopie;
        }
        return n * this.averageWidth - this.getMargin() * 2;
    }
    // 获取行的偏移值
    getLeftOffset(left, n) {
        let result = 0;
        if (n !== 0) { // 不是第一个位置
            result =
                left + // 本身的 left
                    this.getRowNum(n) + // 第几个的行偏移
                    (this.getMargin() * 2); // 加上外边距
        }
        return result;
    }
    // 获取指定份的列宽
    getColumnNum(n) {
        if (n > this.columnCopie) {
            n = this.columnCopie;
        }
        return n * this.averageHeight - this.getMargin() * 2;
    }
    // 获取列的偏移值
    getTopOffset(top, n) {
        let result = 0;
        if (n !== 0) { // 不是第一行
            result =
                top + // 本身的 top
                    this.getColumnNum(n) + // 第几列的列偏移
                    (this.getMargin() * 2); // 加上外边距
        }
        return result;
    }
    /** 拖拽移动
     * @param event mousedown 事件的事件对象
     *
     * @param wrapEl 需要移动的容器DOM, 会判断移动位置是否合法
     *  (在 container 之内) 不合法则会恢复到移动前的位置
     *
     * @param elList 其他的容器DOM
     *  拖拽时会和这个列表中的DOM比较是否重叠, 重叠则会恢复到移动前的位置
     *
     * @param setPreviewEl 用于设置预览DOM的样式
     */
    handleMousedown(event, wrapEl, elList, setPreviewEl) {
        // 容器偏移量
        const ol = event.clientX - wrapEl.offsetLeft;
        const ot = event.clientY - wrapEl.offsetTop;
        // 当前的位置(用于复原位置)
        const oldLeft = event.clientX - ol - this.getMargin() + "px";
        const oldTop = event.clientY - ot - this.getMargin() + "px";
        // 保留原先的 transition
        const originTransition = this.getCssStyle(wrapEl, "transition", "all 0.3s ease 0s");
        // 置空
        wrapEl.style.transition = "none";
        // 将鼠标位置边界判断, 位置判断逻辑单独抽离出来
        // onmousemove 和 onmouseup 事件都需要使用
        const handleMouseup = (event) => {
            // 鼠标松开的坐标
            let left = event.clientX - ol;
            let top = event.clientY - ot;
            // 边界判断
            left = this.leftBorderJudgment(left, wrapEl);
            top = this.topBorderJudgment(top, wrapEl);
            // 判断位置是否重叠
            if (elList && elList.length) {
                const isOverlap = this.isDomOverlapList(wrapEl, elList);
                if (isOverlap) {
                    // 位置复原
                    return {
                        left: oldLeft,
                        top: oldTop
                    };
                }
            }
            return {
                // 解析等份位置
                left: this.parserX(left) + "px",
                top: this.parserY(top) + "px"
            };
        };
        // 保存原先的事件处理句柄
        const originMousemoveHandle = document.onmousemove || function (e) { };
        const originMouseupHandle = document.onmouseup || function (e) { };
        let previewEl = null, // 预览的DOM
        previewElOldLeft = "-1px", // 上一次预览DOM的 left
        previewElOldTop = "-1px"; // 上一次预览DOM top
        // 鼠标移动
        document.onmousemove = (ev) => {
            // 执行原先的事件处理函数
            originMousemoveHandle.call(document, ev);
            // 鼠标移动的坐标
            let moveLeft = ev.clientX - ol;
            let moveTop = ev.clientY - ot;
            // 边界判断
            moveLeft = this.leftBorderJudgment(moveLeft, wrapEl);
            moveTop = this.topBorderJudgment(moveTop, wrapEl);
            // 修改容器位置(避免多次重排)
            wrapEl.style.cssText += `; left: ${moveLeft}px; top: ${moveTop}px;`;
            // 这里获取 onmousemove 的位置信息(生成预览 DOM 并设置位置)
            const { left, top } = handleMouseup(ev);
            if (previewElOldLeft !== left || previewElOldTop !== top) { // 和上一次相同位置则不渲染预览DOM提升性能
                if (previewEl) {
                    this.container.removeChild(previewEl);
                }
                previewEl = wrapEl.cloneNode(true);
                previewEl.style.left = previewElOldLeft = left;
                previewEl.style.top = previewElOldTop = top;
                // 从外面设置预览DOM属性
                if (typeof setPreviewEl === "function") {
                    previewEl = setPreviewEl(previewEl);
                }
                else {
                    previewEl.style.opacity = "0.2"; // 预览DOM默认样式
                }
                this.container.appendChild(previewEl);
            }
        };
        // 鼠标松开
        document.onmouseup = (e) => {
            // 执行原先的事件处理函数
            originMouseupHandle.call(document, e);
            // 清除预览 dom
            if (previewEl) {
                this.container.removeChild(previewEl);
                previewEl = null;
            }
            // 复原事件
            document.onmousemove = originMousemoveHandle;
            document.onmouseup = originMouseupHandle;
            // 复原 transition
            wrapEl.style.transition = originTransition;
            // 这里获取 onmouseup 的位置信息赋值
            const { left, top } = handleMouseup(e);
            wrapEl.style.cssText += `; left: ${left}; top: ${top};`;
        };
        // 取消拖拽默认行为
        document.addEventListener("dragstart", (e) => {
            e.preventDefault();
        });
    }
    /** 拖拽放大
     * @param event mousedown 事件的事件对象
     *
     * @param wrapEl 需要拖拽的容器DOM, 会判断放大时的位置是否合法, 在 container 之内
     *
     * @param elList 其他的容器DOM
     *  拖拽时会和这个列表中的DOM比较是否重叠, 重叠则会恢复到缩放前的位置
     */
    handleZoomMouseDown(event, wrapEl, elList) {
        const margin = this.getMargin();
        const disX = event.clientX, // 按下时光标x的值
        disY = event.clientY, // 按下时光标Y的值
        oldWidth = wrapEl.offsetWidth, // 拖拽前容器的宽
        oldHeight = wrapEl.offsetHeight; // 拖拽前容器的高
        // 保留原先的 transition
        const originTransition = this.getCssStyle(wrapEl, "transition", "all 0.3s ease 0s");
        // 置空
        wrapEl.style.transition = "none";
        // 保存原先的事件处理句柄
        const originMousemoveHandle = document.onmousemove || function (e) { };
        const originMouseupHandle = document.onmouseup || function (e) { };
        document.onmousemove = (ev) => {
            // 执行原先的事件处理函数
            originMousemoveHandle.call(document, ev);
            // 拖拽宽和高
            let moveWidth = ev.clientX - disX + oldWidth;
            let moveHeight = ev.clientY - disY + oldHeight;
            // 边界判断
            moveWidth = this.zoomWidthBorderJudgment(moveWidth, wrapEl);
            moveHeight = this.zoomHeightBorderJudgment(moveHeight, wrapEl);
            // 拖拽后的宽高(避免多次重排)
            wrapEl.style.cssText += `; width: ${moveWidth - (margin * 2)}px;
																height: ${moveHeight - (margin * 2)}px;`;
        };
        document.onmouseup = (e) => {
            // 执行原先的事件处理函数
            originMouseupHandle.call(document, e);
            // 复原事件
            document.onmousemove = originMousemoveHandle;
            document.onmouseup = originMouseupHandle;
            // 复原 transition
            wrapEl.style.transition = originTransition;
            // 释放时的宽和高
            let upWidth = e.clientX - disX + oldWidth;
            let upHeight = e.clientY - disY + oldHeight;
            upWidth = this.parserX(upWidth);
            upHeight = this.parserY(upHeight);
            // 判断位置是否重叠
            if (elList && elList.length) {
                const isOverlap = this.isDomOverlapList(wrapEl, elList);
                if (isOverlap) {
                    // 位置复原
                    wrapEl.style.cssText += `; width: ${oldWidth}px; height: ${oldHeight}px;`;
                    return;
                }
            }
            // 边界判断
            upWidth = this.zoomWidthBorderJudgment(upWidth, wrapEl);
            upHeight = this.zoomHeightBorderJudgment(upHeight, wrapEl);
            // 实际大小(减去两边的外边距)
            wrapEl.style.cssText += `; width: ${upWidth - margin * 2}px;
																height: ${upHeight - margin * 2}px;`;
        };
    }
    // 获取 css 并设置 css 样式
    getCssStyle(dom, property, defaultValue) {
        const cssDescript = window.getComputedStyle(dom);
        return cssDescript.getPropertyValue(property) || defaultValue;
    }
    // 移动的位置是否合法(在父容器之内)
    validPosttion(wrap, dom) {
        const wrapRect = this.getRectInfo(wrap);
        const domRect = this.getRectInfo(dom);
        let ret = true;
        if (domRect.x < 0 || // 左边位置非法
            domRect.x + domRect.width > wrapRect.x + wrapRect.width || // 右边位置非法
            domRect.y < 0 || // 上边位置非法
            domRect.y + domRect.height > wrapRect.y + wrapRect.height // 下边位置非法
        ) {
            ret = false;
        }
        return ret;
    }
    // left 移动位置的边界判断
    leftBorderJudgment(left, wrapEl) {
        const margin = this.getMargin();
        const rect = this.getRectInfo(wrapEl);
        let ret = left;
        // left 原点
        if (left < 0)
            ret = 0;
        // left 超标
        if (left + rect.width > this.containerClientWidth - (margin * this.rowCopie) + this.getAverageWidthOffset()) {
            ret = this.containerClientWidth - rect.width - (margin * this.rowCopie) + this.getAverageWidthOffset();
        }
        return ret;
    }
    // top 移动位置的边界判断
    topBorderJudgment(top, wrapEl) {
        const margin = this.getMargin();
        const rect = this.getRectInfo(wrapEl);
        let ret = top;
        // top 原点
        if (top < 0)
            ret = 0;
        // top 超标
        if (top + rect.height > this.containerClientHeight - (margin * this.columnCopie) - this.getAverageHeightOffset()) {
            ret = this.containerClientHeight - rect.height - (margin * this.columnCopie) - this.getAverageHeightOffset();
        }
        return ret;
    }
    // 缩放宽度边界判断
    zoomWidthBorderJudgment(width, wrapEl) {
        const { averageWidth, containerClientWidth } = this;
        const margin = this.getMargin();
        const rect = this.getRectInfo(wrapEl);
        let ret = width;
        // 最小占一份
        if (width < averageWidth)
            ret = averageWidth;
        // 宽度超标
        if (width + rect.x > containerClientWidth - margin * 2) {
            // 有偏移则需要加上
            if (this.averageWidthOffset) {
                ret = containerClientWidth - rect.x - margin * 2;
            }
            else {
                ret = containerClientWidth - rect.x;
            }
        }
        return ret;
    }
    // 缩放宽度边界判断
    zoomHeightBorderJudgment(height, wrapEl) {
        const { averageHeight, containerClientHeight } = this;
        const margin = this.getMargin();
        const rect = this.getRectInfo(wrapEl);
        let ret = height;
        // 最小占一份
        if (height < averageHeight)
            ret = averageHeight;
        // 高度超标
        if (height + rect.y > containerClientHeight - (margin * 2)) {
            // 有偏移则需要加上
            if (this.averageHeightOffset) {
                ret = containerClientHeight - rect.y - (margin * 2);
            }
            else {
                ret = containerClientHeight - rect.y;
            }
        }
        return ret;
    }
    // 矩形信息
    getRectInfo(dom) {
        const x = parseInt(this.getCssStyle(dom, "left", 0));
        const y = parseInt(this.getCssStyle(dom, "top", 0));
        const width = parseInt(this.getCssStyle(dom, "width", 0));
        const height = parseInt(this.getCssStyle(dom, "height", 0));
        return {
            x,
            y,
            width,
            height
        };
    }
    // 判断DOM是否位置重叠
    isDomOverlapList(dom, domList) {
        const list = domList.filter((e) => e !== dom);
        const rect1 = this.getRectInfo(dom);
        const result = list.some((e) => this.isDomOverlap(rect1, this.getRectInfo(e)));
        return result;
    }
    // 判断是否位置重叠
    isOverlapList(target, otherList) {
        const list = otherList.filter((e) => e.id !== target.id);
        const result = list.some((e) => this.isDomOverlap(target, e));
        return result;
    }
    isDomOverlap(rect1, rect2) {
        const startX1 = rect1.x, startY1 = rect1.y, endX1 = startX1 + rect1.width, endY1 = startY1 + rect1.height;
        const startX2 = rect2.x, startY2 = rect2.y, endX2 = startX2 + rect2.width, endY2 = startY2 + rect2.height;
        return !(endY2 < startY1 ||
            endY1 < startY2 ||
            startX1 > endX2 ||
            startX2 > endX1);
    }
    // 解析X(left)的等份位置
    parserX(value) {
        if (value < this.averageWidth) {
            return 0;
        }
        const num = Math.round(value / this.averageWidth);
        const result = num * this.averageWidth;
        return result;
    }
    // 解析Y(top)的等份位置
    parserY(value) {
        if (value < this.averageHeight) {
            return 0;
        }
        const num = Math.round(value / this.averageHeight);
        const result = num * this.averageHeight;
        return result;
    }
    sleep(timeout) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    ///// 计算大小和位置
    async calculate(list, isInsertDOM = false) {
        return new Promise(async (resolve, reject) => {
            const calcList = JSON.parse(JSON.stringify(list));
            for (const item of calcList) {
                // 设置大小
                item.width = this.getRowNum(item.row);
                item.height = this.getColumnNum(item.column);
                // 默认偏移量
                item.x = 0;
                item.y = 0;
            }
            // 返回结果
            const result = {
                success: [],
                fail: []
            };
            // 上一次的 x 和 y 的偏移值
            let prevX = 0;
            let prevY = 0;
            for (let i = 0; i < calcList.length; i++) {
                const item = calcList[i];
                const res = await this.calcAppendPosition(item, result.success, prevX, prevY, isInsertDOM);
                if (res) {
                    result.success.push(res);
                    const rows = calcList.map(e => e.row);
                    const nextX = Math.min(...rows);
                    // 更新上一次的偏移值(避免重复的循环判断)
                    // prevX = res.offsetX === 0 ? 0 : res.offsetX + 1; // 从下一个开始对比
                    prevX = res.offsetX === 0 ? 0 : res.offsetX + nextX; // 从下一个最小 x 开始
                    prevY = res.offsetY;
                }
                else {
                    // result.fail = calcList.splice(i);
                    // break;
                    // 放不下
                    result.fail.push(item);
                }
            }
            resolve(result);
        });
    }
    // 计算给定的的可以放到容器中的位置
    /**
 *
 * @param rect 需要计算存放的位置
 * @param other 需要跟其中的比较
 * @param prevX 从那个 x 开始
 * @param prevY 从那个 y 开始
 * @param isInsertDOM 会在每个判断的位置上插入 DOM(显示查找原理)
 * @returns
 */
    async calcAppendPosition(rect, other, prevX = 0, prevY = 0, isInsertDOM = false) {
        // 这里不可以 new Promise() 会导致顺序错乱
        const { rowCopie, columnCopie, containerClientWidth, containerClientHeight } = this;
        const margin = this.getMargin();
        // 这里需要保存原始默认的偏移量
        const originX = rect.x || 0;
        const originY = rect.y || 0;
        let i = prevY;
        let j = prevX;
        let div = null;
        if (isInsertDOM) {
            div = document.createElement("div");
            this.container.appendChild(div);
        }
        while (i < columnCopie) {
            while (j < rowCopie) {
                console.count("执行");
                const left = this.getLeftOffset(originX, j);
                const top = this.getTopOffset(originY, i);
                rect.x = left;
                rect.y = top;
                if (div && isInsertDOM) {
                    div.style.cssText = `width: ${rect.width}px;
																height: ${rect.height}px;
																left: ${rect.x}px;
																top: ${rect.y}px;
																zIndex: 999;
																position: absolute;
																background: red;`;
                    await this.sleep(100);
                }
                // 位置不重叠
                if (!this.isOverlapList(rect, other)) {
                    // 位置合法
                    if (!(left + rect.width + margin * 2 > containerClientWidth || // left 不超标
                        top + rect.height + margin * 2 > containerClientHeight) // top 不超标
                    ) {
                        if (div && isInsertDOM) {
                            div.style.background = "green";
                            await this.sleep(700);
                            this.container.removeChild(div);
                            div = null;
                        }
                        return {
                            ...rect,
                            offsetX: j,
                            offsetY: i,
                        };
                    }
                }
                j++;
            }
            i++;
            j = 0; // 这里要重置内存循环的初始值
        }
        if (div && isInsertDOM) {
            this.container.removeChild(div);
        }
    }
}
