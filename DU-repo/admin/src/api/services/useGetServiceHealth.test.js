import { useQuery } from '@apollo/client';
import { useGetServiceHealth } from './useGetServiceHealth';

jest.mock('@apollo/client');

describe('useGetServiceHealth', () => {
  it('should return the correct result when data is available', () => {
    const data = {
      getServiceHealth: {
        services: [
          { name: 'APIs', status: 'RUNNING' },
          { name: 'Student portal', status: 'RUNNING' },
          { name: 'Admin portal', status: 'ERROR' },
          { name: 'Keycloak', status: 'RUNNING' },
          { name: 'Opensearch', status: 'RUNNING' },
          { name: 'Elasticache', status: 'RUNNING' },
          { name: 'RDS', status: 'ERROR' }
        ]
      }
    };

    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data
    });

    const { services, serviceHealthLoading, serviceHealthError } =
      useGetServiceHealth();

    expect(services).toEqual(data.getServiceHealth.services);
    expect(serviceHealthError).toBeNull();
    expect(serviceHealthLoading).toBe(false);
  });

  it('should return fallback data when there is an error', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: new Error('Network error'),
      data: null
    });

    const { services, serviceHealthLoading, serviceHealthError } =
      useGetServiceHealth();

    expect(services).toEqual([
      { name: 'APIs', status: 'ERROR' },
      { name: 'Student portal', status: 'UNAVAILABLE' },
      { name: 'Admin portal', status: 'UNAVAILABLE' },
      { name: 'Keycloak', status: 'UNAVAILABLE' },
      { name: 'Opensearch', status: 'UNAVAILABLE' },
      { name: 'Elasticache', status: 'UNAVAILABLE' },
      { name: 'RDS', status: 'UNAVAILABLE' }
    ]);
    expect(serviceHealthError).toBeInstanceOf(Error);
    expect(serviceHealthLoading).toBe(false);
  });

  it('should return fallback data when there is no data', () => {
    useQuery.mockReturnValue({
      loading: false,
      error: null,
      data: null
    });

    const { services, serviceHealthLoading, serviceHealthError } =
      useGetServiceHealth();

    expect(services).toEqual([
      { name: 'APIs', status: 'ERROR' },
      { name: 'Student portal', status: 'UNAVAILABLE' },
      { name: 'Admin portal', status: 'UNAVAILABLE' },
      { name: 'Keycloak', status: 'UNAVAILABLE' },
      { name: 'Opensearch', status: 'UNAVAILABLE' },
      { name: 'Elasticache', status: 'UNAVAILABLE' },
      { name: 'RDS', status: 'UNAVAILABLE' }
    ]);
    expect(serviceHealthError).toBeNull();
    expect(serviceHealthLoading).toBe(false);
  });
});
