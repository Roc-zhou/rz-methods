const typescript = require('rollup-plugin-typescript2');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { eslint } = require('rollup-plugin-eslint');
const fs = require('fs');
const path = require('path');

// 扫描所有入口文件
function getAllEntries() {
  const entries = {};
  const srcDir = path.resolve(__dirname, 'src');

  function walkDir(dir, basePath = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!['__tests__', '__mocks__', 'node_modules'].includes(file)) {
          walkDir(fullPath, path.join(basePath, file));
        }
      } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
        const name = path.join(basePath, file.replace(/\.ts$/, ''));
        entries[name] = fullPath;
      }
    }
  }

  walkDir(srcDir);
  return entries;
}

const allEntries = getAllEntries();

// 基础插件配置
const getBasePlugins = () => [
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
      declaration: false
    }
  }),
  babel({
    extensions: ['.js', '.ts'],
    babelHelpers: 'bundled',
    exclude: 'node_modules/**'
  })
];

// 创建模块化构建配置（ESM 和 CJS）
function createModularConfig(format) {
  return {
    input: allEntries,
    output: [
      {
        dir: `dist/${format}`,
        format: format,
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        // 对于 CJS，导出方式
        ...(format === 'cjs' ? { exports: 'auto' } : {})
      },
      // 压缩版本（只压缩主入口）
      {
        dir: `dist/${format}`,
        format: format,
        sourcemap: true,
        preserveModules: false,
        entryFileNames: 'index.min.js',
        plugins: [terser()],
        ...(format === 'cjs' ? { exports: 'auto' } : {})
      }
    ],
    plugins: getBasePlugins(),
    external: [] // 如果有外部依赖，在这里添加
  };
}

// UMD 配置（只打包主入口）
function createUMDConfig() {
  return {
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
    plugins: getBasePlugins()
  };
}

module.exports = [
  createModularConfig('esm'),
  createModularConfig('cjs'),
  createUMDConfig()
];