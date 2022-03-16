import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import pkg from '../../package.json';

const notifier = updateNotifier({
  // 从 package.json 获取 name 和 version 进行查询
  pkg,
  // updateCheckInterval 默认是 1 天，也就意味着今天检测更新了一次，下一次能进行检测更新的时间点应该为明天同这个时间点之后，否则周期内检测更新都会转到 No new version is available.。
  // 设定检查更新周期，默认为 1000 * 60 * 60 * 24（1 天）
  // 这里设定为 1000 毫秒（1秒）
  updateCheckInterval: 1000,
});

export function updateChk() {
  // 当检测到版本时，notifier.update 会返回 Object
  // 此时可以用 notifier.update.latest 获取最新版本号
  if (notifier.update) {
    notifier.notify(
      `New version available: ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`,
    );
  } else {
    console.log('No new version is available.');
  }
}
