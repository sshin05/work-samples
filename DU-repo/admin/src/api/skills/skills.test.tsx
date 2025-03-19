import { useQuery } from '@apollo/client';
import { useFindSkillById } from './useFindSkillById';
import { render, screen, fireEvent } from '@@/test-utils';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

describe('useFindSkillById', () => {
  const SkillsComponent = () => {
    const { skillsById, refetchSkill } = useFindSkillById('id');

    refetchSkill('id');

    return (
      <>
        <p>{skillsById.title}</p>
        <button type="button" onClick={() => refetchSkill('id')}>
          Fetch Skills
        </button>
      </>
    );
  };
  it('should use groups hook without error', () => {
    const mockRefetch = jest.fn();

    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: {
        findSkillById: { title: 'test1' }
      },
      refetch: mockRefetch
    });

    render(<SkillsComponent />);
    expect(screen.getByText('test1')).toBeInTheDocument();

    const button = screen.getByText('Fetch Skills');
    fireEvent.click(button);
    expect(mockRefetch).toHaveBeenCalled();
  });
});
