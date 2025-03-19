import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { createCheckboxColumnFiltered } from './createCheckboxColumnFiltered';

describe('createCheckboxColumnFiltered', () => {
  it('should return a column object', async () => {
    const isChanged = jest.fn();
    await waitFor((): void => {
      expect(
        createCheckboxColumnFiltered({
          isChanged,
          mainUser: '1',
          checkedItems: ['1']
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
      createCheckboxColumnFiltered({
        isChanged,
        mainUser: '1',
        checkedItems: ['1']
      }).cell({
        row: { original: { id: '2' } }
      })
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(isChanged).toHaveBeenCalledWith('2');
  });
});
