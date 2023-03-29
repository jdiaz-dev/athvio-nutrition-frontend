import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { CreateClientDialog } from 'src/modules/clients/clients/adapters/in/dialogs/CreateClientDialog';
import ClientList from 'src/modules/clients/clients/adapters/in/components/ClientList/ClientList';
import ClientGroupsContainer from 'src/modules/professionals/client-groups/adapters/in/components/ClientGroupsContainer';
import SearcherBar from 'src/shared/components/SearcherBar';

function ClientsContainer() {
  const [openCreateClientDialog, setOpenCreateClientDialog] = useState(false);
  const [reloadClientList, setReloadClientList] = useState(false);
  console.log('---------------------ClientsContainer');

  return (
    <div>
      <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
        <SearcherBar />
        <Button variant="contained" onClick={() => setOpenCreateClientDialog(true)}>
          Add client
        </Button>
        <ClientGroupsContainer />
      </Stack>

      <ClientList reloadClientList={reloadClientList} setReloadClientList={setReloadClientList} />

      {openCreateClientDialog && (
        <CreateClientDialog
          openCreateClientDialog={openCreateClientDialog}
          setOpenCreateClientDialog={setOpenCreateClientDialog}
          setReloadClientList={setReloadClientList}
        />
      )}
    </div>
  );
}

export default ClientsContainer;
