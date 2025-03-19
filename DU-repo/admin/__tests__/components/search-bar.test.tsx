import { render, screen, userEvent } from '@@/test-utils';

import SearchBar from '../../src/components/search-bar/search-bar';

describe('SearchBar', () => {
  it('should render the search container with the correct placeholder', () => {
    render(<SearchBar placeholder="Placeholder Test" />);
    expect(screen.getByPlaceholderText('Placeholder Test')).toBeInTheDocument();
  });

  it('should call the onChange handler when the search icon is clicked', () => {
    const handleSearch = jest.fn();
    const props = {
      placeholder: 'Placeholder Test',
      onSearch: handleSearch,
      defaultValue: ''
    };

    render(<SearchBar {...props} />);

    const inputField = screen.getByPlaceholderText('Placeholder Test');
    // normally use userEvent.paste -- but testing the {enter} key is pressed
    userEvent.type(inputField, 'Test{enter}');

    expect(inputField).toHaveValue('Test');

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange handler when the search icon is clicked', () => {
    const handleSearch = jest.fn();
    const props = {
      placeholder: 'Placeholder Test',
      onSearch: handleSearch,
      defaultValue: ''
    };

    render(<SearchBar {...props} />);

    const inputField = screen.getByPlaceholderText('Placeholder Test');
    userEvent.paste(inputField, 'some text');

    expect(inputField).toHaveValue('some text');

    const searchIconButton = screen.getByText('search');
    userEvent.click(searchIconButton);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
