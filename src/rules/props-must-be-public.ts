import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, rindoComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Rindo Props marked as private or protected.',
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
        if (rindo.isComponent() && getDecorator(node, 'Prop')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            context.report({
              node: node,
              message: `Class properties decorated with @Prop() cannot be private nor protected`
            });
          }
        }
      }
    };
  }
};

export default rule;