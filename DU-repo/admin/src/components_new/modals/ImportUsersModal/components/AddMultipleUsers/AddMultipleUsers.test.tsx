import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { AddMultipleUsers } from './AddMultipleUsers';

const csvFileName = 'data.csv';

const generateUserData = (users = 1) => {
  let csvString = '"firstName","lastName", "email"';
  for (let i = 0; i < users; i++) {
    csvString += `\n"firstName${i}","lastName${i}","email${i}"`;
  }

  return csvString;
};

const handleOnClose = jest.fn();
const onAddMultipleUsers = jest.fn();
const setShowTabs = jest.fn();

describe('AddMultipleUsers', () => {
  it('renders the correct elements', () => {
    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );
    // download a .csv template to upload up to 500 learners at once.
    expect(screen.getByText(/download a .csv template/i)).toBeInTheDocument();
    expect(screen.getByText(/up to 500 learners/i)).toBeInTheDocument();
    expect(screen.getByText(/at once./i)).toBeInTheDocument();

    // Drag and drop your completed .csv file here, or select a file to upload
    expect(
      screen.getByText(/drag and drop your completed .csv file here,/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/select a file/i)).toBeInTheDocument();
    expect(screen.getByText(/continue/i)).toBeInTheDocument();
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it('should upload a file of 500 users', async () => {
    const file = new File([generateUserData(500)], csvFileName, {
      type: 'text/csv'
    });

    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );
    const selectFile = screen.getByRole('file-input', { hidden: true });

    fireEvent.change(selectFile, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText(csvFileName)).toBeInTheDocument();
      expect(screen.getByText(/remove/i)).toBeInTheDocument();
    });
    const uploadButton = screen.getByText(/continue/i);
    fireEvent.click(uploadButton);
    expect(onAddMultipleUsers).toHaveBeenCalledTimes(1);
    expect(onAddMultipleUsers).toHaveBeenCalledWith(file);
    expect(handleOnClose).toHaveBeenCalledTimes(1);
  });

  it('should remove the file', async () => {
    const file = new File([generateUserData(1)], csvFileName, {
      type: 'text/csv'
    });

    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );
    const selectFile = screen.getByRole('file-input', { hidden: true });

    fireEvent.change(selectFile, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText(csvFileName)).toBeInTheDocument();
      expect(screen.getByText(/remove/i)).toBeInTheDocument();
    });
    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);
    expect(screen.queryByText(csvFileName)).not.toBeInTheDocument();
  });

  it('should show error message if more than 500 users are uploaded', async () => {
    const file = new File([generateUserData(501)], csvFileName, {
      type: 'text/csv'
    });

    const errorMessage = 'Please upload no more than 500 learners at a time';

    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );

    const selectFile = screen.getByRole('file-input', { hidden: true });

    fireEvent.change(selectFile, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(csvFileName)).not.toBeInTheDocument();
      expect(screen.queryByText(/remove/i)).not.toBeInTheDocument();
    });
    const uploadButton = screen.getByText(/continue/i);
    expect(uploadButton).toBeDisabled();
  });

  it('should setShowTabs to true when back button is clicked', () => {
    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    expect(setShowTabs).toHaveBeenCalledTimes(1);
    expect(setShowTabs).toHaveBeenCalledWith(true);
  });

  it('should show an error messge if a non-csv is uploaded', async () => {
    const file = new File(['¯_(ツ)_/¯'], 'shrug.txt', {
      type: 'text/csv'
    });

    const errorMessage = 'Please select only a .CSV file.';

    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
      />
    );
    const selectFile = screen.getByRole('file-input', { hidden: true });

    fireEvent.change(selectFile, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show custom item type', () => {
    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
        itemType="licenses"
      />
    );
    expect(screen.getByText(/up to 500 licenses/i)).toBeInTheDocument();
  });

  it('should show custom action type', () => {
    renderV3(
      <AddMultipleUsers
        handleOnClose={handleOnClose}
        onAddMultipleUsers={onAddMultipleUsers}
        setShowTabs={setShowTabs}
        action="remove"
      />
    );
    expect(screen.getByText(/remove/i)).toBeInTheDocument();
  });
});
