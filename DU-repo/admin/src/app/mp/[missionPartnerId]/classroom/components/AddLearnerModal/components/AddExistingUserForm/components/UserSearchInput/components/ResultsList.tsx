import { Button } from '@cerberus/react';
import type { User } from '../UserSearchInput.types';
import { Result } from './Result/Result';
import { css } from '@cerberus/styled-system/css';

export const MORE_RESULTS_TEXT = '20+ matches. Keep typing to narrow results.';
export const CREATE_LEARNER_BUTTON_TEXT = 'Create a new learner';

export const ResultsList = ({
  results,
  onSelectUser,
  onCreateNewUser,
  searchTerm,
  hasMoreResults
}: {
  results: User[];
  onSelectUser: (user: User) => void;
  onCreateNewUser: () => void;
  hasMoreResults: boolean;
  searchTerm: string;
}) => {
  return (
    <div>
      {results?.length > 0 &&
        results.map((result, index) => {
          return (
            <Result key={index} user={result} onUserSelect={onSelectUser} />
          );
        })}

      {!!searchTerm && !!hasMoreResults && (
        <p
          className={css({
            display: 'block',
            fontSize: '.75rem'
          })}
        >
          {MORE_RESULTS_TEXT}
        </p>
      )}

      {searchTerm?.length >= 3 && results?.length < 2 && (
        <Button
          palette="action"
          shape="sharp"
          usage="ghost"
          onClick={e => {
            e.preventDefault();
            onCreateNewUser();
          }}
          className={css({
            w: 'full',
            textAlign: 'left'
          })}
        >
          <div className={css({ w: 'full', textAlign: 'left' })}>
            {CREATE_LEARNER_BUTTON_TEXT}
          </div>
        </Button>
      )}
    </div>
  );
};
