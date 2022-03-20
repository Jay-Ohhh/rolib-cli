module.exports = {
  extends: ['@commitlint/config-conventional'],
  /*
   * Any rules defined here will override rules from extends-config
   */
  // 0 disables the rule. For 1 it will be considered a warning for 2 an error.
  // always|never: never inverts(取反) the rule.
  rules: { // 要和 .cz-config.js 的 type 保持完全一致
    "type-enum": [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'ci', 'build', 'chore', 'revert']]
  },
}