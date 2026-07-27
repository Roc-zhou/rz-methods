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