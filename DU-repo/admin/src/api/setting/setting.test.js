import { useQuery, useMutation } from '@apollo/client';
import { noop } from 'lodash';
import { useFindAllSettings } from './useFindAllSettings';
import { useEnableSetting } from './useEnableSetting';
import { useDisableSetting } from './useDisableSetting';
import { useFindSettingById } from './useFindSettingById';

jest.mock('@apollo/client');

describe('setting test', () => {
  describe('useFindAllSettings', () => {
    it('should return the correct result', () => {
      const data = {
        findAllSettings: [
          {
            id: 'setting-1',
            name: 'Setting 1',
            enabled: false
          },
          {
            id: 'setting-2',
            name: 'Setting 2',
            enabled: true
          }
        ]
      };

      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data
      });

      const { settingsLoading, settingsError, settings } = useFindAllSettings();

      expect(settings).toEqual(data.findAllSettings);
      expect(settingsError).toEqual(null);
      expect(settingsLoading).toEqual(false);
    });
  });

  describe('useFindSettingById', () => {
    it('should return the correct result', () => {
      const data = {
        findSettingById: {
          id: 'setting-1',
          name: 'Setting 1',
          enabled: false
        }
      };

      useQuery.mockReturnValue({
        loading: false,
        error: null,
        data
      });

      const { settingLoading, settingError, setting } =
        useFindSettingById('setting-1');

      expect(setting).toEqual(data.findSettingById);
      expect(settingError).toEqual(null);
      expect(settingLoading).toEqual(false);
    });
  });

  describe('useEnableSetting', () => {
    it('should return an object containing mutation variables', () => {
      useMutation.mockReturnValue([
        noop,
        { loading: false, error: undefined, data: undefined }
      ]);

      const result = useEnableSetting();

      expect(result.enableSetting).toBeInstanceOf(Function);
      expect(result.enableSettingLoading).toEqual(false);
      expect(result.enableSettingError).toEqual(undefined);
      expect(result.enableSettingData).toEqual(undefined);
    });

    it('should handle successful mutation', async () => {
      const mockEnableSettingMutation = jest.fn();
      useMutation.mockReturnValue([
        mockEnableSettingMutation,
        {
          loading: false,
          error: null,
          data: {
            enableSetting: { id: 'setting-1', name: 'Setting 1', enabled: true }
          }
        }
      ]);

      const {
        enableSetting,
        enableSettingLoading,
        enableSettingError,
        enableSettingData
      } = useEnableSetting();

      await enableSetting('setting-1');

      expect(mockEnableSettingMutation).toHaveBeenCalledWith({
        variables: { id: 'setting-1' }
      });

      expect(enableSettingLoading).toEqual(false);
      expect(enableSettingError).toEqual(null);
      expect(enableSettingData).toEqual({
        enableSetting: { id: 'setting-1', name: 'Setting 1', enabled: true }
      });
    });
  });

  describe('useDisableSetting', () => {
    it('should return an object containing mutation variables', () => {
      useMutation.mockReturnValue([
        noop,
        { loading: false, error: undefined, data: undefined }
      ]);

      const result = useDisableSetting();

      expect(result.disableSetting).toBeInstanceOf(Function);
      expect(result.disableSettingLoading).toEqual(false);
      expect(result.disableSettingError).toEqual(undefined);
      expect(result.disableSettingData).toEqual(undefined);
    });

    it('should handle successful mutation', async () => {
      const mockDisableSetting = jest.fn();
      useMutation.mockReturnValue([
        mockDisableSetting,
        {
          loading: false,
          error: null,
          data: { disableSetting: { success: true } }
        }
      ]);

      const {
        disableSetting,
        disableSettingLoading,
        disableSettingError,
        disableSettingData
      } = useDisableSetting();

      await disableSetting('setting-1');

      expect(mockDisableSetting).toHaveBeenCalledWith({
        variables: { id: 'setting-1' }
      });
      expect(disableSettingLoading).toEqual(false);
      expect(disableSettingError).toEqual(null);
      expect(disableSettingData).toEqual({ disableSetting: { success: true } });
    });

    it('should handle loading state', () => {
      useMutation.mockReturnValue([
        noop,
        { loading: true, error: null, data: undefined }
      ]);

      const { disableSettingLoading } = useDisableSetting();

      expect(disableSettingLoading).toEqual(true);
    });

    it('should handle error state', () => {
      const error = new Error('Network error');
      useMutation.mockReturnValue([
        noop,
        { loading: false, error, data: undefined }
      ]);

      const { disableSettingError } = useDisableSetting();

      expect(disableSettingError).toEqual(error);
    });
  });
});
