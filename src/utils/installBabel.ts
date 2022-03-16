import execa from 'execa';
import { writeFile } from 'fs-extra';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { babelConfig } from '@/libConfigs/babel';
import { Ora } from 'ora';

export async function installBabel(spinner: Ora) {
  try {
    const libs = [
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
      'core-js@3',
      '@babel/plugin-transform-runtime',
      '@babel/runtime-corejs3',
      '@babel/plugin-proposal-decorators',
      '@babel/plugin-proposal-class-properties',
    ];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install babel or babel-related libraries'));
    process.exit();
  }

  try {
    await writeFile(`babel.config.js`, babelConfig);
    spinner.clear();
    console.log(symbols.success, 'Set the babel configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to set the babel configuration'));
    process.exit();
  }
}
