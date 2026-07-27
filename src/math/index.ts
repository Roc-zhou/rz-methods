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
export function preciseMultiply(a: number, b: number, decimals?: number): number {
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
export function preciseDivide(dividend: number, divisor: number, decimals: number = 10): number {
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
 * 生成指定范围内的随机数
 * @param min - 最小值
 * @param max - 最大值
 * @returns number - 生成的随机数
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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