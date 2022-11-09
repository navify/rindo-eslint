import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, rindoComponentContext } from '../utils';

const varsList = new Set<string>();

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Rindo Watch for not defined variables in Prop or State.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'suggestion'
  },

  create(context): Rule.RuleListener {
    const rindo = rindoComponentContext();

    const parserServices = context.parserServices;

    function getVars(node: any) {
      if (!rindo.isComponent()) {
        return;
      }
      const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const varName = originalNode.parent.name.escapedText;
      varsList.add(varName);
    }

    function checkWatch(node: any) {
      if (!rindo.isComponent()) {
        return;
      }
      const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const varName = originalNode.expression.arguments[0].text;
      if (!varsList.has(varName)) {
        context.report({
          node: node,
          message: `Watch decorator @Watch("${varName}") is not matching with any @Prop() or @State()`,
        });
      }
    }

    return {
      'ClassDeclaration': rindo.rules.ClassDeclaration,
      'ClassProperty > Decorator[expression.callee.name=Prop]': getVars,
      'ClassProperty > Decorator[expression.callee.name=State]': getVars,
      'MethodDefinition[kind=method] > Decorator[expression.callee.name=Watch]': checkWatch,
      'ClassDeclaration:exit': (node: any) => {
        if (!rindo.isComponent()) {
          return;
        }
        rindo.rules['ClassDeclaration:exit'](node);
        varsList.clear();
      }
    };
  }
};

export default rule;
