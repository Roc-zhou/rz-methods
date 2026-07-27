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

// 生成uuid 新：使用 crypto API
export function generateUUIDNew(): string {
  return crypto.randomUUID();
}