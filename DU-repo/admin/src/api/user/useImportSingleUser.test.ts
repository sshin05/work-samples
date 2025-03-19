import { useMutation } from '@apollo/client';
import { useImportSingleUser } from './useImportSingleUser';

jest.mock('@apollo/client');

describe('useImportSingleUser', () => {
  it('should return data', () => {
    const data = {
      importSingleUser: {
        id: 'test'
      }
    };

    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally empty
      },
      { loading: false, error: null, data }
    ]);
    const {
      importSingleUserData,
      importSingleUserError,
      importSingleUserLoading,
      importSingleUser
    } = useImportSingleUser();

    expect(importSingleUserData).toEqual({ id: 'test' });
    expect(importSingleUserError).toEqual(null);
    expect(importSingleUserLoading).toEqual(false);
    expect(importSingleUser).toBeInstanceOf(Function);
  });

  it('should return null', () => {
    (useMutation as jest.Mock).mockReturnValue([
      () => {
        // Intentionally empty
      },
      { loading: false, error: null, data: null }
    ]);
    const {
      importSingleUserData,
      importSingleUserError,
      importSingleUserLoading,
      importSingleUser
    } = useImportSingleUser();

    expect(importSingleUserData).toEqual(null);
    expect(importSingleUserError).toEqual(null);
    expect(importSingleUserLoading).toEqual(false);
    expect(importSingleUser).toBeInstanceOf(Function);
  });
});
