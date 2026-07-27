/**
 * 数组去重
 * @param arr - 要去重的数组
 * @returns T[] - 去重后的数组
 */
export function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
