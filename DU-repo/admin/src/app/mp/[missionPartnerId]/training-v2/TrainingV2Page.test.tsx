import type { Blocks } from '@digital-u/services/block/types';
import { renderV3, screen } from '@@/test-utils';
import TrainingV2Page from './page';

jest.mock('@digital-u/services/block/find-blocks', () => ({
  findBlocks: jest.fn()
}));

describe('TrainingV2Page', () => {
  const mockParams = jest.fn().mockResolvedValue({ missionPartnerId: '1' });
  const mockFindBlocks = jest.requireMock(
    '@digital-u/services/block/find-blocks'
  ).findBlocks;

  describe('when blocks are found', () => {
    beforeAll(() => {
      // Reset the mock before each test
      mockFindBlocks.mockReset();

      // First call returns plan blocks
      mockFindBlocks.mockResolvedValueOnce({
        records: [
          {
            id: 'plan-1',
            title: 'Plan 1',
            type: 'plan'
          }
        ] as Blocks[],
        total: 1
      });

      // Second call returns course blocks
      mockFindBlocks.mockResolvedValueOnce({
        records: [
          {
            id: 'course-1',
            title: 'Course 1',
            type: 'course'
          }
        ] as Blocks[],
        total: 1
      });
    });

    // Note on jest support for async components:
    // https://github.com/testing-library/react-testing-library/issues/1209
    // https://stackoverflow.com/questions/75729282/testing-an-async-server-component-with-jest-in-next-13
    it('renders', async () => {
      // @ts-expect-error mock params
      renderV3(await TrainingV2Page({ params: mockParams }));
      expect(screen.getByText('Plan 1')).toBeInTheDocument();
      expect(screen.getByText('Course 1')).toBeInTheDocument();
    });
  });

  describe('when no blocks are found', () => {
    beforeAll(() => {
      mockFindBlocks.mockResolvedValue({
        records: [],
        total: 0
      });
    });

    it('renders', async () => {
      // @ts-expect-error mock params
      renderV3(await TrainingV2Page({ params: mockParams }));
      expect(
        screen.getByText('Your program does not have any training plans.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('You have not created any custom training items.')
      ).toBeInTheDocument();
    });
  });
});
