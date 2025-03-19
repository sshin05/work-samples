// Validates that a fm has all the fields required to be published
const validateForceMultiplier = forceMultiplier => {
  const {
    content: { description, summary, about },
    items
  } = forceMultiplier;

  const errors = [];

  if (!description || description.length === 0) {
    errors.push('Marketing content is required');
  }

  if (!summary) {
    errors.push('Summary is required');
  }

  // eslint-disable-next-line no-negated-condition
  if (!about) {
    errors.push('Marketing content is required');
  } else {
    if (!about.title) {
      errors.push('Marketing content is required');
    }

    if (!about.description) {
      errors.push('Marketing content is required');
    }

    if (about.image === null || about.image === undefined) {
      errors.push('Marketing content is required');
    }
  }

  if (!items || items.length === 0) {
    errors.push('Training items are required');
  }

  return errors;
};

export default validateForceMultiplier;
