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