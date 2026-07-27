/**
 * 时间格式化函数
 * @param timestamp  - 要格式化的时间戳
 * @param format - 格式字符串，例如 'YYYY-MM-DD HH:mm:ss'
 * @returns string - 格式化后的日期字符串
 */
export function formatDate(timestamp: string | number, format = "YYYY-MM-DD HH:mm:ss"): string {
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