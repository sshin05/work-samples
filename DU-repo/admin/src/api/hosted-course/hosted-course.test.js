import { useMutation, useQuery } from '@apollo/client';
import { useCreateHostedCourse } from './useCreateHostedCourse';
import { useFindHostedCourseById } from './useFindHostedCourseById';
import { useUpdateHostedCourse } from './useUpdateHostedCourse';
import { usePublishHostedCourse } from './usePublishHostedCourse';
import { useUploadHostedCourseImage } from './useUploadHostedCourseImage';
import { useUploadHostedVideo } from './useUploadHostedVideo';
import { useUploadOfficeFile } from './useUploadOfficeFile';
import { useAddHostedCourseItem } from './useAddHostedCourseItem';
import { useUpdateHostedCourseItem } from './useUpdateHostedCourseItem';
import { useFindHostedCourseItem } from './useFindHostedCourseItem';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn()
}));

describe('hosted course test', () => {
  beforeEach(() => {
    useQuery.mockReturnValue({
      loading: false,
      error: false,
      data: {}
    });

    useMutation.mockReturnValue([
      jest.fn(),
      { loading: false, error: false, data: {} }
    ]);
  });

  it('should use hosted course hook without error', () => {
    const createHostedCourse = useCreateHostedCourse('name', 'vendorId');

    expect(useMutation).toHaveBeenCalled();
    expect(createHostedCourse).toEqual(
      expect.objectContaining({
        createHostedCourseLoading: false,
        createHostedCourseError: false,
        createHostedCourseData: {}
      })
    );
    expect(createHostedCourse.createHostedCourse).toBeInstanceOf(Function);
  });

  it('should return findHostedCourseById', async () => {
    const findHostedCourseById = useFindHostedCourseById('foo');

    expect(useQuery).toHaveBeenCalledWith(expect.anything(), {
      skip: false,
      variables: { id: 'foo' },
      fetchPolicy: 'network-only'
    });
    expect(findHostedCourseById).toEqual(
      expect.objectContaining({
        hostedCourseByIdLoading: false,
        hostedCourseByIdError: false,
        hostedCourseById: undefined,
        fetchHostedCourseById: expect.any(Function)
      })
    );
    expect(findHostedCourseById.fetchHostedCourseById).toBeInstanceOf(Function);
  });

  it('should return useUpdateHostedCourse', async () => {
    const updateHostedCourse = useUpdateHostedCourse();
    updateHostedCourse.updateHostedCourse({ name: 'foo' });

    expect(useMutation).toHaveBeenCalledTimes(2);
    expect(updateHostedCourse).toEqual(
      expect.objectContaining({
        updateHostedCourseLoading: false,
        updateHostedCourseError: false,
        updateHostedCourseData: {}
      })
    );
    expect(updateHostedCourse.updateHostedCourse).toBeInstanceOf(Function);
  });

  it('should return usePublishHostedCourse', async () => {
    const publishHostedCourse = usePublishHostedCourse();
    publishHostedCourse.publishHostedCourse('foo', 'bar');

    expect(useMutation).toHaveBeenCalled();
    expect(publishHostedCourse).toEqual(
      expect.objectContaining({
        publishHostedCourseLoading: false,
        publishHostedCourseError: false,
        publishHostedCourseData: {}
      })
    );
    expect(publishHostedCourse.publishHostedCourse).toBeInstanceOf(Function);
  });

  it('should return return useUploadHostedCourseImage', () => {
    const uploadHostedCourseImage = useUploadHostedCourseImage();
    uploadHostedCourseImage.uploadHostedCourseImage({ file: 'foo ' });

    expect(useMutation).toHaveBeenCalled();
    expect(uploadHostedCourseImage).toEqual(
      expect.objectContaining({
        uploadHostedCourseImageData: {},
        uploadHostedCourseImageLoading: false,
        uploadHostedCourseImageError: false
      })
    );
    expect(uploadHostedCourseImage.uploadHostedCourseImage).toBeInstanceOf(
      Function
    );
  });

  describe('useUploadHostedVideo', () => {
    it('should return data', () => {
      const returnedData = {
        data: {
          id: '1',
          name: '1'
        }
      };
      const data = {
        uploadHostedVideo: returnedData
      };

      useMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data }
      ]);

      const {
        uploadHostedVideo,
        uploadHostedVideoData,
        uploadHostedVideoError,
        uploadHostedVideoLoading
      } = useUploadHostedVideo();

      expect(uploadHostedVideoData).toEqual(data.uploadHostedVideo);
      expect(uploadHostedVideoError).toEqual(null);
      expect(uploadHostedVideoLoading).toEqual(false);
      expect(uploadHostedVideo).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data: null }
      ]);
      const {
        uploadHostedVideo,
        uploadHostedVideoData,
        uploadHostedVideoError,
        uploadHostedVideoLoading
      } = useUploadHostedVideo();

      expect(uploadHostedVideoData).toEqual({});
      expect(uploadHostedVideoError).toEqual(null);
      expect(uploadHostedVideoLoading).toEqual(false);
      expect(uploadHostedVideo).toBeInstanceOf(Function);
    });
  });

  describe('useUploadOfficeFile', () => {
    it('should return data', () => {
      const returnedData = {
        data: {
          id: '1',
          name: '1'
        }
      };
      const data = {
        uploadOfficeFile: returnedData
      };

      useMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data }
      ]);

      const {
        uploadOfficeFile,
        uploadOfficeFileData,
        uploadOfficeFileError,
        uploadOfficeFileLoading
      } = useUploadOfficeFile();

      expect(uploadOfficeFileData).toEqual(data.uploadOfficeFile);
      expect(uploadOfficeFileError).toEqual(null);
      expect(uploadOfficeFileLoading).toEqual(false);
      expect(uploadOfficeFile).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data: null }
      ]);
      const {
        uploadOfficeFile,
        uploadOfficeFileData,
        uploadOfficeFileError,
        uploadOfficeFileLoading
      } = useUploadOfficeFile();

      expect(uploadOfficeFileData).toEqual({});
      expect(uploadOfficeFileError).toEqual(null);
      expect(uploadOfficeFileLoading).toEqual(false);
      expect(uploadOfficeFile).toBeInstanceOf(Function);
    });
  });

  describe('useAddHostedCourseItem', () => {
    it('should return data', () => {
      const addHostedCourseItem = useAddHostedCourseItem({
        id: '1',
        missionPartnerId: '2',
        item: {
          id: '1',
          type: 'Text Lesson',
          title: 'New Text Lesson'
        }
      });

      expect(addHostedCourseItem).toEqual(
        expect.objectContaining({
          addHostedCourseItemLoading: false,
          addHostedCourseItemError: false,
          addHostedCourseItemData: {}
        })
      );
      expect(addHostedCourseItem.addHostedCourseItem).toBeInstanceOf(Function);
    });

    it('should return null', () => {
      useMutation.mockReturnValue([
        jest.fn(),
        { loading: false, error: null, data: {} }
      ]);

      const {
        addHostedCourseItemLoading,
        addHostedCourseItemError,
        addHostedCourseItemData,
        addHostedCourseItem
      } = useAddHostedCourseItem();

      expect(addHostedCourseItemLoading).toEqual(false);
      expect(addHostedCourseItemError).toEqual(null);
      expect(addHostedCourseItemData).toEqual({});
      expect(addHostedCourseItem).toBeInstanceOf(Function);
    });
  });

  describe('useUpdateHostedCourseItem', () => {
    it('should return useUpdatedHostedCourseItem data', () => {
      const updateHostedCourseItems = useUpdateHostedCourseItem();
      updateHostedCourseItems.updateHostedCourseItem({
        id: '1',
        missionPartnerId: '2',
        item: {
          id: '1',
          type: 'Text Lesson',
          title: 'New Text Lesson'
        }
      });

      expect(updateHostedCourseItems).toEqual(
        expect.objectContaining({
          updateHostedCourseItemLoading: false,
          updateHostedCourseItemError: false,
          updateHostedCourseItemData: {}
        })
      );

      expect(updateHostedCourseItems.updateHostedCourseItem).toBeInstanceOf(
        Function
      );
    });
  });

  describe('useFindHostedCourseItem', () => {
    it('should return useFindHostedCourseItem data', () => {
      const findHostedCourseItem = useFindHostedCourseItem('1', '2');

      expect(useQuery).toHaveBeenCalledWith(expect.anything(), {
        skip: false,
        variables: { id: '1', itemId: '2' },
        fetchPolicy: 'network-only'
      });
      expect(findHostedCourseItem).toEqual(
        expect.objectContaining({
          hostedCourseItemData: undefined,
          hostedCourseItemError: false,
          hostedCourseItemLoading: false,
          fetchHostedCourseItem: expect.any(Function)
        })
      );
      expect(findHostedCourseItem.fetchHostedCourseItem).toBeInstanceOf(
        Function
      );
    });
  });
});
