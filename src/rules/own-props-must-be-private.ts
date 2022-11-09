import { Rule } from 'eslint';
import { isPrivate, rindoComponentContext, rindoDecorators } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches own class attributes marked as public.',
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
      'ClassProperty': (node: any) => {
        if (!rindo.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const rindoDecorator = originalNode.decorators && originalNode.decorators.some(
            (dec: any) => rindoDecorators.includes(dec.expression.expression.escapedText));
        if (!rindoDecorator && !isPrivate(originalNode)) {
          context.report({
            node: node,
            message: `Own class properties cannot be public`,

          });
        }
      }
    };
  }
};

export default rule;
