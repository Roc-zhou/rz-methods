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
 * 转换时间为： 刚刚、几秒前、几分钟前、几小时前、几天前、几周前、几月前、几年前等
 * @param timestamp - 要转换的时间戳
 * @returns string - 转换后的字符串
 */
export function timeAgo(timestamp: string | number): string {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();

  if (diff < 5000) return "刚刚";

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}秒前`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}分钟前`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}天前`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}周前`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}月前`;

  const years = Math.floor(days / 365);
  return `${years} 年前`;
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
 * 数组去重
 * @param arr - 要去重的数组
 * @returns T[] - 去重后的数组
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
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
 * @returns string - 生成的随机颜色 #ffffff
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * 生成随机 rgb 颜色
 * @returns string - 生成的随机颜色 rgb(255,255,255)
 */
export function randomRgbColor(): string {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
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

/**
 * 对手机号进行脱敏处理
 * @param phone - 要脱敏的手机号
 * @returns string - 脱敏后的手机号
 */
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

/**
 * 生成指定范围内的随机数
 * @param min - 最小值
 * @param max - 最大值
 * @returns number - 生成的随机数
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 加法运算，解决浮点数精度问题
 *
 * @param a - 加数 1
 * @param b - 加数 2
 * @param decimals - 结果保留的小数位数（可选，默认自动对齐）
 * @returns 精确的加法结果
 *
 * @example
 * preciseAdd(0.1, 0.2)        // => 0.3
 * preciseAdd(1.005, 0.005, 2) // => 1.01
 */
export function preciseAdd(a: number, b: number, decimals?: number): number {
  if (!isFinite(a) || !isFinite(b)) {
    return a + b;
  }

  // 转为字符串获取小数位
  const [intStrA, decStrA = ""] = a.toString().split(".");
  const [intStrB, decStrB = ""] = b.toString().split(".");

  const lenA = decStrA.length;
  const lenB = decStrB.length;
  const maxLen = Math.max(lenA, lenB);

  // 补零对齐小数位
  const paddedA = decStrA.padEnd(maxLen, "0");
  const paddedB = decStrB.padEnd(maxLen, "0");

  // 构造整数（移除小数点）
  const intA = BigInt(intStrA + paddedA);
  const intB = BigInt(intStrB + paddedB);
  const factor = 10n ** BigInt(maxLen);

  let result: number;
  if (decimals !== undefined) {
    // 指定保留小数位
    const finalFactor = 10 ** decimals;
    const scaledResult =
      Number((intA + intB) * BigInt(finalFactor)) / Number(factor);
    result = Math.round(scaledResult) / finalFactor;
  } else {
    // 自动保留最大精度
    result = Number(intA + intB) / Number(factor);
  }
  return result;
}

/**
 * 减法运算，解决浮点数精度问题
 *
 * @param a - 被减数
 * @param b - 减数
 * @param decimals - 结果保留的小数位数（可选，默认自动对齐）
 * @returns 精确的减法结果
 *
 * @example
 * preciseSubtract(0.3, 0.1)        // => 0.2
 * preciseSubtract(1.01, 0.005, 3)  // => 1.005
 */
export function preciseSubtract(a: number, b: number, decimals?: number): number {
  if (!isFinite(a) || !isFinite(b)) {
    return a - b;
  }

  const [intStrA, decStrA = ""] = a.toString().split(".");
  const [intStrB, decStrB = ""] = b.toString().split(".");

  const lenA = decStrA.length;
  const lenB = decStrB.length;
  const maxLen = Math.max(lenA, lenB);

  const paddedA = decStrA.padEnd(maxLen, "0");
  const paddedB = decStrB.padEnd(maxLen, "0");

  const intA = BigInt(intStrA + paddedA);
  const intB = BigInt(intStrB + paddedB);
  const factor = 10n ** BigInt(maxLen);

  let result: number;
  if (decimals !== undefined) {
    const finalFactor = 10 ** decimals;
    const scaledResult =
      Number((intA - intB) * BigInt(finalFactor)) / Number(factor);
    result = Math.round(scaledResult) / finalFactor;
  } else {
    result = Number(intA - intB) / Number(factor);
  }

  return result;
}

/**
 * 乘法运算，解决浮点数精度问题
 *
 * @param a - 乘数 1
 * @param b - 乘数 2
 * @param decimals - 结果保留的小数位数（默认自动推断，也可手动指定）
 * @returns 精确的乘法结果（四舍五入到指定小数位）
 *
 * @example
 * preciseMultiply(0.1, 0.2)        // => 0.02
 * preciseMultiply(1.005, 2, 2)     // => 2.01
 * preciseMultiply(3, 4)            // => 12
 */
export function preciseMultiply(a: number, b: number, decimals?: number ): number {
  // 处理 Infinity / NaN
  if (!isFinite(a) || !isFinite(b)) {
    return a * b;
  }

  // 将数字转为字符串，分别获取小数位数
  const strA = a.toString();
  const strB = b.toString();

  // 获取小数位数
  const decimalA =
    strA.indexOf(".") > -1 ? strA.length - strA.indexOf(".") - 1 : 0;
  const decimalB =
    strB.indexOf(".") > -1 ? strB.length - strB.indexOf(".") - 1 : 0;

  // 总小数位数
  const totalDecimals = decimalA + decimalB;

  // 转为整数（移除小数点）
  const intA = parseInt(strA.replace(".", ""), 10);
  const intB = parseInt(strB.replace(".", ""), 10);

  // 执行整数乘法
  const resultInt = intA * intB;

  // 如果没有指定 decimals，则使用自动计算的小数位
  const finalDecimals = decimals !== undefined ? decimals : totalDecimals;

  // 如果结果应为整数（finalDecimals = 0），直接返回
  if (finalDecimals === 0) {
    return Math.round(resultInt / Math.pow(10, totalDecimals));
  }

  // 计算最终结果（带小数）
  const result = resultInt / Math.pow(10, totalDecimals);

  // 四舍五入到指定小数位
  const factor = Math.pow(10, finalDecimals);
  return Math.round(result * factor) / factor;
}

/**
 * 除法运算，解决浮点数精度问题
 *
 * @param dividend - 被除数（数字）
 * @param divisor - 除数（数字），不能为 0
 * @param decimals - 保留的小数位数，默认为 10 位
 * @returns 精确除法结果（四舍五入到指定小数位）
 * @throws {Error} 当除数为 0 时抛出错误
 *
 * @example
 * preciseDivide(1, 3, 5) // => 0.33333
 * preciseDivide(10, 3, 2) // => 3.33
 */
export function preciseDivide( dividend: number, divisor: number, decimals: number = 10 ): number {
  if (divisor === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("`decimals` must be a non-negative integer.");
  }
  // 处理 Infinity 或 NaN
  if (!isFinite(dividend) || !isFinite(divisor)) {
    return dividend / divisor; // 让 JS 自然处理 Infinity/NaN
  }
  const factor = Math.pow(10, decimals);
  // 将被除数和除数放大为整数（避免中间浮点误差）
  const scaledDividend = Math.round(dividend * factor);
  const scaledDivisor = Math.round(divisor * factor);
  // 执行除法
  const result = scaledDividend / scaledDivisor;
  // 最终四舍五入到指定小数位
  return Math.round(result * factor) / factor;
}

/**
 * 拼接 url 参数
 * @param url - 基础 URL
 * @param params - 参数对象
 * @returns string - 拼接后的 URL
 */
export function joinUrl(url: string, params: { [key: string]: any }): string {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return `${url}?${queryString}`;
}

/**
 * 版本比较
 * @param v1 - 第一个版本号 1.0.0
 * @param v2 - 第二个版本号 1.0.1
 * @returns number - 比较结果 1: v1>v2, -1: v1<v2, 0: v1=v2
 */
export function compareVersion(v1: string, v2: string): number {
  const v1Parts = v1.split(".").map(Number);
  const v2Parts = v2.split(".").map(Number);
  const len = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < len; i++) {
    const part1 = v1Parts[i] || 0;
    const part2 = v2Parts[i] || 0;
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  return 0;
}

/**
 * localStorage
 * @param key - 存储的键
 * @param value - 存储的值
 * @param time - 过期时间 (毫秒)
 */
export function setLocalStorage<T>(key: string, value: T, time?: number): void {
  const data = {
    value,
    expire: time ? Date.now() + time : null,
  };
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * 从 localStorage 获取值
 * @param key - 存储的键
 * @returns T | null - 获取的值
 */
export function getLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const data = JSON.parse(item);
  if (data.expire && Date.now() > data.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return JSON.parse(item).value as T;
}

/**
 * 删除 localStorage 中的指定键
 * @param key - 要删除的键
 */
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

/**
 * 设置 sessionStorage
 * @param key - 存储的键
 * @param value - 存储的值
 */
export function setSessionStorage<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

/**
 * 从 sessionStorage 获取值
 * @param key - 存储的键
 * @returns T | null - 获取的值
 */
export function getSessionStorage<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

/**
 * 删除 sessionStorage 中的指定键
 * @param key - 要删除的键
 */
export function removeSessionStorage(key: string): void {
  sessionStorage.removeItem(key);
}
