/**
 * @fileoverview ESLint rules specific to Rindo JS projects.
 * @author NKDuy
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { Rule } from 'eslint';
import { rindoComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches usage of hostData method.',
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
    return {
      ...rindo.rules,
      'MethodDefinition[key.name=hostData]': (node: any) => {
        if (rindo.isComponent()) {
          context.report({
            node: node.key,
            message: `hostData() is deprecated and <Host> should be used in the render function instead.`
          });
        }
      }
    };
  }
};

export default rule;
