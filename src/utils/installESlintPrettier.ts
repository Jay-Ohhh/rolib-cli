import execa from 'execa';
import { writeFile, readJson, writeJson } from 'fs-extra';
import { pkgPath, PackageJSON } from './common';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { eslintrc } from '@/libConfigs/eslint';
import { prettierrc } from '@/libConfigs/prettier';
import { Ora } from 'ora';

/**
 * 安装eslint和prettier
 */
export async function installESlintPrettier(spinner: Ora) {
  try {
    const libs = [
      'eslint',
      '@typescript-eslint/parser',
      'prettier',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
    ];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install eslint and prettier'));
    process.exit();
  }

  try {
    // 写入.eslintrc.js
    await writeFile(`.eslintrc.js`, eslintrc);
    // 写入.prettierrc.js
    await writeFile(`.prettierrc.js`, prettierrc);
    await writeFile(`.eslintignore`, 'dist');
    await writeFile(`.prettierignore`, ['dist', 'node_modules'].join('\n'));
    // 改写 package.json
    const packageJson: PackageJSON = await readJson(pkgPath);
    packageJson.scripts['lint'] = 'eslint src --fix --ext .js,.jsx,.ts,.tsx';
    // spaces <Number> | <String>: 缩进，数字或用来缩进的转义字符
    await writeJson(pkgPath, packageJson, { spaces: 2 });
    spinner.clear();
    console.log(symbols.success, 'Set the lint configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to set the lint configuration'));
    process.exit();
  }
}
