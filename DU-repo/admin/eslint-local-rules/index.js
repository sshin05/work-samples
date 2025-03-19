'use strict';

const noNextRouter = require('./noNextRouter');

/**
 * To add new custom rules:
 * 1. Create a new file in this directory
 * 2. Export a rule object as per the other examples
 * 3. Add the rule to the module.exports object below
 * 4. Add the rule to the .eslintrc.js file in the rules object
 */
module.exports = {
  'no-next-router': noNextRouter,
  'no-test-ids': require('./noTestIdsInSrcFolder')
  // Not yet: 'validate-cerberus-imports': require('./validateCerberusImports')
  // Not yet: 'no-carbon-icons': require('./noCarbonIcons')
};
