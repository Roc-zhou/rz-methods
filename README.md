# rz-methods

一个 JavaScript/TypeScript 实用工具库，支持 Tree Shaking，可在 Node.js 和浏览器环境中使用。

## 特点

- TypeScript 支持和类型定义
- 支持 Tree Shaking，可按需引入
- 支持多种模块格式 (ESM/CommonJS/UMD)
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
[API 文档](/API_DOCUMENT.md)

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