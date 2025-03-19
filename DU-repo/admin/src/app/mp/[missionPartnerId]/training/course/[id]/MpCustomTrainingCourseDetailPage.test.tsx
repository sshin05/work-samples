import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { useRouter, useParams } from 'next/navigation';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import {
  useFindHostedCourseById,
  useUpdateHostedCourse,
  useUpdateHostedCourseItem,
  useAddHostedCourseItem,
  usePublishHostedCourse
} from '@/api/hosted-course';
import { useFindMissionPartnerMinDetails } from '@/api/mission-partner';
import EditCoursePage from './page';

jest.mock('@/api/hosted-course');
jest.mock('@/api/mission-partner');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(() => ({ missionPartnerId: '1' }))
}));

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: ({ onClose, courseMethods }) => (
    <div>
      <button
        type="button"
        data-testid="hosted-content-modal-close"
        onClick={onClose}
      >
        HostedContentClose
      </button>
      <button
        type="button"
        data-testid="hosted-content-modal-complete"
        onClick={courseMethods.onComplete}
      >
        HostedContentComplete
      </button>
    </div>
  )
}));
jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => {
    return (
      <>
        <label htmlFor={props.name} aria-label={props.label}>
          {props.label}
        </label>
        <input id={props.name} {...props}>
          {children}
        </input>
      </>
    );
  },
  TextArea: ({ children, ...props }) => {
    return (
      <>
        <label htmlFor={props.name} aria-label={props.label}>
          {props.label}
        </label>
        <textarea id={props.name} {...props}>
          {children}
        </textarea>
      </>
    );
  }
}));
const mockNotify = jest.fn();

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children }) => <label>{children}</label>,
  Show: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, type, className }) => (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  ),
  IconButton: ({ children, onClick, ariaLabel }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  ),
  Portal: ({ children }) => <div>{children}</div>,
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <div>{children}</div>,
  Select: ({ children }) => <div>{children}</div>,
  Option: ({ children, value, selected }) => (
    <option value={value} selected={selected}>
      {children}
    </option>
  ),
  Textarea: ({ value, id, ariaLabel, maxLength, autoComplete, onChange }) => (
    <textarea
      value={value}
      id={id}
      aria-label={ariaLabel}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  )
}));

jest.mock(
  '@/app/mp/[missionPartnerId]/training/components/DragAndDropList/DragAndDropList',
  () => ({
    __esModule: true,
    default: ({ items, onReorder, onRemoveItem, onClickItem }) => (
      <div>
        <button
          data-testid="mock-reorder-button"
          type="button"
          onClick={() => {
            // simulate an actual re-order (needs to be a deep copy)
            const reorderedItems = [...items].reverse();
            onReorder(reorderedItems);
          }}
        >
          ReorderItem
        </button>
        <button
          data-testid="mock-remove-button"
          type="button"
          onClick={onRemoveItem}
        >
          RemoveItem
        </button>
        <button
          data-testid="mock-click-button"
          type="button"
          onClick={onClickItem}
        >
          ClickItem
        </button>
        {items?.map(item => <div key={item.id}>{item.title}</div>)}
      </div>
    )
  })
);

