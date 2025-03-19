import { gql, useQuery } from '@apollo/client';
import type { ServiceStatus } from '@/api/codegen/graphql';

interface ServiceHealth {
  name: string;
  status: ServiceStatus;
}

interface ServiceHealthResponse {
  getServiceHealth: {
    services: ServiceHealth[];
  };
}

export const useGetServiceHealth = () => {
  const query = gql`
    query GetServiceHealth {
      getServiceHealth {
        services {
          name
          status
        }
      }
    }
  `;

  const { data, loading, error, refetch } =
    useQuery<ServiceHealthResponse>(query);

  //used update the response to the UI if backend is down or in error state
  let responseUI = data?.getServiceHealth.services ?? [];

  // Apply override only if the backend is down (error or no data)
  if (error || responseUI.length === 0) {
    responseUI = [
      { name: 'APIs', status: 'ERROR' as ServiceStatus },
      { name: 'Student portal', status: 'UNAVAILABLE' as ServiceStatus },
      { name: 'Admin portal', status: 'UNAVAILABLE' as ServiceStatus },
      { name: 'Keycloak', status: 'UNAVAILABLE' as ServiceStatus },
      { name: 'Opensearch', status: 'UNAVAILABLE' as ServiceStatus },
      { name: 'Elasticache', status: 'UNAVAILABLE' as ServiceStatus },
      { name: 'RDS', status: 'UNAVAILABLE' as ServiceStatus }
    ];
  }

  return {
    services: responseUI,
    serviceHealthLoading: loading,
    serviceHealthError: error,
    refetchServiceHealth: refetch
  };
};

export type { ServiceHealth, ServiceHealthResponse };
