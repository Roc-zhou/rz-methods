# rz-methods API 文档

[TOC]

---

## isEmpty(value: unknown): boolean

检查一个值是否为空。

**参数:**
- `value` - 要检查的值

**返回值:**
- `boolean` - 如果值为 null、undefined、空字符串、空数组或空对象则返回 true

**示例:**
```typescript
isEmpty(null);         // true
isEmpty(undefined);    // true
isEmpty('');           // true
isEmpty('  ');         // true（空白字符串）
isEmpty([]);           // true
isEmpty({});           // true
isEmpty('text');       // false
isEmpty([1, 2]);       // false
isEmpty({ a: 1 });     // false
isEmpty(0);            // false
```

---

## deepClone<T>(obj: T): T

创建对象的深拷贝，支持日期、正则、数组等复杂类型。

**参数:**
- `obj` - 要克隆的值

**返回值:**
- 值的深拷贝

**示例:**
```typescript
const obj = {
  a: 1,
  b: { c: 2 },
  d: [3, 4],
  e: new Date(),
  f: /test/g
};
const cloned = deepClone(obj);
// cloned 是完全独立的副本，不共享任何引用
```

---

## debounce<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void

创建一个防抖函数，避免函数频繁调用。

**参数:**
- `fn` - 要防抖的函数
- `delay` - 延迟时间（毫秒）

**返回值:**
- 防抖处理后的函数

