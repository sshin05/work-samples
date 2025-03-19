import { renderV3, screen } from '@@/test-utils';
import CourseMetricsPageHeader from './CourseMetricsPageHeader';

describe('PlanMetricsPageHeader', () => {
  it('renders with name prefix when name is provided', () => {
    const courseName = 'Advanced Math';
    renderV3(<CourseMetricsPageHeader name={courseName} />);

    expect(screen.getByText(`${courseName} | Courses`)).toBeInTheDocument();
  });

  it('renders without name prefix when name is not provided', () => {
    renderV3(<CourseMetricsPageHeader />);

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Courses').textContent).toBe('Courses');
  });
});
