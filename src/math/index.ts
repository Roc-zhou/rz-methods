/**
 * 金额解析结果
 */
interface AmountParsed {
  neg: boolean;
  intPart: string;
  decPart: string;
}

/**
 * 解析金额（string / number）
 * @param val 金额
 * @returns
 */
function parseAmount(val: string | number): AmountParsed {
  let s: string;
  if (typeof val === "string") {
    s = val.trim();
  } else {
    if (!Number.isFinite(val)) {
      throw new Error("非法金额，不是有限数字");
    }
    s = val.toString();
  }
  if (s === "") throw new Error("金额不能为空");

  const neg = s.startsWith("-");
  const pure = neg ? s.slice(1) : s;
  const [intPart, decPart = ""] = pure.split(".");
  return { neg, intPart, decPart };
}

/**
 * BigInt 转为金额字符串
 * @param resBig
 * @param factor
 * @param decimals
 * @returns
 */
function bigIntToAmountStr(
  resBig: bigint,
  factor: bigint,
  decimals: number
): string {
  const isNeg = resBig < 0n;
  const abs = isNeg ? -resBig : resBig;
  const int = abs / factor;
  const dec = abs % factor;
  const decLen = factor.toString().length - 1;
  const decStr = dec.toString().padStart(decLen, "0").slice(0, decimals);
  return `${isNeg ? "-" : ""}${int}.${decStr}`;
}

/**
 * 加减内部通用计算
 */
function calcAddSub(
  a: string | number,
  b: string | number,
  decimals: number,
  op: (x: bigint, y: bigint) => bigint
): string {
  const pa = parseAmount(a);
  const pb = parseAmount(b);
  const lenA = pa.decPart.length;
  const lenB = pb.decPart.length;
  const maxLen = Math.max(lenA, lenB);

  let bigA = BigInt(pa.intPart + pa.decPart.padEnd(maxLen, "0"));
  let bigB = BigInt(pb.intPart + pb.decPart.padEnd(maxLen, "0"));
  if (pa.neg) bigA = -bigA;
  if (pb.neg) bigB = -bigB;

  let resBig = op(bigA, bigB);
  const factor = 10n ** BigInt(maxLen);

  if (decimals != null && maxLen > decimals) {
    const targetScale = 10n ** BigInt(maxLen - decimals);
    if (targetScale > 1n) {
      resBig = (resBig + targetScale / 2n) / targetScale * targetScale;
    }
  }

  return bigIntToAmountStr(resBig, factor, decimals);
}

/**
 * 加法
 * @param a
 * @param b
 * @param decimals 保留小数位 默认2
 * @returns 金额字符串
 */
export function preciseAdd(
  a: string | number,
  b: string | number,
  decimals = 2
): string {
  return calcAddSub(a, b, decimals, (x, y) => x + y);
}

/**
 * 减法
 * @param a
 * @param b
 * @param decimals 保留小数位 默认2
 * @returns 金额字符串
 */
export function preciseSubtract(
  a: string | number,
  b: string | number,
  decimals = 2
): string {
  return calcAddSub(a, b, decimals, (x, y) => x - y);
}

/**
 * 乘法
 * @param a
 * @param b
 * @param decimals 保留小数位 默认2
 * @returns 金额字符串
 */
export function preciseMultiply(
  a: string | number,
  b: string | number,
  decimals = 2
): string {
  const pa = parseAmount(a);
  const pb = parseAmount(b);
  const lenA = pa.decPart.length;
  const lenB = pb.decPart.length;
  const totalDec = lenA + lenB;

  let bigA = BigInt(pa.intPart + pa.decPart);
  let bigB = BigInt(pb.intPart + pb.decPart);
  if (pa.neg) bigA = -bigA;
  if (pb.neg) bigB = -bigB;

  let resBig = bigA * bigB;
  const factor = 10n ** BigInt(totalDec);

  if (totalDec > decimals) {
    const scale = 10n ** BigInt(totalDec - decimals);
    resBig = (resBig + scale / 2n) / scale * scale;
  }

  return bigIntToAmountStr(resBig, factor, decimals);
}

/**
 * 除法（四舍五入）
 * @param a 被除数
 * @param b 除数
 * @param decimals 保留小数位 默认2
 * @returns 金额字符串
 */
export function preciseDivide(
  a: string | number,
  b: string | number,
  decimals = 2
): string {
  const pa = parseAmount(a);
  const pb = parseAmount(b);
  const lenA = pa.decPart.length;
  const lenB = pb.decPart.length;

  let bigA = BigInt(pa.intPart + pa.decPart);
  let bigB = BigInt(pb.intPart + pb.decPart);
  if (pa.neg) bigA = -bigA;
  if (pb.neg) bigB = -bigB;

  if (bigB === 0n) {
    throw new Error("除数不能为0");
  }

  const expand = 10n ** BigInt(lenB + decimals + 1);
  let resBig = (bigA * expand) / bigB;
  const scale = 10n;
  resBig = (resBig + scale / 2n) / scale;

  const factor = 10n ** BigInt(decimals);
  return bigIntToAmountStr(resBig, factor, decimals);
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