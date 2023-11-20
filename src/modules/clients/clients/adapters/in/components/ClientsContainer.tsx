import React, { createContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { CreateClientDialog } from 'src/modules/clients/clients/adapters/in/dialogs/CreateClientDialog';
import ClientGroupsContainer from 'src/modules/professionals/client-groups/adapters/in/components/ClientGroupsContainer';
import { ClientGroup } from 'src/shared/types/types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ClientList from 'src/modules/clients/clients/adapters/in/components/ClientList';
import ClientStateTab from 'src/modules/clients/clients/adapters/in/components/ClientStateTab';
import { ClientStateContext } from 'src/modules/clients/clients/adapters/in/components/ClientStateContext';

export const ClientGroupsContext = createContext<{
  clientGroupList: ClientGroup[];
  setClientGroupList: React.Dispatch<React.SetStateAction<ClientGroup[]>>;
}>({ clientGroupList: [], setClientGroupList: useState });

function ClientsContainer() {
  const [openCreateClientDialog, setOpenCreateClientDialog] = useState(false);
  const [clientGroupList, setClientGroupList] = useState<ClientGroup[]>([]);
  const [indexState, setClientIndexState] = useState(0);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  return (
    <>
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <ClientGroupsContext.Provider value={{ clientGroupList, setClientGroupList }}>
          <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
            <Button variant="contained" onClick={() => setOpenCreateClientDialog(true)}>
              Add client
            </Button>
            <ClientGroupsContainer />
          </Stack>
          <ClientStateContext.Provider value={{ indexState, setClientIndexState }}>
            <ClientStateTab />
            <ClientList />
          </ClientStateContext.Provider>
        </ClientGroupsContext.Provider>

        {openCreateClientDialog && (
          <CreateClientDialog openCreateClientDialog={openCreateClientDialog} setOpenCreateClientDialog={setOpenCreateClientDialog} />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ClientsContainer;
