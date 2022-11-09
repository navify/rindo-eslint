/**
 * @fileoverview ESLint rules specific to Rindo JS projects.
 * @author NKDuy
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
import ts from 'typescript';
import { Rule } from 'eslint';
import { rindoComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Rindo Prop names that share names of Global HTML Attributes.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem'
  },

  create(context): Rule.RuleListener {

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    const rindo = rindoComponentContext();
    const parserServices = context.parserServices;
    const typeChecker = parserServices.program.getTypeChecker() as ts.TypeChecker;

    return {
      ...rindo.rules,
      'MethodDefinition[kind=method][key.name=render] ReturnStatement': (node: any) => {
        if (!rindo.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node.argument) as ts.MethodDeclaration;
        const type = typeChecker.getTypeAtLocation(originalNode);
        if (type && type.symbol && type.symbol.escapedName === 'Array') {
          context.report({
            node: node,
            message: `Avoid returning an array in the render() function, use <Host> instead.`
          });
        }
      }
    };
  }
};

export default rule;
