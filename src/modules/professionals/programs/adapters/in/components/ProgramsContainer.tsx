import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import CustomMealList from 'src/modules/professionals/custom-meals/adapters/in/components/CustomMealList';
// eslint-disable-next-line max-len
import CreateUpdateCustomMealDialog from 'src/modules/professionals/custom-meals/adapters/in/dialogs/CreateUpdateCustomMealDialog/CreateUpdateCustomMealDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';

function ProgramsContainer() {
  const [openCreateUpdateCustomMealDialog, setOpenCreateUpdateCustomMealDialog] = useState(false);
  const [reloadCustomMealList, setReloadCustomMealList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  // console.log('--------container');
  useEffect(() => {
    return () => {
      setReloadCustomMealList(false);
    };
  }, [reloadCustomMealList]);
  return (
    <>
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
          <Button variant="contained" onClick={() => setOpenCreateUpdateCustomMealDialog(true)}>
            Add custom meal
          </Button>
        </Stack>
        <CustomMealList />
        {openCreateUpdateCustomMealDialog && (
          <CreateUpdateCustomMealDialog
            openCreateUpdateCustomMealDialog={openCreateUpdateCustomMealDialog}
            setOpenCreateUpdateCustomMealDialog={setOpenCreateUpdateCustomMealDialog}
          />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default ProgramsContainer;
