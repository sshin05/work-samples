import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { createCheckboxColumnForCollections } from './createCheckboxColumnForCollections';

describe('createCheckboxColumnForCollections', () => {
  it('should return a column object', async () => {
    const isChanged = jest.fn();
    await waitFor((): void => {
      expect(
        createCheckboxColumnForCollections({
          isChanged,
          checkedItems: [{ courseId: '1' }],
          currentTableId: '1'
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
      createCheckboxColumnForCollections({
        isChanged,
        checkedItems: [{ courseId: '1' }],
        currentTableId: '1'
      }).cell({
        row: { original: { id: '1' } }
      })
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(isChanged).toHaveBeenCalledWith('1', '1');
  });
});
