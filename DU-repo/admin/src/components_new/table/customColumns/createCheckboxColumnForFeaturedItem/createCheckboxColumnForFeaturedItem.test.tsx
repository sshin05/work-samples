import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { createCheckboxColumnForFeaturedItem } from './createCheckboxColumnForFeaturedItem';

describe('createCheckboxColumnForFeaturedItem', () => {
  it('should return a column object', async () => {
    const isChanged = jest.fn();
    await waitFor((): void => {
      expect(
        createCheckboxColumnForFeaturedItem({
          isChanged,
          checkedItems: [{ courseId: '1' }]
        })
      ).toEqual({
        header: '',
        id: 'checkbox',
        accessorKey: 'checkbox',
        enableSorting: false,
        cell: expect.any(Function)
      });
    });
    renderV3(
      createCheckboxColumnForFeaturedItem({
        isChanged,
        checkedItems: [{ courseId: '1' }]
      }).cell({
        row: { original: { id: '2' } }
      })
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(isChanged).toHaveBeenCalledWith('2');
  });
});
