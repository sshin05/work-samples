import { render, screen, fireEvent, userEvent, waitFor } from '@@/test-utils';
import DragAndDropList from './DragAndDropList';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children, onMouseEnter, onMouseLeave }) => (
    <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </span>
  ),
  Spinner: () => <span>Loading...</span>,
  VendorIconGroup: () => <span>VendorIcon</span>
}));

jest.mock('@cerberus/react', () => ({
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@carbon/icons-react', () => ({
  DragVertical: () => <div>DragVertical</div>,
  Timer: () => <div>Timer</div>,
  TrashCan: () => <div>TrashCan</div>
}));

jest.mock(
  '@/components/manage-mission-partners/custom-training/LibraryItem',
  () => ({
    __esModule: true,
    default: ({ libraryItem }) => <div>{libraryItem.title}</div>
  })
);

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit, buttonContent, heading }) => (
    <div>
      {heading}
      <button onClick={handleSubmit}>{buttonContent}</button>
    </div>
  )
}));

describe('Drop Down Menu', () => {
  it('should render the drop down menu', () => {
    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'Free Text',
            title: 'TEST QUESTION'
          }
        ]}
        onReorder={jest.fn()}
        onRemoveItem={jest.fn()}
        onClickItem={jest.fn()}
        deleteModalTitle="Delete Question"
        libraryItem={false}
        disabled={false}
      />
    );

    expect(screen.getByText('TEST QUESTION')).toBeInTheDocument();
  });

  it('should call onClick when a drop down menu item is clicked', () => {
    const functionMock = jest.fn();
    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'Free Text',
            title: 'Free Text Question'
          }
        ]}
        onReorder={functionMock}
        onRemoveItem={functionMock}
        onClickItem={functionMock}
        deleteModalTitle="Delete Question"
        libraryItem={false}
        disabled={false}
      />
    );

    expect(screen.getByText('Free Text:')).toBeInTheDocument();
    expect(screen.getByText('Free Text Question')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Free Text Question'));
    expect(functionMock).toHaveBeenCalled();
  });

  it('should change title if deleteModalTitle is provided', async () => {
    const functionMock = jest.fn();
    render(
      <div>
        <DragAndDropList
          items={[
            {
              id: '1',
              type: 'Free Text',
              title: 'Free Text Question'
            }
          ]}
          onReorder={functionMock}
          onRemoveItem={functionMock}
          onClickItem={functionMock}
          deleteModalTitle="Delete Question Test"
          libraryItem={false}
          disabled={false}
        />
      </div>
    );

    await waitFor(() => {
      userEvent.hover(screen.getByText('Free Text Question'));
      const removeButton = screen.getByRole('button', {
        name: 'Remove TrashCan'
      });
      fireEvent.click(removeButton);
    });

    expect(screen.getByText('Delete Question Test')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Remove'));
    expect(functionMock).toHaveBeenCalled();
  });

  it('should render a plan item', () => {
    const functionMock = jest.fn();
    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'Course',
            title: 'Course Title',
            vendorName: 'Udemy'
          }
        ]}
        onReorder={functionMock}
        onRemoveItem={functionMock}
        onClickItem={functionMock}
        deleteModalTitle="Delete Question"
        libraryItem={false}
        disabled={false}
      />
    );

    expect(screen.getByText('Course:')).toBeInTheDocument();
    expect(screen.getByText('Course Title')).toBeInTheDocument();
  });

  it('should call onClick when a drop down menu item is clicked', () => {
    const functionMock = jest.fn();
    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'Course',
            title: 'Course Title',
            vendorName: 'Udemy'
          }
        ]}
        onReorder={functionMock}
        onRemoveItem={functionMock}
        onClickItem={functionMock}
        deleteModalTitle="Delete Question"
        libraryItem={false}
        disabled={false}
      />
    );

    expect(screen.getByText('Course:')).toBeInTheDocument();
    expect(screen.getByText('Course Title')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Course Title'));
    expect(functionMock).toHaveBeenCalled();
  });

  it('should call onRemoveItem and the ConfirmDeleteQuestion Modal when removing an item', () => {
    const mockOnRemoveItem = jest.fn();

    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'Course',
            title: 'Course Title',
            vendorName: 'Udemy'
          }
        ]}
        onReorder={jest.fn()}
        onRemoveItem={mockOnRemoveItem}
        onClickItem={jest.fn()}
        deleteModalTitle="Delete Question"
        libraryItem={false}
        disabled={false}
      />
    );

    fireEvent.mouseEnter(screen.getByText('Course Title'));
    fireEvent.click(screen.getByText('Remove'));

    expect(mockOnRemoveItem).toHaveBeenCalled();
  });

  it('should render a library item', () => {
    const functionMock = jest.fn();
    render(
      <DragAndDropList
        items={[
          {
            id: '1',
            type: 'File',
            title: 'Library Item File',
            url: '/assets/blah'
          }
        ]}
        onReorder={functionMock}
        onRemoveItem={functionMock}
        onClickItem={functionMock}
        deleteModalTitle="Delete Library Item"
        libraryItem={true}
        disabled={false}
      />
    );

    expect(screen.getByText('Library Item File')).toBeInTheDocument();
  });
});
