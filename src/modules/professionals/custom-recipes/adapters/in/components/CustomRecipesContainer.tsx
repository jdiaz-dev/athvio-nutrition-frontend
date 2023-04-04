import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import CustomRecipeList from 'src/modules/professionals/custom-recipes/adapters/in/components/CustomRecipeList';
// eslint-disable-next-line max-len
import CreateUpdateCustomRecipeDialog from 'src/modules/professionals/custom-recipes/adapters/in/dialogs/CreateUpdateCustomRecipeDialog/CreateUpdateCustomRecipeDialog';
import { ReloadRecordListContext } from 'src/shared/context/ReloadRecordsContext';
import { useReloadRecords } from 'src/shared/hooks/useReloadRecords';

function CustomRecipesContainer() {
  const [openCreateUpdateCustomRecipeDialog, setOpenCreateUpdateCustomRecipeDialog] = useState(false);
  const [reloadCustomRecipeList, setReloadCustomRecipeList] = useState(false);
  const { reloadRecordList, setReloadRecordList } = useReloadRecords();
  // console.log('--------container');
  useEffect(() => {
    return () => {
      setReloadCustomRecipeList(false);
    };
  }, [reloadCustomRecipeList]);
  return (
    <>
      <ReloadRecordListContext.Provider value={{ reloadRecordList, setReloadRecordList }}>
        <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
          <Button variant="contained" onClick={() => setOpenCreateUpdateCustomRecipeDialog(true)}>
            Add custom Recipe
          </Button>
        </Stack>
        <CustomRecipeList />
        {openCreateUpdateCustomRecipeDialog && (
          <CreateUpdateCustomRecipeDialog
            openCreateUpdateCustomRecipeDialog={openCreateUpdateCustomRecipeDialog}
            setOpenCreateUpdateCustomRecipeDialog={setOpenCreateUpdateCustomRecipeDialog}
          />
        )}
      </ReloadRecordListContext.Provider>
    </>
  );
}

export default CustomRecipesContainer;
