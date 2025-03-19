module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow usage of @carbon/icons-react in favor of cerberus icons',
      recommended: false
    },
    messages: {
      avoidCarbonIcons:
        'Avoid using @carbon/icons-react. Use cerberus icons instead.'
    },
    fixable: null,
    schema: []
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (importPath === '@carbon/icons-react') {
          context.report({
            node,
            messageId: 'avoidCarbonIcons'
          });
        }
      }
    };
  }
};
