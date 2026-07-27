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
 * 生成随机颜色
 * @returns string - 生成的随机颜色 #ffffff
 */
export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * 生成随机 rgb 颜色
 * @returns string - 生成的随机颜色 rgb(255,255,255)
 */
export function randomRgbColor(): string {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}