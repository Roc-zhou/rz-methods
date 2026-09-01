/**
 * 时间格式化函数
 * @param timestamp  - 要格式化的时间戳
 * @param format - 格式字符串，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns string - 格式化后的日期字符串
 */
export function formatDate(date: Date | string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  // 修复 iOS 无法解析带有连字符 '-' 字符串日期的问题
  const parsedDate = typeof date === 'string' ? date.replace(/-/g, '/') : date;
  const d = new Date(parsedDate);

  // 如果日期非法，直接返回空字符串
  if (isNaN(d.getTime())) return '';

  const map: Record<string, string> = {
    'YYYY': String(d.getFullYear()),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'DD': String(d.getDate()).padStart(2, '0'),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'ss': String(d.getSeconds()).padStart(2, '0')
  };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
};

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