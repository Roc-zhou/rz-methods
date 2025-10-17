# rz-methods

一个 JavaScript/TypeScript 实用工具库，支持 Tree Shaking，可在 Node.js 和浏览器环境中使用。

## 特点

- TypeScript 支持和类型定义
- 支持 Tree Shaking，可按需引入
- 支持多种模块格式 (ESM/CommonJS/UMD)
- 零依赖
- 100% 测试覆盖率
- 支持所有现代浏览器和 Node.js

## 安装

使用 npm：
```bash
npm install rz-methods
```

使用 yarn：
```bash
yarn add rz-methods
```

使用 pnpm：
```bash
pnpm add rz-methods
```

## 使用方法

### ES Modules
```typescript
import { isEmpty, deepClone } from 'rz-methods';

// 检查值是否为空
console.log(isEmpty([]));  // true
console.log(isEmpty([1, 2]));  // false

// 深拷贝对象
const obj = { a: 1, b: { c: 2 } };
const cloned = deepClone(obj);
```

### CommonJS
```javascript
const { isEmpty, deepClone } = require('rz-methods');
```

### UMD (浏览器直接使用)
```html
<script src="https://unpkg.com/rz-methods/dist/umd/index.min.js"></script>
<script>
  const { isEmpty, deepClone } = window.rzMethods;
</script>
```

## API 文档

### isEmpty(value: unknown): boolean
检查一个值是否为空。

参数：
- `value`: 要检查的值

返回：
- `boolean`: 如果值为 null、undefined、空字符串、空数组或空对象则返回 true

示例：
```typescript
isEmpty(null);      // true
isEmpty(undefined); // true
isEmpty('');       // true
isEmpty([]);       // true
isEmpty({});       // true
isEmpty('text');   // false
isEmpty([1, 2]);   // false
isEmpty({ a: 1 }); // false
```

### deepClone<T>(obj: T): T
创建一个值的深拷贝。

参数：
- `obj`: 要克隆的值

返回：
- 值的深拷贝

示例：
```typescript
const obj = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4]
  }
};
const cloned = deepClone(obj);
```

### debounce<T extends (...args: any[]) => any>(fn: T, delay: number)
创建一个防抖函数。

参数：
- `fn`: 要防抖的函数
- `delay`: 延迟时间（毫秒）

返回：
- 防抖处理后的函数

示例：
```typescript
const debouncedFn = debounce(() => {
  console.log('执行搜索');
}, 300);

// 快速多次调用，只会在最后一次调用后 300ms 执行一次
searchInput.addEventListener('input', debouncedFn);
```

### throttle<T extends (...args: any[]) => any>(fn: T, delay: number)
创建一个节流函数。

参数：
- `fn`: 要节流的函数
- `delay`: 间隔时间（毫秒）

返回：
- 节流处理后的函数

示例：
```typescript
const throttledFn = throttle(() => {
  console.log('执行搜索');
}, 300);

// 快速多次调用，每 300ms 执行一次
searchInput.addEventListener('input', throttledFn);
```

## 开发指南

### 安装依赖
```bash
npm install
```

### 运行测试
```bash
npm test
```

### 构建项目
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 版本发布

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 了解更多细节