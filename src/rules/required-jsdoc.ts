import { Rule } from 'eslint';
import { getDecorator, rindoComponentContext } from '../utils';

const DECORATORS = ['Prop', 'Method', 'Event'];
const INVALID_TAGS = ['type', 'memberof'];

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Rindo Props and Methods using jsdoc.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'layout'
  },

  create(context): Rule.RuleListener {
    const rindo = rindoComponentContext();

    const parserServices = context.parserServices;

    function getJSDoc(node: any) {
      if (!rindo.isComponent()) {
        return;
      }

      DECORATORS.forEach((decName) => {
        if (getDecorator(node, decName)) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
          const jsDoc = originalNode.jsDoc;
          const isValid = jsDoc && jsDoc.length;
          const haveTags = isValid &&
              jsDoc.some((jsdoc: any) => jsdoc.tags && jsdoc.tags.length && jsdoc.tags.some(
                  (tag: any) => INVALID_TAGS.includes(tag.tagName.escapedText.toLowerCase())));
          if (!isValid) {
            context.report({
              node: node,
              message: `The @${decName} decorator must be documented.`
            });
          } else if (haveTags) {
            context.report({
              node: node,
              message: `The @${decName} decorator have not valid tags (${INVALID_TAGS.join(', ')}).`
            });
          }
        }
      });
    }

    return {
      ...rindo.rules,
      'ClassProperty': getJSDoc,
      'MethodDefinition[kind=method]': getJSDoc
    };
  }
};

export default rule;
