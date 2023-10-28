import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ClientBody, GetClientResponse, GetClientsRequest } from 'src/modules/clients/clients/adapters/out/client.types';
import { GET_CLIENTS } from 'src/modules/clients/clients/adapters/out/ClientQueries';

export function useClient() {
  const { loading, refetch } = useQuery<GetClientResponse, GetClientsRequest>(GET_CLIENTS, {
    skip: true,
  });

  const [clients, setClients] = useState<ClientBody[]>([]);

  return {
    loadingClients: loading,
    refetchClients: refetch,
    clients,
    setClients,
  };
}
