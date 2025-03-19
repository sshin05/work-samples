import { render, screen, fireEvent, waitFor } from '@@/test-utils';
import CurriculumSearch from '../../../src/components/shopping-cart/CurriculumSearch/CurriculumSearch';

describe('CurriculumSearch', () => {
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();

  afterEach(() => jest.clearAllMocks());

  it('should render', async () => {
    render(<CurriculumSearch onSearch={mockOnSearch} onClear={mockOnClear} />);

    const textbox = screen.getByLabelText('Keyword');
    expect(textbox).toBeInTheDocument();

    fireEvent.change(textbox, {
      target: { value: 'test search' }
    });
    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledTimes(1));
  });
});
