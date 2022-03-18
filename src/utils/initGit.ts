import shell from 'shelljs';
import { writeFile } from 'fs-extra';
import { red } from 'chalk';
import symbols from 'log-symbols';

export async function initGit() {
  if (
    // shell.exec 同步执行
    // 初始化 git 仓库
    shell.exec('git init').code !== 0
  ) {
    console.log(symbols.error, red('Failed to init Git'));
    process.exit();
  }

  try {
    const gitignore = ['/node_modules', '/dist', '/out'];
    await writeFile(`.gitignore`, gitignore.join('\n'));
  } catch (e) {
    console.log(symbols.error, red('Failed to set a .gitignore or .gitattributes file'));
    process.exit();
  }
}
