import { Rule } from 'eslint';
import ts from 'typescript';
import { isPrivate, rindoComponentContext, rindoDecorators, rindoLifecycle } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches own class methods marked as public.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem',
  },

  create(context): Rule.RuleListener {
    const rindo = rindoComponentContext();

    const parserServices = context.parserServices;
    return {
      ...rindo.rules,
      'MethodDefinition[kind=method]': (node: any) => {
        if (!rindo.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const rindoDecorator = originalNode.decorators && originalNode.decorators.some(
            (dec: any) => rindoDecorators.includes(dec.expression.expression.escapedText));
        const rindoCycle = rindoLifecycle.includes(originalNode.name.escapedText);
        if (!rindoDecorator && !rindoCycle && !isPrivate(originalNode)) {
          context.report({
            node: node,
            message: `Own class methods cannot be public`
          });
        }
      }
    };
  }
};

export default rule;
