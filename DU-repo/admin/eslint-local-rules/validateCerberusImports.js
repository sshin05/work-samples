module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow imports from root-level styled-system in favor of @cerberus/styled-system',
      recommended: false
    },
    messages: {
      avoidStyledSystem:
        'Avoid importing from "{{ importPath }}". Use "@cerberus/styled-system/{{ subPath }}" instead.'
    },
    fixable: null,
    schema: []
  },
  create(context) {
    // folders inside `../admin/styled-system`
    const validSubPaths = [
      'css',
      'jsx',
      'patterns',
      'recipes',
      'themes',
      'tokens',
      'types'
    ];

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;

        if (importPath.startsWith('styled-system/')) {
          const subPath = importPath.split('/')[1];

          if (validSubPaths.includes(subPath)) {
            context.report({
              node,
              messageId: 'avoidStyledSystem',
              data: {
                importPath,
                subPath
              }
            });
          }
        }
      }
    };
  }
};
