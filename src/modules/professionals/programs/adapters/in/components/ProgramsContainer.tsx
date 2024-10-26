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
        <div style={{ width: '90%', margin: '0 auto' }}>
          <Stack spacing={2} direction="row" sx={{ width: '100%' }} style={{ marginTop: '15px' }}>
            <div style={{ width: '80%', textAlign: 'left', height: '42px', lineHeight: '42px', fontWeight: 'bold' }}>Programs</div>
            <Button style={{ width: '20%' }} variant="contained" onClick={() => setOpenCreateUpdateProgramDialog(true)}>
              Create program
            </Button>
          </Stack>
          <ProgramList />
          {openCreateUpdateProgramDialog && (
            <CreateUpdateProgramDialog
              openCreateUpdateProgramDialog={openCreateUpdateProgramDialog}
              setOpenCreateUpdateProgramDialog={setOpenCreateUpdateProgramDialog}
            />
          )}
        </div>
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ProgramsContainer;
