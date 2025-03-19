const path = require('path');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow usage of data-testid attributes in React components, except in test files.',
      recommended: false
    },
    messages: {
      avoidTestId:
        'Avoid using data-testid attributes in React components (except in test files).'
    },
    fixable: null,
    schema: []
  },
  create(context) {
    const SRC_PATH = path.resolve('./src');

    return {
      JSXAttribute(node) {
        if (node.name.name === 'data-testid') {
          const filePath = context.getFilename();

          // skip files NOT in ./src --> SRC_PATH
          if (!filePath.startsWith(SRC_PATH)) {
            return;
          }

          // Skip files that have '.test.' in their filename
          if (filePath.includes('.test.')) {
            return;
          }

          context.report({
            node,
            messageId: 'avoidTestId'
          });
        }
      }
    };
  }
};
