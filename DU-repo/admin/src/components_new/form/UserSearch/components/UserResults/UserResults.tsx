import { UserResult } from './components/UserResult';

export const UserResults = ({ results, selectUser, searchTerm }) => {
  return (
    <div>
      {results?.length &&
        results.map((result, index) => {
          return (
            <UserResult
              key={index}
              user={result}
              selectUser={selectUser}
              searchTerm={searchTerm}
            />
          );
        })}
    </div>
  );
};
