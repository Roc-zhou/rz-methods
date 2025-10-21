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
 * 转换时间为：几秒前、几分钟前、几小时前、几天前、几年前等
 * @param timestamp - 要转换的时间戳
 * @returns string - 转换后的字符串
 */
export function timeAgo(timestamp: string | number): string {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return `${seconds}秒前`;
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 365) return `${days}天前`;
  return `${Math.floor(days / 365)}年前`;
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
 * @param a - 第一个加数
 * @param b - 第二个加数
 * @returns number - 和
 */
export function preciseAdd(a: number, b: number): number {
  const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
  return (Math.round(a * factor) + Math.round(b * factor)) / factor;

  function decimalPlaces(num: number): number {
    const match = num.toString().match(/(?:\.(\d+))?$/);
    return match && match[1] ? match[1].length : 0;
  }
}

/**
 * 减法运算，解决浮点数精度问题
 * @param a - 第一个加数
 * @param b - 第二个加数
 * @returns number - 差
 */
export function preciseSubtract(a: number, b: number): number {
  const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
  return (Math.round(a * factor) - Math.round(b * factor)) / factor;

  function decimalPlaces(num: number): number {
    const match = num.toString().match(/(?:\.(\d+))?$/);
    return match && match[1] ? match[1].length : 0;
  }
}

/**
 * 乘法运算，解决浮点数精度问题
 * @param a - 第一个乘数
 * @param b - 第二个乘数
 * @returns number - 积
 */
export function preciseMultiply(a: number, b: number): number {
  const totalDecimalPlaces = decimalPlaces(a) + decimalPlaces(b);
  const intA = Number(a.toString().replace(".", ""));
  const intB = Number(b.toString().replace(".", ""));
  return (intA * intB) / Math.pow(10, totalDecimalPlaces);

  function decimalPlaces(num: number): number { 
    const match = num.toString().match(/(?:\.(\d+))?$/);
    return match && match[1] ? match[1].length : 0;
  }
}

/**
 * 除法运算，解决浮点数精度问题
 * @param a - 第一个除数
 * @param b - 第二个除数
 * @returns number - 商
 */
export function preciseDivide(a: number, b: number): number {
  const totalDecimalPlaces = decimalPlaces(a) - decimalPlaces(b);
  const intA = Number(a.toString().replace(".", ""));
  const intB = Number(b.toString().replace(".", ""));
  return (intA / intB) * Math.pow(10, totalDecimalPlaces);

  function decimalPlaces(num: number): number {
    const match = num.toString().match(/(?:\.(\d+))?$/);
    return match && match[1] ? match[1].length : 0;
  }
}

/**
 * 拼接 url 参数
 * @param url - 基础 URL
 * @param params - 参数对象
 * @returns string - 拼接后的 URL
 */
export function joinUrl(url: string, params: { [key: string]: any }): string {
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
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