/**
 * 判断给定值是否为空
 * @param value - 要检查的值
 * @returns boolean - 如果值为 null、undefined、空字符串、空数组或空对象则返回 true
 */
export declare function isEmpty(value: unknown): boolean;
/**
 * 深拷贝函数
 * @param obj - 要深拷贝的对象
 * @returns T - 深拷贝后的对象
 */
export declare function deepClone<T>(obj: T): T;
/**
 * 防抖函数
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns - 防抖处理后的函数
 */
export declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
