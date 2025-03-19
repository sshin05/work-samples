import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { createCheckboxColumn } from './createCheckboxColumn';

describe('createCheckboxColumn', () => {
  it('should return a column object', async () => {
    const isChanged = jest.fn();
    const selectedRows = { '1': true };
    await waitFor((): void => {
      expect(createCheckboxColumn({ isChanged, selectedRows })).toEqual({
        header: '',
        id: 'checkbox',
        accessorKey: 'checkbox',
        enableSorting: false,
        cell: expect.any(Function)
      });
    });
    renderV3(
      createCheckboxColumn({ isChanged, selectedRows }).cell({
        row: { original: { id: '1' } }
      })
    );
    userEvent.click(screen.getByRole('checkbox'));
    expect(isChanged).toHaveBeenCalledWith('1');
  });
});
