import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CreateClientDialog } from 'src/modules/clients/clients/adapters/in/dialogs/CreateClientDialog';

function ClientsContainer() {
  const [openCreateCLientDialog, setopenCreateCLientDialog] = useState(false);
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => setopenCreateCLientDialog(true)}>
          Add client
        </Button>
      </Stack>

      <CreateClientDialog
        openCreateClientDialog={openCreateCLientDialog}
        setopenCreateClientDialog={setopenCreateCLientDialog}
      />
    </div>
  );
}

export default ClientsContainer;
