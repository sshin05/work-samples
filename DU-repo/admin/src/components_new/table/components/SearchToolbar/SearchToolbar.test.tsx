import { fireEvent, renderV3, screen, userEvent } from '@@/test-utils';
import { SearchToolbar } from './SearchToolbar';

const props = {
  searchTerm: 'test',
  setSearchTerm: jest.fn(value => value),
  searchPlaceholder: 'search table for value',
  hasToolbar: true,
  toolbarType: 'search'
};

describe('SearchToolbar', () => {
  it('should render a toolbar with a search bar', () => {
    renderV3(<SearchToolbar {...props} />);
    const search = screen.getByLabelText('search table for value');
    expect(search).toHaveValue('test');
    userEvent.type(search, '2');
    expect(search).toHaveValue('test2');
  });

  it('should render with buttons', () => {
    const props = {
      searchTerm: 'test',
      setSearchTerm: jest.fn(value => value),
      searchPlaceholder: 'search table for value',
      hasToolbar: true,
      toolbarType: 'search',
      buttonProps: {
        buttonContent: 'my button',
        buttonIcon: <>add</>,
        onButtonClick: jest.fn()
      },
      filterProps: {
        openFilters: true,
        setOpenFilters: jest.fn()
      },
      editProps: {
        showEdit: true,
        setShowEdit: jest.fn()
      },
      downloadProps: {
        name: 'Download table',
        onDownload: jest.fn(),
        loading: false
      }
    };
    renderV3(<SearchToolbar {...props} />);
    const filterButton = screen.getByLabelText('toggle filters');
    const editButton = screen.getByLabelText('toggle edit');
    const downloadButton = screen.getByLabelText('download table content');
    const addButton = screen.getByLabelText(
      `add ${props.buttonProps.buttonContent}`
    );
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);
    expect(props.filterProps.setOpenFilters).toHaveBeenCalledTimes(1);
    expect(editButton).toBeInTheDocument();
    userEvent.click(editButton);
    expect(props.editProps.setShowEdit).toHaveBeenCalledTimes(1);
    expect(downloadButton).toBeInTheDocument();
    userEvent.click(downloadButton);
    expect(props.downloadProps.onDownload).toHaveBeenCalledTimes(1);
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);
    expect(props.buttonProps.onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should render with the edit dropdown menu', () => {
    const props = {
      searchTerm: 'test',
      setSearchTerm: jest.fn(value => value),
      searchPlaceholder: 'search table for value',
      hasToolbar: true,
      toolbarType: 'search',
      editProps: {
        showEdit: false,
        setShowEdit: jest.fn(),
        bulkAction: jest.fn(),
        itemLabel: 'test'
      }
    };
    renderV3(<SearchToolbar {...props} />);
    const editButton = screen.getByLabelText('toggle edit');
    fireEvent.click(editButton);
    const bulkRemoveButton = screen.getByText(
      'Bulk remove tests via .csv file'
    );
    fireEvent.click(bulkRemoveButton);
    expect(props.editProps.bulkAction).toHaveBeenCalledTimes(1);
  });

  it('should render with the download dropdown menu', async () => {
    const props = {
      searchTerm: 'test',
      setSearchTerm: jest.fn(value => value),
      searchPlaceholder: 'search table for value',
      hasToolbar: true,
      toolbarType: 'search',
      downloadProps: [
        {
          name: 'Download learner list',
          onDownload: jest.fn(),
          loading: false
        },

        {
          name: 'Download learner activity report',
          onDownload: jest.fn(),
          loading: false
        }
      ]
    };
    renderV3(<SearchToolbar {...props} />);
    const downloadButton = screen.getByLabelText('download table content');
    fireEvent.click(downloadButton);
    const downloadButtonIndividual = await screen.findByText(
      props.downloadProps[0].name
    );
    fireEvent.click(downloadButtonIndividual);
    expect(props.downloadProps[0].onDownload).toHaveBeenCalledTimes(1);
  });
});
