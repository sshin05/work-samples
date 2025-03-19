import { useState } from 'react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { TextInput } from '@/components_new/form';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';

export const EditTitleModal = ({
  onSubmit,
  onClose,
  initialValue,
  label = 'Title'
}) => {
  const [title, setTitle] = useState(initialValue);

  const handleSubmit = () => {
    onSubmit(title);
    onClose();
  };

  return (
    <div className={vstack({ gap: '10', alignItems: 'flex-start' })}>
      <TextInput
        className={css({ w: '31rem' })}
        name="title"
        label={label}
        onChange={e => {
          setTitle(e.target.value);
        }}
        defaultValue={initialValue}
        required
      />
      <div
        className={hstack({
          gap: '4',
          w: 'full',
          justifyContent: 'space-between'
        })}
      >
        <Button
          className={css({ w: 'full' })}
          palette="action"
          shape="rounded"
          usage="filled"
          type="submit"
          disabled={!title}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          className={css({ w: 'full' })}
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
