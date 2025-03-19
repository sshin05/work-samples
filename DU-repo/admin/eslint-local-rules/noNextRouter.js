module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow usage of next/router in favor of next/navigation',
      recommended: false
    },
    messages: {
      avoidNextRouter: 'Avoid using next/router. Use next/navigation instead.'
    },
    fixable: null,
    schema: []
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (importPath === 'next/router') {
          context.report({
            node,
            messageId: 'avoidNextRouter'
          });
        }
      }
    };
  }
};
