import { useParams } from 'next/navigation';
import { renderHook } from '@@/test-utils';
import { useRouteParams } from '.';

jest.mock('next/navigation');

describe('useRouteParams', () => {
  it('should format parameters as strings', () => {
    (useParams as jest.Mock).mockReturnValue({
      id: 123,
      name: 'test',
      isActive: true
    });

    const { result } = renderHook(() => useRouteParams());

    expect(result.current).toEqual({
      id: '123',
      name: 'test',
      isActive: 'true'
    });
  });

  it('should return only the first element of an array as string', () => {
    (useParams as jest.Mock).mockReturnValue({
      numIds: [123, 456],
      strIds: ['789', '012'],
      name: 'test'
    });

    const { result } = renderHook(() => useRouteParams());

    expect(result.current).toEqual({
      numIds: '123',
      strIds: '789',
      name: 'test'
    });
  });
});
