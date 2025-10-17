const typescript = require('rollup-plugin-typescript2');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');              // 处理es6
const { nodeResolve } = require('@rollup/plugin-node-resolve'); // 处理node_modules
const commonjs = require('@rollup/plugin-commonjs');       // 处理commonjs
const { eslint } = require('rollup-plugin-eslint');        // 处理eslint

// 共享基础插件配置
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

module.exports = [
  // UMD
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
  },
  // ESM
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/esm/index.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [...basePlugins]
  },
  // CommonJS
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/cjs/index.min.js',
        format: 'cjs',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [...basePlugins]
  }
];