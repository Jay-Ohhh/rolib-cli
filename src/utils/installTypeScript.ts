import execa from 'execa'; // 使用5.x版本，支持commonjs
import { readJson, writeJson } from 'fs-extra';
import { red } from 'chalk';
import symbols from 'log-symbols'; // 使用4.x版本，支持commonjs
import { pkgPath, PackageJSON } from './common';
import tsConfig from '@/libConfigs/ts.json';
import { Ora } from 'ora';

export async function installTypeScript(spinner: Ora) {
  try {
    const libs = ['typescript', 'tslib', '@types/node', 'ts-node', 'nodemon'];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install TypeScript or ts-related libraries'));
    process.exit();
  }

  try {
    // 仅用来开发js库的话使用 ts-node + nodemon 调试
    await writeJson(`tsconfig.json`, tsConfig, { spaces: 2 });
    const pkg: PackageJSON = await readJson(pkgPath);
    pkg.scripts['dev'] = 'nodemon -x ts-node --files src/index';
    pkg.scripts['build:types'] = 'tsc --emitDeclarationOnly --noEmit false';
    await writeJson(pkgPath, pkg, { spaces: 2 });
    spinner.clear();
    console.log(symbols.success, 'Set the TypeScript configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(e);
    console.log(symbols.error, red('Failed to set the TypeScript configuration'));
    process.exit();
  }
}
