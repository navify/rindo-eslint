import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, rindoComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Rindo Methods marked as private or protected.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem'
  },

  create(context): Rule.RuleListener {
    const rindo = rindoComponentContext();
    const parserServices = context.parserServices;
    return {
      ...rindo.rules,
      'MethodDefinition[kind=method]': (node: any) => {
        if (rindo.isComponent() && getDecorator(node, 'Method')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            context.report({
              node: node,
              message: `Class methods decorated with @Method() cannot be private nor protected`
            });
          }
        }
      }
    };
  }
};

export default rule;
