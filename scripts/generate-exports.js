/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function generateExports() {
  const srcDir = path.resolve(__dirname, '../src');
  const exports = {
    '.': {
      import: './dist/esm/index.js',
      require: './dist/cjs/index.js',
      types: './dist/types/index.d.ts'
    },
    './package.json': './package.json'
  };

  // 获取所有模块目录
  const modules = fs.readdirSync(srcDir)
    .filter(item => {
      const stat = fs.statSync(path.join(srcDir, item));
      return stat.isDirectory() &&
        !['__tests__', '__mocks__', 'node_modules', 'dist'].includes(item) &&
        fs.existsSync(path.join(srcDir, item, 'index.ts'));
    });

  // 为每个模块添加导出
  for (const module of modules) {
    // 模块主入口
    exports[`./${module}`] = {
      import: `./dist/esm/${module}/index.js`,
      require: `./dist/cjs/${module}/index.js`,
      types: `./dist/types/${module}/index.d.ts`
    };

    // 模块子文件（使用通配符）
    const moduleDir = path.join(srcDir, module);
    const files = fs.readdirSync(moduleDir)
      .filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('.d.ts'));

    if (files.length > 0) {
      exports[`./${module}/*`] = {
        import: `./dist/esm/${module}/*.js`,
        require: `./dist/cjs/${module}/*.js`,
        types: `./dist/types/${module}/*.d.ts`
      };
    }
  }

  // 根目录下的单文件
  const rootFiles = fs.readdirSync(srcDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts' && !f.endsWith('.d.ts'));

  if (rootFiles.length > 0) {
    exports['./*'] = {
      import: './dist/esm/*.js',
      require: './dist/cjs/*.js',
      types: './dist/types/*.d.ts'
    };
  }

  return exports;
}

function updatePackageJson() {
  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  packageJson.exports = generateExports();

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  );

  console.log('✅ package.json exports 已更新');
  console.log('📦 导出配置:');
  Object.keys(packageJson.exports).forEach(key => {
    console.log(`  ${key}`);
  });
}

updatePackageJson();