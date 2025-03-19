import { renderV3, screen } from '@@/test-utils';
import { CreateCard } from './CreateCard';

jest.mock('../../../actions/create-block', () => ({
  createBlock: jest.fn()
}));

describe('CreateCard', () => {
  it('should render', () => {
    renderV3(
      <CreateCard
        blockMetadata={{
          id: 'course',
          name: 'Course',
          description: 'Course',
          icon: 'user',
          organizational: false,
          root: true,
          allowedChildren: []
        }}
        missionPartnerId="1"
      />
    );

    expect(screen.getAllByText('Course')).toHaveLength(2);
    // Jest does not allow me to test the create block action here.
  });
});
