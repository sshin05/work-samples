import { useQuery } from '@apollo/client';
import { useCountAllCourses } from './useCountAllCourses';
import { render, screen } from '@@/test-utils';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useCountAllCourses', () => {
  const TestComponent = () => {
    const { countAllCourses } = useCountAllCourses();

    return <p>{countAllCourses}</p>;
  };
  it('should use groups hook without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        countAllCourses: { total: 205 }
      }
    });

    render(<TestComponent />);
    expect(screen.getByText('205')).toBeInTheDocument();
  });
});
