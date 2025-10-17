/**
 * 判断给定值是否为空
 * @param value - 要检查的值
 * @returns boolean - 如果值为 null、undefined、空字符串、空数组或空对象则返回 true
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * 深拷贝函数
 * @param obj - 要深拷贝的对象
 * @returns T - 深拷贝后的对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj) as any;
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as any;
  }

  if (obj instanceof Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
    ) as any;
  }

  return obj;
}

/**
 * 防抖函数
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns - 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn - 需要节流的函数
 * @param delay - 延迟时间（毫秒）
 * @returns - 节流处理后的函数
 */

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastExecTime = 0;

  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    if (now - lastExecTime >= delay) {
      lastExecTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 时间格式化函数
 * @param timestamp  - 要格式化的时间戳
 * @param format - 格式字符串，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns string - 格式化后的日期字符串
 */
export function formatDate(
  timestamp: string | number,
  format = "YYYY-MM-DD HH:mm:ss"
): string {
  const date = new Date(timestamp);
  const map: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    DD: date.getDate().toString().padStart(2, "0"),
    HH: date.getHours().toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
}

/**
 * 转换时间为时间戳
 * @param date - 要转换的日期对象
 * @returns number - 时间戳
 */
export function toTimestamp(date = new Date()): number {
  return date.getTime();
}

/**
 * 校验是否为数组
 * @param value - 要检查的值
 * @returns boolean - 如果值为数组则返回 true
 */
export function isArray(value: unknown): value is any[] {
  return !Array.isArray
    ? Object.prototype.toString.call(value) === "[object Array]"
    : Array.isArray(value);
}

/**
 * 生成随机字符串
 * @param length - 字符串长度
 * @returns string - 生成的随机字符串 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
 */
export function randomString(len = 10): string {
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++)
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  return pwd;
}

/**
 * 数字千分位分隔符
 * @param data - 要格式化的数字或字符串
 * @param num - 分隔位数
 * @param str - 分隔符
 * @returns string - 格式化后的字符串
 */
export function separator(data: string | number, num = 3, str = ","): string {
  return data
    .toString()
    .replace(new RegExp(`\\B(?=(\\d{${num}})+(?!\\d))`, "g"), str);
}

/**
 * 生成UUID
 * @returns string - 生成的UUID
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 生成随机颜色
 * @returns string - 生成的随机颜色
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * 阿拉伯数字转中文大写
 * @param num - 要转换的数字
 * @returns string - 转换后的中文大写字符串
 */
export function numberToChinese(num: number): string {
  const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  return num
    .toString()
    .split("")
    .map((digit) => chars[parseInt(digit)])
    .join("");
}