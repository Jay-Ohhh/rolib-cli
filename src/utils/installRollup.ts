import execa from 'execa';
import { readJSON, writeJson, writeFile } from 'fs-extra';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { pkgPath, PackageJSON } from './common';
import { rollupConfig } from '@/libConfigs/rollup';
import { Ora } from 'ora';

export async function installRollup(spinner: Ora) {
  try {
    const libs = [
      'rollup',
      'rollup-plugin-typescript2',
      '@rollup/plugin-babel',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-commonjs',
      'rollup-plugin-terser',
      'rollup-plugin-clear',
      'rollup-plugin-progress',
      'rollup-plugin-visualizer',
      'rollup-plugin-copy',
      '@rollup/plugin-json',
      'cross-env',
      'fs-extra',
      '@types/fs-extra',
    ];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install rollup or rollup-related libraries'));
    process.exit();
  }

  try {
    await writeFile('rollup.config.ts', rollupConfig);

    const pkg: PackageJSON = await readJSON(pkgPath);

    pkg['main'] = 'dist/index.js';
    pkg['module'] = 'dist/index.esm.js';
    pkg['typings'] = 'dist/src/index.d.ts';
    pkg.scripts['start'] = 'cross-env NODE_ENV=development rollup -c rollup.config.ts --configPlugin typescript2 -w';
    pkg.scripts['build'] = 'cross-env NODE_ENV=production rollup -c rollup.config.ts --configPlugin typescript2';
    pkg['files'] = ['dist', 'bin'];

    await writeJson(pkgPath, pkg, { spaces: 2 });
    spinner.clear();
    console.log(symbols.success, 'Set the rollup configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to set the rollup configuration.'));
  }
}
