import React, { createContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { CreateClientDialog } from 'src/modules/clients/clients/adapters/in/dialogs/CreateClientDialog';
import ClientList from 'src/modules/clients/clients/adapters/in/components/ClientList/ClientList';
import ClientGroupsContainer from 'src/modules/professionals/client-groups/adapters/in/components/ClientGroupsContainer';
import SearcherBar from 'src/shared/components/SearcherBar';
import { ClientGroup } from 'src/shared/types/types';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';


export const ClientGroupsContext = createContext<{
  clientGroupList: ClientGroup[];
  setClientGroupList: React.Dispatch<React.SetStateAction<ClientGroup[]>>;
}>({ clientGroupList: [], setClientGroupList: useState });

function ClientsContainer() {
  const [openCreateClientDialog, setOpenCreateClientDialog] = useState(false);
  const [clientGroupList, setClientGroupList] = useState<ClientGroup[]>([]);

  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  // console.log('---------------------ClientsContainer');

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

          <ClientList />
        </ClientGroupsContext.Provider>

        {openCreateClientDialog && (
          <CreateClientDialog
            openCreateClientDialog={openCreateClientDialog}
            setOpenCreateClientDialog={setOpenCreateClientDialog}
          />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ClientsContainer;