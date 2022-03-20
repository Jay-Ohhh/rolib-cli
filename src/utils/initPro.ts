// 初始化项目
import shell from 'shelljs';
import { red, blue, cyan, bold, green } from 'chalk';
import symbols from 'log-symbols';
import { pathExists, readJson, writeJson } from 'fs-extra';
import { pkgPath, PackageJSON } from './common';
import { installMethods } from './index';
import inquirer from 'inquirer';
import clear from 'console-clear';
import { initGit } from './initGit';
import ora from 'ora';

/**
 * 初始化项目目录
 */
export async function initProjectDir(projectName: string) {
  const exists = await pathExists(projectName);
  if (exists) {
    console.log(symbols.error, red('The project already exists in the workspace.'));
    process.exit();
  }
  if (/[\u4E00-\u9FFF]+/.test(projectName) || /[A-Z]+/.test(projectName)) {
    // npm 包名不支持大写字母和中文
    console.log(symbols.error, red('项目名称需由小写英文组成'));
    process.exit();
  }

  const name = projectName.toLocaleLowerCase(); // 项目名要小写
  // shell.exec(`mkdir ${name} && cd ${name} && npm init -y && mkdir src && touch src/index.ts`) 这种形式会报错，且node进程不会进入到对应的目录
  shell.exec(`mkdir ${name}`);
  shell.cd(name);
  shell.exec('npm init -y');
  shell.exec('mkdir src');
  shell.touch('src/index.ts');

  try {
    const pkg: PackageJSON = await readJson(pkgPath);
    pkg['name'] = name;
    await writeJson(pkgPath, pkg, { spaces: 2 });
  } catch (e) {
    console.log(symbols.error, red('Failed to set the "name" field in package.json'));
    process.exit();
  }
}

/**
 * 命令行交互
 */

export async function selectFeature() {
  // 清空命令行
  clear();
  console.log(blue('Start initializing the project:'));

  const questions: inquirer.Answers = [
    {
      type: 'confirm',
      name: 'git',
      message: 'Init a git repository?',
      default: true,
    },
    {
      type: 'checkbox',
      name: 'gitRelated',
      when(answer) {
        return answer.git;
      },
      choices: [
        {
          name: 'Install husky and lint-staged?',
          value: 'HuskyLintStaged',
          checked: true,
        },
        {
          name: 'Install commitizen? (提示 commit message 的规范)',
          value: 'Commitizen',
        },
        {
          name: 'Install commitlint? (校验 commit message)',
          value: 'Commitlint',
        },
      ],
    },
    {
      type: 'confirm',
      name: 'ESlintPrettier',
      message: 'Install Eslint and Prettier?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'SemanticRelease',
      message: 'Install semantic-release? (Fully automated version management and package publishing)',
      default: true,
    },
  ];

  const answers = await inquirer.prompt(questions);
  if (answers.git) {
    await initGit();
  }
  // 默认安装 TypeScript、Babel、Rollup
  const features = ['TypeScript', 'Babel', 'Rollup', ...(answers.gitRelated || [])];

  const confirmIds: string[] = [];

  questions.slice(1).forEach(q => {
    q.type === 'confirm' && confirmIds.push(q.name);
  });

  confirmIds.forEach(v => {
    answers[v] && features.push(v);
  });

  await installFeatures(features);
}

/**
 * 安装用户选择的功能
 * @param features 功能列表
 */
export async function installFeatures(features: string[]) {
  const spinner = ora(blue('')).start();
  try {
    for (let i = 0; i < features.length; i++) {
      const fun = installMethods[`install${features[i]}`];
      if (fun) {
        spinner.text = `Installing ${features[i]}...\n`;
        await fun?.(spinner);
      }
    }
    spinner.succeed(green('Install successfully.'));
  } catch (e) {
    console.log(e);
    // 下载失败提示
    spinner.fail(red(`Download failed.\n${e}`));
    // 当你镜像链接处于 404 或者其他状态，它会返回你相应的报错信息并退出进程
    process.exit();
  }
}

/**
 * 整个项目安装结束，给用户提示信息
 */
export function end(projectName: string): void {
  const name = projectName.toLocaleLowerCase();
  console.log(`Successfully created project: ${bold(blue(name))}`);
  console.log('Get started with the following commands:');
  console.log(`${cyan('cd ' + name)}`);
  console.log(`${cyan('npm start')}\n`);
}
