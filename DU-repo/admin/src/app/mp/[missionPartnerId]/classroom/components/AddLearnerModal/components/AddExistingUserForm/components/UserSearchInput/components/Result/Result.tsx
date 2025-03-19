import type { User } from '../../UserSearchInput.types';
import { css } from '@cerberus/styled-system/css';

export const Result = ({
  user,
  onUserSelect
}: {
  user: User;
  onUserSelect: (user: User) => void;
}) => {
  const email = user.email || '';
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';

  const hasName = Boolean(firstName) || Boolean(lastName);
  const nameDisplay = hasName ? `| ${firstName} ${lastName}` : '';

  const resultText = `${email} ${nameDisplay}`.trim();
  const fallbackText = 'User Not Found';

  return (
    <h4
      onClick={() => {
        onUserSelect(user);
      }}
      className={css({
        pl: [15, 25, 25],
        fontSize: [16, 18, 18],
        fontFamily: 'sans-serif',
        color: 'page.text.300',
        py: ['7px', '5px', '5px'],
        mb: '1',
        _hover: { color: 'page.text.100', cursor: 'pointer' }
      })}
    >
      {resultText || fallbackText}
    </h4>
  );
};