jest.mock('../../components/AddContentModal', () => ({
  AddContentModal: ({ onSubmit, options }) => (
    <div>
      <h2>Add new content</h2>
      {options?.map(item => (
        <button
          type="button"
          key={item.value}
          data-testid={item.value}
          onClick={() => onSubmit({ type: item.value })}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}));

jest.mock('@/components_new/modals/PublishModal', () => ({
  PublishModal: ({ onConfirm }) => (
    <div>
      <h2>Publish</h2>
      <button type="button" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  )
}));

describe('Custom Training Hosted Courses', () => {
  const data = {
    id: '8f40674f-ee02-4bee-92fd-93eeac43fb9e',
    name: 'Course 1',
    description: 'Test Description',
    duration: 1,
    missionPartnerId: '0628f3d8-317b-4c61-9459-e17572b5b145',
    createdAt: '2023-02-07T20:24:35.861Z',
    updatedAt: '2023-02-15T15:43:13.126Z',
    items: [
      {
        id: '82a4dc64-7e82-4380-b81d-29e8bcd6e850',
        type: 'Text Lesson',
        title: 'New Text Lesson'
      },
      {
        type: 'Video Lesson',
        title: 'New Video Lesson',
        id: '49a1b667-f5b4-4644-b6d6-c06f53107c60'
      },
      {
        questions: [],
        id: '6cd4a1e8-46e1-4f72-bdab-e764c3363bfd',
        title: 'New Quiz',
        type: 'Quiz'
      },
      {
        questions: [
          {
            type: 'NPS',
            title: 'TEST',
            id: 'a9e8f888-2c1c-43f7-b34f-da24af9ee164'
          }
        ],
        id: '6ece0045-12a5-4e28-9fe3-cd923f15a76e',
        type: 'Survey',
        title: 'New Course Survey'
      }
    ],
    status: 'Draft'
  };

  const updateHostedCourseMock = jest.fn(() => Promise.resolve(true));
  const updateHostedCourseItemsMock = jest.fn(() => Promise.resolve(true));
  const fetchHostedCourseByIdMock = jest.fn(() => Promise.resolve(true));
  const addHostedCoureItemMock = jest.fn(() => Promise.resolve(true));
  const publishHostedCourseMock = jest.fn(() => Promise.resolve(true));
  const routerPushMock = jest.fn();

  let mockClient;

  beforeEach(() => {
    mockClient = createMockClient();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
      query: { missionPartnerId: '1' },
      asPath: '/mp/1/custom-training/course/1'
    });

    (useFindHostedCourseById as jest.Mock).mockReturnValue({
      hostedCourseById: data,
      hostedCourseByIdError: null,
      hostedCourseByIdLoading: false,
      fetchHostedCourseById: fetchHostedCourseByIdMock
    });

    (useUpdateHostedCourse as jest.Mock).mockReturnValue({
      updateHostedCourse: updateHostedCourseMock
    });

    (useUpdateHostedCourseItem as jest.Mock).mockReturnValue({
      updateHostedCourseItems: updateHostedCourseItemsMock
    });

    (useAddHostedCourseItem as jest.Mock).mockReturnValue({
      addHostedCourseItem: addHostedCoureItemMock,
      addHostedCourseItemLoading: false
    });

    (usePublishHostedCourse as jest.Mock).mockReturnValue({
      publishHostedCourse: publishHostedCourseMock
    });

    (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
      missionPartnerMinDetails: {
        name: 'Test Mission Partner'
      }
    });
  });

  it('should render the Edit Course page', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    expect(screen.getAllByText('Course 1')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Test Description')[0]).toBeInTheDocument();
    expect(screen.getAllByText('New Text Lesson')[0]).toBeInTheDocument();
    expect(screen.getAllByText('New Video Lesson')[0]).toBeInTheDocument();
    expect(screen.getAllByText('New Quiz')[0]).toBeInTheDocument();
    expect(screen.getAllByText('New Course Survey')[0]).toBeInTheDocument();
  });

  it('should update when a content item is deleted', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByTestId('mock-remove-button'));
    await waitFor(() => expect(updateHostedCourseMock).toHaveBeenCalled());
  });

  it('should call router when hitting the back button', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByText('Back'));
    expect(routerPushMock).toHaveBeenCalled();
  });

  it('should update the course title', async () => {
    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <EditCoursePage />
        </ApolloProvider>
      </div>
    );

    const editButton = screen.getByRole('button', { name: /Edit Title/i });
    fireEvent.click(editButton);

    expect(screen.getAllByText('Edit Title')[1]).toBeInTheDocument();

    const titleInput = screen.getByDisplayValue('Course 1');
    fireEvent.change(titleInput, {
      target: { value: 'Course 1' }
    });
    fireEvent.click(screen.getAllByText('Save')[0]);

    await waitFor(() => {
      expect(updateHostedCourseMock).toHaveBeenCalled();
      expect(fetchHostedCourseByIdMock).toHaveBeenCalled();
    });
  });

  it('should display modal', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );
    fireEvent.click(screen.getByText('Add Content +'));
    expect(screen.getByText('Add new content')).toBeInTheDocument();
  });

  it('should close the preview modal when clicking close', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('HostedContentClose')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('hosted-content-modal-close'));
    expect(screen.queryByText('HostedContentClose')).not.toBeInTheDocument();
  });

  it('should close the preview modal on course complete interaction', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('HostedContentClose')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('hosted-content-modal-complete'));
    expect(screen.queryByText('HostedContentClose')).not.toBeInTheDocument();
  });

  it('should show publish modal', async () => {
    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <EditCoursePage />
        </ApolloProvider>
      </div>
    );

    expect(screen.getByText('Publish')).toBeInTheDocument();
  });

  it('should publish the course', async () => {
    renderV3(
      <div id="app-root">
        <ApolloProvider client={mockClient}>
          <EditCoursePage />
        </ApolloProvider>
      </div>
    );

    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() =>
      expect(publishHostedCourseMock).toHaveBeenCalledWith(
        data.id,
        data.missionPartnerId
      )
    );
  });

  it('click on duration', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );
    const durationTextInput = screen.getAllByLabelText('Duration (minutes)')[0];
    fireEvent.click(durationTextInput);
    fireEvent.change(durationTextInput, {
      target: { value: '10' }
    });
    expect(durationTextInput).toHaveValue(10);
  });

  it('should update the course when reordering items', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <EditCoursePage />
      </ApolloProvider>
    );

    fireEvent.click(screen.getByTestId('mock-reorder-button'));
    await waitFor(() =>
      expect(updateHostedCourseMock).toHaveBeenCalledWith({
        ...data,
        items: [...data.items].reverse()
      })
    );
  });
});
