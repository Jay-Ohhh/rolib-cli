import execa from 'execa'; // 使用execa@5.x版本，支持commonjs
import { writeFile } from 'fs-extra';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { semanticConfig } from '@/libConfigs/semantic-release';
import { Ora } from 'ora';

export async function installSemanticRelease(spinner: Ora) {
  try {
    const libs = [
      'semantic-release',
      '@semantic-release/changelog',
      '@semantic-release/git',
      'conventional-changelog-conventionalcommits',
    ];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install semantic-release or related libraries'));
    process.exit();
  }

  try {
    await writeFile(`.releaserc.js`, semanticConfig);

    spinner.clear();
    console.log(symbols.success, 'Set the semantic-release configuration successfully');
    console.log(symbols.info, 'And you can create a CI(Github Actions, etc...) to make a release');
    spinner.render();
  } catch (e) {
    console.log(e);
    console.log(symbols.error, red('Failed to set the semantic-release configuration'));
    process.exit();
  }
}
