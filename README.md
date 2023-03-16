<h1 align="center">Welcome to switch-case 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/switch-case" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/switch-case.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/OmgImAlexis" target="_blank">
    <img alt="Twitter: OmgImAlexis" src="https://img.shields.io/twitter/follow/OmgImAlexis.svg?style=social" />
  </a>
</p>

> A functional approach to switches

## Install

```sh
npm install @omgimalexis/switch-case
```
 
## Usage

The latest release now supports both `require` and `import` JavaScript syntax, and provides a more complete TypeScript system. This gives your editor super powers like more exhaustive types and intellisense when used with more advanced features like `as const`. Functional switches will return their real case type; you can use the library synchronously for every non-async case.

```typescript
import { Switch } from '@omgimalexis/switch-case'

const { Case } = Switch({
  a: 1,
  b: 2,
  default: async () => 3 as const
} as const)

// Returns selected case
const result1 = Case('a');
//    ^ const result1: 1

console.log(result1)
// Expected: 1

// Returns default case when selected isn't found
const result2 = await Case('z');
//    ^ const result2: 3

console.log(result2)
// Expected: 3
```

The version `0.0.3` style of switch case function is still available for migration so your projects just work. It also benefits from the new type system!
 
```js
const switchCase = require('@omgimalexis/switch-case').default;

// Returns selected case
{
  const case = 'a';
  const result = await switchCase({
    a: 1,
    b: 2,
    default: 3
  }, case);

  // result = 1
}

// Returns default case when selected isn't found
{
  const case = 'z';
  const result = await switchCase({
    a: 1,
    b: 2,
    default: 3
  }, case);

  // result = 3
}

// Allows functions
{
  const case = 'a';
  const result = await switchCase({
    a: () => 1,
    b: 2,
    default: 3
  }, case);

  // result = 1
}

// Allows async functions
{
  const case = 'a';
  const result = await switchCase({
    a: async () => 1,
    b: 2,
    default: 3
  }, case);

  // result = 1
}
```

## Run tests

```sh
npm run test
```

## Author

👤 **Alexis Tyler <xo@wvvw.me> (https://wvvw.me/)**

* Website: https://wvvw.me
* Twitter: [@OmgImAlexis](https://twitter.com/OmgImAlexis)
* Github: [@OmgImAlexis](https://github.com/OmgImAlexis)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/omgimalexis/switch-case).

## Show your support

Give a ⭐️ if this project helped you!
