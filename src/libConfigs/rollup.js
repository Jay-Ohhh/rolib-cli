// 注意 特殊字符的转义，例如 \
export const rollupConfig = `import { RollupOptions } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';
import progress from 'rollup-plugin-progress';
import { visualizer } from 'rollup-plugin-visualizer';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const options: RollupOptions[] = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'auto',
        plugins: [
          // put it the last one
          isProd &&
            visualizer({
              filename: './out/report-cjs.html',
              open: true,
              gzipSize: true,
            }),
        ],
      },
      {
        file: pkg.module,
        format: 'es',
        plugins: [
          // put it the last one
          isProd &&
            visualizer({
              filename: './out/report-esm.html',
              open: true,
              gzipSize: true,
            }),
        ],
      },
    ],
    plugins: [
      clear({
        // required, point out which directories should be clear.
        targets: ['dist', 'out'], // 清空 out，否则visualizer会打开之前已存在的html
        // optional, whether clear the directores when rollup recompile on --watch mode.
        watch: true, // default: false
      }),
      progress({
        clearLine: true, // default: true
      }),
      copy({
        targets: [],
      }),
      json(),
      resolve({
        // default:true，需要显式设置来避免warning
        // true: 同名模块优先选择内置模块，例如（fs、path）
        // false: 同名模块优先选择安装的模块
        preferBuiltins: true,
      }),
      commonjs(),
      typescript(),
      babel({
        include: 'src/**/*',
        exclude: '**/node_modules/**',
        babelHelpers: 'runtime', // 构建库时使用
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
      isProd &&
        terser({
          compress: {
            // https://github.com/terser/terser
            // 默认会去掉debugger
            // drop_console: true, // 去掉console
            // pure_funcs:['console.log'] // 如果只想去除console.log，而不想去除console.info
          },
        }),
    ],
    // 注意 outpput.globals 也要添加对应的值
    external: [
      // @ts-ignore
      ...Object.keys(pkg.dependencies || {}),
      // @ts-ignore
      ...Object.keys(pkg.peerDependencies || {}),
      /@babel\\/runtime/,
    ], //  babelHelpers:'runtime' 使用
  },
];

export default options;
`;
