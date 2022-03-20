/**
 * 各个功能的安装方法，方法名前缀 installXxx
 */
import { installESlintPrettier } from './installESlintPrettier';
import { installHuskyLintStaged } from './installHuskyLintStaged';
import { installCommitizen } from './installCommitizen';
import { installCommitlint } from './installCommitlint';
import { installTypeScript } from './installTypeScript';
import { installBabel } from './installBabel';
import { installRollup } from './installRollup';
import { installSemanticRelease } from './installSemanticRelease';

export const installMethods = {
  installESlintPrettier,
  installHuskyLintStaged,
  installCommitizen,
  installCommitlint,
  installTypeScript,
  installBabel,
  installRollup,
  installSemanticRelease,
};
