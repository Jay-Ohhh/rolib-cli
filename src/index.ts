import { program } from 'commander';
import pkg from '../package.json';
import { updateChk } from '@/order/upgrade';
import { create } from '@/order/create';

// 本库的version命令
program.version(pkg.version, '-v', '--version');

// upgrade 检测更新
program
  // 声明的命令
  .command('upgrade')
  // 描述信息，在帮助信息时显示
  .description('Check the js-plugin-cli version.')
  .action(() => {
    // 执行 lib/update.js 里面的操作
    updateChk();
  });

// 创建项目
// name 和 usage 通过这两个选项可以修改帮助信息(--help)的首行提示
// <required> or [optional]
program
  .name('owj-lib-cli')
  .usage('<commands> [options]')
  .command('create <app-name>')
  .description('Create a new project')
  .action(project => {
    create(project);
  });

// 解析命令行参数，需放在最后
program.parse(process.argv);
