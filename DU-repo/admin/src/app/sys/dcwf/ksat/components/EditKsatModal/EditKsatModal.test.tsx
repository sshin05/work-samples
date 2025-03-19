import { renderV3, screen } from '@@/test-utils';
import { EditKsatModal } from './EditKsatModal';
import type { KsatType } from '@/api/codegen/graphql';

jest.mock(
  '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/KsatTab/components/EnterKsatModal',
  () => ({
    EnterKsatModal: () => <div>EnterKsatModal content</div>
  })
);

describe('KsatDetailsPage', () => {
  it('should render', () => {
    renderV3(
      <EditKsatModal
        modal={{
          modalRef: { current: null },
          show: jest.fn(),
          close: jest.fn(),
          isOpen: false
        }}
        ksat={{
          id: '123',
          code: 'TestCode3A',
          ksatType: 'Skill' as KsatType,
          description: 'Test Description Here'
        }}
      />
    );

    expect(screen.getByText('EnterKsatModal content')).toBeInTheDocument();
  });
});
