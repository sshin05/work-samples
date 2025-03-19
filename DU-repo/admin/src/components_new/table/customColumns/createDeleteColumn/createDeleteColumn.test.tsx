import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { createDeleteColumn } from './createDeleteColumn';

describe('createDeleteColumn', () => {
  it('should return a column object', async () => {
    const onDelete = jest.fn();
    await waitFor(() => {
      expect(createDeleteColumn({ onDelete })).toEqual({
        header: '',
        id: 'delete',
        cell: expect.any(Function),
        enableSorting: false
      });
    });

    renderV3(
      createDeleteColumn({ onDelete }).cell({
        row: { original: { id: '1' } }
      })
    );
    userEvent.click(screen.getByRole('button'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
