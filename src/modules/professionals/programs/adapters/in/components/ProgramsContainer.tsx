// eslint-disable-next-line max-len
import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';
import ProgramList from 'src/modules/professionals/programs/adapters/in/components/ProgramList';
import CreateUpdateProgramDialog from 'src/modules/professionals/programs/adapters/in/dialogs/CreateUpdateProgramDialog';

function ProgramsContainer() {
  const [openCreateUpdateProgramDialog, setOpenCreateUpdateProgramDialog] = useState(false);
  const [reloadProgramList, setReloadProgramList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();

  useEffect(() => {
    return () => {
      setReloadProgramList(false);
    };
  }, [reloadProgramList]);
  return (
    <>
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
          <Button variant="contained" onClick={() => setOpenCreateUpdateProgramDialog(true)}>
            Add program
          </Button>
        </Stack>
        <ProgramList />
        {openCreateUpdateProgramDialog && (
          <CreateUpdateProgramDialog
            openCreateUpdateProgramDialog={openCreateUpdateProgramDialog}
            setOpenCreateUpdateProgramDialog={setOpenCreateUpdateProgramDialog}
          />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ProgramsContainer;
