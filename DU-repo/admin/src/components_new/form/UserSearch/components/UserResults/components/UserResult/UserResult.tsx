import { css } from '@cerberus/styled-system/css';

const styles = {
  resultStyles: css({
    pl: [15, 25, 25],
    fontSize: [16, 18, 18],
    fontFamily: 'sans-serif',
    color: 'page.text.300',
    py: ['7px', '5px', '5px'],
    bg: 'page.bg.initial',
    _hover: { bg: 'action.ghost.hover', cursor: 'pointer' }
  })
};

export const UserResult = ({ user, selectUser, searchTerm }) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <h4
      role="button"
      onClick={() => {
        selectUser(user);
      }}
      className={styles.resultStyles}
    >
      {highlightText(user.email, searchTerm)} |{' '}
      {highlightText(user.firstName, searchTerm)}{' '}
      {highlightText(user.lastName, searchTerm)}
    </h4>
  );
};
