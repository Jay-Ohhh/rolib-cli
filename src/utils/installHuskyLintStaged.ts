import execa from 'execa';
import { readJson, writeJson } from 'fs-extra';
import { pkgPath, PackageJSON } from './common';
import { red } from 'chalk';
import symbols from 'log-symbols';
import { Ora } from 'ora';

export async function installHuskyLintStaged(spinner: Ora) {
  try {
    const libs = ['husky', 'lint-staged'];
    await execa('git init');
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install husky and lint-staged'));
    process.exit();
  }

  try {
    // 改写 package.json
    const packageJson: PackageJSON = await readJson(pkgPath);

    packageJson.scripts['prepare'] = 'husky install';
    if (packageJson.scripts['lint']) {
      // 需要先按照 eslint 和 prettier
      packageJson['lint-staged'] = {
        'src/**': ['npm run lint'],
      };
    }

    await writeJson(pkgPath, packageJson, { spaces: 2 });

    await execa('npm run prepare');
    if (packageJson['lint-staged']) {
      await execa('npx husky add .husky/pre-commit "npx lint-staged"').catch(e => {
        console.log(e.stderr);
        console.log(symbols.error, red('Failed to add a git hook(pre-commit) by husky'));
        process.exit();
      });
    }

    spinner.clear();
    console.log(symbols.success, 'Set the husky and lint-staged configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to husky and lint-staged configuration'));
    process.exit();
  }
}
