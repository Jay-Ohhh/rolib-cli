module.exports = {
  extends: ['git-commit-emoji'],
  /*
   * Any rules defined here will override rules from extends-config
   */
  rules: {
    "type-enum": [2, 'always', ['✨ feat', '🔧 fix', '📝 docs', '🎨 style', '♻️  refactor', '🚀 perf', '🧪 test', '👷 ci', '📦‍ build', '🍻 chore', '💊 revert']]
  },
}