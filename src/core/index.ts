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
 * 防抖函数
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns - 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

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
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void {
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
 * 对手机号进行脱敏处理
 * @param phone - 要脱敏的手机号
 * @returns string - 脱敏后的手机号
 */
export function maskPhone(phone: string): string {
  // 校验手机号格式
  if (!/^1[3-9]\d{9}$/.test(phone)) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
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