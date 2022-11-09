import { Rule } from 'eslint';
import ts from 'typescript';
import { rindoComponentContext } from '../utils';
import * as tsutils from 'tsutils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule can provide suggestions about dependencies in rindo apps',
      recommended: true
    },
    schema: [],
    type: 'suggestion',
  },

  create(context): Rule.RuleListener {
    return {
      'ImportDeclaration': (node: any) => {
        const importName = node.source.value;
        const message = SUGGESTIONS[importName];
        if (message) {
          context.report({
            node,
            message
          });
        }
      }
    };
  }
};

const SUGGESTIONS: {[importName: string]: string} = {
  'classnames': `Rindo can already render conditional classes:
  <div class={{disabled: condition}}>`,
  'lodash': `"lodash" will bloat your build, use "lodash-es" instead: https://www.npmjs.com/package/lodash-es`,
  'moment': `"moment" will bloat your build, use "dayjs", "date-fns" or other modern lightweight alternaitve`,
  'core-js': `Rindo already include the core-js polyfills only when needed`,
}

export default rule;
