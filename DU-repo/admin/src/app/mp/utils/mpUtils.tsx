// Temporarily putting this here until we properly implement the defaultForBranch property
export const DEFAULT_MPS = new Set([
  'Air Force',
  'Space Force',
  'Digital University',
  'DoD',
  'Army',
  'Coast Guard',
  'Navy',
  'Marine Corps'
]);

export const sectionOptions = [
  { label: 'Select a section', value: '' },
  { label: 'Field Command', value: 'FIELD_COMMAND' },
  { label: 'Delta', value: 'DELTA' },
  { label: 'Unit/Squadron', value: 'UNIT_OR_SQUADRON' },
  { label: 'Other', value: 'OTHER' }
];

const getSectionLabel = value => {
  const section = sectionOptions.find(option => option.value === value);
  return section ? section.label : 'Other';
};

export const getSpaceForceSections = filteredMissionPartners => {
  const sections = filteredMissionPartners
    .filter(partner => partner.affiliateId === 'space-force')
    .reduce((sections, partner) => {
      const section = `${getSectionLabel(partner.sectionType)}s`;
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(partner);
      return sections;
    }, {});

  const customOrder = ['Field Commands', 'Deltas', 'Unit/Squadrons', 'Others'];

  const sortedSections = customOrder.reduce((acc, key) => {
    if (key in sections) {
      acc[key] = sections[key];
    }
    return acc;
  }, {});

  return sortedSections;
};
