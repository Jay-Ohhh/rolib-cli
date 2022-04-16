<h1 align="center">rolib-cli 🎉</h3>
<p align="center">A rollup cli : create a dev-environment includes Rollup, TypeScrit, Babel, Git, ESlint, Prettier...</p>
<p align="center">
  <a href="https://www.npmjs.com/package/rolib-cli" target="_blank"><img alt="Version" src="https://img.shields.io/npm/v/rolib-cli.svg" /></a>
  <a href="https://www.npmjs.com/package/rolib-cli" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/rolib-cli.svg?color=blue"/></a>
  <a href="https://github.com/Jay-Ohhh/rolib-cli/blob/master/LICENSE" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/Jay-Ohhh/rolib-cli" /></a>
</p>


## 🚀 Quick Start

```shell
npx rolib-cli my-app
cd my-app
npm start
```

> If you've previously installed  `rolib-cli`  globally via  `npm install -g rolib-cli` , we recommend you uninstall the package using  `npm uninstall -g rolib-cli`  or  `yarn global remove rolib-cli`  to ensure that  `npx`  always uses the latest version.

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*

## 🎨 Output

```
my-app
 ├─ .git/
 ├─ .husky/
 ├─ node_modules/
 ├─ src
 │ └─ index.ts
 ├─ .cz-config.js
 ├─ .eslintignore
 ├─ .eslintrc.js
 ├─ .gitignore
 ├─ .prettierignore
 ├─ .prettierrc.js
 ├─ babel.config.js
 ├─ commitlint.config.js
 ├─ package-lock.json
 ├─ package.json
 ├─ rollup.config.ts
 └─ tsconfig.json
```

## ✏️ extend

**We can add some dev-libs by enriching installFeatures.**

**Example**

```typescript
// src/utils/installName.ts
// you need to prefix "install" in the filename
// "Name" is the value that user select feature via inquirer.prompt

export async function installName(){
    // code...
}
```

```typescript
// src/utils/index.ts

import { installName } from './installName'

export const installMethods = {
    installName,
}
```

```typescript
// src/utils/initPro.ts

export async function selectFeature() {
    const questions: inquirer.Answers = [
        {
          type: 'checkbox',
          name: 'multiple',
          choices: [
            {
              name: 'Install Name1?',
              value: 'Name1',  // relate to installName1
              checked: true,
            },
            {
              name: 'Install Name2?',
              value: 'Name2', // relate to installName2
            },
          ],
        },
        {
          type: 'confirm',
          name: 'Name3',
          message: 'Install Name3 ?', // relate to installName3
          default: true,
        },
    ];
    const answers = await inquirer.prompt(questions);

    const features = [...(answers.multiple|| [])]; // type checkbox

    const confirmIds: string[] = []; // type confirm

    questions.slice(1).forEach(q => {
        q.type === 'confirm' && confirmIds.push(q.name);
    });

    confirmIds.forEach(v => {
        answers[v] && features.push(v);
    });

    await installFeatures(features);
}
```

## 👔 Author

**Jay-Ohhh**

* Website: [Jay-Ohhh (Jay-Ohhh) · GitHub](https://github.com/Jay-Ohhh)
* Github: [@Jay-Ohhh](https://github.com/Jay-Ohhh)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page]([Issues · Jay-Ohhh/rolib-cli · GitHub](https://github.com/Jay-Ohhh/rolib-cli/issues)). You can also take a look at the [contributing guide](https://github.com/Jay-Ohhh/rolib-cli/blob/master/CONTRIBUTING.md).

## ✨ Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Jay-Ohhh](https://github.com/Jay-Ohhh).

This project is [MIT](https://github.com/Jay-Ohhh/anchor-scroll-menu/blob/master/LICENSE) licensed.
