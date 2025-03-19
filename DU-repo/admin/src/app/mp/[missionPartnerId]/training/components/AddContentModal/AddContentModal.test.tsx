import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { AddContentModal } from './AddContentModal';

const handleKeyDownMock = jest.fn();
const handleAddNewContentMock = jest.fn();
const modalMock = {
  modalRef: { current: null },
  show: jest.fn(),
  close: jest.fn(),
  isOpen: true
};

describe('AddContentModal', () => {
  it('Should show children and a close button', () => {
    renderV3(
      <AddContentModal
        modal={modalMock}
        handleKeyDown={handleKeyDownMock}
        onSubmit={handleAddNewContentMock}
        options={[
          { label: '- Select -', value: '' },
          { label: 'Text Lesson', value: 'text-lesson' },
          { label: 'Video Lesson', value: 'video-lesson' },
          { label: 'Quiz', value: 'quiz' },
          { label: 'Course Survey', value: 'course-survey' },
          { label: 'Office File', value: 'office-file' }
        ]}
      />
    );

    expect(screen.getByText('Quiz')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('modalCloseButton'));
    expect(modalMock.close).toHaveBeenCalled();
  });

  it('Should call handleAddNewContent with item type on submit', async () => {
    renderV3(
      <AddContentModal
        modal={modalMock}
        handleKeyDown={handleKeyDownMock}
        onSubmit={handleAddNewContentMock}
        options={[
          { label: '- Select -', value: '' },
          { label: 'Text Lesson', value: 'text-lesson' },
          { label: 'Video Lesson', value: 'video-lesson' },
          { label: 'Quiz', value: 'quiz' },
          { label: 'Course Survey', value: 'course-survey' },
          { label: 'Office File', value: 'office-file' }
        ]}
      />
    );

    const selectElement = screen.getByRole('combobox', { hidden: true });
    fireEvent.change(selectElement, { target: { value: 'office-file' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Content'));
    });
    expect(handleAddNewContentMock).toHaveBeenCalled();
  });
});
