import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { FileInput } from './FileInput';

describe('input', () => {
  it('should upload file for an input with type "file"', async () => {
    renderV3(<FileInput data-testid="input" name="input-test" type="file" />);

    const input = screen.getByTestId('input') as HTMLInputElement;

    expect(input.files.length).toEqual(0);

    userEvent.upload(input, new File(['foo'], 'foo.txt'));

    await waitFor(() => expect(input.files.length).toEqual(1));
  });
});
