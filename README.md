# @rindo/eslint-plugin

ESLint rules specific to Rindo JS projects.

## Installation

If you're using npm v7+, you only need to install this package. Its peer dependencies will be automatically installed.
```bash
npm i --save-dev @rindo/eslint-plugin
```

If you're using npm v6 or lower, you will need to install this package and its peer dependencies in your rindo project:

```bash
npm i --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react @rindo/eslint-plugin typescript
```

## Usage

`.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@rindo/recommended"
  ]
}
```

Add a new `lint` script to the `package.json`:
```json
{
  "scripts": {
    "lint": "eslint src/**/*{.ts,.tsx}"
  }
}
```

By default, ESLint will ignore your `node_modules/` directory. Consider adding a `.eslintignore` file at the root of
your project with any output target directories to avoid false positive errors from ESLint.
```
# place any directories created by the Rindo compilation process here
dist
loader
www
```

Lint all your project:
```
npm run lint
```

## Supported Rules

- [`@rindo/async-methods`](./docs/async-methods.md)

This rule catches Rindo public methods that are not async.

- [`@rindo/ban-prefix`](./docs/ban-prefix.md)

This rule catches Rindo Component banned tag name prefix.

- [`@rindo/class-pattern`](./docs/class-pattern.md)

This rule catches Rindo Component class name not matching configurable pattern.

- [`@rindo/decorators-context`](./docs/decorators-context.md)

This rule catches Rindo decorators in bad locations.

- [`@rindo/decorators-style`](./docs/decorators-style.md)

This rule catches Rindo decorators style usage.

- [`@rindo/element-type`](./docs/element-type.md)

This rule catches Rindo Element decorator have the correct type.

- [`@rindo/host-data-deprecated`](./docs/host-data-deprecated.md)

This rule catches Rindo method hostData.

- [`@rindo/methods-must-be-public`](./docs/methods-must-be-public.md)

This rule catches Rindo Methods marked as private or protected.

- [`@rindo/no-unused-watch`](./docs/no-unused-watch.md)

This rule catches Rindo Watchs with non existing Props or States.

- [`@rindo/own-methods-must-be-private`](./docs/own-methods-must-be-private.md)

This rule catches own class methods marked as public.

- [`@rindo/own-props-must-be-private`](./docs/own-props-must-be-private.md)

This rule catches own class properties marked as public.

- [`@rindo/prefer-vdom-listener`](./docs/prefer-vdom-listener.md)

This rule catches Rindo Listen with vdom events.

- [`@rindo/props-must-be-public`](./docs/props-must-be-public.md)

This rule catches Rindo Props marked as private or protected.

- [`@rindo/props-must-be-readonly`](./docs/props-must-be-readonly.md)

This rule catches Rindo Props marked as non readonly, excluding mutable ones.

- [`@rindo/render-returns-host`](./docs/render-returns-host.md)

This rule catches Rindo Render returning array instead of Host tag.

- [`@rindo/required-jsdoc`](./docs/required-jsdoc.md)

This rule catches Rindo Props, Methods and Events to define jsdoc.

- [`@rindo/required-prefix`](./docs/required-prefix.md)

This rule catches Rindo Component required tag name prefix.

- [`@rindo/reserved-member-names`](./docs/reserved-member-names.md)

This rule catches Rindo Prop names that share names of Global HTML Attributes.

- [`@rindo/single-export`](./docs/single-export.md)

This rule catches modules that expose more than just the Rindo Component itself.

- [`@rindo/strict-mutable`](./docs/strict-mutable.md)

This rule catches Rindo Prop marked as mutable but not changing value in code.

## Recommended rules

```json
{
  "@rindo/async-methods": "error",
  "@rindo/ban-prefix": ["error", ["rindo"]],
  "@rindo/decorators-context": "error",
  "@rindo/decorators-style": [
    "error", {
      "prop": "inline",
      "state": "inline",
      "element": "inline",
      "event": "inline",
      "method": "multiline",
      "watch": "multiline",
      "listen": "multiline"
    }],
  "@rindo/element-type": "error",
  "@rindo/host-data-deprecated": "error",
  "@rindo/methods-must-be-public": "error",
  "@rindo/no-unused-watch": "error",
  "@rindo/own-methods-must-be-private": "error",
  "@rindo/own-props-must-be-private": "error",
  "@rindo/prefer-vdom-listener": "error",
  "@rindo/props-must-be-public": "error",
  "@rindo/props-must-be-readonly": "error",
  "@rindo/render-returns-host": "error",
  "@rindo/required-jsdoc": "error",
  "@rindo/reserved-member-names": "error",
  "@rindo/single-export": "error",
  "@rindo/strict-mutable": "error"
}
```

## Licence

- [MIT](./LICENSE)
