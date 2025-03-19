import { useMutation, useQuery } from '@apollo/client';
import { useCountAllVendors } from './useCountAllVendors';
import { useFindAllVendors } from './useFindAllVendors';
import { useFindVendorById } from './useFindVendorById';
import { useCountUniqueItemsAndVendorsBySource } from './useCountUniqueItemsAndVendorsBySource';
import { useFindLicensedVendors } from './useFindLicensedVendors';
import { useCreateVendor } from './useCreateVendor';
import { useUpdateVendor } from './useUpdateVendor';

jest.mock('@apollo/client');

describe('force multipliers test', () => {
  afterEach(() => jest.resetAllMocks());

  describe('useCountAllVendors', () => {
    it('should use countAllVendors hook without error', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: { countAllVendors: 1 }
      });

      const { countVendorsLoading, countvendorsError, countVendors } =
        useCountAllVendors();

      expect(countVendorsLoading).toBe(false);
      expect(countvendorsError).toBe(false);
      expect(countVendors).toEqual(1);
    });

    it('should return null for countVendors if data is null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: null
      });

      const { countVendors } = useCountAllVendors();

      expect(countVendors).toBe(null);
    });
  });

  describe('useCountUniqueItemsAndVendorsBySource', () => {
    it('should use countUniqueItemsAndVendorsBySource hook without error', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: { countUniqueItemsAndVendorsBySource: { items: 0, vendors: 0 } }
      });

      const {
        totalItems,
        totalVendors,
        countUniqueItemsAndVendorsBySourceError,
        countUniqueItemsAndVendorsBySourceLoading
      } = useCountUniqueItemsAndVendorsBySource('source');

      expect(totalItems).toEqual(0);
      expect(totalVendors).toEqual(0);
      expect(countUniqueItemsAndVendorsBySourceError).toBe(false);
      expect(countUniqueItemsAndVendorsBySourceLoading).toBe(false);
    });

    it('should return 0 for totalItems and 0 for totalVendors if data is null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: null
      });

      const { totalItems, totalVendors } =
        useCountUniqueItemsAndVendorsBySource('source');

      expect(totalItems).toEqual(0);
      expect(totalVendors).toEqual(0);
    });
  });

  describe('useFindAllVendors', () => {
    it('should use findAllVendors hook without error', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: { findAllVendors: [] }
      });

      const { vendorsReady, vendorsLoading, vendorsError, vendors } =
        useFindAllVendors();

      expect(vendorsReady).toBe(true);
      expect(vendorsLoading).toBe(false);
      expect(vendorsError).toBe(false);
      expect(vendors).toEqual([]);
    });

    it('should return null for vendors if data is null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: null
      });

      const { vendors } = useFindAllVendors();

      expect(vendors).toBe(null);
    });
  });

  describe('useFindVendorById', () => {
    it('should use findVendorById hook without error', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: { findVendorById: null }
      });

      const { vendorLoading, vendorError, vendor } = useFindVendorById('id');

      expect(vendorLoading).toBe(false);
      expect(vendorError).toBe(false);
      expect(vendor).toEqual(null);
    });

    it('should return null for vendor if data is null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: null
      });

      const { vendor } = useFindVendorById('id');

      expect(vendor).toBe(null);
    });
  });

  describe('useFindLicensedVendors', () => {
    it('should use findLicensedVendors hook without error', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: { findLicensedVendors: [] }
      });

      const { licensedVendorsLoading, licensedVendorsError, licensedVendors } =
        useFindLicensedVendors();

      expect(licensedVendorsLoading).toBe(false);
      expect(licensedVendorsError).toBe(false);
      expect(licensedVendors).toEqual([]);
    });

    it('should return null for licensedVendors if data is null', () => {
      (useQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: null
      });

      const { licensedVendors } = useFindLicensedVendors();

      expect(licensedVendors).toBe(null);
    });
  });

  describe('useCreateVendor', () => {
    const mockCreateVendor = jest.fn();

    it('should use createVendor hook without error', async () => {
      (useMutation as jest.Mock).mockReturnValue([
        mockCreateVendor,
        { loading: false, error: false }
      ]);

      const {
        createVendorLoading,
        createVendorError,
        createVendor,
        createVendorData
      } = useCreateVendor();

      expect(createVendorLoading).toBe(false);
      expect(createVendorData).toBeUndefined();
      expect(createVendorError).toBe(false);
      expect(createVendor).toBeDefined();

      await createVendor({
        id: '2',
        name: 'name'
      });

      expect(mockCreateVendor).toHaveBeenCalledWith({
        variables: { input: { id: '2', name: 'name' } }
      });
    });
  });

  describe('useUpdateVendor', () => {
    const mockUpdateVendor = jest.fn();

    it('should use updateVendor hook without error', async () => {
      (useMutation as jest.Mock).mockReturnValue([
        mockUpdateVendor,
        { loading: false, error: false }
      ]);

      const {
        updateVendorLoading,
        updateVendorError,
        updateVendor,
        updateVendorData
      } = useUpdateVendor();

      expect(updateVendorLoading).toBe(false);
      expect(updateVendorData).toBeUndefined();
      expect(updateVendorError).toBe(false);
      expect(updateVendor).toBeDefined();

      await updateVendor({
        id: '2',
        name: 'name'
      });

      expect(mockUpdateVendor).toHaveBeenCalledWith({
        variables: { input: { id: '2', name: 'name' } }
      });
    });
  });
});
