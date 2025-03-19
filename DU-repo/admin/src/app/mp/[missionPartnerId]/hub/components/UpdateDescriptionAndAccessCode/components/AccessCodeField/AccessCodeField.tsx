import { css } from '@cerberus/styled-system/css';
import { Copy } from '@cerberus/icons';
import { hstack } from '@cerberus/styled-system/patterns';
import { TextInput } from '@/components_new/form';

export const AccessCodeField = ({ accessCode, helpText, notify }) => {
  const copyToClipboard = () => {
    if (!accessCode) {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'Please add an access code first.'
      });
      return;
    }

    try {
      navigator.clipboard?.writeText(accessCode);
      notify({
        palette: 'success',
        heading: 'Success',
        description: 'Copied to clipboard.'
      });
    } catch {
      notify({
        palette: 'danger',
        heading: 'Error',
        description: 'There was an error copying to clipboard.'
      });
    }
  };

  return (
    <div
      className={hstack({
        gap: '1',
        cursor: 'pointer',
        alignItems: 'flex-start',
        maxW: '27rem'
      })}
      onClick={copyToClipboard}
    >
      <TextInput
        name="accessCode"
        readOnly
        disabled
        label="Access code"
        helpText={helpText}
        value={accessCode || 'xxxx-xxxx-xxxx'}
      />
      <div
        className={css({
          pos: 'relative',
          right: '2rem',
          top: '2.6rem',
          zIndex: 1
        })}
      >
        <Copy />
      </div>
    </div>
  );
};
