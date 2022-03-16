import execa from 'execa';
import { writeFile, readJson, writeJson } from 'fs-extra';
import { pkgPath, PackageJSON } from './common';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { czConfig } from '@/libConfigs/cz-config';
import { Ora } from 'ora';

export async function installCommitizen(spinner: Ora) {
  try {
    const libs = ['commitizen', 'cz-customizable'];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install commitizen and cz-customizable'));
    process.exit();
  }

  try {
    const packageJson: PackageJSON = await readJson(pkgPath);
    packageJson.scripts['commit'] = 'cz';
    packageJson['config'] = {
      commitizen: {
        path: './node_modules/cz-customizable',
      },
    };
    await writeJson(pkgPath, packageJson, { spaces: 2 });
    await writeFile(`.cz-config.js`, czConfig);
    spinner.clear();
    console.log(symbols.success, 'Set the commitizen configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to commitizen configuration'));
    process.exit();
  }
}
