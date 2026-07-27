const typescript = require('rollup-plugin-typescript2');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { eslint } = require('rollup-plugin-eslint');
const path = require('path');
const fs = require('fs');

// 获取所有模块目录（排除 index.ts）
function getModuleEntries() {
  const srcDir = path.resolve(__dirname, 'src');
  const entries = { index: 'src/index.ts' };

  // 读取 src 目录下的所有子目录
  const items = fs.readdirSync(srcDir, { withFileTypes: true });

  items.forEach(item => {
    if (item.isDirectory()) {
      const indexPath = path.join(srcDir, item.name, 'index.ts');
      if (fs.existsSync(indexPath)) {
        // 使用目录名作为入口点
        entries[item.name] = `src/${item.name}/index.ts`;
      }
    }
  });

  return entries;
}

// 获取所有单个函数文件（用于独立导入）
function getFunctionEntries() {
  const srcDir = path.resolve(__dirname, 'src');
  const entries = {};

  function scanDir(dir, basePath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      const relativePath = path.join(basePath, item.name);

      if (item.isDirectory()) {
        // 跳过非模块目录（如 __tests__）
        if (item.name !== '__tests__' && item.name !== '__mocks__') {
          scanDir(fullPath, relativePath);
        }
      } else if (item.isFile() && item.name.endsWith('.ts') && item.name !== 'index.ts') {
        // 使用文件路径作为入口（去掉 .ts 后缀）
        const entryName = relativePath.replace(/\.ts$/, '');
        // 只记录深度 > 1 的文件（即子模块中的单个函数）
        if (entryName.includes('/')) {
          entries[entryName] = `src/${entryName}.ts`;
        }
      }
    });
  }

  scanDir(srcDir);
  return entries;
}

// 基础插件配置
const basePlugins = [
  eslint({
    throwOnError: true,
    throwOnWarning: true,
    include: ['src/**/*.ts'],
    exclude: ['node_modules/**', 'dist/**']
  }),
  nodeResolve({
    extensions: ['.js', '.ts']
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    compilerOptions: {
      sourceMap: true,
      declaration: false // 由 tsc 单独生成声明文件
    }
  }),
  babel({
    extensions: ['.js', '.ts'],
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  })
];

// 获取所有入口
const moduleEntries = getModuleEntries();
const functionEntries = getFunctionEntries();
const allEntries = { ...moduleEntries, ...functionEntries };

// 生成输出配置
function generateOutputs(format, ext, isMin = false) {
  const outputs = [];
  const entries = isMin ? {} : allEntries; // 只有非压缩版本包含所有入口

  if (isMin) {
    // 压缩版本只生成主入口
    return [
      {
        file: `dist/${format}/index.min.${ext}`,
        format: format,
        name: 'rzMethods',
        sourcemap: true,
        plugins: [terser()]
      }
    ];
  }

  // 为每个入口生成对应的输出
  Object.keys(entries).forEach(entryName => {
    outputs.push({
      file: `dist/${format}/${entryName}.${ext}`,
      format: format,
      name: entryName === 'index' ? 'rzMethods' : undefined,
      sourcemap: true
    });
  });

  return outputs;
}

// 生成入口配置
function generateInputs() {
  const inputs = {};

  // 添加所有模块入口
  Object.keys(allEntries).forEach(key => {
    inputs[key] = allEntries[key];
  });

  return inputs;
}

// 模块配置
function createModuleConfig(format, ext) {
  const inputs = generateInputs();

  return {
    input: inputs,
    output: [
      ...generateOutputs(format, ext, false),
      ...generateOutputs(format, ext, true)
    ],
    plugins: [...basePlugins],
    external: [], // 如果需要排除某些依赖，可以在这里配置
    preserveModules: true, // 保持模块结构
    preserveModulesRoot: 'src' // 从 src 开始保持路径
  };
}

module.exports = [
  // ESM (推荐)
  createModuleConfig('esm', 'js'),

  // CommonJS
  createModuleConfig('cjs', 'js'),

  // UMD (只打包主入口)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/umd/index.js',
        format: 'umd',
        name: 'rzMethods',
        sourcemap: true
      },
      {
        file: 'dist/umd/index.min.js',
        format: 'umd',
        name: 'rzMethods',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [...basePlugins]
  }
];