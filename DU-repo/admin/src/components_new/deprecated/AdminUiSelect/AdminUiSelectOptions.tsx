import React from 'react';

const AdminUiSelectOptions = ({ options }) =>
  options.map(option => {
    if (option.options) {
      return (
        <optgroup key={option.label} label={option.label}>
          {option.options.map(({ value, label, selected }) => (
            <option key={label} value={value} selected={selected || false}>
              {label}
            </option>
          ))}
        </optgroup>
      );
    }

    return (
      <option
        key={option.value}
        value={option.value}
        selected={option.selected || false}
      >
        {option.label}
      </option>
    );
  });

export default AdminUiSelectOptions;
