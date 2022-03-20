import execa from 'execa';
import { writeFile } from 'fs-extra';
import { red, yellow } from 'chalk';
import symbols from 'log-symbols';
import { commitlintConfig } from '@/libConfigs/commitlint';
import { Ora } from 'ora';

export async function installCommitlint(spinner: Ora) {
  try {
    const libs = ['@commitlint/cli', '@commitlint/config-conventional'];
    await execa('npm i -D', libs);
  } catch (e: any) {
    console.log(e.stderr);
    console.log(symbols.error, red('Failed to install commitlint'));
    process.exit();
  }
  try {
    await writeFile(`commitlint.config.js`, commitlintConfig);
    await execa('npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"').catch(e => {
      console.log(e.stderr);
      console.log(symbols.error, red('Failed to add a git hook(commit-msg) by husky'));
      console.log(
        yellow(`# Sometimes above command doesn't work in some command interpreters
      # You can try other commands below to write npx --no -- commitlint --edit $1
      # in the commit-msg file.
      npx husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"
      # or
      npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
      
      # or
      yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'`),
      );
      process.exit();
    });
    spinner.clear();
    console.log(symbols.success, 'Set the commitlint configuration successfully');
    spinner.render();
  } catch (e) {
    console.log(symbols.error, red('Failed to the commitlint configuration'));
    process.exit();
  }
}
