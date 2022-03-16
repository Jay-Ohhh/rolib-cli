const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        // esm转换成其他模块语法，cjs、amd、umd等
        // Tree Shaking需要设置为false
        modules: false,
        targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'] },
        // when using useBuiltIns: "usage", set the proposals option to true. This will enable polyfilling of every proposal supported by core-js@xxx
        // 按需加载，将 useBuiltIns 改为 "usage"，babel 就可以按需加载 polyfill，并且不需要手动引入 @babel/polyfill，不过@babel/polyfill在7.4.0中被弃用，请使用安装core-js（polyfill类库），并使用corejs选项
        useBuiltIns: 'usage',
        corejs: {
          version: 3, // 需安装 core-js3.x的版本
          proposals: true, // 支持js提案语法
        },
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