**示例:**
```typescript
const debouncedSearch = debounce((query) => {
  console.log('执行搜索:', query);
}, 300);

// 快速多次调用，只会在最后一次调用后 300ms 执行一次
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

## throttle<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void

创建一个节流函数，限制函数调用频率。

**参数:**
- `fn` - 要节流的函数
- `delay` - 最小间隔时间（毫秒）

**返回值:**
- 节流处理后的函数

**示例:**
```typescript
const throttledScroll = throttle(() => {
  console.log('滚动事件处理');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

## formatDate(timestamp: string | number, format?: string): string

格式化时间戳为指定格式的日期字符串。

**参数:**
- `timestamp` - 时间戳（毫秒或日期字符串）
- `format` - 格式字符串（默认: 'YYYY-MM-DD HH:mm:ss'）

**格式符:**
- `YYYY` - 四位数年份
- `MM` - 两位数月份（01-12）
- `DD` - 两位数日期（01-31）
- `HH` - 两位数小时（00-23）
- `mm` - 两位数分钟（00-59）
- `ss` - 两位数秒钟（00-59）

**示例:**
```typescript
formatDate(Date.now());                    // "2025-12-08 10:30:45"
formatDate(1634799999000, 'YYYY-MM-DD');   // "2021-10-21"
formatDate(new Date(), 'MM/DD/YYYY');      // "12/08/2025"
formatDate('2025-12-08');                  // "2025-12-08 00:00:00"
```

---

## timeAgo(timestamp: string | number): string

将时间转换为"多久之前"的格式。

**参数:**
- `timestamp` - 时间戳或日期字符串

**返回值:**
- 相对时间字符串（如："刚刚"、"5秒前"、"2小时前"等）

**示例:**
```typescript
timeAgo(Date.now());                   // "刚刚"
timeAgo(Date.now() - 30000);          // "30秒前"
timeAgo(Date.now() - 5 * 60000);      // "5分钟前"
timeAgo(Date.now() - 2 * 3600000);    // "2小时前"
timeAgo(Date.now() - 5 * 86400000);   // "5天前"
```

---

## toTimestamp(date?: Date): number

转换日期为时间戳。

**参数:**
- `date` - 日期对象（默认为当前时间）

**返回值:**
- 时间戳（毫秒）

**示例:**
```typescript
toTimestamp();                    // 1702032645123
toTimestamp(new Date('2025-12-08')); // 1733203200000
```

---

## isArray(value: unknown): boolean

检查一个值是否为数组。

**参数:**
- `value` - 要检查的值

**返回值:**
- `boolean` - 如果值为数组则返回 true

**示例:**
```typescript
isArray([1, 2, 3]);    // true
isArray('array');      // false
isArray({});           // false
isArray(null);         // false
```

---

## uniqueArray<T>(arr: T[]): T[]

数组去重。

**参数:**
- `arr` - 要去重的数组

**返回值:**
- 去重后的数组

**示例:**
```typescript
uniqueArray([1, 2, 2, 3, 3, 4]);        // [1, 2, 3, 4]
uniqueArray(['a', 'b', 'a', 'c']);     // ['a', 'b', 'c']
```

---

## randomString(len?: number): string

生成指定长度的随机字符串。

**参数:**
- `len` - 字符串长度（默认: 10）

**返回值:**
- 随机字符串（仅包含字母和数字，已排除易混淆字符）

**示例:**
```typescript
randomString();          // "aBcDeFgHiJ"
randomString(6);         // "xYzAbC"
randomString(20);        // "aBcDeFgHiJkLmNoPqRsT"
```

---

## separator(data: string | number, num?: number, str?: string): string

数字千分位分隔。

**参数:**
- `data` - 要格式化的数字或字符串
- `num` - 分隔位数（默认: 3）
- `str` - 分隔符（默认: ','）

**返回值:**
- 格式化后的字符串

**示例:**
```typescript
separator(1234567);               // "1,234,567"
separator(1234567, 4);            // "123,4567"
separator(1000000, 3, ' ');       // "1 000 000"
```

---

## generateUUID(): string

生成 UUID（RFC4122 v4）。

**返回值:**
- UUID 字符串

**示例:**
```typescript
generateUUID();  // "550e8400-e29b-41d4-a716-446655440000"
generateUUID();  // "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

---

## randomColor(): string

生成随机十六进制颜色。

**返回值:**
- 随机颜色字符串（格式: #ffffff）

**示例:**
```typescript
randomColor();  // "#a3c2f1"
randomColor();  // "#f7d94c"
```

---

## randomRgbColor(): string

生成随机 RGB 颜色。

**返回值:**
- RGB 颜色字符串（格式: rgb(255,255,255)）

**示例:**
```typescript
randomRgbColor();  // "rgb(123,45,67)"
randomRgbColor();  // "rgb(200,150,100)"
```

---

## numberToChinese(num: number): string

阿拉伯数字转中文大写。

**参数:**
- `num` - 要转换的数字

**返回值:**
- 中文大写字符串

**示例:**
```typescript
numberToChinese(0);       // "零"
numberToChinese(12345);   // "一二三四五"
numberToChinese(999);     // "九九九"
```

---

## maskPhone(phone: string): string

手机号码脱敏处理。

**参数:**
- `phone` - 手机号码字符串

**返回值:**
- 脱敏后的手机号码（格式: 138****5678）

**示例:**
```typescript
maskPhone('13812345678');   // "138****5678"
maskPhone('18888888888');   // "188****8888"
```

---

## randomInRange(min: number, max: number): number

生成指定范围内的随机整数。

**参数:**
- `min` - 最小值（包含）
- `max` - 最大值（包含）

**返回值:**
- 随机整数

**示例:**
```typescript
randomInRange(1, 10);     // 1-10之间的随机数
randomInRange(100, 200);  // 100-200之间的随机数
```

---

## preciseAdd(a: number, b: number, decimals?: number): number

精确加法，解决浮点数精度问题。

**参数:**
- `a` - 加数 1
- `b` - 加数 2
- `decimals` - 结果保留的小数位数（可选）

**返回值:**
- 精确的加法结果

**示例:**
```typescript
preciseAdd(0.1, 0.2);         // 0.3
preciseAdd(1.005, 0.005, 2);  // 1.01
preciseAdd(10, 20);           // 30
```

---

## preciseSubtract(a: number, b: number, decimals?: number): number

精确减法，解决浮点数精度问题。

**参数:**
- `a` - 被减数
- `b` - 减数
- `decimals` - 结果保留的小数位数（可选）

**返回值:**
- 精确的减法结果

**示例:**
```typescript
preciseSubtract(0.3, 0.1);         // 0.2
preciseSubtract(1.01, 0.005, 3);   // 1.005
```

---

## preciseMultiply(a: number, b: number, decimals?: number): number

精确乘法，解决浮点数精度问题。

**参数:**
- `a` - 乘数 1
- `b` - 乘数 2
- `decimals` - 结果保留的小数位数（可选）

**返回值:**
- 精确的乘法结果

**示例:**
```typescript
preciseMultiply(0.1, 0.2);      // 0.02
preciseMultiply(1.005, 2, 2);   // 2.01
preciseMultiply(3, 4);          // 12
```

---

## preciseDivide(dividend: number, divisor: number, decimals?: number): number

精确除法，解决浮点数精度问题。

**参数:**
- `dividend` - 被除数
- `divisor` - 除数（不能为 0）
- `decimals` - 保留的小数位数（默认: 10）

**返回值:**
- 精确的除法结果

**示例:**
```typescript
preciseDivide(1, 3, 5);    // 0.33333
preciseDivide(10, 3, 2);   // 3.33
preciseDivide(0.3, 0.1);   // 3
```

---

## joinUrl(url: string, params: object): string

URL 参数拼接。

**参数:**
- `url` - 基础 URL
- `params` - 参数对象

**返回值:**
- 拼接后的 URL

**示例:**
```typescript
joinUrl('https://api.example.com', { id: 1, name: 'test' });
// "https://api.example.com?id=1&name=test"

joinUrl('https://api.example.com/search', { q: 'hello world', page: 1 });
// "https://api.example.com/search?q=hello%20world&page=1"
```

---

## compareVersion(v1: string, v2: string): number

版本号比较。

**参数:**
- `v1` - 第一个版本号（如: "1.0.0"）
- `v2` - 第二个版本号（如: "1.0.1"）

**返回值:**
- `1` - v1 > v2
- `-1` - v1 < v2
- `0` - v1 = v2

**示例:**
```typescript
compareVersion('1.0.0', '1.0.1');  // -1
compareVersion('2.0.0', '1.9.9');  // 1
compareVersion('1.0.0', '1.0.0');  // 0
```

---

## setLocalStorage<T>(key: string, value: T, time?: number): void

存储数据到 localStorage，支持过期时间。

**参数:**
- `key` - 存储的键
- `value` - 存储的值（任意类型）
- `time` - 过期时间（毫秒，可选）

**示例:**
```typescript
// 无过期时间
setLocalStorage('user', { name: 'John', age: 30 });

// 设置 1 小时后过期
setLocalStorage('token', 'abc123def456', 3600000);

// 设置 7 天后过期
setLocalStorage('cache', { data: [...] }, 7 * 24 * 3600000);
```

---

## getLocalStorage<T>(key: string): T | null

从 localStorage 获取值。

**参数:**
- `key` - 存储的键

**返回值:**
- 存储的值，过期或不存在时返回 null

**示例:**
```typescript
const user = getLocalStorage<{ name: string; age: number }>('user');
if (user) {
  console.log(user.name);  // "John"
}
```

---

## removeLocalStorage(key: string): void

删除 localStorage 中的指定键。

**参数:**
- `key` - 要删除的键

**示例:**
```typescript
removeLocalStorage('user');
removeLocalStorage('token');
```

---

## setSessionStorage<T>(key: string, value: T): void

存储数据到 sessionStorage。

**参数:**
- `key` - 存储的键
- `value` - 存储的值（任意类型）

**示例:**
```typescript
setSessionStorage('sessionUser', { id: 1, name: 'Alice' });
```

---

## getSessionStorage<T>(key: string): T | null

从 sessionStorage 获取值。

**参数:**
- `key` - 存储的键

**返回值:**
- 存储的值，不存在时返回 null

**示例:**
```typescript
const sessionUser = getSessionStorage<{ id: number; name: string }>('sessionUser');
if (sessionUser) {
  console.log(sessionUser.name);  // "Alice"
}
```

---

## removeSessionStorage(key: string): void

删除 sessionStorage 中的指定键。

**参数:**
- `key` - 要删除的键

**示例:**
```typescript
removeSessionStorage('sessionUser');
```

---

## 使用建议

### Tree Shaking

本库支持 Tree Shaking，可以按需引入，避免打包无用代码：

```typescript
// ✅ 推荐 - 只引入需要的函数
import { isEmpty, debounce } from 'rz-methods';

// ❌ 避免 - 引入整个模块
import * as utils from 'rz-methods';
```

### TypeScript 支持

所有函数都有完整的 TypeScript 类型定义，提供最好的开发体验。

### 浏览器兼容性

除了存储相关函数（需要 localStorage/sessionStorage API）外，其他所有函数都可在 IE9+ 及所有现代浏览器中使用。
