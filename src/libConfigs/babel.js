const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        // esm转换成其他模块语法，cjs、amd、umd等
        // Tree Shaking需要设置为false
        modules: false,
        targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'] },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3, // 需安装 @babel/runtime-corejs3
          proposals: true,
        },
      },
    ], // 用于babel的编译(必须)，将重复的辅助函数自动替换，节省大量体积
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 需要放在@babel/plugin-proposal-class-propertie之前
    ['@babel/plugin-proposal-class-properties', { loose: true }], // 用于解析class语法
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
};

export const babelConfig = `module.exports=${JSON.stringify(config, null, 2)}`;
