declare type DrapOperateOption = {
    container: HTMLElement;
    rowCopie: number;
    columnCopie: number;
    margin?: number;
    averageWidthOffset?: number;
    averageHeightOffset?: number;
};
declare type RectInfo = {
    width: number;
    height: number;
    x: number;
    y: number;
};
declare type contentType = {
    row: number;
    column: number;
    id: number;
};
declare type calcItemType = RectInfo & contentType & {
    offsetX: number;
    offsetY: number;
};
declare type calcResultType = {
    success: Array<calcItemType>;
    fail: Array<calcItemType>;
};
export default class DrapOperate {
    container: HTMLElement;
    rowCopie: number;
    columnCopie: number;
    margin?: number;
    averageWidthOffset?: number;
    averageHeightOffset?: number;
    containerClientWidth: number;
    containerClientHeight: number;
    averageWidth: number;
    averageHeight: number;
    constructor(options: DrapOperateOption);
    init(): void;
    getAverageWidthOffset(): number;
    getAverageHeightOffset(): number;
    getMargin(): number;
    getRowNum(n: number): number;
    getLeftOffset(left: number, n: number): number;
    getColumnNum(n: number): number;
    getTopOffset(top: number, n: number): number;
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
    handleMousedown(event: MouseEvent, wrapEl: HTMLElement, elList?: HTMLElement[], setPreviewEl?: (el: HTMLElement) => HTMLElement): void;
    /** 拖拽放大
     * @param event mousedown 事件的事件对象
     *
     * @param wrapEl 需要拖拽的容器DOM, 会判断放大时的位置是否合法, 在 container 之内
     *
     * @param elList 其他的容器DOM
     *  拖拽时会和这个列表中的DOM比较是否重叠, 重叠则会恢复到缩放前的位置
     */
    handleZoomMouseDown(event: MouseEvent, wrapEl: HTMLElement, elList?: HTMLElement[]): void;
    getCssStyle(dom: Element, property: string, defaultValue?: any): any;
    validPosttion(wrap: Element, dom: Element): boolean;
    leftBorderJudgment(left: number, wrapEl: HTMLElement): number;
    topBorderJudgment(top: number, wrapEl: HTMLElement): number;
    zoomWidthBorderJudgment(width: number, wrapEl: HTMLElement): number;
    zoomHeightBorderJudgment(height: number, wrapEl: HTMLElement): number;
    getRectInfo(dom: Element): RectInfo;
    isDomOverlapList(dom: Element, domList: Element[]): boolean;
    isOverlapList(target: calcItemType, otherList: calcItemType[]): boolean;
    isDomOverlap(rect1: RectInfo, rect2: RectInfo): boolean;
    parserX(value: number): number;
    parserY(value: number): number;
    sleep(timeout: number): Promise<unknown>;
    calculate(list: Array<contentType>, isInsertDOM?: boolean): Promise<calcResultType>;
    /**
 *
 * @param rect 需要计算存放的位置
 * @param other 需要跟其中的比较
 * @param prevX 从那个 x 开始
 * @param prevY 从那个 y 开始
 * @param isInsertDOM 会在每个判断的位置上插入 DOM(显示查找原理)
 * @returns
 */
    calcAppendPosition(rect: calcItemType, other: Array<calcItemType>, prevX?: number, prevY?: number, isInsertDOM?: boolean): Promise<calcItemType | void>;
}
export {};
