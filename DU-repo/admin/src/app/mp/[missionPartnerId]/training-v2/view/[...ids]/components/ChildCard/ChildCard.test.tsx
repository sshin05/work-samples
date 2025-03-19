import { renderV3, screen, userEvent } from '@@/test-utils';
import { ChildCard } from './ChildCard';
import type { Blocks } from '@digital-u/services/block/types';
import { useRouter, useParams } from 'next/navigation';

jest.mock('../../../../actions/delete-block', () => ({
  deleteBlock: jest.fn()
}));

jest.mock('next/navigation');

describe('ChildCard', () => {
  const mockBlock: Blocks = {
    id: '1',
    type: 'module',
    title: 'Module 1',
    missionPartnerId: '1',
    children: [],
    status: 'draft',
    _idx: 0,
    _createdAt: new Date(),
    _updatedAt: new Date(),
    _table: 'blocks',
    competencies: [],
    description: 'Module 1 description',
    durationInMinutes: 10,
    masteryLevel: null,
    version: null,
    versionId: null
  };

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    (useParams as jest.Mock).mockReturnValue({
      ids: ['1']
    });
  });

  it('should render', () => {
    renderV3(<ChildCard child={mockBlock} />);

    expect(screen.getByText('Module 1')).toBeInTheDocument();
  });

  it('should navigate to child', () => {
    const { container } = renderV3(<ChildCard child={mockBlock} />);

    userEvent.click(container.querySelector('div'));

    expect(mockPush).toHaveBeenCalledWith('/mp/1/training-v2/view/1/1');
  });
});
