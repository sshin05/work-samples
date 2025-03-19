import {
  useUpdateForceMultiplier,
  useUpdateForceMultiplierContent,
  useFindLatestForceMultiplierByIdAdmin,
  useUploadForceMultiplierImage
} from '@/api/force-multipliers';
import { ForceMultiplierForm } from './ForceMultiplierForm';
import { fireEvent, render, screen, waitFor } from '@@/test-utils';

jest.mock('@/api/force-multipliers');
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useNotificationCenter: jest.fn(() => ({
    notify: jest.fn()
  }))
}));

jest.mock('./components/ForceMultiplierImage', () => ({
  ForceMultiplierImage: ({ handleSelectImage }) => (
    <div
      onClick={() =>
        handleSelectImage(new File([], 'test.jpeg', { type: 'image/jpeg' }))
      }
    >
      AdminImage
    </div>
  )
}));

jest.mock('./AboutSection', () => {
  return {
    AboutSection: () => <div>AboutSection</div>
  };
});

const mockFM = {
  id: 'fm-id',
  version: '1',
  title: 'Test Title One',
  status: 'Draft',
  learningPathUri: null,
  totalDuration: 60,
  unsequenced: false,
  missionPartnerId: '5b7ca3b7-6116-43e8-af0a-4ae1b9823e7b',
  content: {
    description: ['test2'],
    summary: 'This is a new training plan with a summary change.',
    about: {
      title: 'About Test Title Two',
      description: ['This plan is provided by Test MP.'],
      image: '',
      imageAltText: 'test img'
    }
  },
  conditions: {
    all: []
  }
};

describe('ForceMultiplierForm', () => {
  const mockFetchFM = jest.fn(async () => Promise.resolve());
  const mockUpdateFM = jest.fn(async () => Promise.resolve());
  const mockUpdateFMContent = jest.fn(async () => Promise.resolve());
  const mockUploadFMImage = jest.fn(async () => Promise.resolve());

  beforeEach(() => {
    (useFindLatestForceMultiplierByIdAdmin as jest.Mock).mockReturnValue({
      forceMultiplierById: mockFM,
      forceMultiplierByIdLoading: false,
      forceMultiplierByIdError: true,
      fetchForceMultiplierById: mockFetchFM
    });

    (useUpdateForceMultiplier as jest.Mock).mockReturnValue({
      updateForceMultiplier: mockUpdateFM,
      updateForceMultiplierLoading: false
    });
    (useUpdateForceMultiplierContent as jest.Mock).mockReturnValue({
      updateForceMultiplierContent: mockUpdateFMContent,
      updateForceMultiplierContentLoading: false
    });
    (useUploadForceMultiplierImage as jest.Mock).mockReturnValue({
      uploadForceMutliplierImage: mockUploadFMImage,
      uploadForceMultiplierImageLoading: false
    });
  });

  it('should render', async () => {
    render(
      <ForceMultiplierForm
        marketingControl={jest.fn()}
        handleMarketingSubmit={jest.fn()}
        forceMultiplierById={mockFM}
        missionPartnerName="test mp"
        disabled={false}
        isSubmitting={false}
        isMarketingSubmitting={false}
        errors={{}}
      />
    );
    expect(screen.getByText(/AboutSection/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/AdminImage/i));
    await waitFor(() => expect(mockFetchFM).toHaveBeenCalled());
  });
});
